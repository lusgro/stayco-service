const request = require('request');

function getAccessToken() {
    const client_id = '7b5afc5ef1744921b98041719f50d5a1';
    const client_secret = 'de94ef49b7674ab59a1de9ba6db84900';
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
      };

    return new Promise((resolve, reject) => {
        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(body.access_token);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = {getAccessToken}