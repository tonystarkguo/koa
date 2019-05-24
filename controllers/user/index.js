
const { query } = require('../../utils/query');
const { LOGIN, CHECKUSER } = require("../../utils/sql")
const initData = require("../../utils/req")
class UserController {
    // 用户登录
    async login(ctx, next) {
        ctx.set("Content-Type", "application/json")
        /**
         * 获取请求提交的数据
         * @param  {string}  account 账号
         * @param  {string}  password 密码
         * @return {string}          
         */

        const { account = "", password = "" } = body;
        if (account && password) {
            const UserCheck = await query(CHECKUSER(account, password));
            if (UserCheck.length <= 0) {
                ctx.body = initData({ code: "10001", "message": "账号不存在" })
            } else {
                const data = await query(LOGIN({ account, password }));
                if (data.length <= 0) {
                    ctx.body = initData({ code: "10002", data, "message": "密码错误" })
                } else {
                    ctx.body = initData({ data })
                }
            }
        } else {
            ctx.body = {
                code: 1000,
                message: "账号或密码不能为空"
            }
        }



    }

    // 更新用户的登录信息
    async userInfo(ctx, next) {
       
    }

     
}

module.exports = new UserController();