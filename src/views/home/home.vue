<template>
  <div id="home">
    <Button class="quit" type="info" @click="userexit">用户退出</Button>
  </div>
</template>
<script>
export default {
    methods:{
        userexit(){
            window.sessionStorage.removeItem('token')
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="less" scoped>
#home{
    .quit{
       
    }
}
</style>