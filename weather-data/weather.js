const request = require('request');

var weatherData = (api, latitude, longitude, callback)=> {
    request({
        url:`https://api.darksky.net/forecast/${api}/${latitude},${longitude}`,
        json: true
    },(error, response, body)=>{ 
         if(error){
            callback('Unable to connect to server');
        }
       
        else if (response.statusCode === 400) {
            callback('Bad Request');
        }
        
        else if (response.statusCode === 200) {
            callback(undefined, 
                {
                   temperature: body.currently.temperature,
                   apparentTemperature: body.currently.apparentTemperature

                });

        }
        else {
            callback('Not able to fetch weather data');
        }
    })
};

module.exports= {
    weatherData
};