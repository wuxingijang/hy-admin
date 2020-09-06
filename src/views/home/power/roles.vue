<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <CustomBreadcrumb :options="options"></CustomBreadcrumb>
    <Card>
      <Button type="info" @click="AddRole()">添加角色</Button>
      <Table class="roleslist" :columns="title" :data="rulesdec" border stripe>
        <template slot="operation" class="cell" slot-scope="{row}">
          <Button icon="ios-build" type="primary" size="small" @click="editdec(row._index)">编辑</Button>
          <Button icon="ios-trash-outline" type="error" size="small" @click="del(row._index)">删除</Button>
          <Button icon="ios-hammer" @click="ShowSetRightModal(row)" type="warning" size="small">分配权限</Button>
        </template>
      </Table>
    </Card>
    <!-- 分配权限 -->
    <Modal v-model="showModal" title="通知" @on-ok="saveTreeDate">
         <Tree :data="TreeDate" show-checkbox></Tree>
    </Modal>
    <Modal v-model="isAddRole" title="AddRole"   @on-ok="SaveAddRoles">
        <Form :model="FormItem" :rules='RuleFrom' ref="FormItem">
            <FormItem label="Role name" prop="name">
                <Input v-model="FormItem.name"></Input>
            </FormItem>
            <FormItem label="Role description" prop="description">
                <Input v-model="FormItem.description"></Input>
            </FormItem>
            <p>权限选择</p>
            
            <Tree :data="addrolename" show-checkbox ref="tree"></Tree>
        </Form>
    </Modal>
    <!-- 修改信息 -->
    <Modal v-model="isedit" title="edit decsciprtion" @on-ok="savedite">
        <Form :model="FormItem" :rules='RuleFrom' ref="FormItem">
            <FormItem label="Role name" prop="name">
                <Input v-model="FormItem.name"></Input>
            </FormItem>
            <FormItem label="Role description" prop="description">
                <Input v-model="FormItem.description"></Input>
            </FormItem>
    </Form>
    </Modal>
  </Layout>
</template>
<script>
import CustomBreadcrumb from '@/components/public/Breadcrumb'
import expandRow from '@/views/home/power/components/expand'
import {mapGetters}from 'vuex'
export default {
    name:"roles",
    data(){
    return{
    childrenRight:[],
    FormItem:{
        name:'',
        description:'',
        id:''

    },
    //表单验证其
    RuleFrom:{
        name:[
            {required: true, message:'请输入角色名称', trigger: 'blur'},
            {min:1,max:20, message:'请输入角色名称1-20'}
        ],
        description:[
            {required: true, message:'请输入角色描述', trigger: 'blur'},
            {min:1,max:20, message:'请输入角色名称1-20'}
        ]
    },
     //分页栏
    options:{
            name:"权限管理",
            branch:"角色列表"
                },
    
    title:[
        {
            type:'expand',
            width:100,
            render: (h, params) => {
                let create=this.$createElement
                let dom=create(expandRow,{
                    ref:"aaa",
                    props:{
                        row:params,
                    },
                  on:{
                      //接收子组件发过来的自定义事件
                      AlterRight:(v,i)=>{
                        this.childrenRight=[JSON.parse(v),i]
                      }
                    
                }})
                return dom}
        },
        {
          roleName:"角色名称",
            key:"roleName"
        },
        {
            title:"角色描述",
            key:"roleDesc"
        },
        {
            title:"操作",
            key:"operation",
            slot:"operation",
            width:300
        }
    ],
    // 用于记录分配权限的ID
    showModalId:0,
    showModal:false,
    isAddRole:false,
    isedit:false,
    //分配权限的tree数据源
    TreeDate:[],
    //添加角色的tree数据源
    addrolename:[],
    rulesdec:[],
    allRigths:'' 
        //一级菜单
    }
    },
    created(){
       this.Getroles()
    },
    mounted(){
    },
    components:{
        CustomBreadcrumb,expandRow
    },
    computed:{
        //用watch监听roles变化
        ...mapGetters(['selectroles'])
    },
    methods:{
        //删除权限
        del(id){
            this.$Modal.confirm({
                title:"警告",
                content:"<p>是否要删除该角色</p>",
                onOk:()=>{
                    this.$Message.info("del Success")
                    this.$store.commit('delay',id)
                },
                onCancel:()=>{
                    this.$Message.info("Cancel Success")
                }
            })
        },
        //更新权限
        saveTreeDate(){
           this.$store.commit('update',[this.showModalId,this.TreeDate])
           this.$Message.info('更新权限成功');
        },
        Getroles(){
            //获取全部数据
            let {data}=this.$store.state.roles
                this.rulesdec=data

        },
        //分配权限点击事件
        ShowSetRightModal(row){
            this.TreeDate=123
            this.showModal=true
            this.showModalId=row._index
            this.TreeDate=JSON.parse(JSON.stringify(this.$store.state.allRigths))
            if(this.childrenRight.length!=0){
                this.rulesdec[this.childrenRight[1]].child=this.childrenRight[0]
            }
            this.GetroleKey(this.rulesdec[row._index].child)
        },
        //对分配权限数据进行处理
        //递归获取角色权限->然后传入全部权限进行判断
        GetroleKey(roleRigths){
            roleRigths.forEach(v => {
                    try {
                        //判断是否到了第三层子权限
                         if(!v.children){
                             //把第三层的权限传入进AllRightList进行判断
                             //添加选中状态
                             if(v.checked){
                
                                this.AllRightList(this.TreeDate,v.title)
                             }
                           
                            //this.AllRightList(this.TreeDate,v.authname)
                         }
                          this.GetroleKey(v.children)  
                    } 
                    catch (error) 
                    {  
                    }                
            });
        },
        //进行角色权限跟所有权限对比，
        //相同的结果选中
        //并且生成iview Tree数据格式,添加checked选中
        AllRightList(TreeDate,RoleValue){
            TreeDate.forEach(v=>{ 
                try{
                    //判断是否是第三层权限
                    if(!v.children){
                        if (v.title==RoleValue){
                            v.checked=true
                            console.log(v)
                        }
                    }
                    this.AllRightList(v.children,RoleValue)
                }
                catch{
                }
            })
            this.TreeDate=TreeDate
        },
        AddRole(){
            this.isAddRole=true
            this.showModal=false
              this.$refs.FormItem.resetFields()
            this.addrolename=JSON.parse(JSON.stringify(this.$store.state.allRigths))
            },
       //添加角色
       SaveAddRoles(){
            this.$refs.FormItem.validate(v=>{
                console.log(v)
                if(!v) {
                    this.$Notice.error({
                        title:"错误",
                        desc:"表单验证未通过",
                    })
                    return
                }
                let setrow={
                roleName:this.FormItem.name,
                roleDesc:this.FormItem.description,
                child:this.addrolename
            }
             this.$store.commit('Addrole',setrow)
             this.$refs.FormItem.resetFields()
            })
     
        },
        //编辑角色信息
        editdec(id){
            this.isedit=true
            this.FormItem.id=id
             this.FormItem.name=this.$store.state.roles.data[id].roleName
             this.FormItem.description=this.$store.state.roles.data[id].roleDesc
            
        },
        //更改保存
        savedite(){
             this.$store.commit('editdec',[this.FormItem.id,this.FormItem.name,this.FormItem.description])    
        }
    },
    watch:{
        '$store.state.roles.data':{
            handler(){
            },
            deep:true,
            immediate:true
        }, 
}}
</script>
<style lang='less' scoped>
    img{
        width: 60%;
        object-fit: cover;

    }
    .roleslist{
        margin: 20px 0;
    }   
</style>