# 示例
```ts
import {} from 'koishi-plugin-cron'
export const inject = ['cron']
export function apply(ctx: Context) {
  ctx.cron('0 0 * * *', async () => {
    // 在每天 0 点执行
  });
}
```
