<template>
    <Layout :style="{padding: '0 24px 24px'}" >
        <CustomBreadcrumb :options="options"/>
        <Card>
            <Table :columns="rights.title"
                   :data="rights.data"
                    border
                   >
                <template slot="level" scope="{row}">
                    <Tag color="cyan" v-if="row.level===1">一级</Tag>
                    <Tag color="green" v-else-if="row.level===2">二级</Tag>
                    <Tag color="blue" v-else>三级</Tag>
                </template>
            </Table>
        </Card>
    </Layout>

</template>
<script>
import CustomBreadcrumb from '@/components/public/Breadcrumb'
export default {
    data(){
        return {
            options:{
                name:"权限管理",
                branch:"权限列表"
            },
            rights:{
                title:[
                    {
                        title:"权限名称",
                        key:"rightname"
                    },
                    {
                        title:"路径",
                        key:"path"
                    },
                    {
                        title:"权限等级",
                        key:"level",
                        slot:"level"
                    }
                ],
                data:[
                    {
                        rightname:"员工账号",
                        path:"/staff",
                        level:1
                    },
                     {
                        rightname:"考勤管理",
                        path:"/work",
                        level:2
                    }
                ]
            },
        }
    },
    created(){
        this.GetRightList()
    },
    components:{
        CustomBreadcrumb
    },
    methods:{
        //获取权限列表
        GetRightList(){
            this.$store.getters.state
        }

    }
    
}
</script>
<style lang="less" scoped>

</style>