const https = require('https');

// The external URL to load
const SOURCE_URL = 'https://kfdbhhyjtuygjhvj.neocities.org/xafsrqrewssxpdriot';

function fetchPage(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; SimpleFetcher/1.0)',
                'Accept': '*/*'
            }
        };

        https.get(url, options, (res) => {
            let data = [];

            res.on('data', (chunk) => data.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(data);
                resolve({
                    statusCode: res.statusCode,
                    contentType: res.headers['content-type'] || 'text/html',
                    body: buffer
                });
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = async (req, res) => {
    try {
        const result = await fetchPage(SOURCE_URL);

        res.setHeader('Content-Type', result.contentType);
        res.status(result.statusCode).send(result.body);
    } catch (error) {
        console.error('Error fetching external page:', error.message);
        res.status(500).send(`<pre>Failed to load page.\nError: ${error.message}</pre>`);
    }
};
