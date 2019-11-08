const router = require('koa-router')()
const initData=require("../utils/req")
const log4js = require('../utils/log4js');
const {getRequest}=require("../utils/requestOther")
router.prefix('/douba')
let  baseUrl='https://douban.uieee.com';
router.get('/', function (ctx, next) {
    ctx.body = 'this  douban !'
});
//获取天气
router.get('/v2/movie/new_movies',async  (ctx, next)=> {
    const start = new Date()
    let enddata= await getRequest(ctx,baseUrl).then(body =>{
        ctx.body = body;
    }).catch(error=>{
        ctx.body = {code:1000,msg:"接口调用失败"}
    });
    const ms = new Date() - start;
    log4js.resLogger(ctx, ms)
});

router.get('/v2/movie/in_theaters',async  (ctx, next)=> {
    const start = new Date()
    let enddata= await getRequest(ctx,baseUrl).then(body =>{
        ctx.body = body;
    }).catch(error=>{
        ctx.body = {code:1000,msg:"接口调用失败"}
    });
    const ms = new Date() - start;
    log4js.resLogger(ctx, ms)
});
router.get('/v2/movie/coming_soon',async  (ctx, next)=> {
    const start = new Date()
    let enddata= await getRequest(ctx,baseUrl).then(body =>{
        ctx.body = body;
    }).catch(error=>{
        ctx.body = {code:1000,msg:"接口调用失败"}
    });
    const ms = new Date() - start;
    log4js.resLogger(ctx, ms)
});
router.get('/v2/movie/in_theaters',async  (ctx, next)=> {
    const start = new Date()
    let enddata= await getRequest(ctx,baseUrl).then(body =>{
        ctx.body = body;
    }).catch(error=>{
        ctx.body = {code:1000,msg:"接口调用失败"}
    });
    const ms = new Date() - start;
    log4js.resLogger(ctx, ms)
});
router.get('/v2/book/search',async  (ctx, next)=> {
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
