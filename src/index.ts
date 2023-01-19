import { Context, Schema, Service } from 'koishi'
import { schedule } from 'node-cron'

declare module 'koishi' {
  interface Context {
    cron(input: string, callback: () => void): () => boolean
  }
}

class Cron extends Service {
  static readonly methods = ['cron']

  constructor(ctx: Context, private config: Cron.Config) {
    super(ctx, '__cron__', true)
  }

  cron(input: string, callback: () => void) {
    const task = schedule(input, callback)
    return this.caller.collect('cron', () => (task.stop(), true))
  }
}

namespace Cron {
  export interface Config {}

  export const Config: Schema<Config> = Schema.object({})
}

Context.service('__cron__', Cron)

export default Cron
