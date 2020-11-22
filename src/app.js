const express = require("express");
const path =require("path");
const hbs = require("hbs")
const forecast =require("./utils/forecast.js")
const request = require("request")

const app =express();
//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,"../public")
const viewsPath =path.join(__dirname,"../templates/views")
const partialsPath =path.join(__dirname,"../templates/partials")

//setur handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Shubh Aggarwal'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        
        title:'About me',
        name:  'Shubh Aggarwal'

    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
      title:"Help",
      helpText:'helpful text',
      name:"shubh aggarwal"
    })
})




app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:'You must provide an address'
        })
    }
    forecast(req.query.address,(error,{location,forecastData}={})=>{
        if(error){
           return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        });
    })
    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
      title:"404",
      errorMessage:"Help article not found",
      name:"shubh aggarwal"
    })
})

app.get('*',(req,res)=>{
        res.render('404',{
        title:"404",
        errorMessage:"Page does not exist",
        name:"shubh aggarwal"
        })
     })
app.listen(3000,()=>{
    console.log("server is up on port 3000");
})