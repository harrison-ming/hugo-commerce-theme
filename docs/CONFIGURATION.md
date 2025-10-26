# Configuration Guide - 配置说明文档

本文档详细说明 Hugo Commerce Theme 的所有配置选项。

---

## 目录

- [1. 站点基础配置](#1-站点基础配置)
- [2. 产品配置](#2-产品配置)
- [3. 价格配置](#3-价格配置)
- [4. 证言配置](#4-证言配置)
- [5. 品牌配置](#5-品牌配置)
- [6. 支付配置](#6-支付配置)
- [7. 高级配置](#7-高级配置)

---

## 1. 站点基础配置

### 文件位置：`hugo.toml`

```toml
baseURL = "https://yourproduct.com"
title = "Your Product Name"
languageCode = "en-us"
defaultContentLanguage = "en"

[params]
  description = "Your product description for SEO"
  keywords = ["product", "ecommerce", "your-niche"]

  # 作者信息
  author = "Your Company Name"
  copyright = "© 2024 Your Company. All rights reserved."
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| `baseURL` | string | ✅ | 网站的完整URL（用于SEO和社交分享） |
| `title` | string | ✅ | 网站标题（显示在浏览器标签） |
| `languageCode` | string | ✅ | 语言代码（en-us, zh-cn等） |
| `description` | string | ✅ | 网站描述（用于meta标签） |
| `keywords` | array | ⚠️ | SEO关键词列表 |

---

## 2. 产品配置

### 文件位置：`data/products.toml`

```toml
[product]
# 基础信息
name = "Your Product Name"
short_name = "Short Name"  # 用于空间有限的地方
slug = "your-product"  # URL友好标识符，用于路径

# 描述
description = "One-line product description"
long_description = """
Multi-paragraph detailed description.

Supports **markdown** formatting!
"""

# SEO元数据
[product.meta]
keywords = ["keyword1", "keyword2", "keyword3"]
og_image = "/images/og-image.jpg"  # 社交分享图片（1200x630px）
og_description = "Description for social sharing"

# 联系信息
[product.contact]
email = "support@yourproduct.com"
support_url = "https://yourproduct.com/support"
phone = "+1-234-567-8900"  # 可选

# 法律页面（可选）
[product.legal]
privacy_url = "/privacy"
terms_url = "/terms"
refund_url = "/refund"
```

### 最小化配置

如果你只想快速上线，只需配置这些：

```toml
[product]
name = "Your Product"
description = "What your product does"

[product.contact]
email = "you@example.com"
```

---

## 3. 价格配置

### 文件位置：`data/pricing.toml`

```toml
[pricing]
currency = "USD"  # 货币代码
currency_symbol = "$"  # 货币符号

# ========== 价格方案 1 ==========
[pricing.single]
# 基础信息
name = "Single Package"
description = "Perfect for individuals"
price = 99
original_price = 198  # 划线价（可选）
quantity = 1

# Stripe 集成
stripe_price_id = "price_1SGUthIcuszw748DGbHNrv99"

# 计算字段（可选，会自动计算）
savings = 99  # original_price - price
discount_percent = 50  # 折扣百分比

# 功能列表
features = [
  "Feature 1",
  "Feature 2",
  "Feature 3",
  "Free Shipping"
]

# 可选：徽章标签
badge = ""  # 例如 "BEST VALUE"

# ========== 价格方案 2 ==========
[pricing.family]
name = "Family Pack"
description = "Great for families"
price = 169
original_price = 396
quantity = 2
stripe_price_id = "price_1SJHIRIcuszw748D0QxyNQ2v"
savings = 227
badge = "MOST POPULAR"
features = [
  "2x Products",
  "Double the Benefits",
  "Priority Support",
  "Free Shipping"
]

# ========== 价格方案 3 ==========
[pricing.ultimate]
name = "Ultimate Bundle"
description = "Maximum value"
price = 249
original_price = 594
quantity = 3
stripe_price_id = "price_1SGUvBIcuszw748DTCDeq3Zu"
savings = 345
badge = "BEST VALUE"
features = [
  "3x Products",
  "Triple Benefits",
  "VIP Support",
  "Free Express Shipping"
]
```

### 重要说明

#### Stripe Price ID 获取方式

1. 登录 [Stripe Dashboard](https://dashboard.stripe.com/)
2. 进入 "Products" → 创建产品
3. 添加价格（Price）
4. 复制 Price ID（格式：`price_xxxxxx`）

#### 测试模式 vs. 生产模式

```toml
# 测试环境（hugo.test.toml）
stripe_price_id = "price_1xxxTEST"  # 以 test 模式创建

# 生产环境（hugo.toml）
stripe_price_id = "price_1xxxLIVE"  # 以 live 模式创建
```

---

## 4. 证言配置

### 文件位置：`data/testimonials.toml`

```toml
# ========== 证言 1 ==========
[[testimonials]]
# 客户信息
name = "John Doe"
location = "New York, USA"  # 可选
title = "Software Engineer"  # 可选，职位或身份

# 评分（1-5）
rating = 5

# 头像（可选）
avatar = "/images/testimonials/john.jpg"

# 日期
date = "2024-01-15"

# 验证标记（可选）
verified = true  # 显示"已验证购买"标签

# 短证言（用于卡片展示）
quote = "This product changed my life! Highly recommended."

# 长故事（用于落地页详细展示，可选）
story_title = "John's Success Story"
story = """
I was skeptical at first, but after using this product for 30 days...

The results were incredible. Here's what happened:

1. First week: ...
2. Second week: ...
3. By the end of the month: ...

I highly recommend this to anyone looking for...
"""

# 社交证明（可选）
[testimonials.social]
platform = "Facebook"  # Facebook, Twitter, Instagram, etc.
url = "https://facebook.com/post/12345"

# ========== 证言 2 ==========
[[testimonials]]
name = "Sarah Smith"
location = "London, UK"
rating = 5
avatar = "/images/testimonials/sarah.jpg"
date = "2024-01-10"
verified = true
quote = "Best purchase I've made this year!"
story_title = "Sarah's Transformation"
story = """
Sarah's detailed story...
"""

# ========== 证言 3 ==========
[[testimonials]]
name = "Anonymous"  # 匿名证言
rating = 5
quote = "Absolutely love it! Will buy again."
date = "2024-01-05"
# 注意：匿名证言通常不显示 verified 标签
```

### 最佳实践

#### 证言数量
- **最少**: 3 个（建立基本信任）
- **推荐**: 6-12 个（展示多样性）
- **最多**: 20 个（避免信息过载）

#### 真实性
- ✅ 使用真实客户照片
- ✅ 包含具体细节（地点、时间）
- ✅ 显示"已验证购买"标签
- ❌ 不要使用库存照片
- ❌ 不要编造太夸张的内容

#### 多样性
展示不同类型的客户：
- 不同地理位置
- 不同使用场景
- 不同问题解决方式

---

## 5. 品牌配置

### 文件位置：`data/branding.toml`

```toml
[branding]
# ========== 颜色方案 ==========
# 主色调（用于CTA按钮、链接）
primary_color = "#3FA026"
primary_hover = "#5ED54B"  # 悬停状态

# 强调色（用于高亮框、徽章）
accent_color = "#FEF5C4"

# 文本颜色
text_primary = "#1a202c"  # 深色文本
text_secondary = "#718096"  # 次要文本

# 背景色
bg_primary = "#ffffff"
bg_secondary = "#f7fafc"

# ========== Logo ==========
logo = "/images/logo.png"
logo_width = 150  # 像素
logo_height = 50  # 像素
logo_alt = "Your Product Logo"

# Favicon
favicon = "/favicon.ico"
favicon_32 = "/images/favicon-32x32.png"
favicon_16 = "/images/favicon-16x16.png"
apple_touch_icon = "/images/apple-touch-icon.png"

# ========== 字体 ==========
[branding.fonts]
# 标题字体
heading = "Catamaran"
heading_weight = 700  # 粗细

# 正文字体
body = "system-ui, -apple-system, sans-serif"
body_weight = 400

# 字体来源（可选）
google_fonts = [
  "Catamaran:400,700",
  "Inter:300,400,600"
]

# ========== 社交媒体 ==========
[branding.social]
facebook = "https://facebook.com/yourpage"
twitter = "https://twitter.com/yourhandle"
instagram = "https://instagram.com/yourhandle"
linkedin = ""  # 可选
youtube = ""  # 可选

# ========== 视觉元素 ==========
[branding.visual]
# 圆角半径
border_radius = "8px"

# 阴影
box_shadow = "0 4px 6px rgba(0, 0, 0, 0.1)"

# 按钮样式
button_style = "rounded"  # rounded, square, pill
```

### 颜色选择指南

#### 1. 选择主色调

根据产品特性选择：
- **绿色** (#3FA026)：健康、自然、成长
- **蓝色** (#3B82F6)：信任、专业、科技
- **橙色** (#F59E0B)：活力、创意、乐观
- **紫色** (#8B5CF6)：奢华、创新、神秘
- **红色** (#EF4444)：紧急、热情、力量

#### 2. 生成配色方案

使用工具自动生成和谐的配色：
- [Coolors.co](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)
- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors)

#### 3. 对比度检查

确保文字可读性：
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- 最低标准：4.5:1（普通文本）

---

## 6. 支付配置

### 文件位置：`hugo.toml`

```toml
[params.stripe]
# Stripe公钥（可以公开）
publishable_key = "pk_live_xxxxxxxx"

# Cloudflare Worker URL
worker_url = "https://api.yourproduct.com"

# 支付成功/失败跳转页面
success_url = "/success"
cancel_url = "/cancel"
```

### 环境配置

#### 开发环境 (`hugo.test.toml`)

```toml
[params.stripe]
publishable_key = "pk_test_xxxxxxxx"  # 测试密钥
worker_url = "http://localhost:8787"  # 本地Worker
```

#### 生产环境 (`hugo.toml`)

```toml
[params.stripe]
publishable_key = "pk_live_xxxxxxxx"  # 生产密钥
worker_url = "https://api.yourproduct.com"  # 生产Worker
```

### Cloudflare Worker 配置

Worker 需要设置的环境变量：

```bash
# 设置 Stripe Secret Key
wrangler secret put STRIPE_SECRET_KEY
# 输入: sk_live_xxxxxxxx

# 设置 Webhook Secret
wrangler secret put STRIPE_WEBHOOK_SECRET
# 输入: whsec_xxxxxxxx

# 可选：邮件服务
wrangler secret put RESEND_API_KEY
# 输入: re_xxxxxxxx
```

---

## 7. 高级配置

### 7.1 Google Analytics

```toml
[params.analytics]
google_analytics_id = "G-XXXXXXXXXX"

# 可选：隐私模式
anonymize_ip = true
respect_dnt = true  # 尊重"Do Not Track"设置
```

### 7.2 SEO优化

```toml
[params.seo]
# Robots.txt
robots_allow = true

# Sitemap
sitemap_priority = 1.0
sitemap_changefreq = "weekly"

# 结构化数据
enable_schema = true  # 启用Schema.org标记

# Open Graph（社交分享）
[params.seo.og]
type = "website"
locale = "en_US"
site_name = "Your Product"
```

### 7.3 性能优化

```toml
[build]
writeStats = true  # 生成CSS统计（用于PurgeCSS）

# 图片优化
[params.images]
lazy_load = true  # 懒加载
webp_enabled = true  # 使用WebP格式
quality = 85  # 图片质量（0-100）
```

### 7.4 多语言配置

```toml
# 启用多语言
[languages]
  [languages.en]
    languageName = "English"
    weight = 1

  [languages.zh]
    languageName = "中文"
    weight = 2

# 语言切换器
[params.i18n]
enable_language_selector = true
```

### 7.5 自定义CSS

```toml
[params.custom]
# 引入自定义CSS文件
custom_css = [
  "css/custom.css",
  "css/animations.css"
]

# 引入自定义JS文件
custom_js = [
  "js/custom.js"
]
```

---

## 配置检查清单

### 上线前必须配置

- [ ] `baseURL` - 设置为实际域名
- [ ] `title` - 产品名称
- [ ] `data/products.toml` - 产品基础信息
- [ ] `data/pricing.toml` - 价格和 Stripe Price ID
- [ ] `data/branding.toml` - 品牌颜色和Logo
- [ ] Stripe Publishable Key（生产环境）
- [ ] Cloudflare Worker URL
- [ ] 至少3个客户证言

### 推荐配置

- [ ] Google Analytics ID
- [ ] 社交媒体链接
- [ ] Favicon 和 OG 图片
- [ ] SEO 关键词
- [ ] 隐私政策和条款页面
- [ ] 自定义域名

### 可选配置

- [ ] 多语言支持
- [ ] 自定义CSS/JS
- [ ] 高级SEO设置
- [ ] 性能优化选项

---

## 配置验证

### 使用 Hugo 命令检查

```bash
# 检查配置文件语法
hugo config

# 验证所有数据文件
hugo --renderToMemory --verbose

# 测试构建
hugo --minify --destination public/
```

### TOML 语法验证

在线工具：
- [TOML Lint](https://www.toml-lint.com/)
- [TOML Checker](https://toml-checker.com/)

---

## 常见配置错误

### 错误1：TOML语法错误

```toml
# ❌ 错误 - 缺少引号
name = Product Name

# ✅ 正确
name = "Product Name"
```

### 错误2：数组格式错误

```toml
# ❌ 错误 - 使用了逗号但未闭合
features = [
  "Feature 1",
  "Feature 2",

# ✅ 正确
features = [
  "Feature 1",
  "Feature 2"
]
```

### 错误3：Price ID 环境不匹配

```toml
# ❌ 错误 - 使用测试Price ID但Publishable Key是生产环境
publishable_key = "pk_live_xxxx"
stripe_price_id = "price_test_xxxx"  # 不匹配！

# ✅ 正确 - 环境一致
publishable_key = "pk_live_xxxx"
stripe_price_id = "price_live_xxxx"
```

---

## 获取帮助

如果配置遇到问题：

1. 查看 [GETTING_STARTED.md](./GETTING_STARTED.md)
2. 参考 `exampleSite/` 中的示例配置
3. 在 GitHub Issues 提问
4. 加入社区讨论

---

**上一篇**: [架构设计](./ARCHITECTURE.md)
**下一篇**: [快速开始](./GETTING_STARTED.md)
