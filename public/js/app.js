const weatherform = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageT = document.querySelector('#message-t')
const icon= document.querySelector('#weather_icon')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    messageT.textContent=''
    icon.src=''
   
        fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent=data.error
            
        }
        else{
            messageOne.textContent=data.location
            messageT.textContent=data.time
            messageTwo.textContent=data.forecast
            icon.src=data.icon
        }
    })
})

})