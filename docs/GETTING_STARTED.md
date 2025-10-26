# Getting Started - 快速开始指南

本指南将帮助你在 **30 分钟内**搭建一个可支付的产品落地页。

---

## 目标

完成本指南后，你将拥有：
- ✅ 一个功能完整的产品落地页
- ✅ 集成 Stripe 支付功能
- ✅ 部署到 Cloudflare Pages（全球CDN）
- ✅ 自动 HTTPS 和自定义域名

---

## 前置要求

### 必需

- [x] **Hugo** (Extended 版本 >= 0.112.0)
  ```bash
  # macOS
  brew install hugo

  # Windows
  choco install hugo-extended

  # Linux
  snap install hugo

  # 验证安装
  hugo version
  ```

- [x] **Node.js** (>= 18.x)
  ```bash
  node --version  # 应显示 v18.x 或更高
  ```

- [x] **Git**
  ```bash
  git --version
  ```

### 推荐

- GitHub 账号（用于代码托管）
- Cloudflare 账号（用于部署）
- Stripe 账号（用于支付）

---

## 快速开始（5 分钟）

### 方式一：使用示例站点

```bash
# 1. 克隆主题仓库
git clone https://github.com/yourusername/hugo-commerce-theme.git
cd hugo-commerce-theme

# 2. 进入示例站点
cd exampleSite

# 3. 安装依赖
npm install

# 4. 启动开发服务器
hugo server -D

# 5. 访问 http://localhost:1313
```

✅ **成功！** 你应该能看到一个完整的产品落地页。

---

### 方式二：创建新站点

```bash
# 1. 创建新 Hugo 站点
hugo new site my-product-site
cd my-product-site

# 2. 添加主题（作为 Git Submodule）
git init
git submodule add https://github.com/yourusername/hugo-commerce-theme.git themes/hugo-commerce-theme

# 3. 复制示例配置
cp themes/hugo-commerce-theme/exampleSite/hugo.toml .
cp -r themes/hugo-commerce-theme/exampleSite/data .
cp -r themes/hugo-commerce-theme/exampleSite/content .

# 4. 安装依赖
npm init -y
npm install --save-dev tailwindcss @tailwindcss/typography

# 5. 启动开发服务器
hugo server -D
```

---

## 步骤详解

### 第 1 步：基础配置（5 分钟）

编辑 `hugo.toml`：

```toml
baseURL = "https://my-product.com"  # 改为你的域名
title = "My Amazing Product"  # 改为你的产品名

[params]
  description = "The best product you'll ever buy"

  [params.stripe]
    publishable_key = "pk_test_YOUR_KEY"  # 暂时用测试密钥
    worker_url = "http://localhost:8787"  # 稍后配置
```

### 第 2 步：配置产品信息（10 分钟）

编辑 `data/products.toml`：

```toml
[product]
name = "Your Product Name"
description = "What your product does in one sentence"

[product.contact]
email = "you@example.com"
```

编辑 `data/pricing.toml`：

```toml
[pricing]
currency = "USD"
currency_symbol = "$"

[pricing.single]
name = "Single Package"
description = "Great for individuals"
price = 99
original_price = 198
stripe_price_id = "price_xxxxx"  # 稍后从 Stripe 获取
features = [
  "Feature 1",
  "Feature 2",
  "Feature 3"
]
```

### 第 3 步：添加客户证言（5 分钟）

编辑 `data/testimonials.toml`：

```toml
[[testimonials]]
name = "John Doe"
rating = 5
quote = "This product is amazing!"
date = "2024-01-15"
verified = true
```

至少添加 3 个证言。

### 第 4 步：自定义品牌（5 分钟）

编辑 `data/branding.toml`：

```toml
[branding]
primary_color = "#3FA026"  # 改为你的品牌色
accent_color = "#FEF5C4"

logo = "/images/logo.png"  # 上传你的Logo
```

上传 Logo：

```bash
# 将你的 Logo 放到这里
cp your-logo.png static/images/logo.png
```

