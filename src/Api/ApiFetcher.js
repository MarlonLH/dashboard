export const FetchData = (url) => {
    const simpleFetch = require('simple-fetch');
    return new Promise((resolve, reject) => {
        simpleFetch.getJson(url)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err);
        });
    });
}