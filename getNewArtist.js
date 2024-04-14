const axios = require('axios');
const Artista = require('./models/Artista');
const { getArtists } = require('./bd/bd');

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
    let existe = false;

    const responseArtists = await getArtists()
    const allArtists = responseArtists.recordset
    for (const key in allArtists) {
        let element = allArtists[key];
        if (element.Nombre == artist.name) {
            existe = true
        }
    }
    if(!existe) {
        if (artist.images[0] == null) {
            return new Artista(artist.id, artist.name, artist.followers.total, '/img/Imagenes-Artistas/sin_imagen.jpg');
        }
        return new Artista(artist.id, artist.name, artist.followers.total, artist.images[0].url);
    }
    else{
        return null
    }
}

module.exports = {getNewArtist}