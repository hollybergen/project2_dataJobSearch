// To use, must download node.js @ https://nodejs.org/en/
// In command prompt of directory, must run > npm install request
// Then in directory, run > node app.js

var request = require('request'); 

const apiCallFromRequest = require('./Request')
const apiCallFromNode = require('./NodeJsCall')

const http = require('http')

http.createServer((req, res) => {
        if(req.url === "/request"){
            apiCallFromRequest.callApi(function(response){
                //console.log(JSON.stringify(response));
                res.write(JSON.stringify(response));
                res.end();
            });
        }
        else if(req.url === "/node"){
            apiCallFromNode.callApi(function(response){
                res.write(response);
                res.end();
            });
        }
        
        // res.end();
}).listen(3000);

console.log("service running on 3000 port....");


// var request = require('request');  

// var host = 'data.usajobs.gov';  
// var userAgent = 'hollyjbergen@gmail.com';  
// var authKey = 'rRbyMxllLHlvw7HdmO5CXsjq+mxrHUgkGkz4EFmd1iQ=';    

// request({      
//     url: 'https://data.usajobs.gov/api/search?JobCategoryCode=2210',      
//     method: 'GET',      
//     headers: {          
//         "Host": host,          
//         "User-Agent": userAgent,          
//         "Authorization-Key": authKey      
//     }  
// }, function(error, response, body) {      
//     var data = JSON.parse(body);  

//     console.log(data);
// });


// NO ERROR, but doesn't return response or myJson
// var userAction = async () => {
//     var response = await fetch('https://data.usajobs.gov/api/search?JobCategoryCode=2210', {
//       method: 'GET',
//       //body: myBody, // string or object
//       headers:{
//         "Host": host,          
//         "User-Agent": userAgent,          
//         "Authorization-Key": authKey
//     }   
//     });
//     var myJson = await response.json(); //extract JSON from the http response
//     // do something with myJson

//     console.log(response);
// }