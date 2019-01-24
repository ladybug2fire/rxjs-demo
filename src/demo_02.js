/**
 * 多播测试
 */

import { from, Subject, interval, ReplaySubject } from 'rxjs'
import { multicast, refCount, take, mapTo, tap, map } from 'rxjs/operators'
const Log = console.log

const source = interval(1000).pipe(take(5))
const subject = new Subject()
const multicasted = source.pipe(tap(x => Log(x)), multicast(subject))
multicasted.subscribe(v => Log('A', v))
multicasted.subscribe(v => Log('B', v))
multicasted.subscribe(v => Log('C', v))
multicasted.connect()
/**
 * 不需要手动手动connect, 自动管理链接
 */
const refCounted = source.pipe(tap(x => Log(x)), multicast(subject), refCount())
refCounted.subscribe(v => Log('ref A', v))
refCounted.subscribe(v => Log('ref B', v))
refCounted.subscribe(v => Log('ref C', v))

var o = interval(1000).pipe(take(5))
const multi = o.pipe(multicast(() => new ReplaySubject(5)))
multi.connect()
setTimeout(() => {
  /*
     因为使用的是 ReplaySubject，订阅者会接收到 subscription 中的之前所有值。
     */
  multi.subscribe(val => console.log(val))
}, 5000)
