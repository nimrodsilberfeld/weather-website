const axios = require('axios');


const geoCode = async (address) => {
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoibmltcm9kLXNpbGJlZmVsZCIsImEiOiJja2k3bzNiYWExNXZmMnVtaGhocXVobmwyIn0.A5GmVL7TI1yU4MaFflh01Q&limit=1`
    try {
        const dataUrl = await axios.get(mapBoxUrl)
        if (dataUrl.data.features.length === 0) {
            throw ("Place not found")
        }
        else {
            return geoCodeData = {
                longtitude: dataUrl.data.features[0].center[0],
                latitude: dataUrl.data.features[0].center[1],
                nameOfPlace: dataUrl.data.features[0].place_name
            }
        }
    } catch (err) {
        throw err
    }
}


module.exports = geoCode