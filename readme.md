# 项目概述

本项目是一个基于 Node.js 和 Koa 框架搭建的服务器端应用，主要用于处理笔记相关的业务逻辑，如笔记列表查询、笔记详情查询和笔记发布等功能。项目借助多个 Koa 中间件来处理请求、解决跨域问题，并使用 MySQL 数据库进行数据存储。

## 项目结构

### 主要文件和文件夹说明

- ```
  server/
  ```

  ：项目主目录

  - `package-lock.json`：记录项目依赖的确切版本信息，确保项目在不同环境下的一致性。

  - `.gitignore`：指定在版本控制中忽略的文件和文件夹，如 `node_modules`。

  - ```
    config/
    ```

    ：配置文件目录

    - `index.js`：数据库配置文件，包含数据库名称、用户名、密码、端口和主机地址等信息。

  - ```
    routes/
    ```

    ：路由文件目录

    - `note.js`：定义了笔记相关的路由，包括笔记列表查询、笔记详情查询和笔记发布接口。

  - ```
    utils/
    ```

    ：工具函数目录

    - `formateTime.js`：提供格式化时间的工具函数，将时间格式化为 `YYYY年MM月DD日` 的形式。

  - `readme.md`：项目说明文档。

## 技术栈

### 后端

- **Node.js**：JavaScript 运行环境，用于服务器端开发。
- **Koa**：轻量级的 Node.js Web 框架，用于构建服务器端应用。
- **@koa/router**：Koa 的路由中间件，用于处理不同路径的请求。
- **@koa/cors**：Koa 的跨域处理中间件，解决跨域请求问题。
- **@koa/bodyparser**：Koa 的请求体解析中间件，用于解析 POST 请求传递的参数。
- **jsonwebtoken**：用于生成和验证 JSON Web Token（JWT），实现用户认证和授权。
- **mysql2**：Node.js 的 MySQL 数据库驱动，用于与 MySQL 数据库进行交互。

## 功能特性

### 笔记管理

- **笔记列表查询**：根据笔记类型和用户 ID 查询笔记列表。
- **笔记详情查询**：根据笔记 ID 查询笔记详情。
- **笔记发布**：支持将笔记信息（包括标题、内容、封面图片、类型等）保存到数据库中。

### 用户认证

- 使用 JWT 进行用户认证，确保只有经过认证的用户才能访问笔记相关接口。

## 安装与运行

### 安装依赖

在项目根目录下执行以下命令安装项目依赖：



bash











```bash
npm install
```

### 配置数据库

在 `server/config/index.js` 文件中配置数据库连接信息：



javascript











```javascript
const config = {
    database: {
        DATABASE: 'noteBook',
        USERNAME: 'root',
        PASSWORD: '123456',
        PORT: '3306',
        HOST: 'localhost'
    }
}
module.exports = config;
```

### 启动服务器

在项目根目录下执行以下命令启动服务器：



bash











```bash
npm start
```

## API 文档

### 笔记列表查询

- **URL**：`/findNoteListByType`

- **方法**：`GET`

- 参数

  ：

  - `note_type`：笔记类型

- 请求头

  ：

  - `Authorization`：JWT Token

- **响应示例**：



json











```json
{
    "code": 800,
    "data": [
        {
            "id": 1,
            "title": "笔记标题",
            "note_content": "笔记内容",
            "head_img": "封面图片 URL",
            "note_type": "笔记类型",
            "userId": 1,
            "nickname": "用户昵称",
            "c_time": "2024年01月01日",
            "m_time": "2024年01月01日"
        }
    ],
    "msg": "查询成功"
}
```

### 笔记详情查询

- **URL**：`/findNoteById`

- **方法**：`GET`

- 参数

  ：

  - `id`：笔记 ID

- 请求头

  ：

  - `Authorization`：JWT Token

- **响应示例**：



json











```json
{
    "code": 800,
    "data": [
        {
            "id": 1,
            "title": "笔记标题",
            "note_content": "笔记内容",
            "head_img": "封面图片 URL",
            "note_type": "笔记类型",
            "userId": 1,
            "nickname": "用户昵称",
            "c_time": "2024年01月01日",
            "m_time": "2024年01月01日"
        }
    ],
    "msg": "查询成功"
}
```

### 笔记发布

- **URL**：`/notePublish`

- **方法**：`POST`

- 参数

  ：

  - `title`：笔记标题
  - `note_content`：笔记内容
  - `head_img`：封面图片（支持分块上传）
  - `note_type`：笔记类型
  - `currentIndex`：当前分块索引
  - `totalChunks`：总块数

- 请求头

  ：

  - `Authorization`：JWT Token

- **响应示例**：



json











```json
{
    "code": 800,
    "data": {
        "affectedRows": 1
    },
    "msg": "笔记发布成功"
}
```





## 注意事项

- 请确保数据库服务已启动，并且数据库配置信息正确。
- 笔记封面图片支持分块上传，需要在前端实现分块逻辑，并在后端进行合并处理。