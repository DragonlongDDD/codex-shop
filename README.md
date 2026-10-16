# 山野 · 餐馆首页

基于 Vue 3、Composition API 和 Vite 实现的中文餐馆首页。

## 本地预览

需要 Node.js 22.12+（或 20.19+）。

```sh
npm install
npm run dev
```

打开 http://127.0.0.1:4173。开发服务器支持热更新。

## 构建与预览

```sh
npm run build
npm run preview
```

构建产物位于 `dist/`，可部署到静态托管服务。`node server.cjs` 仍可用于提供已构建的静态文件，运行前需要先执行 `npm run build`。开发服务与预览服务共用 4173 端口，请勿同时运行。

## 项目结构

- `src/App.vue`：首页布局、移动导航和组件组合。
- `src/components/SeasonalMenu.vue`：菜品数据、响应式筛选和键盘导航。
- `src/components/BookingDialog.vue`：订位表单、原生对话框和信息预览。
- `src/styles.css`：全局样式与移动端适配。

订位表单不会发送或存储个人信息，营业与菜品信息为概念示例。图片来自 Unsplash，字体使用 Google Fonts，均需要网络；字体加载失败时使用系统宋体。
