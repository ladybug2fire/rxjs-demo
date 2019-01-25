<template>
  <div>
    hello
  </div>
</template>

<script>
import { from } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, catchError, flatMap } from "rxjs/operators";
import fetch from "node-fetch";
export default {
  mounted() {
    const ob$ = ajax({
      url:
        "https://su.lianjia.com/ershoufang/housestat?hid=107100887050&rid=2320033373803611",
      crossDomain: true
    }).pipe(
      map(x => x.response),
      catchError(x => console.log("error", x))
    );

    ob$.subscribe(x => console.log(x));
  }
};
</script>

<style scoped>
</style>