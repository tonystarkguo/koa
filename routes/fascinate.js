const router = require('koa-router')();
const initData = require("../utils/req");
const log4js = require('../utils/log4js');
const {gehito}=require("../controllers/Interface/hitokoto")
const koaBody = require('koa-body')();
router.prefix('/fascinate');

router.get('/', koaBody,async (ctx, next)=> {
    const start = new Date();
    let data={};
    let header=ctx.request.header;
    await gehito(header).then(function (res) {
        data= {"code":"0","message":"","data":JSON.parse(res)};
    },function (error) {
        data= {code:"9001",message:"接口调用失败",data:{}};
    });
    ctx.body =data;
    const ms = new Date() - start;
    log4js.resLogger(ctx, ms)
});

module.exports = router;
