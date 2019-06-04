function useCity(city) {

    d3.csv("../Income/income.csv", function(data) {
        // return {
        //     city : d.State,
        
        // }
        console.log(data[0].State);

 
        city_row = data.filter(function(row) {
            var new_row =  row['City'].toLowerCase() == city;
            console.log(new_row);
        })

    });

}

useCity("san diego");

         // Create Ranking Chart
//          var chart = new CanvasJS.Chart("chartContainer", {
//             animationEnabled: true,
            
//             title:{
//                 text:"State Ranking Scores for " + properState
//             },
//             axisX:{
//                 interval: 1
//             },
//             axisY2:{
//                 interlacedColor: "#f7f7f7",
//                 gridColor: "rgba(1,77,101,.1)",
//                 // title: "Percentage Rank for " + properState
//             },
//             data: [{
//                 type: "bar",
//                 name: "companies",
//                 axisYType: "secondary",
//                 dataPoints: [
//                     { y: (1 - (state_name["Rank Dictionary"][0].Value)/50)*100, label: "Education", toolTipContent: "Education Rank: " + state_name["Rank Dictionary"][0].Rank, color: "#0d377c"},
//                     { y: (1 - (state_name["Rank Dictionary"][1].Value)/50)*100, label: "Economy", toolTipContent: "Economy Rank: " + state_name["Rank Dictionary"][1].Rank, color: "#144ead" },
//                     { y: (1 - (state_name["Rank Dictionary"][2].Value)/50)*100, label: "Infrastructure", toolTipContent: "Infrastructure Rank " + state_name["Rank Dictionary"][2].Rank, color: "#1a62d8" },
//                     { y: (1 - (state_name["Rank Dictionary"][3].Value)/50)*100, label: "Opportunity", toolTipContent: "Opportunity Rank " + state_name["Rank Dictionary"][3].Rank, color: "#4a89ef"},
//                     { y: (1 - (state_name["Rank Dictionary"][4].Value)/50)*100, label: "Fiscal Stability", toolTipContent: "Fiscal Stability Rank " + state_name["Rank Dictionary"][4].Rank, color: "#7cacf9"},
//                     { y: (1 - (state_name["Rank Dictionary"][5].Value)/50)*100, label: "Crime & Corrections", toolTipContent: "Crime & Corrections Rank " + state_name["Rank Dictionary"][5].Rank, color:"#b2ccf7"}
//                 ]
//             }]
//         });
//     // };
//         chart.render();
    
//     };

// }

// useCity("san diego");