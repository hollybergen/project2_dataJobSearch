
var cityJobs = "static/data/city_stats1.json"
var stateInfo = "static/data/states_results.json"
var jobChoice = "data scientist";
var properJobChoice = jobChoice.split(' ')
  .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
  .join(' ')

//Select Job Choice variable based on button selected
var jobChoice = $("button").val(); 
$("button").click(function() {
  jobChoice = $(this).val();
  console.log(jobChoice);
  //location.reload();
});


function othername(id) {
  var input = document.getElementById(id).value;
  jobChoice = id;
  alert(input);
}


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

// let earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// let plateUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";



//Initialize base map
let myMap = L.map("map", {
  center: [
    39.8283, -98.5795
  ],
  zoom: 3.5
});


// Create function to determine radius of circles via job count
// function radius(num_jobs) {
//   if (num_jobs >= 150) {
//     return ;
//   }
//   else if (num_jobs <= 10){
//     return 10 * 2;
//   }
//   else {
//     return num_jobs * 2;
//   }
// }

// Create function to colorize circles via job count
function color(num_jobs) {
  return num_jobs > 250 ? '#F30' :
    num_jobs > 200 ? '#F60' :
      num_jobs > 100 ? '#F90' :
        num_jobs > 50 ? '#FC0' :
          num_jobs > 10 ? '#FF0' :
            '#9F3';
}

//createFeatures(city_jobs)

// Create function to pass in data and create circle layer with markers
//d3.json("./data/city_stats1.json", function (data) {


d3.json(cityJobs, cityData => {
  d3.json(stateInfo, stateData => {

    var city_data = cityData[0].features;

      function pointToLayer(feature, latlng) {
        //console.log(feature)
        let markerStyle = {
          stroke: true,
          weight: 1,
          fillOpacity: 0.75,
          fillColor: color(feature.properties[jobChoice]),
          color: "white",
          radius: 25
          // radius: radius(feature.properties['data scientist'])
        };
        return new L.circleMarker(latlng, markerStyle);
      };

      function onEachFeature(feature, layer) {
        layer.bindPopup('<h1>' + feature.properties.title + '</h1><hr><h3>Number of ' + properJobChoice + ' jobs: ' + feature.properties[jobChoice] + '</h3>');
      }


      // Create a GeoJSON layer containing the features array on the city jobs object
      // Run the onEachFeature function once for each piece of data in the array
      var cities = L.geoJSON(city_jobs, {
        pointToLayer: pointToLayer,
        onEachFeature: onEachFeature
      }).addTo(myMap).on('click', onClick);

      function onClick(e) {
        console.log(e.latlng);
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

