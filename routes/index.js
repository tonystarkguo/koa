const router = require('koa-router')();
const initData = require("../utils/req");
const {query} = require('../utils/query');
const {CITY} = require("../utils/sql");
const log4js = require('../utils/log4js');
const fs = require("fs");
const koaBody = require('koa-body')();
const path = require('path');
var http = require("http");
const {uploadFile} = require('../utils/upload');

var getweather=function(){
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
            console.log("a1",backdata)
        }).on('end', function(){
            console.log("data",backdata)
        });
    }).on('error', function(e) {
        console.log("error: " + e.message);
    });
    req.end();
};

router.get('/', koaBody, async (ctx, next) => {
    // await ctx.render('index', {
    //   title: 'Hello Koa 2!'
    // });
    ctx.body = 'Hello Koa 2!'
});

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
});

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
});

router.get('/city', async (ctx, next) => {
    const start = new Date()
    const UserCheck = await query(CITY());
    ctx.body = UserCheck;
    const ms = new Date() - start
    // log4js.resLogger(ctx, ms)
});

router.post('/uploadfile', koaBody, async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    console.log(file);
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '/public/upload/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "上传成功！";
});

router.post('/uploadfiles', async (ctx, next) => {
    let result = {success: false};
    let serverFilePath = path.join(__dirname, '../public/images');

    // 上传文件事件
    result = await uploadFile(ctx, {
        fileType: 'img',
        path: serverFilePath
    });
    ctx.body = result
});

router.get('/weather',koaBody,async (ctx, next) => {
    const start = new Date();
    const weathdata=await getweather();
    console.log("123",weathdata)
    ctx.body = {};
    const ms = new Date() - start
    // log4js.resLogger(ctx, ms)
});

module.exports = router;
