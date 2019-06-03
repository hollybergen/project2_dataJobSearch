// state_test = "washington"

// useState(state_test);

function useState(state) {
    d3.json(stateInfo, function makeChart(data) {

            console.log(data.filter(el => Object.keys(el) == state));
            
            var state_name = data.filter(el => Object.keys(el) == state)[0][state];

            var img_url = state_name["Image URL"];
            console.log(typeof(img_url));

            var div = document.getElementsByClassName("ImageContainer")[0];

            while(div.firstChild)
                div.removeChild(div.firstChild);

            // if (document.getElementById("ImageContainer") != null) {
            // document.getElementById("ImageContainer").innerHTML = "";
            // console.log("PICTURE IS NULL");
            // }
           
            // Update image container based on state selected
            var image = new Image();
            //image.src = img_url;
            // var url_str = "background-image: url("+img_url+");";
            // console.log(url_str)
            console.log(document.getElementsByClassName("ImageContainer"))
            var x = document.getElementsByClassName("ImageContainer")[0]
            x.style = "background-image: url("+img_url+");  background-size: 100% 100%"
            
            console.log(x.getElementsByClassName("stateRank"))
            //x.getElementsByClassName("stateRank").style.backgroundColor = "red";

            // var first = document.createElement("H1");
            // var text = document.createTextNode("Jason is pretty awesome");
            // first.appendChild(text);

            // x.getElementsByClassName("stateRank")[0].appendChild(first);

            //console.log(document.getElementById("stateRank"));
            //.appendChild(first);

            //var first = document.createElement("H1");
            // document.getElementsByClassName("stateRank").appendChild()
            // first.appendChild(first);
            //document.querySelector("stateRank").appendChild(first);
          
                
            
            var properState = state.split(' ')
                .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
                .join(' ')

            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                
                title:{
                    text:"State Ranking Scores for " + properState
                },
                axisX:{
                    interval: 1
                },
                axisY2:{
                    interlacedColor: "#f7f7f7",
                    gridColor: "rgba(1,77,101,.1)",
                    // title: "Percentage Rank for " + properState
                },
                data: [{
                    type: "bar",
                    name: "companies",
                    axisYType: "secondary",
                    dataPoints: [
                        { y: (1 - (state_name["Rank Dictionary"][0].Value)/50)*100, label: "Education", toolTipContent: "Education Rank: " + state_name["Rank Dictionary"][0].Rank, color: "#0d377c"},
                        { y: (1 - (state_name["Rank Dictionary"][1].Value)/50)*100, label: "Economy", toolTipContent: "Economy Rank: " + state_name["Rank Dictionary"][1].Rank, color: "#144ead" },
                        { y: (1 - (state_name["Rank Dictionary"][2].Value)/50)*100, label: "Infrastructure", toolTipContent: "Infrastructure Rank " + state_name["Rank Dictionary"][2].Rank, color: "#1a62d8" },
                        { y: (1 - (state_name["Rank Dictionary"][3].Value)/50)*100, label: "Opportunity", toolTipContent: "Opportunity Rank " + state_name["Rank Dictionary"][3].Rank, color: "#4a89ef"},
                        { y: (1 - (state_name["Rank Dictionary"][4].Value)/50)*100, label: "Fiscal Stability", toolTipContent: "Fiscal Stability Rank " + state_name["Rank Dictionary"][4].Rank, color: "#7cacf9"},
                        { y: (1 - (state_name["Rank Dictionary"][5].Value)/50)*100, label: "Crime & Corrections", toolTipContent: "Crime & Corrections Rank " + state_name["Rank Dictionary"][5].Rank, color:"#b2ccf7"}
                    ]
                }]
            });

            chart.render();
        
        });
    
}