
const weatherform = document.querySelector('form')
const search      = document.querySelector('input')
const messageOne  = document.querySelector('#message-1')
const messageTwo  = document.querySelector('#message-2')
//messageOne.textContent='bgsggj'
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()//prevent refresh
    const address = search.value
    console.log(address)
    messageOne.textContent = "Loading........"
    messageTwo.textContent=""//for cleaning previous data
    fetch('/weather?address=' + address).then((response) => {//time taking process//lat (3) change for deployment

        response.json().then((data) => {
            messageOne.textContent=""
            if (data.error) {
                //console.log(data.error)
                messageTwo.textContent=data.error
            } else {
                
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
                
            }

        })
    })
})

