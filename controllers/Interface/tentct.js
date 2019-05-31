var http = require("http");
const getweather=function(){
    return new Promise(function(resolve,reject){
            var opt = {
                host:'nodeapi.3g.qq.com',
                port:'80',
                method:'GET',
                path:'/nodeapi/api/weather@getWeather',
                headers:{
                    "Content-Type": 'application/json',
                }
            };
            var backdata = '';
            var req = http.request(opt, function(res) {
                console.log("response: " + res.statusCode);
                res.on('data',function(data){
                    backdata += data;
                    // resolve(backdata);
                    console.log("a1",backdata)
                }).on('end', function(){
                    console.log("data",backdata);
                    resolve(backdata);
                });
            }).on('error', function(e) {
                console.log("error: " + e.message);
                reject(e.message)
            });
            req.end();
    });
};

module.exports={
    getweather
};
