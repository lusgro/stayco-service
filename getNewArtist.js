const axios = require('axios');
const Artista = require('./models/Artista');

async function getNewArtist(artistName, token) {
    const requestString = `https://api.spotify.com/v1/search`;
    var options = {
        method: 'GET',
        url: requestString,
        params : { type: 'artist', q: artistName, limit: 1 },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const response = await axios.request(options);
    const artist = response.data.artists.items[0];
    if (artist.images[0] == null) {
        return new Artista(artist.id, artist.name, artist.followers.total, '/img/Imagenes-Artistas/sin_imagen.jpg');
    }
    return new Artista(artist.id, artist.name, artist.followers.total, artist.images[0].url);
}

module.exports = {getNewArtist}