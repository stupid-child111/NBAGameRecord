const jwt = require('jsonwebtoken');
//生成token
function sign(option) {
    return jwt.sign(option, '666', {//私钥，加盐
        expiresIn: 86400//过期时间
    });
}
// 验证token
function verify(token) {
    return async (ctx, next) => {
        const jwtToken = ctx.request.headers.authorization;
        //有jwtToken进行校验
        if (jwtToken) {
            try {
                const decoded = jwt.verify(jwtToken, '666');
                // console.log(decoded);
                if (decoded.id) {//合法
                    ctx.userId = decoded.id;
                    ctx.nickname = decoded.nickname;
                    await next();
                }
            } catch (err) {
                // ctx.status = 403;
                ctx.body = {
                    code: 809,
                    data: err,
                    msg: '无效的token'
                };
            }
        } else {//没有，则进行登录操作
            ctx.body = {
                code: 808,
                msg: '缺少token'
            }
        }
    }
}
module.exports = {
    sign,
    verify
};