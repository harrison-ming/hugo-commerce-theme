# Roadmap - 产品路线图

本文档记录 Hugo Commerce Theme 的发展规划和未来愿景。

---

## 版本策略

- **Major版本 (x.0.0)**: 重大架构变更，可能不向后兼容
- **Minor版本 (0.x.0)**: 新功能添加，向后兼容
- **Patch版本 (0.0.x)**: Bug修复和小改进

---

## Phase 1: MVP - 单用户自用版本 (当前)

**状态**: 🚧 开发中
**目标**: 为单个开发者/小团队提供可用的产品落地页主题
**时间**: 2024 Q4

### 核心功能

- [x] Hugo 主题基础结构
- [ ] 配置驱动的数据管理
  - [ ] products.toml
  - [ ] pricing.toml
  - [ ] testimonials.toml
  - [ ] branding.toml
- [ ] 响应式页面布局
  - [ ] 首页（落地页）
  - [ ] 结账页
  - [ ] 成功/失败页
- [ ] Stripe 支付集成
  - [ ] Cloudflare Worker（Checkout）
  - [ ] Cloudflare Worker（Webhook）
  - [ ] 支付表单组件
- [ ] 基础文档
  - [x] ARCHITECTURE.md
  - [x] CONFIGURATION.md
  - [x] GETTING_STARTED.md
  - [x] ROADMAP.md

### 技术栈

- Hugo >= 0.112.0
- Tailwind CSS 4.x
- Stripe API v3
- Cloudflare Workers + Pages

### 成功标准

- ✅ 可以在 30 分钟内搭建完整站点
- ✅ 配置文件清晰易懂
- ✅ 支付流程完整可用
- ✅ 文档完整准确

---

## Phase 2: CMS 集成 - 多数据源支持

**状态**: 📝 规划中
**目标**: 让非技术团队也能编辑内容
**时间**: 2025 Q1 - Q2 (3-6个月)

### 核心功能

#### 2.1 多数据源适配器

- [ ] Notion 适配器
  - [ ] 读取 Notion Database
  - [ ] 字段映射配置
  - [ ] 图片上传处理
- [ ] 飞书适配器
  - [ ] 读取飞书多维表格
  - [ ] 应用认证
  - [ ] 国内访问优化
- [ ] Airtable 适配器
  - [ ] 读取 Airtable Base
  - [ ] Formula 字段支持
- [ ] Google Sheets 适配器（可选）
  - [ ] 读取 Sheets API
  - [ ] 权限配置

#### 2.2 同步引擎

- [ ] Cloudflare Worker Sync Engine
  - [ ] 定时轮询（Cron Triggers）
  - [ ] Webhook 即时同步
  - [ ] 冲突检测
  - [ ] 错误重试机制
- [ ] 配置文件 `.cms-config.toml`
  - [ ] 指定数据源类型
  - [ ] 字段映射规则
  - [ ] 同步频率设置
- [ ] 数据转换层
  - [ ] 统一数据格式
  - [ ] TOML 生成器
  - [ ] Markdown 生成器

#### 2.3 GitHub 集成

- [ ] GitHub API 自动提交
- [ ] Commit 消息规范
- [ ] Branch 保护策略
- [ ] PR 自动创建（可选）

### 架构图

```
Notion/飞书/Airtable
        ↓
Cloudflare Worker (Sync Engine)
├── Adapter Pattern
├── Data Transformation
└── GitHub API
        ↓
GitHub Repository
        ↓
Cloudflare Pages (Auto Deploy)
        ↓
Production Website
```

### 成功标准

- ✅ 运营人员可以在 Notion/飞书 编辑，5分钟内生效
- ✅ GitHub 保留完整历史记录
- ✅ 支持多个产品各自选择数据源
- ✅ 同步失败有明确错误提示

### 技术挑战

| 挑战 | 解决方案 |
|-----|---------|
| **API 限流** | 智能队列 + 指数退避 |
| **数据一致性** | 单向同步，GitHub 为真实源 |
| **大图片处理** | 自动压缩 + CDN 上传 |
| **权限管理** | OAuth + Scoped Tokens |

---

## Phase 3: SaaS 平台 - 商业化服务

**状态**: 💡 构想阶段
**目标**: 提供托管 SaaS 服务，对外提供
**时间**: 2025 Q3 - Q4 (6-12个月)

### 核心功能

#### 3.1 用户系统

- [ ] 注册/登录
  - [ ] Email + 密码
  - [ ] GitHub OAuth
  - [ ] Google OAuth
