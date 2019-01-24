/**
 * ReplaySubject 可以缓存配置数量的值
 */
import { interval, ReplaySubject } from 'rxjs'
import { take } from 'rxjs/operators'
const Log = console.log

var sub = new ReplaySubject(5)

sub.subscribe(x => Log('A', x))
setTimeout(() => {
  sub.subscribe(x => Log('B', x))
}, 3000)
setTimeout(() => {
  sub.subscribe(x => Log('C', x))
}, 5000)

interval(1000).pipe(take(5)).subscribe(sub)
