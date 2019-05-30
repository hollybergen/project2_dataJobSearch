mapboxgl.accessToken = config.api_key

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 37.8],
    zoom: 3
});

var geojson = {
	"type": "FeatureCollection",
	"features": [{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-83.7312291, 42.2681569]
			},
			"properties": {
				"title": "Ann Arbor",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-84.3901849, 33.7490987]
			},
			"properties": {
				"title": "Atlanta",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-97.7436995, 30.2711286]
			},
			"properties": {
				"title": "Austin",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-71.0582912, 42.3602534]
			},
			"properties": {
				"title": "Boston",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-80.8431268, 35.2270869]
			},
			"properties": {
				"title": "Charlotte",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-87.6244212, 41.8755616]
			},
			"properties": {
				"title": "Chicago",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-84.5124602, 39.1014537]
			},
			"properties": {
				"title": "Cincinnati",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-81.0343313, 34.0007493]
			},
			"properties": {
				"title": "Columbia",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-96.7968559, 32.7762719]
			},
			"properties": {
				"title": "Dallas",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-104.9848623, 39.7392364]
			},
			"properties": {
				"title": "Denver",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-95.3676974, 29.7589382]
			},
			"properties": {
				"title": "Houston",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-81.655651, 30.3321838]
			},
			"properties": {
				"title": "Jacksonville",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-118.2427666, 34.0536909]
			},
			"properties": {
				"title": "Los Angeles",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-85.759407, 38.2542376]
			},
			"properties": {
				"title": "Louisville",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-80.1936589, 25.7742658]
			},
			"properties": {
				"title": "Miami",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-93.2654692, 44.9772995]
			},
			"properties": {
				"title": "Minneapolis",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-86.7743531, 36.1622296]
			},
			"properties": {
				"title": "Nashville",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-74.0060152, 40.7127281]
			},
			"properties": {
				"title": "New York",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-76.4321089, 36.9786449]
			},
			"properties": {
				"title": "Newport News",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-112.0773456, 33.4485866]
			},
			"properties": {
				"title": "Phoenix",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-117.1627714, 32.7174209]
			},
			"properties": {
				"title": "San Diego",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-122.4192363, 37.7792808]
			},
			"properties": {
				"title": "San Francisco",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-122.3300624, 47.6038321]
			},
			"properties": {
				"title": "Seattle",
				"icon": "monument"
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-75.9774183, 36.8529841]
			},
			"properties": {
				"title": "Virginia Beach",
				"icon": "monument"
			}
		}
	]
}

// add markers to map
geojson.features.forEach(function (marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
        .addTo(map);
});
