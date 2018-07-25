const yargs = require('yargs');

const geodata = require('./geodata/geodata');
const weatherdata = require('./weather-data/weather');
var api = '414332042b994203e87450512b94be47';

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

// Call the geodata' geodata geoaddress with address 



var weatherInfo;
geodata.geoAddress(argv.a, 
    (errorMessage, results)=>{
        if(errorMessage){
            console.log(errorMessage);
        }
        else{
            console.log(JSON.stringify(results, undefined,2));
            var data = results;
            weatherInfo = results
            
            // Start of weather data
            weatherdata.weatherData(api,weatherInfo.latitude, weatherInfo.longitude, (errorMessage, weatherResults)=>{
                if(errorMessage){
                    console.log(errorMessage);
                }
                else{
                    //console.log(JSON.stringify(weatherResults,undefined,2));
                    console.log(`Now the temperature is:  ${weatherResults.temperature} and apparent temperature is : ${weatherResults.apparentTemperature}`);
                }
            });

            // Finish of weather data


        }

});

