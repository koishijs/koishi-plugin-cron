import { Context, Schema, Service } from 'koishi'
import { schedule } from 'node-cron'

declare module 'koishi' {
  interface Context {
    cron(input: string, callback: () => void): () => boolean
  }
}

class Cron extends Service {
  static methods = ['cron']

  constructor(ctx: Context, private config: Cron.Config) {
    super(ctx, 'cron', true)
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

export default Cron
