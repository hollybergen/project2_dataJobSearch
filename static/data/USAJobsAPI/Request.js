var request = require('request');  

var host = 'data.usajobs.gov';  
var userAgent = 'hollyjbergen@gmail.com';  
var authKey = 'rRbyMxllLHlvw7HdmO5CXsjq+mxrHUgkGkz4EFmd1iQ=';    

const callExternalApiUsingRequest = (callback) => {
    request({      
        // url: 'https://data.usajobs.gov/api/search?Keyword=Computer;Scientist',  
        url: 'https://data.usajobs.gov/api/codelist/occupationalseries',  // Get list of job codes for categories
        method: 'GET',      
        headers: {          
            "Host": host,          
            "User-Agent": userAgent,          
            "Authorization-Key": authKey      
        }  
    }, function(error, response, body) {      
        var data = JSON.parse(body);  
    
        if (error) { 
            return callback(error);
         }
        return callback(data);
        
    });

};

module.exports.callApi = callExternalApiUsingRequest;