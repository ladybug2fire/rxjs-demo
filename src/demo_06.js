/**
 * share 共享多播，副作用tap只执行一次
 */
import { timer } from 'rxjs'
import {tap, mapTo, share} from 'rxjs/operators'

const source = timer(1000)

const example = source.pipe(
  tap((x) => console.log('xxx', x)),
  mapTo('ssss')
)
// const subscribe = example.subscribe(val => console.log(val))
// const subscribeTwo = example.subscribe(val => console.log(val))

const sharedExample = example.pipe(share())
/*
   ***共享的话，副作用只执行一次***
  输出:
  "***SIDE EFFECT***"
  "***RESULT***"
  "***RESULT***"
*/
const subscribeThree = sharedExample.subscribe(val => console.log(val))
const subscribeFour = sharedExample.subscribe(val => console.log(val))
