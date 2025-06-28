<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Personal Diary API

一个基于NestJS和MongoDB的个人日记API，支持用户认证、日记管理、标签系统、那年今日功能和统计分析。

## 功能特性

- 🔐 JWT认证系统
- 📝 日记CRUD操作
- 🏷️ 标签管理系统
- 📊 写作频率统计
- 📅 那年今日功能
- 🔍 全文搜索
- 📄 分页支持
- 📈 标签使用统计

## 技术栈

- **后端框架**: NestJS
- **数据库**: MongoDB + Mongoose
- **认证**: JWT + Passport
- **密码加密**: bcryptjs
- **验证**: class-validator
- **配置管理**: @nestjs/config

## 项目结构

```
src/
├── app.module.ts                  # 根模块
├── main.ts                        # 应用入口
│
├── common/                        # 通用功能
│   ├── decorators/               # 装饰器
│   ├── filters/                  # 异常过滤器
│   ├── guards/                   # 守卫
│   ├── interceptors/             # 拦截器
│   └── middlewares/              # 中间件
│
├── config/                        # 配置管理
│   ├── app.config.ts
│   ├── database.config.ts
│   ├── jwt.config.ts
│   └── config.module.ts
│
├── modules/                       # 功能模块
│   ├── auth/                     # 认证模块
│   ├── user/                     # 用户模块
│   └── diary/                    # 日记模块
│
└── utils/                         # 工具函数
    ├── pagination.util.ts
    ├── date.util.ts
    └── string.util.ts
```

## 安装和运行

### 1. 安装依赖

```bash
pnpm install
```

### 2. 环境配置

复制环境变量示例文件：

```bash
cp env.example .env
```

编辑 `.env` 文件，配置数据库连接和JWT密钥。

### 3. 启动MongoDB

确保MongoDB服务正在运行：

```bash
# 使用Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# 或使用本地安装的MongoDB
mongod
```

### 4. 运行应用

```bash
# 开发模式
pnpm run start:dev

# 生产模式
pnpm run build
pnpm run start:prod
```

### 5. 生成测试数据（可选）

```bash
# 编译TypeScript
pnpm run build

# 运行测试数据生成脚本
node dist/scripts/generate-test-data.js
```

## API文档

### 认证接口

#### 注册用户
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 用户登录
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 获取用户信息
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### 日记接口

#### 创建日记
```http
POST /api/diary
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "今天天气很好，心情也不错。",
  "date": "2024-01-15",
  "tags": ["心情", "天气"]
}
```

#### 获取日记列表
```http
GET /api/diary?page=1&limit=10
Authorization: Bearer <token>
```

#### 获取单篇日记
```http
GET /api/diary/:id
Authorization: Bearer <token>
```

#### 更新日记
```http
PATCH /api/diary/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "更新后的内容",
  "tags": ["更新", "标签"]
}
```

#### 删除日记
```http
DELETE /api/diary/:id
Authorization: Bearer <token>
```

#### 搜索日记
```http
GET /api/diary/search?q=关键词&page=1&limit=10
Authorization: Bearer <token>
```

#### 按标签查找
```http
GET /api/diary/tags/心情,天气?page=1&limit=10
Authorization: Bearer <token>
```

#### 获取所有标签
```http
GET /api/diary/tags
Authorization: Bearer <token>
```

### 统计接口

#### 标签统计
```http
GET /api/diary/stats/tags
Authorization: Bearer <token>
```

#### 写作频率统计
```http
GET /api/diary/stats/frequency?frequency=daily&startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>
```

#### 那年今日
```http
GET /api/diary/on-this-day?date=2024-01-15
Authorization: Bearer <token>
```

## 响应格式

所有API响应都遵循统一格式：

```json
{
  "data": {
    // 实际数据
  },
  "statusCode": 200,
  "message": "Success",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

分页响应格式：

```json
{
  "data": {
    "data": [
      // 数据列表
    ],
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  },
  "statusCode": 200,
  "message": "Success",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 开发

### 代码格式化

```bash
pnpm run format
```

### 代码检查

```bash
pnpm run lint
```

### 运行测试

```bash
pnpm run test
```

## 部署

### Docker部署

```bash
# 构建镜像
docker build -t personal-diary-api .

# 运行容器
docker run -p 3000:3000 --env-file .env personal-diary-api
```

### 环境变量

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| PORT | 应用端口 | 3000 |
| NODE_ENV | 环境模式 | development |
| MONGODB_URI | MongoDB连接字符串 | mongodb://localhost:27017/personal-api |
| JWT_SECRET | JWT密钥 | your-secret-key |
| JWT_EXPIRES_IN | JWT过期时间 | 7d |

## 许可证

MIT License
