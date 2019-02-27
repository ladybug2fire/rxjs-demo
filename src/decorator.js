/* eslint-disable no-extend-native */
Function.prototype.before = function (beforeFn) {
  let _self = this
  return function () {
    beforeFn.apply(this.arguments)
    return _self.apply(this.arguments)
  }
}

Function.prototype.after = function (afterFn) {
  let _self = this
  return function () {
    let ret = _self.apply(this.arguments)
    afterFn.apply(this.arguments)
    return ret
  }
}
export const before = function (...args) {
  return function (target, key, descriptor) {
    descriptor.value = descriptor.value.before(() => {
      console.log(`Action-${key} 触发埋点!`)
    })
  }
}
export const after = function (...args) {
  return function (target, key, descriptor) {
    descriptor.value = descriptor.value.after(() => {
      console.log(`Action-${key} 触发埋点!`)
    })
  }
}
