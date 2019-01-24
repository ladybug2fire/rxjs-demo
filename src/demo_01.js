/**
 * 常用操作符试练
 */

import * as rxjs from 'rxjs'
import { map, filter, scan, mapTo } from 'rxjs/operators'

const Log = console.log

const createHello = rxjs.Observable.create((observer) => {
  observer.next('hello')
  observer.next('world')
})
createHello.subscribe(x => Log(x))

/**
 * of 依次接受多个任意类型的值依此创建observable对象
 */
let ofSomeThing = rxjs.of({ name: 'Brian' }, [1, 2, 3], function hello () {
  return 'Hello'
})
ofSomeThing.subscribe(x => Log(x))

let testScan = rxjs.of(1, 2, 3)
testScan.pipe(mapTo(2), scan((a, b) => a + b, 0)).subscribe(x => Log(x))
