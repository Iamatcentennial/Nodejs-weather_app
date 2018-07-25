const request = require('request');

var geoAddress = (argvAddress, callback)=>{

    var encodedAddress = encodeURIComponent(argvAddress);
    console.log(encodedAddress);
    
    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true},
        (error, response, body)=>{
        // console.log(response);
        if(error){
            callback('Unable to connect to server');
        }
        else if(body.status == 'ZERO_RESULTS'){
            callback('No such address exists');
        }
        
       
        else if (body.status=='OK') {
            callback(undefined,{
                address:body.results[0].formatted_address,
                latitude:body.results[0].geometry.location.lat,
                longitude:body.results[0].geometry.location.lng 
            });
        }
        else{
            callback('Some other technical problem');
        }
       
    });
};

module.exports = {
    geoAddress
}

