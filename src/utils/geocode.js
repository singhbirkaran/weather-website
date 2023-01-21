
const request=require('request')

const geocode= (address,callback) => {
    const url=`http://api.positionstack.com/v1/forward?access_key=9073223cbcf9e3f17c5f2abdc547af9b&query=${address}&limit=1`;

    request({url:url,json:true},(error,response) => {
        if(error){
            callback('Check your network connection')
        }
        
        else if(response.body.error){
            console.log(response.body)
            callback('Try another Search Term')
        }
        else if(response.body.data.length===0){
            callback('Invalid address or pincode')
        }
        else{
            callback(undefined,{
                location: response.body.data[0].label,
               latitude: response.body.data[0].latitude,
               longitude: response.body.data[0].longitude})
        }
    })

}

module.exports=geocode