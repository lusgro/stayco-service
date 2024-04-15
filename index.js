const express = require('express');
const { getAccessToken } = require('./getAcessToken');
const { connectSql, } = require('./bd/bd');
const { getNewArtist } = require('./getNewArtist');
const { saveArtist } = require('./bd/saveArtist');
const { getAlbums } = require('./getAlbums');
const { saveAlbum } = require('./bd/saveAlbum');
const { getSongs } = require('./getSongs');
const { saveSong } = require('./bd/saveSong');

async function main() {
    const app = express();
    app.use(express.json());
    const port = 3000;
    app.listen(port, () => {
        console.log(`Servicio corriendo en el puerto ${port}`);
    });

    const token = await getAccessToken();
    console.log(token);

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).send(`Error: ${err.message}`);
    });

    app.get('/obtenerartista', async (req, res, next) => {
        const { nombre: artistName } = req.query;
        if (!artistName) {
            return next(new Error('No se ingreso un nombre de artista'));
        }
        await connectSql();
        try {
            await saveNewArtist(artistName, token);
            res.status(200).send('Artista guardado correctamente');
        } catch (err) {
            next(err);
        }
    });
}

async function saveNewArtist(artist, token) {
    const newArtist = await getNewArtist(artist, token);
    if (newArtist) {
        const artist_id_bd = await saveArtist(newArtist);

        const albums = await getAlbums(newArtist.ID_Spotify, artist_id_bd, token);
        await Promise.all(albums.map(async (album) => {
            const album_id_bd = await saveAlbum(album);
            const songs = await getSongs(album.ID_Spotify, album_id_bd, token);
            await Promise.all(songs.map((song) => saveSong(song, album_id_bd)));
        }));
    } else {
        console.log("Artista nulo")
    }
}

main();