const request=require('request')

const forecast = (loc,callback) =>{
    const url=`http://api.weatherstack.com/current?access_key=67c7fc2390fd67658d93518e2529955d&query=${loc.latitude},${loc.longitude}`
    request({url:url,json:true},(error,response) => {
        if (error){
            callback('No network connection')
        }
        else if(response.body.error){
            callback('Weather not available for selected location. Check your location input.')
        }
        else{
            callback(undefined,{"temp":response.body.current.temperature,
                        "desc":response.body.current.weather_descriptions,
                        "precip":response.body.current.precip,
                        "time": response.body.location.localtime ,
                        "icon":response.body.current.weather_icons  })
        }
    })

}

module.exports=forecast