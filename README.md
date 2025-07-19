# 医学影像研究分析工具 (增强版)

一个专业的医学影像研究数据分析平台，支持CSV导入、在线编辑、统计分析和数据可视化功能。

## ✨ 主要功能

- 📋 **研究设计管理** - 完整的研究方案设计和参数配置
- 📊 **数据管理** - 支持CSV导入、在线编辑、数据验证
- 📈 **统计分析** - 描述性统计、相关性分析、假设检验
- 📊 **数据可视化** - 散点图、柱状图、趋势图等多种图表
- 📝 **论文报告** - 自动生成研究报告和统计结果

## 🚀 在线体验

- **Vercel 部署**: [https://your-app.vercel.app](https://your-app.vercel.app)
- **Cloudflare Pages**: [https://your-app.pages.dev](https://your-app.pages.dev)

## 📦 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **图表库**: Recharts
- **图标库**: Lucide React
- **开发语言**: JavaScript/JSX

## 🛠️ 本地开发

### 环境要求

- Node.js 16+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 预览生产版本

```bash
npm run preview
# 或
yarn preview
```

## 📊 数据格式

支持标准CSV格式，第一行为列标题：

```csv
patientId,age,gender,tumorSize,density,contrast,adcValue,lesionType,outcome
P001,45,M,2.5,85.3,45.2,1200,malignant,positive
P002,38,F,1.8,72.1,38.7,1580,benign,negative
P003,52,M,3.2,91.5,52.1,1050,malignant,positive
```

## 🚀 部署指南

### Vercel 部署

1. **准备代码**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Vercel 部署**
   - 登录 [Vercel](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 GitHub 仓库
   - 配置构建设置：
     ```
     Framework Preset: Vite
     Build Command: npm run build
     Output Directory: dist
     Install Command: npm install
     ```
   - 点击 "Deploy"

3. **环境变量** (可选)
   ```
   NODE_ENV=production
   ```

### Cloudflare Pages 部署

1. **准备代码**
   ```bash
   git add .
   git commit -m "Initial commit"  
   git push origin main
   ```

2. **Cloudflare Pages 部署**
   - 登录 [Cloudflare](https://dash.cloudflare.com)
   - 选择 "Pages" → "Create a project"
   - 连接你的 GitHub 仓库
   - 配置构建设置：
     ```
     Framework preset: None
     Build command: npm run build
     Build output directory: dist
     Root directory: /
     ```
   - 点击 "Save and Deploy"

3. **自定义域名** (可选)
   - 在 Pages 项目中选择 "Custom domains"
   - 添加你的域名并配置 DNS

## 📱 响应式设计

应用采用移动优先的响应式设计：

- **移动端** (< 768px): 单列布局，触摸友好
- **平板端** (768px - 1024px): 双列布局
- **桌面端** (> 1024px): 多列布局，完整功能

## 🔧 项目结构

```
medical-imaging-research-tool/
├── public/                 # 静态资源
│   ├── medical-icon.svg   # 应用图标
│   └── og-image.png       # 社交媒体预览图
├── src/                   # 源代码
│   ├── components/        # React 组件
│   │   └── MedicalImagingResearchTool.jsx
│   ├── App.jsx           # 主应用组件
│   ├── main.jsx          # 应用入口
│   └── index.css         # 全局样式
├── package.json          # 项目配置
├── vite.config.js        # Vite 配置
├── tailwind.config.js    # Tailwind 配置
├── postcss.config.js     # PostCSS 配置
└── README.md             # 项目文档
```

## 🎯 使用指南

### 1. 研究设计

- 填写研究标题、目的、假设
- 选择研究类型和影像模式
- 设定样本量和入排标准

### 2. 数据导入

- **CSV 导入**: 点击"导入CSV"选择本地文件
- **在线编辑**: 直接在表格中编辑数据
- **示例数据**: 生成测试数据进行体验

### 3. 统计分析

- 描述性统计：均值、标准差、中位数、范围
- 相关性分析：Pearson 相关系数和显著性检验
- 结果自动更新到可视化图表

### 4. 数据可视化

- **散点图**: 显示两变量间关系
- **柱状图**: 展示单变量分布
- **趋势图**: 多变量时序变化

### 5. 报告生成

- 自动整合研究设计和统计结果
- 生成标准学术报告格式
- 支持 Markdown 导出

## 🔬 应用场景

- **放射科研究**: CT、MRI、PET 影像数据分析
- **临床试验**: 影像生物标志物研究
- **学术论文**: 医学影像相关发表
- **教学培训**: 医学统计学实践

## 🛡️ 数据安全

- 所有数据仅在浏览器本地处理
- 不上传到任何服务器
- 支持本地导出备份
- 符合医疗数据隐私要求

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支: `git checkout -b feature/new-feature`
3. 提交更改: `git commit -am 'Add new feature'`
4. 推送分支: `git push origin feature/new-feature`
5. 提交 Pull Request

## 📄 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🆘 常见问题

### Q: CSV 导入失败怎么办？
A: 确保 CSV 文件格式正确，第一行为列标题，使用逗号分隔，编码为 UTF-8。

### Q: 统计分析结果不准确？
A: 检查数据中是否包含非数值内容，确保数值列被正确识别。

### Q: 图表不显示？
A: 确保数据集包含至少2个数值变量，且有足够的数据点。

### Q: 移动端体验不佳？
A: 建议在移动端使用横屏模式，或使用平板/桌面设备获得最佳体验。

## 📞 联系方式

- 项目地址: [GitHub](https://github.com/your-username/medical-imaging-research-tool)
- 问题反馈: [Issues](https://github.com/your-username/medical-imaging-research-tool/issues)
- 功能建议: [Discussions](https://github.com/your-username/medical-imaging-research-tool/discussions)

## 🙏 致谢

感谢以下开源项目：

- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Recharts](https://recharts.org/) - React 图表库
- [Lucide React](https://lucide.dev/) - 图标库

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
