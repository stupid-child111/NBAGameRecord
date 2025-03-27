// 导入模块
const mysql = require('mysql2/promise');
const { database } = require('../config/index.js');
// 创建一个数据库连接池
const pool = mysql.createPool({
    host: database.HOST,
    user: database.USERNAME,
    password: database.PASSWORD,
    database: database.DATABASE,
    port: database.PORT
});

// 连接数据库
const allService = {
    query: async (sql) => {
        try {
            // 通过连接池来创建连接
            const conn = await pool.getConnection();
            // 对该连接执行某些操作
            const [rows, err] = await conn.query(sql);
            // 不要忘记释放连接！
            pool.releaseConnection(conn);
            return Promise.resolve(rows);
        } catch (err) {
            return Promise.reject("数据库错误：" + err);
        }
    }
}
// 登录
const userLogin = (username, password) => {
    const _sql = `select * from users where username="${username}" and password="${password}";`;
    return allService.query(_sql);
}
//查找账号
const userFind = (username) => {
    const _sql = `select * from users where username="${username}";`
    return allService.query(_sql);
}
//注册
const userRegister = (userInfo) => {
    const _sql = `insert into users (username,password,nickname) values ("${userInfo.username}","${userInfo.password}","${userInfo.nickname}");`
    return allService.query(_sql);

}

//根据分类查找数据
const findNoteListByType = (type, id) => {
    const _sql = `select * from note where note_type="${type}" and userId="${id}";`
    return allService.query(_sql);
}
//根据id查询note
const findNoteById = (id) => {
    const _sql = `select * from note where id="${id}";`
    return allService.query(_sql);
}

//笔记存储
const notePublish = (noteInfo) => {
    const { title, note_content, head_img, note_type, userId, nickname, c_time, m_time } = noteInfo;
    const _sql = `insert into note (title,note_content,head_img,note_type,userId,nickname,c_time,m_time) values ("${title}","${note_content}","${head_img}","${note_type}","${userId}","${nickname}","${c_time}","${m_time}");`;
    return allService.query(_sql);
}

module.exports = {
    userLogin,
    userFind,
    userRegister,
    findNoteListByType,
    findNoteById,
    notePublish
};