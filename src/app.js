const express = require('express') //importing
const path= require('path')

const app = express() //loading app framework
const port = process.env.PORT || 3000//loading environment variable for Heroku 
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
//set up directory path foe Express config
const path_html = path.join(__dirname, '../public')
const view_path= path.join(__dirname,'../templates/views')
const partial_path=path.join(__dirname,'../templates/partials')

// express static directory config + handalbar dir config+hande bar engine setup
app.set('views', view_path)
app.set('view engine', 'hbs')// setup  express view engine for dynamic content
app.use(express.static(path_html))//1
//set up static directory to serve....
hbs.registerPartials(partial_path)//here it will allow program to look into this directory for partials


//route calls

app.get('',(req,res)=>{//2
    res.render('index',{
        title:'Weather',
        name:'Md Anas'
    })
})

app.get('/about',(req,res)=>{//3
    res.render('about',{
        title:"About Me",
        name:"Md Anas"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Md Anas'
    })
})

app.get('/weather',(req,res)=>{
     const address=req.query.address
    if (!address) {
        return res.send({
            error:"please provide an address"
        })
        
    }
    geocode(address, (error, {lat,long ,location}={}) => {
        if (error) {
            return res.send(error)
        }

        forecast(lat, long, (error, forecastdata) => {
            if (error)
                return res.send( error) //callback chaining......
           
            res.send({
                location,
                forecast:forecastdata,
                Search_address:address
            })
        })


    })
   
})

app.get('/help/*', (req, res) => {
    res.render('error', {
            body: 'Help article not found',
            name: 'Md Anas',
            title:'ERRoR'
    })
})
app.get('/response',(req,res)=>{
    if(!req.query.search){
      return  res.send({
            error:"No search term was provided"
        })
    }
    console.log(req.query.ratings)
    res.send({
        products:['ssg','gRgg','hrh','hrh']
    })
})

app.get('*',(req,res)=>{//last if match not found
    res.render('error',{
        body:'page not found',
        name:'Md Anas',
        title: 'ERRoR'
    })
})

app.listen(port, () => {//staring the express server...
        console.log("Hello ! server is up and running on port "+port)
    }) //local development port


    