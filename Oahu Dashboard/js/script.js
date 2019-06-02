// ***************************************

// MAP!!!!

// ***************************************

//global variables

oreoStats = [];
values = [];
var legend = L.control({position: 'bottomright'});
var hoodGeoJson ={}
var hoodchart = {}
var soldPriceRangeChart = {}
var testdate =''

  //initialize classybrew
var brew = new classyBrew();



//format functions
// function to format numbers to include commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//function to format numbers to include commas and the dollar sign
function currency(x) {
  return "$" + x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

 

  L.mapbox.accessToken = 'pk.eyJ1Ijoiam9vbmlzbSIsImEiOiJjanZuOWl0YjIxOW93NDlwaDRraWozeWcxIn0.VKBpD6DcPtju42yB2yYdyg';
  var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken);

  //attach map to DOM

  var map = L.map('map', { attributionControl:false })
    .addLayer(mapboxTiles)
    .setView([21.48, -157.99], 10);


  var info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function (props) {
    this._div.innerHTML = '<h4>Oahu Neighborhoods</h4>' +  (props ?
      '<b>' + props.hood 
      // + '</b><br /><span>' + 'Sold Homes : ' + (props.total_sold ? props.total_sold: 'no ' )   +'</span>'
      // + '</b><br /><span>' + 'Avg Days on Market : ' + (props.dom_avg ? Math.round(props.dom_avg) : 0  )   +'</span>'
      // + '</b><br /><span>' + 'Avg Sold Price : ' + (props.soldprice_avg ? currency(Math.round(props.soldprice_avg)): 0 )   +'</span>'

      : 'Click on a neighborhood');
    //console.log(props)
  };

  info.addTo(map);

//read the stats

