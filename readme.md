rxjs v6 的学习demo
## 使用方法
> * js 文件利用 babel-node 运行 每个demo 如 

    npm i -g @babel/cli @babel/core @babel/node
>
    babel-node ./src/demo_01.js

> * vue 文件需要用vue-cli@3 用法 
    
```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```
    vue serve ./src/demo_08.vue
#### 参考资料
https://rxjs-cn.github.io/learn-rxjs-operators/operators/combination/merge.html

交互式弹珠图
http://rxmarbles.com/#concat 

http://reactivex.io/rxjs/manual/overview.html

API 文档

https://rxjs-dev.firebaseapp.com/api

中文文档

https://cn.rx.js.org/class/es6/AsyncSubject.js~AsyncSubject.html

rx5 文档

https://rxjs-cn.github.io/RxJS-Ultimate-CN/content/operators-and-ajax.html

Vue-rx

https://github.com/vuejs/vue-rx

## 注意
使用babel 7 因为vue cli3 也是默认babel 7