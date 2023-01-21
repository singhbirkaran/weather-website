const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/weather')

const app = express()
const port=process.env.PORT || 3000

//setting paths
const dirpath= path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(dirpath))

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Birkaran'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        message:'Hello you can reach me on birkaransingh7@gmail.com',
        name:'Birkaran'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name:'Birkaran'
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address){
        return res.send({
            error:'Error, please provide valid address'
        })
    }
    geocode(req.query.address,(error,data={}) => {
    
        if (error){
            return res.send({error})
        }
        else{
            
            forecast(data,(error,{temp,desc,precip,time,icon}) =>{
                if (error){
                    return res.send({error})
                }
                else{
                    //console.log(`Temperature in ${data.location} is`,weather_data, `degrees`)
                    res.send({
                        forecast:'Temperature is '+temp+ ' degrees. It is '+desc+ ' here. There is '+precip+ '% chance of rain.',
                        time,
                        location:data.location,
                        address:req.query.address,
                        icon
                    })
                }
            })
        }
    })
    
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        error:'Help article not found',
        title:'404',
        name:'Birkaran'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        error:'Page not found',
        title:'404',
        name:'Birkaran'
    })
})


app.listen(port, () => {
    console.log('Server is up on '+port)
})