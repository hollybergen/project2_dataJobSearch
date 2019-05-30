
var cityJobs = "static/data/city_jobs.geojson"
var jobChoice = "data engineer";


console.log(city_jobs)

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

let outdoorsMap = L.tileLayer(outdoors+accessToken);
let darkMap = L.tileLayer(dark+accessToken);
let satelliteMap = L.tileLayer(satellite+accessToken);

// let earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// let plateUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";


//Initialize base map
let myMap = L.map("map", {
  center: [
    39.8283, -98.5795
  ],
  zoom: 4.5
});


// Create function to determine radius of circles via job count
function radius(num_jobs) {
  if (num_jobs >= 150) {
    return ;
  }
  else if (num_jobs <= 10){
    return 10 * 2;
  }
  else {
    return num_jobs * 2;
  }

}

// Create function to colorize circles via job count
function color(num_jobs) {
  return num_jobs > 250 ? '#F30':
  num_jobs > 200  ? '#F60':
  num_jobs > 100  ? '#F90':
  num_jobs > 50  ? '#FC0':
  num_jobs > 10  ? '#FF0':
            '#9F3';
}


createFeatures(city_jobs)

// Create function to pass in data and create circle layer with markers
function createFeatures(data) {
  function pointToLayer(feature, latlng) {
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
    console.log("onEachFeature" + feature.properties.title),
    console.log(feature.properties[jobChoice]),
    layer.bindPopup("Hello");
    
    // ("<h3>" + feature.properties.title +
    //   "</h3><hr><p>" + "<br> Number of Jobs: " + feature.properties[jobChoice] +"</p>");
  }

  // Create a GeoJSON layer containing the features array on the city jobs object
  // Run the onEachFeature function once for each piece of data in the array
  var cities = L.geoJSON(city_jobs, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature
  });

  createMap(cities);
}

function createMap(cities) {
  // Define a baseMaps object to hold our base layers
  var properJobChoice = jobChoice.split(' ')
  .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
  .join(' ')
  let baseMaps = {
    //"Outdoors": outdoorsMap
    [properJobChoice]: cities
    // "Satellite": satelliteMap,
  };

  
  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    //'Data Science Jobs': cities
    // Faultlines: faultlines,
    // Timeline: timeline,
  };



  // Create our map, giving it the streetmap and earthquakes layers to display on load
  // let myMap = L.map("map", {
  //   center: [
  //     39.8283, -98.5795
  //   ],
  //   zoom: 4.5,
  //   layers: [cities]
  // });

  
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  let legend = L.control({position: "bottomright"});

  legend.onAdd = function (myMap) {
    let div = L.DomUtil.create("div", "info legend"),
      grades = [0, 10, 50, 100, 200, 250],
      labels = [];
    
    for (var i=0, ii=grades.length; i<ii; i++) {
      div.innerHTML += 
        '<i style="background: ' + color(grades[i] + 1) + '"></i>' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
  };

  legend.addTo(myMap);
  darkMap.addTo(myMap);
  cities.addTo(myMap);

  // cities.bindPopup("HELLO").addTo(myMap);
}