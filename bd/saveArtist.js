const sql = require("mssql/msnodesqlv8");

async function saveArtist(artist) {
    try {
        query = await sql.query`INSERT INTO Artistas (ID_Spotify, Nombre, Seguidores, FotoPerfil) VALUES (${artist.ID_Spotify}, ${artist.Nombre}, ${artist.Seguidores}, ${artist.FotoPerfil}); SELECT SCOPE_IDENTITY() AS id;`; 
        console.log('Artista guardado correctamente');
        return query.recordset[0].id
    } catch (err) {
        console.error(err)
        return null
    }
}

module.exports = {saveArtist}