d3.json("./data/city_stats1.json", function(data) {

  console.log(data[0].features);
  new_data = data[0].features;

  //d3 time formats
  // var fullDateFormat = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ');
  // var monthFormat = d3.time.format('%b');
  // // var yearFormat = d3.time.format('%Y');
  // // var monthFormat = d3.time.format('%b');
  // // var dayOfWeekFormat = d3.time.format('%a')
  // var numberFormat = d3.format(",f");

  new_data.forEach(function(d) {
    console.log(d.properties)
    // d.closingdate = fullDateFormat.parse(d.CLOSINGDATE);
    // d.soldprice = +d.SOLDPRICE ? +d.SOLDPRICE : 0;
    // d.dom = +d.DOM ?  +d.DOM : 0 ; 
    // d.hood = d.subregion ? d.subregion : 'missing' ;
    // d.monthSold = monthFormat(fullDateFormat.parse(d.CLOSINGDATE));
    // d.prop = d.PROPERTYTYPE ? d.PROPERTYTYPE : '' ;
    // d.month =  d3.time.month(d.closingdate) ;
    // d.mls = d.MLS ? ;
    // d.address = d.ADDRESS ? d.ADDRESS : "Missing";

  });


  //crossfilter
  var xf = crossfilter(new_data);

  //counter
  var all = xf.groupAll();

  // dimensions

  // Create our number formatter.
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  //formatter.format(2500);
  
  var chosenJob = 'data scientist';

  var allDim = xf.dimension(function(d) {
      console.log(d);
      return d;
    }),

    // City Names
    dimCity = xf.dimension(function(d) {
      console.log(d.properties.title)
      return d.properties.title;
    }),
    dimSearchCity = xf.dimension(function(d) {
      return d.properties.title.toLowerCase();
    }),

    // ALL Jobs, when variable for CHOSEN JOB passed in:
    dimJob = xf.dimension(function(d) {
      return d.properties[chosenJob];
    }),
    dimNumJobs = xf.dimension(function(d) {
      console.log(d.properties[chosenJob].number_jobs)
      return d.properties[chosenJob].number_jobs;
    }),
    dimSalary = xf.dimension(function(d) {
      console.log(d.properties[chosenJob].avg_salary);
      return d.properties[chosenJob].avg_salary;
    }),
    dimSalaryForm = xf.dimension(function(d) {
      console.log(formatter.format(d.properties[chosenJob].avg_salary));
      return d.properties[chosenJob].avg_salary;
    }),

    

    // Data & Analytics Manager
    // dimJobManager = xf.dimension(function(d) {
    //   console.log(d.properties['data & analytics manager'])
    //   return d.properties['data & analytics manager'];
    // }),
    // dimManagerNum = xf.dimension(function(d) {
    //   console.log(d.properties['data & analytics manager'].number_jobs)
    //   return d.properties['data & analytics manager'].number_jobs;
    // }),
    // dimManagerSal = xf.dimension(function(d) {
    //   console.log(d.properties['data & analytics manager'].avg_salary);
    //   return d.properties['data & analytics manager'].avg_salary;
    // }),
    // dimManagerSalForm = xf.dimension(function(d) {
    //   console.log(formatter.format(d.properties['data & analytics manager'].avg_salary));
    //   return d.properties['data & analytics manager'].avg_salary;
    // }),



    // Data Engineer
    // dimJobEngineer = xf.dimension(function(d) {
    //   return d.properties['data engineer'];
    // }),

    // // Data Scientist
    // dimJobScientist = xf.dimension(function(d) {
    //   return d.properties['data scientist'];
    // }),

    // // Statistician
    // dimJobStat = xf.dimension(function(d) {
    //   return d.properties['statistician'];
    // }),




//Populate dropdown
cityArray = []



  dimCity.group().all().forEach(function(p, i) {
   cityArray.push(p.key) 

    $("#dropdown-city").append(
        $("<li>", {}).append(
            $("<a>", { href: '#' }).text(
               p.key
            )
        )
    );

  })

  console.log(cityArray);


  $.each(cityArray, function(index) {
    $("#dropdown-menu").append(
        $("<li>", {}).append(
            $("<a>", { href: cityArray[index].href }).text(
              cityArray[index].text
            )
        )
    );
});

 // outer = []

 // for (var key in obj) {
 //    if (!obj.hasOwnProperty(key) ) continue;

 //    var newer = obj[key];
 //      for (var key in newer){
 //        if (!newer.hasOwnProperty( key)) continue;

 //        outer.push(newer[key])
      

 //      }


 // }


  //define groups

  var soldPriceGroup =  dimSoldPrice.group().reduceCount();

  
  var dimMonthAvgGroup = dimMonth.group().reduce(
    //add
    function(p, v) {
      ++p.count;
      p.dom_sum += v.dom;
      p.soldprice_sum += v.soldprice;
      p.dom_avg =  p.count ?  p.dom_sum / p.count : 0;
      p.soldprice_avg = p.count ? p.soldprice_sum / p.count : 0;
      return p;
    },
    //remove
    function(p, v) {
      --p.count;
      p.soldprice_sum -= v.soldprice;
      p.dom_sum -= v.dom;
      p.dom_avg = p.count ? p.dom_sum / p.count : 0;
      p.soldprice_avg = p.count ? p.soldprice_sum / p.count : 0;
      return p;
    },
    //init
    function(p, v) {
      return {
        count: 0,
        dom_sum: 0,
        soldprice_sum: 0,
        dom_avg: 0,
        soldprice_avg: 0
      };
    }
  );

  var dimMonthAvgGroupB = dimMonth.group().reduce(
    //add
    function(p, v) {
      ++p.count;
      p.dom_sum += v.dom;
      p.soldprice_sum += v.soldprice;
      p.dom_avg = p.count ? p.dom_sum / p.count : 0;
      p.soldprice_avg = p.count ? p.soldprice_sum / p.count : 0;
      return p;
    },
    //remove
    function(p, v) {
      --p.count;
      p.soldprice_sum -= v.soldprice;
      p.dom_sum -= v.dom;
      p.dom_avg = p.count ? p.dom_sum / p.count : 0;
      p.soldprice_avg = p.count ? p.soldprice_sum / p.count : 0;
      return p;
    },
    //init
    function(p, v) {
      return {
        count: 0,
        dom_sum: 0,
        soldprice_sum: 0,
        dom_avg: 0,
        soldprice_avg: 0
      };
    }
  );

  // console.log(dimMonthAvgGroup.top(Infinity))
  // compute averages
  var hoodAvgGroup = dimHood.group().reduce(
    //add
   function(p, v) {
      ++p.count;
      p.dom_sum += v.dom;
      p.soldprice_sum += v.soldprice;
      p.dom_avg = p.count ? p.dom_sum / p.count : 0;
      p.soldprice_avg = p.count ? p.soldprice_sum / p.count : 0;
      return p;
    },
    //remove
    function(p, v) {
      --p.count;
      p.soldprice_sum -= v.soldprice;
      p.dom_sum -= v.dom;
      p.dom_avg = p.count ? p.dom_sum / p.count : 0;
      p.soldprice_avg = p.count ? p.soldprice_sum / p.count : 0;
      return p;
    },
    //init
    function(p, v) {
      return {
        count: 0,
        dom_sum: 0,
        soldprice_sum: 0,
        dom_avg: 0,
        soldprice_avg: 0
      };
    }
  );


  // **************************************
  // MAP!!!!
  // **************************************



  //set up mapbox token and tile



  oreoStats = hoodAvgGroup.top(Infinity);
// console.log(oreoStats)



// tooltips for row chart
var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function (d) { return "<span style='color: #f0027f'>" +  d.key + "</span> : "  + numberFormat(d.value); });





// tooltips for pie chart
var pieTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function (d) { 
         switch (d.data.key) {
              case  "CND":  proplabel ="Condo"
              break;
              case  "RES":  proplabel ="Home"
              break;
            }
            return "<span style='color: #f0027f'>" +  proplabel + "</span> : "  + numberFormat(d.value); });

