# Hugo Commerce Theme - 架构设计文档

## 文档版本

- **版本**: 0.1.0
- **更新日期**: 2024-10-22
- **状态**: 草案

---

## 1. 项目背景与目标

### 1.1 为什么创建这个主题

**问题识别：**
- 现有的 Hugo 主题大多专注于内容型网站（博客、文档）
- 产品落地页需要支付集成、转化优化等特殊需求
- 每次新建产品站点都需要重复造轮子
- 非技术团队难以维护产品信息（价格、文案等）

**解决方案：**
- 创建专门的电商/销售主题
- 配置驱动，减少硬编码
- 数据与展示分离
- 支持多产品快速复用

### 1.2 核心目标

| 目标 | 描述 | 优先级 |
|-----|------|--------|
| **快速上线** | 从零到部署 < 1小时 | P0 |
| **易于维护** | 修改价格/文案无需懂代码 | P0 |
| **支付集成** | 开箱即用的 Stripe 集成 | P0 |
| **可复用性** | 一个主题，支持多个产品 | P1 |
| **数据可视** | GitHub 界面直接查看/编辑 | P1 |
| **未来扩展** | 为 CMS 集成留好接口 | P2 |

---

## 2. 技术架构

### 2.1 技术栈

| 技术 | 版本 | 用途 |
|-----|------|------|
| **Hugo** | >= 0.112.0 (Extended) | 静态站点生成器 |
| **Tailwind CSS** | 4.x | 样式框架 |
| **Stripe API** | v3 | 支付处理 |
| **Cloudflare Workers** | - | 后端API（支付、Webhook） |
| **Cloudflare Pages** | - | 站点托管与部署 |
| **TOML/YAML** | - | 配置与数据存储 |

### 2.2 系统架构图

```
┌─────────────────────────────────────────────────────────┐
│  内容编辑层（Phase 1：GitHub直接编辑）                      │
├─────────────────────────────────────────────────────────┤
│  GitHub Repository                                       │
│  ├── data/products.toml         # 产品配置               │
│  ├── data/testimonials.toml     # 客户证言               │
│  ├── data/pricing.toml          # 价格方案               │
│  └── content/_index.md          # 落地页文案             │
│                                                          │
│  编辑方式：GitHub Web 界面直接编辑 TOML/YAML 文件          │
└─────────────────────────────────────────────────────────┘
                        ↓ (Git Push)
┌─────────────────────────────────────────────────────────┐
│  构建层                                                  │
├─────────────────────────────────────────────────────────┤
│  Hugo Static Site Generator                              │
│  ├── 读取 data/ 中的配置                                 │
│  ├── 读取 content/ 中的文案                              │
│  ├── 应用 layouts/ 中的模板                              │
│  ├── 编译 Tailwind CSS                                   │
│  └── 生成静态 HTML/CSS/JS                                │
└─────────────────────────────────────────────────────────┘
                        ↓ (Auto Deploy)
┌─────────────────────────────────────────────────────────┐
│  托管层                                                  │
├─────────────────────────────────────────────────────────┤
│  Cloudflare Pages                                        │
│  ├── 静态文件托管（HTML/CSS/JS/图片）                     │
│  ├── 全球 CDN 加速                                       │
│  └── 自动 HTTPS                                          │
└─────────────────────────────────────────────────────────┘
                        ↓ (用户访问)
┌─────────────────────────────────────────────────────────┐
│  前端层（浏览器）                                         │
├─────────────────────────────────────────────────────────┤
│  产品落地页                                              │
│  ├── 营销文案展示                                        │
│  ├── 产品图片展示                                        │
│  ├── 客户证言展示                                        │
│  └── CTA 按钮（跳转到结账页）                             │
│                                                          │
│  结账页                                                  │
│  ├── 价格方案选择                                        │
│  ├── Stripe Payment Element                             │
│  └── 提交订单                                            │
└─────────────────────────────────────────────────────────┘
                        ↓ (支付请求)
┌─────────────────────────────────────────────────────────┐
│  后端层（Cloudflare Workers）                            │
├─────────────────────────────────────────────────────────┤
│  Checkout Worker (api.yourdomain.com)                   │
│  ├── 接收支付请求                                        │
│  ├── 验证 Stripe Price ID                               │
│  ├── 创建 Payment Intent                                │
│  └── 返回 Client Secret                                 │
│                                                          │
│  Webhook Worker                                          │
│  ├── 接收 Stripe Webhook                                │
│  ├── 验证签名                                            │
│  ├── 存储订单（可选）                                    │
│  └── 发送确认邮件                                        │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  第三方服务                                              │
├─────────────────────────────────────────────────────────┤
│  Stripe                                                  │
│  └── 支付处理、订阅管理                                  │
│                                                          │
│  Resend/SendGrid (可选)                                 │
│  └── 邮件发送服务                                        │
└─────────────────────────────────────────────────────────┘
```

