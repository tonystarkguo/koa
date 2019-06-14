var http = require("http");
const gehito=function(header){
    return new Promise(function(resolve,reject){
        let key="free";
        var opt = {
            host:'open.iciba.com',
            port:'80',
            method:'GET',
            path:'/dsapi/',
            headers:{
                "Content-Type": 'application/json',
            },
            body:{
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
    gehito
};
