/**
 * AsyncSubject 只在完成时发送最后的值
 */
import * as Rx from 'rxjs'

var subject = new Rx.AsyncSubject()

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
})

subject.next(1)
subject.next(2)
subject.next(3)
subject.next(4)

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
})

subject.next(5)
subject.complete()
