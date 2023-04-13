import axios from 'axios';
import HttpsProxyAgent from "https-proxy-agent";
import SocksProxyAgent  from 'socks-proxy-agent'

// axios({
//     method: 'post',
//     timeout:0,
//     url: 'https://api.openai.com/v1/chat/completions',
//     contentType: 'application/json',
//     headers: {
//         Authorization: 'Bearer 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',
//     },
//     data: {
//         "model": "gpt-3.5-turbo",
//         "messages": [{ "role": "user", "content": "Hello!" }]
//     }
// }).then(function (response) {
//     console.log(response)
// }).catch(err => {
//     console.log(err)
// });


const httpsAgent = new HttpsProxyAgent(`http://64.225.8.82:9984`);
const instance = axios.create({
    proxy: false,
    httpsAgent
})
instance('https://api.openai.com/v1/chat/completions', {
    method: 'post',
    timeout: 0,
    contentType: 'application/json',
    headers: {
        Authorization: 'Bearer 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',
    },
    data: {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": "写一段可以登陆的js代码" }]
    }
})
    .then(function (res) {
        console.log(res.data.choices);
    }).catch(r => {
        console.log(r)
    })