// tooltips for bar chart
var barTip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function (d) { return "<span style='color: #f0027f'>" + monthFormat(d.data.key) + "</span> : " + currency(d.y);});



//create a feature layer "hoodlayer"
var hoodlayer = L.mapbox.featureLayer()
    .loadURL('./data/oahu.geojson')  //adding the oahu neighborhood shapefiles to the hoodlayer feature layer
    .addTo(map)
    .on('ready', loadData);  //when ready, run loadData function


 
function loadData() {

  //extract the oahu neighborhood geojson from the featurelayer
  hoodGeoJson = hoodlayer.getGeoJSON()
 

  //add crossfilter stats to geojson properties 
  hoodGeoJson.features.forEach(function(d) {
    oreoStats.forEach(function(c) {
      if (c.key == d.properties.hood) {
        d.properties.total_sold = c.value.count ? c.value.count : 0
        d.properties.dom_avg = c.value.dom_avg ? c.value.dom_avg : 0
        d.properties.soldprice_avg = c.value.soldprice_avg ? c.value.soldprice_avg : 0
                       
      }
    })

  });


  // //initialize classybrew
  // var brew = new classyBrew();

  for (var i = 0; i < hoodGeoJson.features.length; i++) {
      if (hoodGeoJson.features[i].properties['total_sold'] == null) continue;
      values.push(hoodGeoJson.features[i].properties['total_sold']);

  }

  // pass array to our classybrew series
  brew.setSeries(values);

  // define number of classes
  brew.setNumClasses(9);

  // set color ramp code
  brew.setColorCode("RdYlGn");

  // classify by passing in statistical method
  // i.e. equal_interval, jenks, quantile
  brew.classify("jenks");


    function getStyle(layer) {
    return {
            weight: 1,
            opacity: 1,
            color: 'gray',
            dashArray: '3',
            fillOpacity: 0.8,
            fillColor: brew.getColorInRange(layer.feature.properties.total_sold)
            };
    }

//add a legend
////  var legend = L.control({position: 'bottomright'});


  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),


      percents = brew.getBreaks(),

      labels = ['<strong> Sold Units </strong>'],
      from, to;
    for (var i = 0; i < percents.length; i++) {
      from = percents[i];
      to = percents[i + 1];
      if(to) {
      labels.push(
        '<i style="background:' + brew.getColorInRange(from) + '"></i> '//+
      //  from + '&ndash; ' + to + '<br>' : '+');
        )
        }
   
      }
    
    labels.push("<i>" + percents[percents.length -1] + "</i>  ")
    labels.unshift("<i>" + percents[0] + "</i>")
    div.innerHTML = labels.join('');
    //console.log(div.innerHTML)
    return div;


    console.log (brew.getBreaks())

  };
legend.addTo(map)



function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: '#fff200',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}



    // function resetHighlight(e) {
    //   geojson.resetStyle(e.target);
    //   info.update();
    // }



