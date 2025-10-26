# Component Previews - 组件预览系统

这个目录包含了所有已模块化组件的可视化预览页面。

## 📁 文件结构

```
component-previews/
├── index.html           # 主索引页面（入口）
├── cta-sidebar.html     # CTA 侧边栏组件预览
├── cta-inline.html      # CTA 正文按钮组件预览
├── callout.html         # Callout 提示框组件预览
└── README.md            # 本说明文件
```

## 🚀 如何使用

### 方法 1：直接打开浏览器

直接在浏览器中打开 `index.html` 文件即可查看所有组件预览。

```bash
# macOS
open /Users/ming/Documents/HUGO/commerce-projects/hugo-commerce-theme/docs/component-previews/index.html

# 或者在 Finder 中双击 index.html
```

### 方法 2：使用本地服务器

如果你想要更好的预览体验，可以启动一个本地服务器：

```bash
cd /Users/ming/Documents/HUGO/commerce-projects/hugo-commerce-theme/docs/component-previews

# Python 3
python3 -m http.server 8000

# 然后在浏览器打开: http://localhost:8000
```

## 📋 已包含的组件

### 1. CTA Sidebar Component
**文件**: `cta-sidebar.html`

- ✅ 3 种变体：Default / Compact / Minimal
- ✅ 3 种颜色主题：Green / Blue / Purple
- ✅ 评价徽章 + 功能列表 + 产品图片

### 2. CTA Inline Component
**文件**: `cta-inline.html`

- ✅ 2 种尺寸：Hero / Standard
- ✅ 4 种颜色：Green / Blue / Red / Purple
- ✅ 超大英雄按钮 + 强烈视觉冲击

### 3. Callout Component
**文件**: `callout.html`

- ✅ 5 种变体：Warning / Info / Success / Danger / Highlight
- ✅ 3 种尺寸：Normal / Large / Compact
- ✅ 自动图标 + 可选标题

## 💡 特性

- **完全独立**: 所有预览页面使用 CDN 引入 Tailwind CSS，无需构建
- **实时预览**: 直接在浏览器中查看组件效果
- **代码示例**: 每个变体都包含 Hugo shortcode 使用示例
- **参数说明**: 详细的参数表格，方便查阅
- **响应式**: 所有预览都支持响应式布局

## 🔗 相关文档

- [ARCHITECTURE.md](../ARCHITECTURE.md) - 架构文档
- [CONFIGURATION.md](../CONFIGURATION.md) - 配置指南
- [GETTING_STARTED.md](../GETTING_STARTED.md) - 快速开始
- [ROADMAP.md](../ROADMAP.md) - 产品路线图

## 📝 维护说明

每次添加新组件或更新现有组件时，请记得：

1. 在 `component-previews/` 目录下创建对应的预览页面
2. 更新 `index.html` 添加新组件的入口卡片
3. 包含所有变体的完整预览
4. 提供代码示例和参数说明

## 🎨 技术栈

- **HTML5**: 标准 HTML 结构
- **Tailwind CSS**: 通过 CDN 引入（`cdn.tailwindcss.com`）
- **Pure CSS**: 少量自定义样式（内联在 `<style>` 标签中）
- **无需构建**: 直接在浏览器中打开即可使用

---

**Created**: 2025-10-22
**Last Updated**: 2025-10-22
**Hugo Commerce Theme** - Component Preview System
