<h1 align="center">
  <img src="./logos/logo.png" width="144px" alt="增量玩家名字生成器 Logo" />
  <div>增量玩家名字生成器</div>
</h1>

![Version](https://img.shields.io/static/v1?label=Version&message=0.1.0&color=blue)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&color=green)](./LICENSE.txt)
![Creator](https://img.shields.io/static/v1?label=Creator&message=doctypehtml&color=red)

增量玩家名字生成器是一个用于为增量游戏玩家生成名字的应用.

## 主要特性

支持生成两种样式的名字，且高度自定义：

- “..., the Celestial of ...”式
- “...e308”式

## 应用链接

[https://doclove2generatename.netlify.app/#/](https://doclove2generatename.netlify.app/#/)

## 做点贡献

### 1. 获取源代码

#### 直接下载

点击 Code -> Download ZIP -> 解压文件

#### 克隆仓库

HTTPS：`git clone https://github.com/docccccccccccc/IncrementalGamerNameGenerator.git`

SSH：`git clone git@github.com:docccccccccccc/IncrementalGamerNameGenerator.git`

### 2. 准备工作

- 打开项目目录
- 在项目目录打开终端
- 输入 `npm install`
- 等待安装完毕，输入 `npm run dev` 启动开发服务器

### 3. 编辑代码

## 项目结构

```
incremental-gamer-name-generator/
├─ .vscode/           VSCode 编辑器设置
├─ .editorconfig
├─ .oxlintrc.json     Oxlint 配置
├─ .prettierrc.json   Prettier 配置
├─ env.d.ts
├─ eslint.config.ts   ESLint 配置
├─ index.html         入口文件
├─ logos/             项目 Logo，用于 README
│  └─ logo.png        项目 Logo
├─ package-lock.json  项目依赖、脚本配置
├─ package.json       项目依赖、脚本配置
├─ public/            静态资源
│  ├─ favicon.ico     网站图标
│  ├─ fonts           字体
│  └─ images          图片
├─ README.md          README（你正在看的）
├─ src/               源代码
│  ├─ App.vue         根组件
│  ├─ components      页面内组件
│  ├─ main.ts         项目入口文件
│  ├─ router          路由
│  ├─ styles          页面样式
│  └─ views           子页面
├─ tsconfig.app.json  TypeScript 配置
├─ tsconfig.json      TypeScript 配置
├─ tsconfig.node.json TypeScript 配置
├─ vite.config.ts     Vite 配置
└─ .gitignore         Git 提交忽略配置
```

## 问题反馈

你可以通过发 [Issues](https://github.com/docccccccccccc/IncrementalGamerNameGenerator/issues) 进行反馈.

## 许可证

本应用使用 MIT 许可证，详见 [LICENSE.txt](./LICENSE.txt) 文件.
