const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const log4js = require('./utils/log4js');
const convert = require('koa-convert');
const static = require('koa-static');
const path = require('path');
const iosyu = require('./routes/iosyu')
const douban = require('./routes/douban')
const index = require('./routes/index');
const users = require('./routes/users');
const fascinate = require('./routes/fascinate');
const session = require('koa-session-minimal');
const MysqlSession = require('koa-mysql-session');
const mysqlConfig = require("./config/mysql_config");

// error handler
onerror(app);

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
const staticPath = './public';
app.use(convert(static(
    path.join(__dirname, staticPath)
)));

// 存放sessionId的cookie配置

let timestamp = new Date().getTime();//当前的时间戳
timestamp = timestamp + 1 * 60 * 1000;
console.log(new Date(timestamp));
let cookie = {
    maxAge: 10 * 60 * 1000, // cookie有效时长
    expires: new Date(timestamp),  // cookie失效时间
    path: '/', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: false, // 是否只用于http请求中获取
    overwrite: false,  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: '',
};
// 使用session中间件
let store = new MysqlSession(mysqlConfig);
app.use(session({
    key: 'SESSION_ID',
    store: store,
    cookie: cookie
}));
// app.use(ctx => {
// ctx.body = `${JSON.stringify(ctx.request.body)}`;
// });
// app.use(bodyparser())
app.use(json());
app.use(logger());
var cors = require('koa2-cors');
//允许跨域
app.use(cors());
app.use(require('koa-static')(__dirname + '/public'));

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }));

// logger
/*不需要校验登录状态的接口*/
const noCheckUrl=["/users/login","/users/register","/weather","/fascinate"];
app.use(async (ctx, next) => {
    const start = new Date();
    /*出登陆注册外，其他接口都校验是否登陆*/
    let ishave=noCheckUrl.find((value) => {return ctx.url==value });
    if ((!ctx.session["is_login"] )&& (!ishave)) {
        ctx.session.count = ctx.session.count + 1;
        ctx.body = {"code": 500, "messages": "账号未登录"};
    } else {
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    }

});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(fascinate.routes(), fascinate.allowedMethods());
app.use(iosyu.routes(), users.allowedMethods())
app.use(douban.routes(), users.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
    log4js.errLogger(ctx, err);
    console.log("error")
});

module.exports = app;
