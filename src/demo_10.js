function readonly(target, name, descriptor) {
    descriptor.writable = false
    return descriptor
  }
  
class Test {
    @readonly
    name() { return 'leevare' }
}