//paint the map and add event listeners to mouse functions:

  hoodlayer.eachLayer(function(layer) {
        //console.log("hello")
        //console.log(layer)
        layer.setStyle(getStyle(layer));
        layer.on({
          mousemove: mousemove,
          mouseout: mouseout,
          click: zoomToFeature,
          mouseover: highlightFeature

    });
      });




function mouseout(e) {
 var layer = e.target;
  closeTooltip = window.setTimeout(function() {
    map.closePopup();
  }, 100);
  ////// hoodGeoJson.setStyle(getStyle(layer))

    layer.setStyle(getStyle(layer))


}




}  //end loaddata()



//create tooltips for the map
var popup = new L.Popup({
  autoPan: false
});
var closeTooltip;




function mousemove(e) {
  var layer = e.target;

  popup.setLatLng(e.latlng);
  popup.setContent('<div class="marker-title">' + layer.feature.properties.hood 
    + '</div>' + ' Region:' + layer.feature.properties.region 
    + '<br>' + 'Sold Listings:' + (layer.feature.properties.total_sold ? (layer.feature.properties.total_sold) : (0)));

  if (!popup._map) popup.openOn(map);
  window.clearTimeout(closeTooltip);

    // layer.setStyle({
    //   weight: 3,
    //   opacity: 0.3,
    //   fillOpacity: 0.2
    // });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
  }
}






  function zoomToFeature(e) {
    // dimMapHood.filterAll();
    // 
    dimMapHood.filterAll();
    map.fitBounds(e.target.getBounds());
    // console.log(e.target.feature.properties.hood)
    console.log(e.target) //  same as console.log(this)
 
    //dc.filterAll();
    e.target.feature.properties.hood ? dimMapHood.filter(e.target.feature.properties.hood) : console.log(e.target.feature.properties.hood)
     dc.redrawAll();

    info.update(e.target.feature.properties);
    // map.removeLayer(markers);
    // markers.clearLayers();

  
  }



  //charts

  hoodChart = dc.rowChart("#rowchart");

  hoodChart.height(450)
    .width(330)
    .margins({
      top: 10,
      right: 10,
      bottom: 40,
      left: 10
    })
    .dimension(dimHood)
    .group(dimHood.group())
    .ordering(function(p) {
      //console.log(p +" "+p.value)
      return -p.value;
    })
    .label(function(d) {
      return d.key + " : " + d.value
    })



    .elasticX(true)
    //.elasticY(true)
    .rowsCap(15)
     // .colors(d3.scale.category20c())
    // .colors(d3.schemeCategory10)
    .colors(d3.scale.quantize().range(["#7095af"]))

    .renderlet(function(chart) {

      chart.selectAll('g.row').on('click', function(d) {

            hoodlayer.eachLayer(function(layer) {
              if(layer.feature.properties.hood  == d.key ){ 
                  map.fitBounds(layer.getBounds())

 
              } else {
                      // dimMapHood.filterAll();
                }
            });  
      });
    })
    ;




 var soldPriceRangeChart = dc.barChart('#chart-sold-range');

  soldPriceRangeChart
      .width(800)
      .height(80)
      .dimension(dimSoldPrice)
      .group(soldPriceGroup)
      // .x(d3.scale.linear().domain([-0.2, d3.max(dimSoldPrice.top(Infinity), function (d) { return d.SOLDPRICE; }) + 0.2]))
      .x(d3.scale.linear().domain([0,2500000]))
      .elasticY(true)
      // .elasticX(true)
      .centerBar(true)
      .gap(50)
      // .xAxisLabel('Alcohol By Volume (%)')
      // .yAxisLabel('Count')
      .round(dc.round.floor)
      .margins({top: 10, right: 26, bottom: 30, left: -1})
      .filter([100000,900000]);

  soldPriceRangeChart.yAxis().tickFormat( function (v) { return''; }); 

  soldPriceRangeChart.xAxis().tickFormat( function (v) { return currency(v)  ; });    




  var monthChart = dc.rowChart('#chart-months')


