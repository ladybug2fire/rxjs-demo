/**
 * ajax 练习, node-fetch
 */

import { from } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, catchError, flatMap } from 'rxjs/operators'
import fetch from 'node-fetch'

const nodeFetch$ = from(fetch('https://su.lianjia.com/ershoufang/housestat?hid=107100887050&rid=2320033373803611')).pipe(
  flatMap(x => x.json()),
  catchError(x => console.log('error', x))
)
nodeFetch$.subscribe(x => console.log(x))
