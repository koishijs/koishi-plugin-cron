import { Context, Schema, Service } from 'koishi'
import { schedule } from 'node-cron'

declare module 'koishi' {
  interface Context {
    cron: Cron
  }
}

class Cron extends Service {
  constructor(ctx: Context, private config: Cron.Config) {
    super(ctx, 'cron')
  }

  schedule(input: string | Cron.Input, callback: () => void) {
    if (typeof input !== 'string') {
      input = [
        input.second || '*',
        input.minute || '*',
        input.hour || '*',
        input.date || '*',
        input.month || '*',
        input.day || '*',
      ].join(' ')
    }
    const task = schedule(input, callback)
    return this.caller.collect('cron', () => (task.stop(), true))
  }
}

namespace Cron {
  export interface Input {
    second?: number | string
    minute?: number | string
    hour?: number | string
    day?: number | string
    date?: number | string
    month?: number | string
  }

  export interface Config {}

  export const Config: Schema<Config> = Schema.object({})
}

export default Cron