---

## 3. 数据架构设计（配置驱动）

### 3.1 核心原则

> **数据与展示分离**：所有可变内容存储在数据文件中，模板只负责渲染

### 3.2 数据文件结构

```
data/
├── products.toml          # 产品基础信息（名称、描述、品牌）
├── pricing.toml           # 价格方案（单品、套餐、Stripe ID）
├── testimonials.toml      # 客户证言（姓名、评分、内容）
├── features.toml          # 产品特性列表
└── branding.toml          # 品牌配置（颜色、Logo、字体）
```

### 3.3 数据文件详细设计

#### 3.3.1 products.toml

```toml
[product]
name = "Celestial Decree of Triple Blessings"
short_name = "Celestial Decree"
slug = "celestial-decree"  # URL友好标识符

# 产品描述
description = "Ignite your prayers with ancient wisdom"
long_description = """
Detailed multi-paragraph description...
"""

# 元数据（SEO）
[product.meta]
keywords = ["blessing", "spiritual", "talisman"]
og_image = "/images/og-image.jpg"

# 联系信息
[product.contact]
email = "orders@example.com"
support_url = "https://example.com/support"
phone = "+1-234-567-8900"
```

#### 3.3.2 pricing.toml

```toml
[pricing]
currency = "USD"
currency_symbol = "$"

# 单品方案
[pricing.single]
name = "Single Decree"
description = "Perfect for personal blessing"
price = 99
original_price = 198
quantity = 1
stripe_price_id = "price_1SGUthIcuszw748DGbHNrv99"
savings = 99
features = [
  "1 Celestial Decree",
  "Handcrafted & Blessed",
  "Divine Protection",
  "Free Worldwide Shipping"
]

# 家庭装方案
[pricing.family]
name = "Family Protection Pack"
description = "Bless your home and loved ones"
price = 169
original_price = 396
quantity = 2
stripe_price_id = "price_1SJHIRIcuszw748D0QxyNQ2v"
savings = 227
badge = "MOST POPULAR"
features = [
  "2 Celestial Decrees",
  "Double the Blessings",
  "Protect Multiple Spaces",
  "Free Worldwide Shipping"
]

# 终极套装
[pricing.ultimate]
name = "Ultimate Abundance Pack"
description = "Maximum protection for your entire household"
price = 249
original_price = 594
quantity = 3
stripe_price_id = "price_1SGUvBIcuszw748DTCDeq3Zu"
savings = 345
badge = "MAXIMUM ENERGY"
features = [
  "3 Celestial Decrees",
  "Triple Divine Energy",
  "Complete Home Protection",
  "Free Worldwide Shipping"
]
```

#### 3.3.3 testimonials.toml

```toml
[[testimonials]]
name = "Sarah L."
location = "California"
rating = 5
avatar = "/images/testimonials/sarah.jpg"
date = "2024-01-15"
verified = true

# 短证言（用于卡片）
quote = "I finally feel protected. The constant bad luck that followed me for years just... stopped."

# 长故事（用于落地页）
story_title = "Sarah's Shocking Turn of Fortune"
story = """
Single mom. Two kids. Drowning in debt.

For three years, she juggled two jobs just to stay afloat...
"""

[[testimonials]]
name = "Michael T."
location = "Texas"
rating = 5
avatar = "/images/testimonials/michael.jpg"
date = "2024-01-10"
verified = true
quote = "Within two weeks of receiving my decree, I got promoted at work."
story_title = "Michael's Career Miracle"
story = """
Michael's story...
"""
```

#### 3.3.4 branding.toml

```toml
[branding]
# 颜色方案
primary_color = "#3FA026"      # 主色调（CTA按钮、链接）
primary_hover = "#5ED54B"      # 主色调悬停
accent_color = "#FEF5C4"       # 强调色（高亮框）
text_color = "#1a202c"         # 文本颜色
bg_color = "#ffffff"           # 背景色

# Logo
logo = "/images/logo.png"
logo_alt = "Celestial Decree Logo"
favicon = "/images/favicon.ico"

# 字体
[branding.fonts]
heading = "Catamaran"   # 标题字体
body = "system-ui"      # 正文字体

# 社交媒体
[branding.social]
facebook = "https://facebook.com/yourpage"
twitter = "https://twitter.com/yourhandle"
instagram = "https://instagram.com/yourhandle"
```

