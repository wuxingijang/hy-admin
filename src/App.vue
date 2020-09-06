<template>
  <div id="app">
    <keep-alive include="expand">
      <router-view></router-view>
    </keep-alive>
    
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