- [ ] 用户 Dashboard
  - [ ] 站点列表
  - [ ] 使用量监控
  - [ ] 计费信息
- [ ] 团队协作
  - [ ] 邀请成员
  - [ ] 角色权限（Owner/Editor/Viewer）
  - [ ] 审批流程

#### 3.2 站点管理

- [ ] 站点创建向导
  - [ ] 选择模板
  - [ ] 连接数据源
  - [ ] 配置域名
  - [ ] 一键部署
- [ ] 可视化配置
  - [ ] 颜色选择器
  - [ ] Logo 上传
  - [ ] 实时预览
- [ ] 同步管理
  - [ ] 手动触发同步
  - [ ] 同步日志查看
  - [ ] 错误诊断

#### 3.3 计费系统

- [ ] 订阅计划
  - [ ] 免费版：1个站点
  - [ ] Pro版：$29/月，5个站点
  - [ ] 企业版：$199/月，无限站点
- [ ] Stripe Billing 集成
  - [ ] 自动扣费
  - [ ] 发票管理
  - [ ] 使用量计费
- [ ] 优惠码系统
  - [ ] 折扣码
  - [ ] 推荐奖励

#### 3.4 高级功能

- [ ] A/B 测试
  - [ ] 多版本落地页
  - [ ] 转化率统计
- [ ] 分析面板
  - [ ] 访问量统计
  - [ ] 转化漏斗
  - [ ] 收入报表
- [ ] 自动化营销
  - [ ] 邮件序列
  - [ ] 弹窗优惠
  - [ ] 再营销像素

### 技术架构

```
┌─────────────────────────────────────┐
│  Frontend (Web App)                 │
│  - Next.js 15                       │
│  - Tailwind CSS                     │
│  - shadcn/ui                        │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│  Backend API                        │
│  - Cloudflare Workers               │
│  - Hono Framework                   │
│  - Durable Objects (Session)        │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│  Database                           │
│  - Cloudflare D1 (SQLite)           │
│  - Schema Versioning                │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│  Storage                            │
│  - Cloudflare R2 (S3 Compatible)    │
│  - 用户上传的图片/资源               │
└─────────────────────────────────────┘
```

### 成功标准

- ✅ 100+ 付费用户
- ✅ $10K+ MRR
- ✅ 99% Uptime SLA
- ✅ < 3 分钟响应时间（支持）

### 商业模式

#### 定价

| 方案 | 价格 | 站点数 | 同步频率 | 功能 |
|-----|------|-------|---------|------|
| **Free** | $0 | 1 | 15分钟 | 基础功能 |
| **Pro** | $29/月 | 5 | 5分钟 | 全部功能 + 自定义域名 |
| **Enterprise** | $199/月 | 无限 | 实时 | 专属支持 + 白标 |

#### 市场定位

**目标用户：**
- 独立开发者/创业者
- 小型 SaaS 公司
- 产品猎人（Product Hunters）
- 数字产品创作者

**竞争优势：**
- ✅ 比 Tina CMS 便宜（他们 $29/站点）
- ✅ 支持飞书（中国市场独有）
- ✅ 零配置上手
- ✅ 完全基于 Cloudflare（低成本）

### 技术挑战

| 挑战 | 优先级 | 解决方案 |
|-----|-------|---------|
| **多租户隔离** | P0 | Durable Objects + Namespace |
| **性能扩展** | P0 | Workers 自动扩展 |
| **数据安全** | P0 | 加密 + 审计日志 |
| **支付安全** | P0 | Stripe Webhooks + 签名验证 |
| **全球部署** | P1 | Cloudflare 全球网络 |

---

## Phase 4: 生态扩展 - 主题市场

**状态**: 🌟 愿景阶段
**时间**: 2026+

### 核心功能

#### 4.1 主题市场

- [ ] 主题模板库
  - [ ] SaaS 产品页
  - [ ] 实体产品页
  - [ ] 课程落地页
  - [ ] 应用下载页
- [ ] 主题上传/审核
- [ ] 主题评分/评论
- [ ] 收入分成（70/30）

#### 4.2 插件系统

- [ ] 插件 API
  - [ ] Shortcode 扩展
  - [ ] 数据转换钩子
  - [ ] 自定义字段
- [ ] 插件市场
  - [ ] 邮件集成（Mailchimp/ConvertKit）
  - [ ] 评论系统（Disqus/Utterances）
  - [ ] 聊天客服（Intercom/Crisp）