---

## 4. 模板架构设计

### 4.1 Layouts 目录结构

```
layouts/
├── _default/
│   ├── baseof.html              # 基础布局（所有页面的外壳）
│   └── single.html              # 单页模板（通用）
│
├── index.html                   # 首页（落地页）
│
├── checkout/
│   └── single.html              # 结账页专用布局
│
├── partials/
│   ├── head.html                # <head> 标签内容
│   ├── header.html              # 页头（Logo、导航）
│   ├── footer.html              # 页脚（版权、链接）
│   ├── hero.html                # Hero区域（标题、CTA）
│   ├── testimonials.html        # 证言展示
│   ├── pricing-table.html       # 价格表格
│   ├── features.html            # 产品特性列表
│   └── payment-form.html        # 支付表单（Stripe）
│
└── shortcodes/
    ├── stripe_button.html       # Stripe支付按钮
    ├── cta_button.html          # 通用CTA按钮
    ├── summary_box.html         # 高亮摘要框
    └── testimonial_card.html    # 单个证言卡片
```

### 4.2 模板读取数据示例

**pricing-table.html (Partial):**

```html
{{ $pricing := site.Data.pricing }}

<div class="pricing-grid">
  <!-- 单品方案 -->
  <div class="pricing-card">
    <h3>{{ $pricing.single.name }}</h3>
    <p>{{ $pricing.single.description }}</p>
    <div class="price">
      <span class="current">${{ $pricing.single.price }}</span>
      <span class="original">${{ $pricing.single.original_price }}</span>
    </div>
    <ul>
      {{ range $pricing.single.features }}
      <li>{{ . }}</li>
      {{ end }}
    </ul>
    {{ partial "shortcodes/stripe_button.html" (dict
      "price_id" $pricing.single.stripe_price_id
      "label" "Buy Now"
    ) }}
  </div>

  <!-- 重复其他方案 -->
</div>
```

**testimonials.html (Partial):**

```html
{{ $testimonials := site.Data.testimonials.testimonials }}

<section class="testimonials">
  <h2>What Our Customers Say</h2>

  <div class="testimonials-grid">
    {{ range $testimonials }}
    <div class="testimonial-card">
      {{ if .avatar }}
      <img src="{{ .avatar }}" alt="{{ .name }}">
      {{ end }}

      <div class="rating">
        {{ range (seq .rating) }}⭐{{ end }}
      </div>

      <blockquote>{{ .quote }}</blockquote>

      <cite>
        {{ .name }}
        {{ if .location }}, {{ .location }}{{ end }}
      </cite>

      {{ if .verified }}
      <span class="verified">✓ Verified Purchase</span>
      {{ end }}
    </div>
    {{ end }}
  </div>
</section>
```

---

## 5. 当前实现（Phase 1）

### 5.1 Phase 1 特性

**目标用户：** 单个开发者/小团队

**编辑方式：** 直接在 GitHub Web 界面编辑 TOML 文件

**功能范围：**
- ✅ 配置驱动的产品展示
- ✅ Stripe 支付集成
- ✅ 响应式设计
- ✅ 数据文件可视化（TOML格式）
- ✅ Git 版本控制
- ✅ 自动部署（Cloudflare Pages）

**不包含：**
- ❌ 多租户支持
- ❌ CMS 集成（Notion/飞书）
- ❌ 用户权限管理
- ❌ Dashboard 界面

### 5.2 工作流程

```
1. 开发者编辑 data/products.toml
   ↓
2. Git commit & push
   ↓
3. Cloudflare Pages 自动检测
   ↓
4. Hugo 构建静态站点
   ↓
5. 部署到全球 CDN
   ↓
6. 3-5分钟后，网站更新生效
```

### 5.3 GitHub 可视化

**在 GitHub Web 界面可以：**

1. **查看产品配置**
   - 访问 `https://github.com/user/repo/blob/main/data/products.toml`
   - 直观的 TOML 语法高亮
   - 清晰的字段注释

2. **编辑配置**
   - 点击"Edit"按钮
   - 直接修改价格、文案等
   - 提交 commit

3. **查看历史**
   - Git History 显示所有修改记录
   - 对比不同版本的差异
   - 可回滚到任意版本

4. **协作审查**
   - Pull Request 审核修改
   - Code Review 流程
   - 评论和讨论

---

