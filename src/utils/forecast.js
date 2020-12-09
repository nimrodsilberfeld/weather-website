const axios = require('axios')

const forecast = async (longtitude, latitude) => {
    const url = `http://api.weatherstack.com/current?access_key=942f30f23450717f41c26498213ca815&query=${longtitude},${latitude}`
    try {
        const result = await axios.get(url)
        if (result.data.current) {
            return data = {
                nameOfPlace: result.data.location.name,
                country: result.data.location.country,
                currentTemp: "temp is " + result.data.current.temperature + "C but it fills like " + result.data.current.feelslike + "C",

            }

        }
        else if (result.data.error) {
            throw "Unable to find Location"
        }
    }
    catch (err) {
        throw err
    }
}
module.exports = forecast
