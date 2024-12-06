### 特征

- ⚡ [Next.js](https://nextjs.org) 支持 App Router
- 🔥 类型检查 [TypeScript](https://www.typescriptlang.org)
- 💎 集成 [Tailwind CSS](https://tailwindcss.com)
- ✅ TypeScript 和 React 18 的严格模式
- ♻️  使用 T3 Env 实现类型安全的环境变量
- 🔴 使用 Zod 进行验证的库
- 📏 使用 [ESLint](https://eslint.org) 进行 Linter （默认 Next.js、Next.js Core Web Vitals、Tailwind CSS 和 Antfu 配置）
- 💡 使用 `@` 前缀的绝对路径导入
- 🦊 Git Hooks使用Husky
- 🚫 用 Lint-staged 在 Git 暂存文件上运行 linters
- 🚓 使用 Commitlint 检查 git commit
- 📓 使用 Commitizen 编写符合标准的提交消息

### 要求

- Node.js 20+ and pnpm

### 项目结构

```shell
.
├── README.md                       # README file
├── .husky                          # Husky configuration
├── .vscode                         # VSCode configuration
├── public                          # Public assets folder
├── src
│   ├── app                         # Next JS App (App Router)
│   ├── components                  # React components
│   ├── locales                     # Locales folder (i18n messages)
│   ├── styles                      # Styles folder
│   ├── types                       # Type definitions
│   ├── utils                       # Utilities folder
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```