#### 4.3 开发者平台

- [ ] API 文档
- [ ] SDK（JS/Python/Go）
- [ ] Webhook 订阅
- [ ] 开发者论坛

### 愿景

> "成为静态站点电商的 WordPress"
>
> - 丰富的主题生态
> - 强大的插件系统
> - 活跃的开发者社区
> - 简单易用的体验

---

## 其他功能候选（Backlog）

### 内容增强

- [ ] 动态定价（基于地理位置）
- [ ] 多货币支持
- [ ] 折扣码系统（独立于 Stripe）
- [ ] 库存管理
- [ ] 数字产品下载

### 营销工具

- [ ] 邮件收集表单
- [ ] 弹窗/横幅
- [ ] 倒计时计时器
- [ ] 社交分享优化
- [ ] Referral Program

### 技术优化

- [ ] 图片自动优化（WebP/AVIF）
- [ ] PWA 支持
- [ ] 离线模式
- [ ] 性能监控（RUM）
- [ ] 错误追踪（Sentry）

### 国际化

- [ ] 多语言内容管理
- [ ] RTL 布局支持
- [ ] 本地化支付方式
- [ ] 区域定价

---

## 贡献路线图

我们欢迎社区贡献！优先级：

### 🔥 高优先级（Hot）

适合新贡献者，影响大：
- 改进文档（拼写、示例）
- 添加新的 Shortcode
- 修复 Bug
- 添加单元测试

### ⭐ 中优先级（Want）

需要一定经验：
- 新的数据源适配器（Google Sheets）
- 性能优化
- 新的页面布局
- i18n 翻译

### 💎 低优先级（Nice to Have）

长期目标：
- SaaS 平台开发
- 插件系统设计
- 主题市场

---

## 决策记录

### 为什么选择 Cloudflare 而不是 AWS？

**原因：**
- 成本更低（免费额度大）
- 全球部署简单
- Workers 开发体验好
- 中国访问更快

**权衡：**
- AWS 生态更成熟
- 但复杂度高，成本贵

**决策：** 坚持 Cloudflare，简单优先

---

### 为什么不做 Visual Builder（可视化编辑器）？

**原因：**
- 开发成本极高（6-12 个月）
- 维护复杂
- 用户学习曲线不一定更低
- 可能限制灵活性

**替代方案：**
- Notion/飞书 已经是很好的 UI
- GitHub Web 编辑器也足够友好
- 专注数据驱动，而非拖拽

**决策：** Phase 3 之前不做可视化编辑器

---

## 版本发布计划

### v0.1.0 (2024 Q4)

- ✅ 基础主题结构
- ✅ 完整文档
- ⏳ 配置驱动
- ⏳ Stripe 集成

### v0.2.0 (2025 Q1)

- ⏳ Notion 适配器
- ⏳ 飞书适配器
- ⏳ 同步引擎

### v0.3.0 (2025 Q2)

- ⏳ 更多主题布局
- ⏳ A/B 测试基础
- ⏳ 分析面板

### v1.0.0 (2025 Q3)

- ⏳ SaaS 平台上线
- ⏳ 用户注册/登录
- ⏳ 计费系统
- ⏳ 正式商业化

---

## 如何参与

### 报告 Bug

在 [GitHub Issues](https://github.com/yourusername/hugo-commerce-theme/issues) 提交

### 功能建议

在 [Discussions](https://github.com/yourusername/hugo-commerce-theme/discussions) 讨论

### 贡献代码

1. Fork 仓库
2. 创建功能分支
3. 提交 Pull Request
4. 代码审查
5. 合并到主分支

### 赞助项目

如果你觉得这个项目有价值：
- ⭐ 在 GitHub 上 Star
- 💬 分享给朋友
- 💰 赞助开发（Patreon/GitHub Sponsors）

---

## 反馈渠道

- **GitHub Issues**: Bug 报告
- **GitHub Discussions**: 功能讨论
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)
- **Discord**: [加入社区](https://discord.gg/xxx)
- **Email**: hello@hugocms.io

---

## 更新日志

本路线图会定期更新，反映最新进展。

| 日期 | 变更 |
|-----|------|
| 2024-10-22 | 初始版本，规划 Phase 1-4 |

---

**维护者：** [Your Name]
**最后更新：** 2024-10-22

---

> "The best way to predict the future is to invent it."
> — Alan Kay

让我们一起构建静态站点电商的未来！ 🚀
