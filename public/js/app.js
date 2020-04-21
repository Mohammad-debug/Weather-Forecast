
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
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {//tiime taking process
       
        response.json().then((data) => {
            messageOne.textContent=""
            if (data.error) {
                //console.log(data.error)
                messageTwo.textContent=data.error
            } else {
                // var text="";
                // Object.keys(data).forEach(element => {
                //     text +="  > "+ element + " :--  "  + data[element] 
                //      messageTwo.textContent=text;
                // },
                // );
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }

        })
    })
})

