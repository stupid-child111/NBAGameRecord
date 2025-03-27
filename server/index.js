const Koa = require('koa');
const cors = require("@koa/cors");
const { bodyParser } = require('@koa/bodyparser');
const useRouter = require("./routes/index.js");

const app = new Koa();
// 解决跨域
app.use(cors());
// 让koa可以解析post可以传递的参数
app.use(bodyParser());
//生效路由
useRouter(app);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`服务启动在${PORT}端口`);
});