## 6. 未来扩展计划（Phase 2-3）

### 6.1 Phase 2：CMS 集成（3-6个月）

**目标：** 让非技术团队也能编辑内容

**方案：** 多数据源适配器

```
数据源选项（二选一）:
├── Notion Database
├── 飞书多维表格
├── Airtable
└── Google Sheets

         ↓ (自动同步)

Cloudflare Worker (Sync Engine)
├── 定时轮询数据源
├── 转换为标准格式
├── 自动提交到 GitHub
└── 触发重新部署

         ↓

GitHub Repository (保持为单一数据源)
```

**优势：**
- 运营人员用熟悉的工具（Notion/飞书）
- 技术人员仍可直接编辑 GitHub
- Git 保留完整历史记录
- 无冲突（单向同步）

**实施要点：**
- 每个产品仓库配置 `.cms-config.toml` 指定数据源
- Worker 按配置选择对应的 Adapter
- 保留当前的数据结构（向后兼容）

### 6.2 Phase 3：SaaS 化（6-12个月）

**目标：** 作为服务对外提供

**核心功能：**

```
HugoCMS Platform
├── 用户注册/登录
├── 站点管理 Dashboard
├── 数据源连接向导
├── 实时同步监控
├── 使用量统计
└── 订阅计费（Stripe）
```

**技术架构：**
- Frontend: Next.js + Tailwind
- Backend: Cloudflare Workers + Durable Objects
- Database: Cloudflare D1
- Storage: Cloudflare R2
- Auth: Clerk / Auth0

**定价模型：**
- 免费版：1个站点，每15分钟同步
- Pro版：$29/月，5个站点，每5分钟同步
- 企业版：$199/月，无限站点，实时同步

**详见：** [ROADMAP.md](./ROADMAP.md)

---

## 7. 技术决策记录

### 7.1 为什么选择 TOML 而不是 JSON？

**优势：**
- ✅ Hugo 原生支持 TOML
- ✅ 更易读（支持注释）
- ✅ 适合人类编辑
- ✅ 严格的类型系统

**对比：**
```toml
# TOML - 清晰易读
[pricing.single]
name = "Single Decree"
price = 99

# JSON - 不支持注释，语法冗余
{
  "pricing": {
    "single": {
      "name": "Single Decree",
      "price": 99
    }
  }
}
```

### 7.2 为什么选择 Cloudflare 而不是 Netlify？

| 维度 | Cloudflare | Netlify |
|-----|-----------|---------|
| **构建速度** | 快 | 中等 |
| **全球CDN** | 300+ 节点 | ~200 节点 |
| **价格** | 免费额度大 | 免费额度小 |
| **Workers集成** | 原生 | 需要Functions |
| **中国访问** | 较好 | 较差 |

**结论：** Cloudflare 更适合全球化产品

### 7.3 为什么不用 WordPress/Shopify？

**WordPress：**
- ❌ 需要服务器（非静态）
- ❌ 性能较差
- ❌ 安全风险（PHP、数据库）
- ✅ 但生态强大

**Shopify：**
- ❌ 月费贵（$29起）
- ❌ 交易手续费（2%）
- ❌ 定制困难
- ✅ 但功能全面

**Hugo Commerce Theme：**
- ✅ 完全静态（极快）
- ✅ 零运维成本
- ✅ 完全可控
- ❌ 但需要技术背景

**定位：** 面向技术型创业者、开发者的轻量级方案

---

## 8. 安全考虑

### 8.1 敏感信息管理

**原则：** 永远不要在代码中硬编码密钥

**实践：**

```toml
# ❌ 错误 - 直接写在配置文件
[params.stripe]
secret_key = "sk_live_xxxx"  # 危险！会提交到Git

# ✅ 正确 - 只存储公开密钥
[params.stripe]
publishable_key = "pk_live_xxxx"  # 安全，可以公开
worker_url = "https://api.example.com"  # Worker处理密钥
```

**敏感信息存储：**
- Stripe Secret Key → Cloudflare Workers 环境变量
- Webhook Secret → Cloudflare Workers 环境变量
- Notion API Key → Cloudflare Workers Secrets

### 8.2 支付安全

**Stripe 集成最佳实践：**

1. **前端只使用 Publishable Key**
2. **Secret Key 只在 Worker 中使用**
3. **验证 Webhook 签名**（防止伪造）
4. **Price ID 在 Worker 中二次验证**（防止篡改）
5. **使用 HTTPS（Cloudflare 自动）**

---

## 9. 性能优化

### 9.1 构建性能

