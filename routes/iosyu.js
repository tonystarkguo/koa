const router = require('koa-router')()
const initData=require("../utils/req")
const log4js = require('../utils/log4js');
const {getRequest}=require("../utils/requestOther")
router.prefix('/iosyu')
let  baseUrl='https://api.isoyu.com';
router.get('/', function (ctx, next) {
    httpRequest(ctx)
    ctx.body = 'this is a users response!'
});
//获取天气
router.get('/api/Weather/get_weather',async  (ctx, next)=> {
    const start = new Date()
   let enddata= await getRequest(ctx,baseUrl).then(body =>{
        ctx.body = body;
    }).catch(error=>{
        ctx.body = {code:1000,msg:"接口调用失败"}
    });
    const ms = new Date() - start;
    log4js.resLogger(ctx, ms)
});

//获取知乎日报
router.get('/api/Zhihu/zhihu_daily',async  (ctx, next)=> {
    const start = new Date()
    let enddata= await getRequest(ctx,baseUrl).then(body =>{
        ctx.body = body;
    }).catch(error=>{
        ctx.body = {code:1000,msg:"接口调用失败"}
    });
    const ms = new Date() - start;
    log4js.resLogger(ctx, ms)
});

//获取知乎日报-详情
router.get('/api/Zhihu/news',async  (ctx, next)=> {
    const start = new Date()
    let enddata= await getRequest(ctx,baseUrl).then(body =>{
        ctx.body = body;
    }).catch(error=>{
        ctx.body = {code:1000,msg:"接口调用失败"}
    });
    const ms = new Date() - start;
    log4js.resLogger(ctx, ms)
});

module.exports = router;
