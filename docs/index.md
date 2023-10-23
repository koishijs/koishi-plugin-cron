# koishi-plugin-cron

koishi-plugin-cron 提供了名为 `ctx.cron()` 的 API，用于分配定时任务。

## 导入类型定义

将 `koishi-plugin-cron` 添加到你的插件依赖中。

`packages.json`:

```json
"peerDependencies": {
  "koishi": "^4.15.1",
  "koishi-plugin-cron": "^2.0.5"
}
```

在需要使用 `ctx.cron`（具体用法参下文）的文件顶部添加导入语句：

```ts
import {} from "koishi-plugin-cron";
```

## 基本用法

具体语法可以参考 [GNU Crontab](https://www.gnu.org/software/mcron/manual/html_node/Crontab-file.html)。

```ts
ctx.cron('0 0 * * *', () => {
  // 在每天 0 点执行
})

ctx.cron('15,45 * * * *', () => {
  // 在每小时的 15 分和 45 分执行
})

ctx.cron('*/2 * * * *', () => {
  // 每隔 2 分钟执行
})

ctx.cron('0 8 * * 1', () => {
  // 每周一早上 8 点执行
})
```