**Hugo 优化：**
- 使用 `--minify` 压缩 HTML/CSS/JS
- 启用 `--gc` 清理未使用资源
- 缓存 `resources/` 目录

**Tailwind 优化：**
- JIT 模式（只生成使用的类）
- PurgeCSS 移除未使用样式
- CSS 压缩

### 9.2 运行时性能

**图片优化：**
- WebP 格式
- 响应式图片（`srcset`）
- 懒加载（`loading="lazy"`）

**JavaScript 优化：**
- 延迟加载非关键 JS
- Stripe.js 按需加载
- 无 jQuery 依赖

**CDN 缓存：**
- 静态资源：缓存 1 年
- HTML：缓存 1 小时
- 使用 `Cache-Control` 头

---

## 10. 开发指南

### 10.1 本地开发环境

**要求：**
- Hugo >= 0.112.0 (Extended)
- Node.js >= 18.x
- Git

**启动步骤：**

```bash
# 1. 克隆仓库
git clone https://github.com/user/your-product-site.git
cd your-product-site

# 2. 安装依赖
npm install

# 3. 启动开发服务器
hugo server -D

# 4. 访问 http://localhost:1313
```

### 10.2 修改配置

**修改产品名称：**
```bash
# 编辑 data/products.toml
vim data/products.toml

[product]
name = "Your New Product Name"  # 修改这里
```

**修改价格：**
```bash
# 编辑 data/pricing.toml
vim data/pricing.toml

[pricing.single]
price = 79  # 从 99 改为 79
```

**实时预览：**
- 保存文件后，浏览器自动刷新
- 无需重启 Hugo Server

### 10.3 部署流程

**Cloudflare Pages 自动部署：**

```bash
# 1. 提交修改
git add .
git commit -m "Update pricing"

# 2. 推送到 GitHub
git push origin main

# 3. Cloudflare Pages 自动检测
#    → 触发构建
#    → 3-5 分钟后生效
```

---

## 11. 故障排查

### 11.1 常见问题

**问题：修改配置后网站没更新**

```bash
# 解决方案1：清理缓存
rm -rf public/ resources/
hugo server

# 解决方案2：检查 TOML 语法
# 访问 https://www.toml-lint.com/ 验证语法

# 解决方案3：查看 Hugo 日志
hugo server --verbose
```

**问题：Stripe 支付失败**

```bash
# 检查清单：
1. Stripe Price ID 是否正确？
2. Publishable Key 是否匹配环境（test/live）？
3. Worker URL 是否可访问？
4. Worker 环境变量是否配置？
```

**问题：样式错乱**

```bash
# 重新编译 Tailwind CSS
npm run build

# 或清理资源
hugo --gc
```

### 11.2 调试技巧

**查看 Hugo 生成的数据：**

```html
<!-- 在模板中添加调试输出 -->
<pre>{{ site.Data.pricing | jsonify (dict "indent" "  ") }}</pre>
```

**查看环境变量：**

```html
{{ range $key, $value := site.Params }}
  <p>{{ $key }}: {{ $value }}</p>
{{ end }}
```

---

## 12. 贡献指南

### 12.1 主题开发

如果你想为主题贡献代码：

```bash
# 1. Fork 主题仓库
# 2. 创建功能分支
git checkout -b feature/new-layout

# 3. 开发并测试
# 4. 提交 Pull Request
```

### 12.2 报告 Bug

**提供以下信息：**
- Hugo 版本：`hugo version`
- Node 版本：`node --version`
- 操作系统
- 错误截图
- 复现步骤

---

## 13. 附录

### 13.1 相关文档

- [CONFIGURATION.md](./CONFIGURATION.md) - 详细配置说明
- [GETTING_STARTED.md](./GETTING_STARTED.md) - 快速开始指南
- [ROADMAP.md](./ROADMAP.md) - 功能路线图

### 13.2 参考资料

- [Hugo 官方文档](https://gohugo.io/documentation/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Stripe API 文档](https://stripe.com/docs/api)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)

### 13.3 灵感来源

- [Hugo Product Launch](https://github.com/janraasch/hugo-product-launch) - Jan Raasch
- [Tailwind UI](https://tailwindui.com/) - 设计灵感
- [Gumroad](https://gumroad.com/) - 简洁的产品页面

---

## 更新日志

| 版本 | 日期 | 变更 |
|-----|------|------|
| 0.1.0 | 2024-10-22 | 初始版本，Phase 1 架构设计 |

---

**维护者：** [Your Name]
**最后更新：** 2024-10-22
