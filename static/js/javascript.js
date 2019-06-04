mapboxgl.accessToken = config.api_key;


var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/gilbertduenas/cjw2lr7ty068v1cmhahodhhgt',
  // style: 'mapbox://styles/mapbox/light-v10',
  center: [-96, 37.8],
  zoom: 3
});


map.on('load', function () {
  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": {
      "type": "geojson",
      "data": './static/data/geojson.json'
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

