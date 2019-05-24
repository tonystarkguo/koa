const router = require('koa-router')()
const initData=require("../utils/req")
const {query}=require('../utils/query');
const {LOGIN,register,CHECKUSER,USERINFO_TABLE}=require("../utils/sql")
const log4js = require('../utils/log4js')

const koaBody = require('koa-body')();
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/bar',async (ctx, next)=>{
  console.log('tag', ctx.request.body)
  ctx.body = 'this is a users/bar response'
})



router.post('/login',koaBody,async (ctx, next) => {
  const start = new Date();
  ctx.cookies.set('cid',
  'hello world',
  {
    domain: 'localhost',  // 写cookie所在的域名
    path: '/',       // 写cookie所在的路径
    maxAge: 10 * 60 * 1000, // cookie有效时长
    expires: new Date('2019-08-15'),  // cookie失效时间
    httpOnly: false,  // 是否只用于http请求中获取
    overwrite: false  // 是否允许重写
  });
// ctx.set("Content-Type", "application/json")
  const {account="",password=""}=ctx.request.body||{};
  if(account){
    const UserCheck=await query(CHECKUSER(account,password));
    if(UserCheck.length<=0){
      ctx.body = initData({code:"10000","message":"账号不存在"})
    }else{
      const data=await query(LOGIN({account,password}));
      if(data.length<=0){
        ctx.body = initData({code:"10001",data,"message":"密码错误"})
      }else{
        ctx.body = initData({data})
      }
    }

  }else{
    ctx.body = initData({code:"10000","message":"账号密码不能为空"})
  }
  const ms = new Date() - start
  log4js.resLogger(ctx, ms)
})

router.post('/register',koaBody, async (ctx, next) => {
  const {account="",password="",username="",userurl=""}=ctx.request.body;
  const UserCheck=await query(CHECKUSER(account,password));
  if(UserCheck.length>0){
    ctx.body = initData({code:"10003","message":"当前账户已存在"})
  }else{
    const data=await query(register({account,password,username,userurl}));
      if(!!data){
        ctx.body = initData({"message":"注册成功"})
      }else{
        ctx.body = initData({data})
      }
  }
})

router.post('/userinfo',koaBody,async (ctx, next) =>{
  const {id=""}=ctx.request.body||{};
  if(id){
    const UserInfo=await query(USERINFO_TABLE(id));
    if(UserInfo.length>0){
      const data=JSON.parse( JSON.stringify(UserInfo[0]))
      ctx.body = initData({data})
    }else{
      ctx.body = initData({code:"10003",data,"message":"没有该登录人信息"})
    }
  }else{
    ctx.body = initData({code:"10004",data,"message":"id不能为空"})
  }
})

    module.exports = router
