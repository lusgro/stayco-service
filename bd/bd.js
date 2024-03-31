const sql = require("mssql/msnodesqlv8");

const sqlConfig = {
    database: 'BD_TP11',
    port: 1433,
    server: 'localhost',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
}

module.exports = {
    connectSql: async function () {
        try {
            await sql.connect(sqlConfig)
        } catch (err) {
            console.error(err)
        }
    },

    disconnectSql: async function () {
        try {
            await sql.close()
        } catch (err) {
            console.error(err)
        }
    },

    getArtists: async function () {
        try {
            const result = await sql.query`select * from Artistas`
            console.log(result.recordset);
        } catch (err) {
            console.error(err)
        }
    },
};