import * as rxjs from 'rxjs'
import { map, filter, scan } from 'rxjs/operators'

let o = rxjs.interval(100)
// o.pipe(
//   map(x => x * 2).subscribe(
//     x => console.log('of x' + x)
//   )
// )
o.subscribe(x => console.log('x watch', x))
o.subscribe(x => console.log('y watch', x))
// var observable = rxjs.Observable.create(function (observer) {
//   observer.next(1)
//   observer.next(2)
//   observer.next(3)
//   setTimeout(() => {
//     observer.next(4)
//     observer.complete()
//   }, 1000)
// })

// console.log('just before subscribe')
// observable.subscribe({
//   next: x => console.log('got value ' + x),
//   error: err => console.error('something wrong occurred: ' + err),
//   complete: () => console.log('done')
// })
// console.log('just after subscribe')