### 第 5 步：编写落地页文案（10 分钟）

编辑 `content/_index.md`：

```markdown
---
header_brand: "Your Product Name"
header_tagline_paragraph: "Transform your life with our amazing product"
header_button_cta:
  url: "/checkout"
  title: "Buy Now"
---

# Why You Need This

Your product solves a real problem...

## Success Stories

Meet people who changed their lives...

## Features

- Feature 1: ...
- Feature 2: ...
- Feature 3: ...
```

---

## 配置 Stripe 支付（15 分钟）

### 1. 创建 Stripe 账号

访问 [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)

### 2. 创建产品和价格

```
1. 登录 Stripe Dashboard
2. 点击 "Products" → "Add Product"
3. 填写产品信息：
   - Name: "Single Package"
   - Description: "Your product description"
4. 添加价格（Price）：
   - Amount: $99.00
   - Type: One-time
5. 点击 "Save"
6. 复制 Price ID（格式：price_xxxxxx）
```

### 3. 获取 API 密钥

```
1. 点击 "Developers" → "API keys"
2. 复制 "Publishable key"（pk_test_xxxx）
3. 复制 "Secret key"（sk_test_xxxx）保密！
```

### 4. 更新配置

编辑 `hugo.toml`：

```toml
[params.stripe]
publishable_key = "pk_test_YOUR_ACTUAL_KEY"  # 粘贴实际密钥
```

编辑 `data/pricing.toml`：

```toml
[pricing.single]
stripe_price_id = "price_YOUR_ACTUAL_PRICE_ID"  # 粘贴实际Price ID
```

---

## 部署 Cloudflare Worker（20 分钟）

### 1. 安装 Wrangler

```bash
npm install -g wrangler

# 登录 Cloudflare
wrangler login
```

### 2. 创建 Worker

```bash
# 在项目根目录创建 workers 文件夹
mkdir workers
cd workers

# 创建 checkout worker
wrangler init checkout-worker
```

### 3. 配置 Worker

创建 `workers/checkout.js`：

```javascript
export default {
  async fetch(request, env) {
    // 允许的来源（CORS）
    const origin = request.headers.get('Origin');
    const allowedOrigin = origin?.startsWith('http://localhost') || origin === 'https://my-product.com'
      ? origin
      : 'https://my-product.com';

    // OPTIONS 请求（预检）
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // POST 请求（创建支付）
    if (request.method === 'POST') {
      const { priceId, quantity = 1 } = await request.json();

      // 获取价格金额
      const priceResponse = await fetch(
        `https://api.stripe.com/v1/prices/${priceId}`,
        {
          headers: {
            'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
          },
        }
      );

      const price = await priceResponse.json();
      const amount = price.unit_amount * quantity;

      // 创建 Payment Intent
      const paymentIntentResponse = await fetch(
        'https://api.stripe.com/v1/payment_intents',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            amount: amount.toString(),
            currency: 'usd',
            'automatic_payment_methods[enabled]': 'true',
          }),
        }
      );

      const paymentIntent = await paymentIntentResponse.json();

      return Response.json(
        { clientSecret: paymentIntent.client_secret },
        {
          headers: {
            'Access-Control-Allow-Origin': allowedOrigin,
          },
        }
      );
    }

    return new Response('Method not allowed', { status: 405 });
  },
};
```

### 4. 配置 wrangler.toml

```toml
name = "my-product-checkout"
main = "checkout.js"
compatibility_date = "2024-01-01"

[vars]
ALLOWED_ORIGIN = "https://my-product.com"
```

### 5. 设置密钥

```bash
wrangler secret put STRIPE_SECRET_KEY
# 输入: sk_test_YOUR_SECRET_KEY
```

### 6. 部署 Worker

```bash
wrangler deploy
```

记下 Worker URL（例如：`https://my-product-checkout.yourname.workers.dev`）

### 7. 更新站点配置

编辑 `hugo.toml`：

