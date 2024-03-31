const axios = require('axios');
const Album = require('./models/Album');

async function getAlbums(artistSPID, artistID, token) {
    const requestString = `https://api.spotify.com/v1/artists/${artistSPID}/albums`;
    var options = {
        method: 'GET',
        url: requestString,
        params : { include_groups: 'album', limit: 50 },
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const response = await axios.request(options);
    const albums = response.data.items.map(album => {
        return new Album(album.name, album.release_date, album.total_tracks, album.images[0].url, artistID, album.id)
    })
    return albums;
}

module.exports = {getAlbums}