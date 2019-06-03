// state_test = "washington"

// useState(state_test);

function useState(state) {
    d3.json(stateInfo, function makeChart(data) {
        // window.onload = function(){
            console.log(data.filter(el => Object.keys(el) == state));
            
            var state_name = data.filter(el => Object.keys(el) == state)[0][state];

            var img_url = state_name["Image URL"];
            console.log(typeof(img_url));

            
            // Check if image already exists and clear if so
            var div = document.getElementsByClassName("ImageContainer")[0];
            while(div.firstChild)
                div.removeChild(div.firstChild);

            // Update state name to Title Case
            var properState = state.split(' ')
            .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
            .join(' ')

            // Update image container based on state selected
            console.log(document.getElementsByClassName("ImageContainer")[0]); 
            var x = document.getElementsByClassName("ImageContainer")[0];
            x.style = "background-image: url("+img_url+");  background-size: 100% 100%";
            
            // Update State Info within image div

            var second = document.createElement("H1");
            var text2 = document.createTextNode('Overall State Rank: ' + state_name["Overall Rating"]);
            second.appendChild(text2);
            document.getElementsByClassName("ImageContainer")[0].appendChild(second);
        

            // Create Table

            const object = state_name["Stats Dictionary"];
            for (const [key, value] of Object.entries(object)) {
              console.log("Key" + key + "Value" + value);
            }

            function tableCreate() {
                var body = document.getElementsByClassName("ImageContainer")[0];
                var tbl = document.createElement('table');
                tbl.style.fontSize = '20px';
                tbl.style.color = 'black';
                tbl.style.width = '100%';
                tbl.style.backgroundColor = 'white';
                tbl.style.opacity = '.8';
                tbl.setAttribute('border', '2');
                var tbdy = document.createElement('tbody');                
                for (const [key, value] of Object.entries(object)) {
                  var tr = document.createElement('tr');
                      var td = document.createElement('td');
                      td.appendChild(document.createTextNode(key + " : " + value));
                      td.setAttribute('rowSpan', '1');
                      tr.appendChild(td)
                  tbdy.appendChild(tr);
                };
                tbl.appendChild(tbdy);
                body.appendChild(tbl)
              }
              tableCreate();


            
            // Create Ranking Chart
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
        // };
            chart.render();
        
        });
    
}