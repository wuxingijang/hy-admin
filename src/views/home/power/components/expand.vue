<template>
<Card v-if="row.row.child">
    <Row v-for="item1 in row.row.child" class="center" v-if="item1.checked">
        <!-- 一级权限 -->
      <Col span="5" class="center">
            <Tag color="error" size="large" closable @on-close="removeRightByid(item1)" >
                {{item1.title}}
            </Tag>
            
      </Col>
      <!-- 二级三级权限 -->
      <Col span="19">
        <Row v-for="item2 in item1.children"  class="bdbottom center"  v-if="item2.checked">
          <Col span="6">
            <Tag color="success" size="large" closable @on-close="removeRightByid(item2)" >
                {{item2.title}}
            </Tag>
          </Col>
          <Col span="18">
            <Tag  closable @on-close="removeRightByid(item3)" type="dot" v-for="item3 in item2.children" color="primary"  v-if="item3.checked">
                {{item3.title}}
            </Tag>
          </Col>
        </Row>
      </Col>
    </Row>
</Card>
</template>
<script>
export default {
    name:"expand",
    props:['row'],
    data(){
        return{

        }
    },
    created(){
        this.FilterRow(this.row.row.child)
    },
    methods:{
        //删除权限
        removeRightByid(row){
             this.$Modal.confirm({
                    title: '通知',
                    content: `是否删除【<span style="{color:red}">${row.title}</span>】`,
                    onOk: () => {
                        this.$Message.info('删除成功');
                        row.checked=false
                        this.$emit('AlterRight',JSON.stringify(this.row.row.child),this.row.index)
                        // 修改vuex中状态
                        //this.$store.commit("delright",[this.row.index,this.row.row.child])
                    },
                    onCancel: () => {
                        this.$Message.info('取消删除');
                    }
                });
        },
        //进行数据过滤
        //该函数处理，有第三层有权限，默认勾选一级二级权限
        FilterRow(row){
            row.forEach((item1,index1) => {
                //一级权限
                item1.children.forEach((item2,index2)=>{
                    //二级 权限
                item2.children.forEach((item3)=>{
                            //判断三级权限
                if(item3.checked){
                    row[index1].checked=true
                    row[index1].children[index2].checked=true
                }
            })
            })
            });
        }
    },
    beforeDestroy(){
       
    }
}
</script>
<style lang="less" scoped>
.tag{
    margin: 5px 0;
   
    
}
.center{
    display: flex;
    align-items: center;
    padding: 5 0px;
}
.bdtop{
    border-top: 1px solid #eee;
}
.bdbottom{
    border-bottom: 1px solid #eee;
    padding: 5px 0;
}
</style>