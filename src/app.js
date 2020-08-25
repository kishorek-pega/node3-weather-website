const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDiretoryPath = path.join(__dirname, '../public')
const Viewspath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

//Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views',Viewspath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDiretoryPath))

app.get('' , (req ,res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Kishore'
    })
})

app.get('/about', (req , res) => {
    res.render('about',{
        title: 'About me',
        name : 'Kishore Kumar'
    })
})

app.get('/help' ,(req , res) => {
    res.render('help' ,{
        helptext:'Need Help ???',
        title: 'Need help',
        name: 'Kishore Kumar'
    })
})

app.get('/weather' , (req , res) => {
    if(!req.query.address){
        return res.send({
            error:'Provide an address'
        })
    }

    geocode(req.query.address , (error , { latitude ,longitude ,location } = {} )=> {
       if(error) {
           return res.send({error})
       } 
        forecast(latitude,longitude,(error ,forecastData) =>{
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
                })
        })
    
    
    })
})

app.get('/products', (req ,res) => {
    if(!req.query.search) {
        return res.send({
            error:'You must provide a serch term'
        })

    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=> {
    res.render('404' ,{
         title:'404',
        name: 'Kishore ',
        error:'Help article not found'
    })

})


app.get('*',(req ,res) => {
     res.render('404' ,{
         title:404,
         name:'Kishore Kumar',
         error:'Page not found'
     })
})

app.listen(port,() => {
    console.log("Server has started on port" + port)
})