<template>
<Layout :style="{padding: '0 24px 24px'}">
    <CustomBreadcrumb :options='options' ></CustomBreadcrumb>
    <Card>
    <Collapse simple>
        <Panel name="1">
            权限示例图
            <p slot="content">
            <img src="../../../assets/image/rights.png">
            </p>
        </Panel>
          <Panel name="2">
            权限删除示例图
            <p slot="content">
            <img src="../../../assets/image/delete.png">
            </p>
        </Panel>
    </Collapse>
    </Card>
</Layout>
</template>
<script>
import CustomBreadcrumb from '@/components/public/Breadcrumb'
export default {
    data(){
        return{
             options:{
                name:"权限管理",
                branch:"权限流程"
            }
        }
    },
    components:{
        CustomBreadcrumb
    }
    
}
</script>
<style lang='less' scoped>
    img{
        object-fit: contain;

    }

</style>