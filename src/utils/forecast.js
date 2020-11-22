const request = require("request");


const forecast =(address,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=5e67b7916725099355a56a45eff88b09&query="+address;
    request({url,json:true},(error,{body})=>{
        if(error){
            //console.log("Unable to connect to network!")
            callback("Unable to connect to network!")
        }
        else if(body.error){
           // console.log("wrong location entered!")
            callback("wrong location entered!")
        }else{
           callback(undefined,
            {location:body.location.name+","+body.location.region,
            forecastData:body.current.weather_descriptions+"!"+"\n"+ "It is currently "+body.current.temperature +" degrees out."+ " It feels like "+ body.current.feelslike +" degrees out"+" \n Humidity:"+body.current.humidity+"%."})
        }
    })
}

module.exports=forecast;