const weatherForm = document.querySelector('form')
const weatherInput = document.getElementById('inputForm')
const country = document.getElementById('country')
const temp = document.getElementById('temp')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    country.innerHTML = "Loading.."
    temp.innerHTML = ""
    fetch(`/weather?address=${weatherInput.value}`).then((response) => {
        response.json().then((data) => {
            if (data.messege) {
                console.log("error: " + data.messege)
                country.innerHTML = data.messege + ",Try search again"
                temp.innerHTML = ""
            } else {
                console.log(data)
                country.innerHTML = data.nameOfPlace + " " + data.country
                temp.innerHTML = data.currentTemp
            }
        })
    })
})