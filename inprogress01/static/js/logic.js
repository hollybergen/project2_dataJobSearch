
var cityJobs = "static/data/city_stats1.json"
var stateInfo = "static/data/states_results (2).json"
var jobChoice = "data scientist";


// Select job name as job title form url to pass into job choice variable
var url = new URL(location.href)
console.log(location.href);
var query_string = url.search;
var search_params = new URLSearchParams(query_string);
var nullCheck = search_params.get("jobChoice").toLowerCase();
console.log(nullCheck);

if (nullCheck != null && nullCheck !== "") {
  
  jobChoice = nullCheck;
  console.log(jobChoice);

}

var properJobChoice = jobChoice.split(' ')
  .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
  .join(' ')


//console.log(stateInfo)

function getNames(data) {
  var ds_jobs = [];
  var result = data.features;
  for (var i = 0; i < result.length; i++) {
    ds_jobs.push(result[i].properties[jobChoice])
    // [result[i].properties['data scientist']] = i
  }
  return ds_jobs;
};

let outdoors = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=";
let dark = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=";
let satellite = "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=";
let accessToken = "pk.eyJ1IjoiYnJ5YW5sb3dlIiwiYSI6ImNqZ3p2bThxNTA4M3Yyd25vdGQxY2xqeXQifQ.URpIhwM_YJcAJYOyzbZEdQ"

let outdoorsMap = L.tileLayer(outdoors + accessToken);
let darkMap = L.tileLayer(dark + accessToken);
let satelliteMap = L.tileLayer(satellite + accessToken);


//Initialize base map
let myMap = L.map("map", {
  center: [
    39.8283, -98.5795
  ],
  zoom: 3.5
});

// Create function to colorize circles via job count
function color(num_jobs) {
  return num_jobs > 250 ? '#F30' :
    num_jobs > 200 ? '#F60' :
      num_jobs > 100 ? '#F90' :
        num_jobs > 50 ? '#FC0' :
          num_jobs > 10 ? '#FF0' :
            '#9F3';
}

// Create function to pass in data and create circle layer with markers
d3.json(cityJobs, cityData => {
  d3.json(stateInfo, stateData => {

    var target_feature = null;

    var city_data = cityData[0].features;
    console.log(city_data);

      function pointToLayer(feature, latlng) {
        //console.log(feature)
        //target_feature = feature;
        let markerStyle = {
          stroke: true,
          weight: 1,
          fillOpacity: 0.75,
          fillColor: color(feature.properties[jobChoice].number_jobs),
          color: "white",
          radius: 25
          // radius: radius(feature.properties['data scientist'])
        };
        return new L.circleMarker(latlng, markerStyle);
      };

      function onEachFeature(feature, layer) {
        layer.bindPopup('<h1>' + feature.properties.title + '</h1><hr><h3>Number of ' + properJobChoice + ' jobs: ' + feature.properties[jobChoice].number_jobs + '</h3>');
      
        //console.log(feature);
        target_feature = feature;
      }

      // Create a GeoJSON layer containing the features array on the city jobs object
      // Run the onEachFeature function once for each piece of data in the array
      var cities = L.geoJSON(cityData[0], {
        pointToLayer: pointToLayer,
        onEachFeature: onEachFeature
      }).addTo(myMap).on('click', onClick);

      function onClick(e) {
        console.log(e.latlng);
        stateSelected = e.layer.feature.properties.state;
        console.log(stateSelected)
        useState(stateSelected);
      }

      //var markers = L.markerClusterGroup();
      createMap(cities);
    

    function createMap(cities) {
      // Define a baseMaps object to hold our base layers
      let baseMaps = {
        //"Outdoors": outdoorsMap
        [properJobChoice]: cities
        // "Satellite": satelliteMap,
      };


      // Create overlay object to hold our overlay layer
      var overlayMaps = {
        //'Data Science Jobs': cities
      };

      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);

      let legend = L.control({ position: "bottomright" });

      legend.onAdd = function (myMap) {
        let div = L.DomUtil.create("div", "info legend"),
          grades = [0, 10, 50, 100, 200, 250],
          labels = [];

        for (var i = 0, ii = grades.length; i < ii; i++) {
          div.innerHTML +=
            '<i style="background: ' + color(grades[i] + 1) + '"></i>' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
      };

      legend.addTo(myMap);
      darkMap.addTo(myMap);
      cities.addTo(myMap);
    }
  });
});

