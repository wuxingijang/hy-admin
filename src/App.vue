<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:"app",
  created(){
    localStorage.setItem('admin',123456)
    
  }
}
</script>
<style>
</style>
