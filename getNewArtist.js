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

    const responseArtists = await getArtists()
    const allArtists = responseArtists.recordset
    const artistExists = allArtists.some(element => element.Nombre == artist.name);

    if(!artistExists) {
        const { id, name, followers: { total }, images } = artist;
        const imageUrl = images[0] ? images[0].url : '/img/Imagenes-Artistas/sin_imagen.jpg';
        return new Artista(id, name, total, imageUrl);
    }
    return null;
}

module.exports = {getNewArtist}