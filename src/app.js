const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/weather')

const app = express()

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
            
            forecast(data,(error,weather_data) =>{
                if (error){
                    return res.send({error})
                }
                else{
                    //console.log(`Temperature in ${data.location} is`,weather_data, `degrees`)
                    res.send({
                        forecast:weather_data,
                        location:data.location,
                        address:req.query.address
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


app.listen(3000, () => {
    console.log('Server is up on 3000')
})