const router = require('koa-router')();
const initData = require("../utils/req");
const {query} = require('../utils/query');
const {LOGIN, REGISTER, CHECKUSER, USERINFO_TABLE,CREATSERINFO} = require("../utils/sql");
const log4js = require('../utils/log4js');

const koaBody = require('koa-body')();
router.prefix('/users');

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
});

router.post('/bar', async (ctx, next) => {
    console.log('tag', ctx.request.body);
    ctx.body = 'this is a users/bar response'
});


router.post('/login', koaBody, async (ctx, next) => {
    const start = new Date();
    const {account = "", password = ""} = ctx.request.body || {};
    if (ctx.session["is_login"]) {
        ctx.session.count = ctx.session.count + 1;
        ctx.body = initData({code: "10008", "message": "该账号已经登陆"});
        return
    }
    if (account) {
        const UserCheck = await query(CHECKUSER(account, password));
        if (UserCheck.length <= 0) {
            ctx.body = initData({code: "10000", "message": "账号不存在"})
        } else {
            const data = await query(LOGIN({account, password}));
            if (data.length <= 0) {
                ctx.body = initData({code: "10001", data, "message": "密码错误"})
            } else {
                const userId = JSON.parse(JSON.stringify(data[0]))["customer_id"];
                ctx.session = {
                    user_id: userId,
                    count: 0,
                    is_login: true,
                };
                ctx.body = initData({data})
            }
        }

    } else {
        ctx.body = initData({code: "10000", "message": "账号密码不能为空"})
    };
    const ms = new Date() - start;
    log4js.resLogger(ctx, ms)
});

router.post('/register', koaBody, async (ctx, next) => {
    const {account = "", password = "", username = "", userurl = "",birthday="",userstats=1,phone="",email="",gender="",register="",level="",money="",stats=0} = ctx.request.body||{};
    const UserCheck = await query(CHECKUSER(account, password));
    if (UserCheck.length > 0) {
        ctx.body = initData({code: "10003", "message": "当前账户已存在"})
    } else {
        const data = await query(REGISTER({account, password, username, userurl,birthday,userstats,phone,email,gender,register,level,money,stats}));
        if (!!data) {
            const id=data.insertId;
           await query(CREATSERINFO({id,account, password, username, userurl,birthday,userstats,phone,email,gender,register,level,money}));
            ctx.body = initData({"message": "注册成功"})
        } else {
            ctx.body = initData({data})
        }
    }
});

router.post("/quit", koaBody, async (ctx, next) => {
    const {id = ""} = ctx.request.body || {};
    if (id) {
        ctx.session = null;

        ctx.body = initData({"message": "退出登陆成功"});
    } else {
        ctx.body = initData({code: "10006", "message": "退出登陆失败"});
    }

});


router.post('/userinfo', koaBody, async (ctx, next) => {
    const {id = ""} = ctx.request.body || {};
    if (id) {
        const UserInfo = await query(USERINFO_TABLE(id));
        if (UserInfo.length > 0) {
            const data = JSON.parse(JSON.stringify(UserInfo[0]));
            ctx.body = initData({data})
        } else {
            ctx.body = initData({code: "10003", data, "message": "没有该登录人信息"})
        }
    } else {
        ctx.body = initData({code: "10004", "message": "id不能为空"})
    }
});


// 处理未匹配到的路由
// 默认提示信息
const tips = {code:"404",message:"接口地址不存在"};
router.get('/*', ctx => {
    ctx.body = tips
});
router.post('/*', ctx => {
    ctx.body = tips
});
module.exports = router;