monthChart  
.height(180)
    .width(250)
    .margins({
      top: 0,
      right: 0,
      bottom: 20,
      left: 0
    })
    .dimension(dimMonthC)
    .group(dimMonthC.group().reduceCount())
    .ordering(function(p) {
      //console.log(p +" "+p.value)
      return -p.value;
    })
   
    .elasticX(true)
    .rowsCap(12)
    // .colors(d3.scale.quantize().range(["#7095af"]))
    .label(function(d) {
      return d.key
    })
    .othersGrouper(false)
    .ordering(function(d) {
      var order = {
        'Jan': 1,
        'Feb': 2,
        'Mar': 3,
        'Apr': 4,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sep': 9,
        'Oct': 10,
        'Nov': 11,
        'Dec': 12
      };
      return order[d.key];
    })

    ;


  var soldPriceChart = dc.barChart('#chart-sold-price');

  soldPriceChart
 
    .width(300)
    .height(200)
    .margins({
      top: 10,
      right: 10,
      bottom: 20,
      left: 70
    })
    .dimension(dimMonth)
    .group(dimMonthAvgGroup)
    .brushOn(false)
    // .centerBar(true)
    .gap(20)
    .valueAccessor(function(d) {
      return d.value.soldprice_avg;
    })
    .transitionDuration(500)
    .x(d3.time.scale().domain([new Date(2015, 12, 1), new Date(2016, 7, 1)]))   //need to fix this to be the max date +1 of the crossfilter
    .round(d3.time.month.round)
    .xUnits(d3.time.months)
    .elasticY(true)
    // .elasticX(true)
    .xAxis().ticks(4);
    //.x(d3.time.scale().domain([d3.time.hour.offset(minDate, -1), d3.time.hour.offset(maxDate, 2)])); 
//var x = d3.time.scale().domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length - 1].date), 1)]).rangeRound([0, width - margin.left - margin.right]);

  soldPriceChart.yAxis().tickFormat( function (v) { return '$'+ v ; }); 




  var domChart = dc.lineChart('#chart-dom');

  domChart
  //  .renderArea(true)
   .width(250)
    .height(200)
    .margins({
      top: 20,
      right: 10,
      bottom: 20,
      left: 10
    })

    // .dimension(dimMonthB)
    // .group(dimMonthAvgGroupB)
    .dimension(dimDom)
    .group(dimDom.group().reduceCount())

    // .centerBar(true)
    // .gap(20)
    // .valueAccessor(function(d) {
    //   return d.value.dom_avg;
    // })
    //  .brushOn(false)

    .transitionDuration(500)
    .x(d3.scale.linear().domain([0,360]))
  //  .x(d3.time.scale().domain([new Date(2015, 12, 1), new Date(2016, 12, 1)]))
   // .round(d3.time.month.round)
  //  .xUnits(d3.time.months)
   .elasticY(true)
   // .elasticX(true)
    //.xAxis().ticks(4)
    // .on('renderlet', function(chart) {
    //     chart.selectAll('circle.dot')
    //         .on('mouseover.foo', function(d) {
    //             chart.select('.display-qux').text(dateFormat(d.data.key) + ': ' + d.data.value);
    //         })
    //         .on('mouseout.foo', function(d) {
    //             chart.select('.display-qux').text('');
    //         });
    // });
  
