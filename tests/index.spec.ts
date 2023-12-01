import { Context } from 'koishi'
import { expect } from 'chai'
import { install, InstalledClock } from '@sinonjs/fake-timers'
import * as jest from 'jest-mock'
import * as cron from '../src'

let clock: InstalledClock

before(async () => {
  clock = install({ now: new Date('2000-1-1 1:00') })
})

after(async () => {
  clock.uninstall()
})

describe('koishi-plugin-cron', () => {
  it('dispose inject', async () => {
    const ctx = new Context()
    const callback = jest.fn()
    ctx.plugin(cron)
    const fork = ctx.inject(['cron'], (ctx) => {
      ctx.cron('* * * * *', callback)
    })
    clock.tick(120 * 1000)
    expect(callback.mock.calls).to.have.length(2)
    fork.dispose()
    clock.tick(120 * 1000)
    expect(callback.mock.calls).to.have.length(2)
  })

  it('dispose provide', async () => {
    const ctx = new Context()
    const callback = jest.fn()
    const fork = ctx.plugin(cron)
    ctx.inject(['cron'], (ctx) => {
      ctx.cron('* * * * *', callback)
    })
    clock.tick(120 * 1000)
    expect(callback.mock.calls).to.have.length(2)
    fork.dispose()
    clock.tick(120 * 1000)
    expect(callback.mock.calls).to.have.length(2)
  })
})
