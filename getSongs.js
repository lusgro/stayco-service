const axios = require('axios');
const Cancion = require('./models/Cancion');

async function getSongs(albumSPID, albumID, token) {
    const requestString = `https://api.spotify.com/v1/albums/${albumSPID}/tracks`;
    var options = {
        method: 'GET',
        url: requestString,
        params : { limit: 50 },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const response = await axios.request(options);
    const songs = response.data.items.map(song => {
        return new Cancion(albumID, song.name, song.duration_ms, song.track_number)
    })
    return songs;
}

module.exports = {getSongs}