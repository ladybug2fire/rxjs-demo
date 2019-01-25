<template>
  <div>
    <h3>demo4 各种map方法运用</h3>
    <button
      class="btn"
      v-stream:click="getConcatMapCount$"
    >点击获取concatMapCount$</button>
    <p>{{ concatMapCount$ }}</p>
    <button
      class="btn"
      v-stream:click="getSwitchMapCount$"
    >点击获取switchMapCount$</button>
    <p>{{ switchMapCount$ }}</p>
    <button
      class="btn"
      v-stream:click="getExhaustMapCount$"
    >点击获取exhaustMapCount$</button>
    <p>{{ exhaustMapCount$ }}</p>
    <button @click="changeValue">12</button>
    <button @click="getValue">12</button>
  </div>
</template>

<script>
/**
 * 测试 Vue Rx 
 */
import Vue from 'vue'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'
Vue.use(VueRx, Rx)

import { Observable, interval, fromEvent, merge, empty, timer } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, catchError } from 'rxjs/operators'
import { switchMap, mapTo, startWith, takeWhile, scan } from 'rxjs/operators'

export default {
    data () {
        return {
            count: 0,
        }
    },
    domStreams: [
        'getConcatMapCount$',
        'getSwitchMapCount$',
        'getExhaustMapCount$'
    ],
    subscriptions () {
    /**
     * 下面的operator会把一个Observable转化成另外一个Observable
     * 通过返回一个观察流继续处理数据
     */
        return {
            /**
       * 当你连续点击按钮多次获取数据时，cancatMap会将获取到的数据按队列发出
       */
            concatMapCount$: this.getConcatMapCount$.concatMap(e => {
                return Observable.from(this.getCount())
            }),
            /**
       * 当你连续点击按钮多次获取数据时，switchMap只会将最后一个点击发出的值发出，前面发出的值会被吞掉
       */
            switchMapCount$: this.getSwitchMapCount$.switchMap(e => {
                return Observable.from(this.getCount())
            }),
            /**
       * 当你连续点击按钮多次时，exhaustMap仅执行一次，在第一次值发出后，才可以继续点击下一次发出值
       */
            exhaustMapCount$: this.getExhaustMapCount$.exhaustMap(e => {
                return Observable.from(this.getCount())
            })
        }
    },
    methods: {
        getCount () {
            return new Promise((resolve, reject) => {
                this.count++
                setTimeout(() => {
                    resolve(this.count)
                }, 2000)
            })
        },
        changeValue () {
            this.$set(this.fieldProp, 'value', 123)
        },
        getValue () {
            alert(this.$refs.field.getModel())
        }
    },
    mounted () {
    }
}
</script>