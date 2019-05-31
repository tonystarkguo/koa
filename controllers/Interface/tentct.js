var http = require("http");
const getweather=function(header){
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
            opt.headers=JSON.stringify(header);
            var req = http.request(opt, function(res) {
                res.on('data',function(data){
                    backdata += data;
                }).on('end', function(){
                    resolve(backdata);
                });
            }).on('error', function(e) {
                reject(e.message)
            });
            req.end();
    });
};

module.exports={
    getweather
};
