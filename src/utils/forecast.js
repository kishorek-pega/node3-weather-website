const request = require('postman-request')


const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a7ff0de33b0b8783daad6836d49054e7&query=' + longitude + ',' + latitude 

    request({url ,json : true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to the server!',undefined)
        }else if (body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' out.  The humidity is ' + body.current.humidity + '% out.'
            )
        }
        
    })
}


module.exports = forecast