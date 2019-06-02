mapboxgl.accessToken = config.api_key;

// var map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/gilbertduenas/cjw1rsss10lg31cpe0dw921y2', // replace this with your style URL
//   center: [-87.661557, 41.893748],
//   zoom: 10.7
// });
// code from the next step will go here

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/gilbertduenas/cjw2lr7ty068v1cmhahodhhgt',
  // style: 'mapbox://styles/mapbox/light-v10',
  center: [-96, 37.8],
  zoom: 3
});

// map.addSource('geojson_data', {
//   type: 'geojson',
//   data: 'https://mydomain.mydata.geojson'
// });

map.on('load', function () {
  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": {
      "type": "geojson",
      "data": 'static/data/geojson.json'
    },
    "layout": {
      "icon-image": "{icon}-15",
      "text-field": "{title}",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 0.6],
      "text-anchor": "top"
    }
  });
});
// var geojson = 'geojson.json'
/*
{
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-77.032, 38.913]
    },
    properties: {
      title: 'Mapbox',
      description: 'Washington, D.C.'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-122.414, 37.776]
    },
    properties: {
      title: 'Mapbox',
      description: 'San Francisco, California'
    }
  }]
};
*/

// var geojson = '/static/data/geojson.json'

// add markers to map
// geojson_data.features.forEach(function(marker) {

//   // create a HTML element for each feature
//   var el = document.createElement('div');
//   el.className = 'marker';

//   // make a marker for each feature and add to the map
//   new mapboxgl.Marker(el)
//     .setLngLat(marker.geometry.coordinates)
//     .addTo(map);
// });
