1. 启动一个koa服务
2. 引入了@koa/router
3. 解决跨域问题 @koa/cors
4. 借助@koa/bodyparser 辅助koa解析post请求传递的参数

5. 定义了登录接口，接受到前段参数 ，封装了一个用于连接数据库的查询query函数，返回查询结果，
    再定义了专门用于执行登录请求的userLogin函数，调用了query函数，返回查询结果