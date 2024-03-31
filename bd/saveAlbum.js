const sql = require("mssql/msnodesqlv8");

async function saveAlbum(album) {
    try {
        query = await sql.query`INSERT INTO Albumes (Nombre, FechaLanzamiento, TotalCanciones, FotoPortada, ID_Artista, ID_Spotify) VALUES (${album.Nombre}, ${album.FechaLanzamiento}, ${album.TotalCanciones}, ${album.FotoPortada}, ${album.ID_Artista}, ${album.ID_Spotify}); SELECT SCOPE_IDENTITY() AS id;`;
        console.log('Album guardado correctamente');
        return query.recordset[0].id
    } catch (err) {
        console.error(err)
    }
}

module.exports = {saveAlbum}