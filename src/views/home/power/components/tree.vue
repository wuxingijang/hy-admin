<template>
    <Modal v-model="showModal" title="通知">
         <Tree :data="TreeDate" show-checkbox></Tree>
    </Modal>
</template>
<script>
export default {
    props:['showModal','TreeDate'],
    data(){
          return{
           }
 },
 methods:{
     
 }   
}
</script>
<style lang="less">

</style>