```toml
[params.stripe]
worker_url = "https://my-product-checkout.yourname.workers.dev"
```

---

## 部署站点（10 分钟）

### 方式一：Cloudflare Pages（推荐）

#### 1. 推送到 GitHub

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/my-product-site.git
git push -u origin main
```

#### 2. 连接 Cloudflare Pages

```
1. 登录 Cloudflare Dashboard
2. 点击 "Pages" → "Create a project"
3. 选择 "Connect to Git"
4. 选择你的 GitHub 仓库
5. 配置构建：
   - Framework preset: Hugo
   - Build command: hugo --minify
   - Build output: public
   - Environment variables:
     - HUGO_VERSION = 0.145.0
6. 点击 "Save and Deploy"
```

等待 3-5 分钟，你的站点将部署到：
`https://my-product-site.pages.dev`

#### 3. 自定义域名

```
1. 在 Cloudflare Pages 设置中
2. 点击 "Custom domains"
3. 添加你的域名
4. 按提示配置 DNS
```

---

### 方式二：Netlify

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化
netlify init

# 部署
netlify deploy --prod
```

---

## 测试支付（5 分钟）

### 1. 访问你的站点

```
https://my-product-site.pages.dev
```

### 2. 点击 "Buy Now"

### 3. 使用测试卡号

```
卡号: 4242 4242 4242 4242
过期: 任意未来日期（如 12/34）
CVC: 任意3位数（如 123）
邮编: 任意（如 12345）
```

### 4. 完成支付

查看 Stripe Dashboard 确认订单。

---

## 故障排查

### 问题1: Hugo 构建失败

```bash
# 清理缓存
rm -rf public/ resources/

# 重新构建
hugo --verbose
```

### 问题2: Worker CORS 错误

检查 Worker 的 `ALLOWED_ORIGIN` 是否包含你的域名：

```javascript
const allowedOrigin = origin === 'https://my-product.com' ? origin : 'https://my-product.com';
```

### 问题3: Stripe 密钥错误

确认：
- Publishable Key 在 `hugo.toml`
- Secret Key 在 Worker 环境变量
- 两者来自同一个 Stripe 账号（test/live 模式一致）

### 问题4: 样式不显示

```bash
# 安装 Tailwind CSS
npm install --save-dev tailwindcss

# 重新构建
hugo --gc --minify
```

---

## 下一步

### 立即可做

- [ ] 添加更多客户证言
- [ ] 上传产品图片
- [ ] 完善落地页文案
- [ ] 测试支付流程

### 优化提升

- [ ] 配置 Google Analytics
- [ ] 添加 FAQ 部分
- [ ] 优化 SEO（关键词、描述）
- [ ] A/B 测试不同价格

### 高级功能

- [ ] 添加订阅计划（Stripe Subscriptions）
- [ ] 集成邮件营销（ConvertKit/Mailchimp）
- [ ] 添加推荐奖励计划
- [ ] 多语言支持

---

## 学习资源

### 官方文档

- [Hugo 文档](https://gohugo.io/documentation/)
- [Stripe 文档](https://stripe.com/docs)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)

### 社区

- Hugo Discourse 论坛
- r/hugo Subreddit
- Cloudflare Community

### 教程

- [Hugo 快速入门](https://gohugo.io/getting-started/quick-start/)
- [Stripe Checkout 集成](https://stripe.com/docs/checkout/quickstart)
- [Cloudflare Workers 教程](https://developers.cloudflare.com/workers/get-started/guide/)

---

## 获取帮助

遇到问题？
1. 查看 [CONFIGURATION.md](./CONFIGURATION.md) 配置说明
2. 在 GitHub Issues 提问
3. 加入社区 Discord

---

**恭喜！** 🎉 你已经完成了基础设置。

现在开始推广你的产品，收获第一笔订单吧！

**上一篇**: [配置说明](./CONFIGURATION.md)
**下一篇**: [路线图](./ROADMAP.md)
