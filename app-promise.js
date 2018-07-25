// Using the yargs utility, read the command line arguments
// Fetch a promise using the axios library
// print the data in then method
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
    a:{
        describe: 'Address of the place',
        demand: true,
        string: true,
        alias:'address'
    }
})
.help()
.argv;

var address= argv.a;

var geoDataUrl =`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;

axios.get(geoDataUrl)
.then((response)=>{

            if(response.data.status == 'ZERO_RESULTS'){
                throw new Error('Unable to fine address');
            }
            else if(response.data.status ==''){

            }
            else{
                console.log('Address: ',response.data.results[0].formatted_address);
                var lat= response.data.results[0].geometry.location.lat;
                var lng = response.data.results[0].geometry.location.lat;
                var weatherUrl = `https://api.darksky.net/forecast/414332042b994203e87450512b94be47/${lat},${lng}`;
                return axios.get(weatherUrl);
            }
        })
.then((response)=>{
            console.log(`The temperature is ${response.data.currently.temperature}. but it feels like ${response.data.currently.apparentTemperature}`);
        })
.catch((e)=>{
            if(e.code === 'ENOTFOUND'){
                console.log('Could not locate the server');
            }
            else{
                console.log(e.message);
            }
        });