;
// .x(d3.scale.ordinal().domain([0,1,2,3,4,5,6,7,8,9,10]))
// .xUnits(dc.units.ordinal)



  var propTypePieChart = dc.pieChart('#chart-prop-type');

  propTypePieChart
    .width(300)
    .height(200)

    .dimension(dimProp)
    .group(dimProp.group())
    .innerRadius(30)

  .label(function(d) {
    var proplabel = ''

    switch (d.data.key) {
      case  "CND":  proplabel ="Condo"
      break;
      case  "RES":  proplabel ="Home"
      break;
    }
    return (proplabel) + ' ' + Math.round((d.endAngle - d.startAngle) / Math.PI * 50) + '%';
  });





  //call loadData when dc-charts are filtered
  for (var i = 0; i < dc.chartRegistry.list().length; i++) {
    var chartI = dc.chartRegistry.list()[i];
    chartI.on("filtered", function () {
      repaintMap();


    });
  }

 

  //filter all charts when using the datatables search box
  $(":input").on('keyup', function() {

    text_filter(dimSearchHood, this.value);


    function text_filter(dim, q) {
      if (q != '') {
        dim.filter(function(d) {
          return d.indexOf(q.toLowerCase()) !== -1;
        });
      } else {
        dim.filterAll();
      }
       
      dc.redrawAll();
      repaintMap();
      info.update()
    }
  });



  //initiate reset buttons
  d3.selectAll('a#all').on('click', function() {
   //  $("input[type=text], textarea").val("");  //clear text input
   //  //  dimProp.filterAll(); //clear dimension
   //  //  dimMonth.filterAll(); //clear dimension
   //  //  dimMonthB.filterAll(); //clear dimension
   //   dimHood.filterAll(); //clear dimension
   // //  dimHoodB.filterAll(); //clear dimension
   //  //  dimSoldPrice.filterAll();
   //  map.setView(new L.LatLng(21.48, -157.99), 10); //recenter map
   //  // dc.filterAll(); //clearfiler
   //  dc.redrawAll();

   //  soldPriceRangeChart.filter([100000,900000])

   // // markers.clearLayers();  //clear map layers
   //  // dc.repaintMap
   //  console.log("1")
   //  repaintMap()
   location.reload()

  });


  //add date counts
  // var dataCount = dc.dataCount('#data-count')

  // dataCount
  //   .dimension(xf)
  //   .group(all);

  //render charts
  dc.renderAll();  



  //add x-axis to the rowchart using jquery.  dc rowcharts do not have a rowchart function
  function AddXAxis(chartToUpdate, displayText)
    {
        chartToUpdate.svg()
                    .append("text")
                    .attr("class", "x-axis-label")
                    .attr("text-anchor", "middle")
                    .attr("x", chartToUpdate.width()/2)
                    .attr("y", chartToUpdate.height()-6.5)
                    .text(displayText);
    }
    AddXAxis(hoodChart, "Number of Sold Units");

    // hoodChart.svg().select('rect').attr('fill', "blue");


function repaintMap()
{




 hoodGeoJson.features.forEach(function(d) {
    oreoStats.forEach(function(c) {
      if (c.key == d.properties.hood) {
        d.properties.total_sold = c.value.count
      }
    })

  });




// console.log(hoodGeoJson)
  //initialize classybrew
  // var brew = new classyBrew();



// commented to keep map from going grey
  // for (var i = 0; i < hoodGeoJson.features.length; i++) {
  //     if (hoodGeoJson.features[i].properties['total_sold'] == null) continue;
  //     values.push(hoodGeoJson.features[i].properties['total_sold']);

  // }


  // pass array to our classybrew series
  brew.setSeries(values);

  // define number of classes
  brew.setNumClasses(9);

  // set color ramp code
  brew.setColorCode("RdYlGn");

  // classify by passing in statistical method
  // i.e. equal_interval, jenks, quantile
  brew.classify("jenks");


    function getStyle(layer) {
    return {
            weight: 1,
            opacity: 1,
            color: 'gray',
            dashArray: '3',
            fillOpacity: 0.8,
            fillColor: brew.getColorInRange(layer.feature.properties.total_sold)
            };
    }

  hoodlayer.eachLayer(function(layer) {
        layer.setStyle(getStyle(layer));

      });



  // function label(feature, layer) {
  //   // console.log(layer.getBounds().getCenter())
  //   var label = L.marker(layer.getBounds().getCenter(), {
  //     icon: L.divIcon({
  //       className: 'label',
  //       html: feature.properties.hood,
  //       iconSize: [100, 40]
  //     })
  //   })
  // }

};

function rescale() {
    //yScale.domain([0,Math.floor((Math.random()*90)+11)])  // change scale to 0, to between 10 and 100
    
    soldPriceRangeChart.select(".yaxis")
            .transition().duration(1500).ease("sin-in-out")  // https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_ease
            .call(yAxis);  

    vis.select(".yaxis_label")
        .text("Rescaled Axis");
}


        // rotate the x Axis labels

                d3.selectAll("g.row").call(tip);
                d3.selectAll("g.row").on('mouseover', tip.show)
                    .on('mouseout', tip.hide);

                d3.selectAll(".pie-slice").call(pieTip);
                d3.selectAll(".pie-slice").on('mouseover', pieTip.show)
                    .on('mouseout', pieTip.hide);

                d3.selectAll(".bar").call(barTip);
                d3.selectAll(".bar").on('mouseover', barTip.show)
                    .on('mouseout', barTip.hide);  


       // // domChart.renderlet(function(chart){
          // d3.selectAll("g path").call(tip);
          // d3.selectAll("g path").on('mouseover', tip.show)
          //           .on('mouseout', tip.hide);

       // //   });


})
