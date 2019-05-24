const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body');
const log4js = require('./utils/log4js')
const convert = require('koa-convert')
const static = require('koa-static')
const path = require('path')

const index = require('./routes/index')
const users = require('./routes/users')
// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['text', 'form','json'],
//   jsonLimit: '5mb',// 控制body的parse转换大小 default 1mb
//   formLimit: '4096kb'  //  控制你post的大小  default 56kb
// }))
// app.use(koaBody({
//   multipart: true,
//   formidable: {
//       maxFileSize: 200*1024*1024  // 设置上传文件大小最大限制，默认2M
//   }
// }));
const staticPath = '../public/images';
app.use(convert(static(
  path.join( __dirname,  staticPath)
)))
// app.use(ctx => {
   // ctx.body = `${JSON.stringify(ctx.request.body)}`;
// });
// app.use(bodyparser())
app.use(json())
app.use(logger())
var cors = require('koa2-cors');
//允许跨域
app.use(cors());
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  // log4js.errLogger(ctx, err)
});

module.exports = app
