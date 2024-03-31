const sql = require("mssql/msnodesqlv8");

async function saveSong(song, album_id) {
    try {
        query = await sql.query`INSERT INTO Canciones (Nombre, Duracion, IndiceAlbum, ID_Album) VALUES (${song.Nombre}, ${song.Duracion}, ${song.IndiceAlbum}, ${album_id});`;
        console.log('Cancion guardada correctamente');
        return

    } catch (err) {
        console.error(err)
    }
}

module.exports = {saveSong}