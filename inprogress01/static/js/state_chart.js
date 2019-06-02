state_test = "ohio"

useState(state_test);

function useState(state) {
    d3.json(stateInfo, function makeChart(data) {

            var state_name = data.filter(el => Object.keys(el) == state)[0][state];

            console.log(state_name);


            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                
                title:{
                    text:"State Ranking Scores"
                },
                axisX:{
                    interval: 1
                },
                axisY2:{
                    interlacedColor: "rgba(1,77,101,.2)",
                    gridColor: "rgba(1,77,101,.1)",
                    title: "Percentage"
                },
                data: [{
                    type: "bar",
                    name: "companies",
                    axisYType: "secondary",
                    color: "#014D65",
                    dataPoints: [
                        { y: state_name["Rank Dictionary"][0].Percentage, label: "Education" },
                        { y: state_name["Rank Dictionary"][1].Percentage , label: "Economy" },
                        { y: state_name["Rank Dictionary"][2].Percentage, label: "Infrastructure" },
                        { y: state_name["Rank Dictionary"][3].Percentage , label: "Opportunity" },
                        { y: state_name["Rank Dictionary"][4].Percentage , label: "Fiscal Stability" },
                        { y: state_name["Rank Dictionary"][5].Percentage , label: "Crime & Corrections"}
                    ]
                }]
            });

            chart.render();
        
        });
    
}