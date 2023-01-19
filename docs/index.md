# koishi-plugin-cron

koishi-plugin-cron 提供了名为 `ctx.cron()` 的 API，用于分配定时任务。

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
