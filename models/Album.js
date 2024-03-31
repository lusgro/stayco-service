class Album {
    constructor(Nombre, FechaLanzamiento, TotalCanciones, FotoPortada, ID_Artista, ID_Spotify) {
        this.Nombre = Nombre;
        this.FechaLanzamiento = FechaLanzamiento;
        this.TotalCanciones = TotalCanciones;
        this.FotoPortada = FotoPortada;
        this.ID_Artista = ID_Artista;
        this.ID_Spotify = ID_Spotify;
    }
}

module.exports = Album;