const http = require('http');
const getIp = async() => {
    return new Promise((resolve, reject) => {
        http.get('http://ip.fastqiu.com', (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            let error;
            if (statusCode !== 200) {
              error = new Error('Request Failed.\n' +
                                `Status Code: ${statusCode}`);
            }
            if (error) {
              console.error(error.message);
              // consume response data to free up memory
              res.resume();
              return reject(err);
            }
          
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                resolve(rawData);
            });
          }).on('error', (e) => {
              reject(e);
            console.error(`Got error: ${e.message}`);
          });
    });
}
module.exports = getIp;

