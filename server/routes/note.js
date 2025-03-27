const Router = require('@koa/router');
const router = new Router();
const jwt = require('../utils/jwt.js');
const { findNoteListByType, findNoteById, notePublish } = require("../controllers/index.js");
const { formateTime } = require('../utils/formateTime.js');

const chunks = [];
//笔记列表查询
router.get('/findNoteListByType', jwt.verify(), async (ctx) => {
    //检验Token合理再去数据库中进行数据查询
    const { note_type } = ctx.request.query;
    try {
        const res = await findNoteListByType(note_type, ctx.userId);
        // console.log(note_type, ctx.userId);
        if (res.length) {
            ctx.body = {
                code: 800,
                data: res,
                msg: "查询成功"
            }
        } else {
            ctx.body = {
                code: 804,
                data: res,
                msg: "当前分类下没有数据"
            }
        }
    } catch (err) {
        ctx.body = {
            code: 805,
            data: err,
            msg: "服务器异常"
        }
    }
})

//笔记详情查询
router.get('/findNoteById', jwt.verify(), async (ctx) => {
    const { id } = ctx.request.query;
    try {
        const res = await findNoteById(id);
        if (res.length) {
            ctx.body = {
                code: 800,
                data: res,
                msg: "查询成功"
            }
        } else {
            ctx.body = {
                code: 804,
                data: res,
                msg: "当前分类下没有笔记"
            }
        }
    } catch (err) {
        ctx.body = {
            code: 805,
            data: err,
            msg: "服务器异常"
        }
    }
})

//笔记发布
router.post('/notePublish', jwt.verify(), async (ctx) => {

    const { title, note_content, head_img, note_type, currentIndex, totalChunks } = ctx.request.body;
    try {
        if (currentIndex != totalChunks - 1) {
            // console.log(currentIndex, totalChunks);
            chunks[currentIndex] = ctx.request.body.head_img;
            ctx.body = {
                code: 800,
                data: "success",

            }
        }
        else {
            // console.log(2);
            chunks[currentIndex] = ctx.request.body.head_img;
            // console.log(chunks.length == totalChunks, currentIndex, totalChunks);
            const userId = ctx.userId;
            const nickname = ctx.nickname;
            // console.log(userId, nickname);
            const c_time = formateTime(new Date());
            const m_time = formateTime(new Date());
            const head_img = chunks.join('');
            const result = await notePublish({
                title,
                note_content,
                head_img,
                note_type,
                userId,
                nickname,
                c_time,
                m_time
            });
            chunks.length = 0;
            // console.log(result);
            if (result.affectedRows === 1) {
                ctx.body = {
                    code: 800,
                    data: result,
                    msg: "笔记发布成功"
                }
            } else {
                ctx.body = {
                    code: 805,
                    data: result,
                    msg: "笔记发布失败"
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        ctx.body = {
            code: 805,
            data: err,
            msg: "服务器异常"
        }
    }
})
module.exports = router;