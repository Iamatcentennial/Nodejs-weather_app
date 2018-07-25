// Make an http request, fetch the data
// collect the required properties and store them as object
// return the object using promise
// display the properties in then function of promise

const request = require('request');

var geoData = (address)=>{

    return new Promise((resolve, reject)=>{
        request({url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
        json: true

        },(error, response, body)=>{
            if(error){
                reject('Could not connect to server');
            }
            else if (body.status == 'ZERO RESULTS'){
                reject('No such address exists');
            }
            else if(body.status == 'OK'){
                var location;
                resolve(location = {
                    latitude:body.results[0].geometry.location.lat,
                    longitude:body.results[0].geometry.location.lng 

                });
            }
            else{
                reject('Data could not be fetched');
            }
        });
    });
};

geoData('131402').then((location)=>{
    console.log(JSON.stringify(location, undefined,2));

},(errorMessage)=>{
    console.log(errorMessage);
});