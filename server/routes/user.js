const Router = require('@koa/router');
const router = new Router();
const { userLogin, userFind, userRegister } = require('../controllers/index.js');
const jwt = require('../utils/jwt.js');

router.prefix('/user');
// 登录接口
router.post('/login', async (ctx, next) => {
    // 解析请求体重解析的参数
    // console.log(ctx.request.body);
    try {
        const { username, password } = ctx.request.body;
        // 查询数据库账号密码是否存在
        const result = await userLogin(username, password);
        // console.log(result);
        // 存在就是拥有账号
        if (result.length) {
            const data = {
                id: result[0].id,
                nickname: result[0].nickname,
                username: result[0].username,
            }
            // console.log(data);
            const token = jwt.sign(data);
            ctx.body = {
                data,
                code: 800,
                msg: '登录成功',
                token
            }
        } else {//没找到
            ctx.body = {
                code: 804,
                msg: '账号或密码错误',
                data: 'fail'
            }
        }
    } catch (error) {
        ctx.body = {
            code: 805,
            msg: '服务器异常',
            data: error
        }
    }
    // 
})
// 注册接口
router.post('/register', async (ctx, next) => {
    const { username, password, nickname } = ctx.request.body;
    if (!username || !password || !nickname) {
        ctx.body = {
            code: 801,
            msg: '账号密码或昵称不能为空',
            data: 'error',
        }
        return;
    }
    try {
        // 判断账号是否存在
        const findRes = await userFind(username);
        if (findRes.length) {//账号已存在
            ctx.body = {
                code: 802,
                data: 'error',
                msg: '账号已存在'
            }
            return;
        }
        // 注册
        const result = await userRegister(ctx.request.body);
        // console.log(result);
        if (result.affectedRows) {
            ctx.body = {
                code: 800,
                msg: '注册成功',
                data: 'success'
            }
        } else {
            ctx.body = {
                code: 803,
                msg: '注册失败',
                data: 'fail'
            }
        }
    } catch (error) {
        ctx.body = {
            code: 805,
            msg: '服务器异常',
            data: error
        }
    }
})
module.exports = router;