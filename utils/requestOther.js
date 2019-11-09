const request =require("request");
//get方式请求

const getRequest=(ctx,baseUrl)=>{
    baseUrl=baseUrl+ctx.request.url.substr(6, ctx.request.url.length)
    return new Promise((resolve,reject)=>{
        request(baseUrl, function(error, response, body) {
            // console.log(response)
            if (!error && response.statusCode == 200) {
                resolve(body)
            }else{
                reject(error)
            }
        });
    })
}


//post方式请求
// var url = 'https://www.sojson.com/open/api/weather/json.shtml';
// var requestData = {
//     city: '北京'
// };
// request({
//     url: url,
//     method: 'post',
//     json: true,
//     headers: {
//         'content-type': 'application/json',
//     },
//     body: JSON.stringify(requestData)
// }, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body); // 请求成功的处理逻辑
//     }
// });


//post form方式请求
// var url = 'https://www.sojson.com/open/api/weather/json.shtml';
// request.post({
//     url: url,
//     form: {
//         city: '北京'
//     }
// }, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body);// 请求成功的处理逻辑
//     }
// });
const postRequest=(ctx)=>{
    return new Promise((resolve,reject)=>{
        baseUrl=baseUrl+ctx.request.url.substr(6, ctx.request.url.length)
    var requestData = ctx.request.body;
    request({
        url: baseUrl,
        method: 'post',
        json: true,
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(requestData)
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body); // 请求成功的处理逻辑
            resolve(body)
        }else{
            reject(error)
        }
    });
    })
}
module.exports={
    getRequest
};
