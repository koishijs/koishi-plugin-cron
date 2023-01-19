import { Context } from 'koishi'
import { expect } from 'chai'
import { install, InstalledClock } from '@sinonjs/fake-timers'
import * as jest from 'jest-mock'
import cron from '../src'

const ctx = new Context()

ctx.plugin(cron)

let clock: InstalledClock
const callback = jest.fn()

before(async () => {
  clock = install({ now: new Date('2000-1-1 1:00') })
  await ctx.start()
})

after(async () => {
  await ctx.stop()
  clock.uninstall()
})

describe('koishi-plugin-cron', () => {
  it('basic support', async () => {
    ctx.cron('* * * * *', callback)
    clock.tick(120 * 1000)
    expect(callback.mock.calls).to.have.length(2)
  })
})
