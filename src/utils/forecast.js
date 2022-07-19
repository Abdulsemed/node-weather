const request = require("postman-request");
const forecast=(latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a043779da0be604f35764874a18f7d2e&query='+latitude+','+longitude;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to weather service",undefined);
        }else if(body.error){
            callback("invalid lattiude and or longitude",undefined)
        }else{
            value=body.current;
            callback(undefined,value.weather_descriptions[0]+" .the current temprature is "+value.temperature+" but it feels like "+ value.feelslike)
        }
    });
}

module.exports=forecast;