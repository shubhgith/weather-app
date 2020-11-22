const request = require("request");


const forecast =(address,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=5e67b7916725099355a56a45eff88b09&query="+address;
    request({url,json:true},(error,response)=>{
        if(error){
            //console.log("Unable to connect to network!")
            callback("Unable to connect to network!")
        }
        else if(response.body.error){
           // console.log("wrong location entered!")
            callback("wrong location entered!")
        }else{
           callback(undefined,
            {location:response.body.location.name+","+response.body.location.region,
            forecastData:"It is currently "+ response.body.current.temperature +" degrees out."+ " It feels like "+ response.body.current.feelslike +" degrees out"})
        }
    })
}

module.exports=forecast;