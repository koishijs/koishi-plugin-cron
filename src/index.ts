import { Context, Schema } from 'koishi'
import { CronExpression, parseExpression } from 'cron-parser'

declare module 'koishi' {
  interface Context {
    cron(input: string, callback: () => void): () => void
  }
}

class Task {
  public timer: NodeJS.Timeout

  constructor(public expr: CronExpression, public callback: () => void) {
    this.start()
  }

  start() {
    this.timer = setTimeout(() => {
      this.callback()
      this.start()
    }, this.expr.next().getTime() - Date.now())
  }

  stop() {
    clearTimeout(this.timer)
  }
}

export const name = 'cron'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.root.provide('cron')

  ctx.cron = function cron(this: Context, input: string, callback: () => void) {
    const task = new Task(parseExpression(input), callback)
    return this.collect('cron', () => task.stop())
  }

  ctx.on('dispose', () => {
    ctx.cron = null
  })
}
