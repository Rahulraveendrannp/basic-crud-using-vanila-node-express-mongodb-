const qs = require('querystring');

function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                const data=qs.parse(body)
                resolve(data);
            });
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = { getReqData };