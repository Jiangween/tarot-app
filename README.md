# 塔罗牌阅读应用

一个基于 Next.js 开发的塔罗牌系统，支持多种牌阵和牌面解读。

## 功能特点

- 支持多种牌阵类型：
  - 单牌阵
  - 三牌阵
  - 凯尔特十字阵
  - 关系牌阵
- 完整的塔罗牌图像展示
- 正逆位解读
- 响应式设计，支持移动端和桌面端
- 暗色模式支持

## 技术栈

- Next.js 14
- TypeScript
- MongoDB
- Tailwind CSS
- React

## 开始使用

### 前置要求

- Node.js 18.0 或更高版本
- MongoDB 数据库
- npm 或 yarn 或 pnpm

### 安装步骤

1. 克隆仓库

```Bash
git clone https://github.com/Jiangween/tarot-app.git
cd tarot-app
```

2. 安装依赖

```Bash
pnpm install
```

3. 环境配置

```Bash
cp .env.template .env.local
```

4. 更新 `.env.local` 中的配置：

- `MONGODB_URI`: MongoDB 数据库连接字符串
- `NEXT_PUBLIC_API_URL`: API 基础URL（开发环境通常为 [http://localhost:3000](http://localhost:3000/)）
- `PORT`: 应用运行端口（可选）

5. 启动开发服务器

```Bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000/) 查看应用。

## 项目结构

```Bash
tarot-app/
├── src/
│ ├── app/ # Next.js 应用页面
│ ├── components/ # React 组件
│ ├── constants/ # 常量定义
│ ├── models/ # MongoDB 模型
│ ├── services/ # 服务层
│ ├── types/ # TypeScript 类型定义
│ └── utils/ # 工具函数
├── public/ # 静态资源
└── data/ # 塔罗牌数据和图片
```

## 数据库配置

项目使用 MongoDB 作为数据库。需要在 MongoDB 中创建以下集合：

- readings: 存储塔罗牌阅读记录

## 开发指南

### 添加新的牌阵类型

1. 在 `src/constants/tarotConstants.ts` 中添加新的牌阵类型
2. 在 `POSITION_MEANINGS` 中定义对应的位置含义
3. 更新 `SPREAD_CARDS_COUNT` 以包含新牌阵所需的卡牌数量

### 自定义样式

项目使用 Tailwind CSS 进行样式管理，可以在 `tailwind.config.ts` 中进行配置。

## 部署

项目可以部署到 Vercel、Netlify 等平台，或者自托管。确保设置正确的环境变量。

## 致谢

塔罗牌图片资源来自于 [tarot-api](https://github.com/LindseyB/tarot-api)，原作者 Julien Duponchelle。

## 许可证

本项目代码基于 MIT License 授权。

### 图片资源许可证

塔罗牌图片资源基于原作者 Julien Duponchelle 的 MIT License：

```text
Copyright (c) 2012 Julien Duponchelle

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
...