/* eslint-disable vue/no-dupe-keys */
/* eslint-disable no-unused-vars */
<template>
    <div id='staff'>
         <Layout :style="{padding: '0 24px 24px'}" >
                    <!-- //导航路径 -->
            <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                <BreadcrumbItem>账号管理</BreadcrumbItem></BreadcrumbItem>
            </Breadcrumb>
                    <!-- 导航路径 结束-->
                    <!-- 卡片 -->
            <Card class="Card-item">
            <!-- row采用24布局,gutter表示间隙 -->
                <Row :gutter="20">
                    <Col span="6">
                        <Input icon ="md-podium" 
                        @on-change="enter"
                        @on-clear="clear"
                        placeholder="搜搜" 
                        v-model.lazy="queryinfo.query" 
                        clearable>
                        </Input>
                    </Col>
                    <Col span="6">
                        <Button type="info" @click="isModal=true">添加账号</Button>
                    </Col>
                </Row>
                <Table 
                    :columns="title" 
                    :data="userdata" 
                    class="table"
                    border
                    stripe>
                    <!-- 自定义渲染，slot必须要做title中定义 -->
                    <template slot-scope="{row}" slot="active">
                        <i-switch v-model="row.active" @on-change="userStatechange(row.job)"/>
                    </template>
                     <template slot-scope="{row}" slot="operate">
                          <Tooltip content="修改账号" placement="top" transfer>
                                <Button icon="ios-build" type="primary" @click="showEditDialog(row.job)" size="small"></Button>
                        </Tooltip>
                     
                         <Tooltip content="删除账号" placement="top">
                              <Button icon="ios-trash-outline" type="error" size="small" @click="deluser(row.job)"></Button>
                        </Tooltip>
                        <!-- 提示效果 -->
                        <Tooltip content="分配权限" placement="top">
                             <Button icon="ios-hammer" type="warning" size="small"></Button>
                        </Tooltip>
                    </template>
                </Table>
                <!-- 分页显示 -->
                <Page :total='total' show-sizer :page-size="2" 
                :current.sync="queryinfo.pagenum"
                @on-change="CurrentPage"
                @on-page-size-change="CurremtPageany"
                :page-size-opts="[2,4,10]"
                />
                <!-- 新建用户的弹窗 -->
            <Modal
                v-model="isModal"
                title="新建用户"
                @on-ok="adduser"
                @on-cancel="close">
                <Form :model="addform" :rules="addFormRules" ref="addFormRef">
                <FormItem label="用户名" prop="username">
                    <Input placeholder="用户名" v-model="addform.name"></Input>
                </FormItem>
                 <FormItem label="密码" prop="password">
                    <Input password placeholder="密码" v-model="addform.password" type="password"></Input>
                </FormItem>
                <FormItem label="性别" prop="sex">
                    <RadioGroup v-model="addform.sex">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                     </RadioGroup>
                </FormItem>
                 <FormItem label="电话" prop="phone">
                    <Input placeholder="电话" v-model="addform.phone"></Input>
                </FormItem>
                 <FormItem label="部门:" prop="section">
                    <Select v-model="addform.department" style="width:200px">
                        <Option value="人事" >人事</Option>
                        <Option value="总经办" >总经办</Option>
                        <Option value="董事会" >董事会</Option>
                        <Option value="基层员工" >基层员工</Option>
                    </Select>
                </FormItem>
                </Form>
            </Modal>

            <!-- 修改用户 -->
            <Modal @on-cancel="close" @on-ok="editsubmit" v-model="isshowEditDialog" title="修改账号">
                <Form ref="editfrom" :model="editfromdata" :rules="editfromrule" :label-width="80">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="editfromdata.name" disabled placeholder=""></Input>
                    </FormItem>
                    <FormItem label="手机" prop="phone">
                        <Input v-model="editfromdata.phone" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="部门" prop="department">
                        <Input v-model="editfromdata.department" placeholder=""></Input>
                    </FormItem>
                </Form>
            </Modal>
            </Card>
        </Layout>
    </div>
</template>
<script>
import {mapState,mapMutations} from "vuex"
import { login } from '../../../network/login/login'

export default {
    data(){
        //自定义手机验证规则
        const verifyphone=(rule,value,callback)=>{
            let reg=/^1[3456789]\d{9}$/g
            if(reg.test(value)){
                return callback()
            }
            callback(new Error('请输入合法的手机号'))
        }
        return {
            //添加用户
            addform:{
                job:'',
                name:'',
                passowrd:"",
                phone:"",
                sex:"男",
                department:'基层员工',
                active:true
            },
            //修改用户
             editfromdata:{
                job:'',
                name:'',
                phone:'',
                department:''
             },
            // 控制添加用户对话框的显示和隐藏
            isModal:false,
            //控制修改用户对话框的显示和隐藏
            isshowEditDialog:false,
            // 页数相关的参数对象
            queryinfo:{
                query:'',
                // 当前页数
                pagenum:1,
                // 记录每页显示多少条数据
                pagesize:2
            },
            //标题
            title:[],
            //数据内容
            userdata:[],
            //共多少条数据
            total:Number,
            //新增用户表单验证规则
            addFormRules:{
                name:[
                    {required:true,message:"请输入用户名",trigger:'blur'},
                    {min:3,max:7,message:"用户名长度为3到7"}
                ],
                password:[
                    {required: true, message:'密码不能为空', trigger: 'blur'},
                    {min: 5, max:16,message:'密码为8到16', trigger: 'blur'}
                ],
                phone:[
                    
                        {required: true, message:'输入手机号码', trigger:'blur'},


                        {validator:verifyphone,trigger:'blur'}
                    
                ],
                sex:[
                    {required: true, message:'  ', trigger: 'blur'}
                ]
                
            },
            //修改用户表单验证规则
            editfromrule:{
                phone:[
                    {required: true, message:'请输入', trigger: 'blur'}
                    ,
                    {validator:verifyphone,trigger:'blur'}
                ],
                department:[
                     {required: true, message:'请输入', trigger: 'blur'}
                ]
                
            }

        }
    },
    created(){
      this.getuserdata()
      this.title=this.useradmin.title
      this.total=this.useradmin.userdata.length
      this.userdata=this.useradmin.userdata.slice(0,2)
    },
    computed:{
        ...mapState(['useradmin','index']),
        monitor(){
            return this.useradmin.userdata
            
        }

    }
    ,
    methods:{
        ...mapMutations(['userstate','getuserdata','filteruserdate','setuserdata']),
       //修改账号信息
       showEditDialog(job){
           this.isshowEditDialog=true
           let row=this.$store.getters.selectuser(job);
           this.editfromdata.name=row.name,
           this.editfromdata.phone=row.phone,
           this.editfromdata.department=row.department
           this.editfromdata.job=row.job
       },
       //开关状态事件
        userStatechange (status) {
                this.$Message.success("更新状态成功");
                const i=this.useradmin.userdata.findIndex(v=>v.job===status);
                this.userstate({i:i})
        },
        CurrentPage(i){
            this.page(i)
        },
        //显示条数i
        CurremtPageany(i){
           this.queryinfo.pagesize=i
           this.CurrentPage(this.queryinfo.pagenum)
        }
        ,//页码计算
        page(INDEX){
            //当前页面-1 * 显示的数量
            const start = (INDEX-1)*this.queryinfo.pagesize
            const end =start+this.queryinfo.pagesize
            console.log(start,end);
            this.userdata=this.useradmin.userdata.slice(start,end)
        }
        ,
        //搜索
        enter(){
            this.filteruserdate({values:this.queryinfo.query})
        },
        //提交修改
        editsubmit(){
            //判断表单是否校验通过
            this.$refs.editfrom.validate(v=>{
                if(!v) return
                //提交修改
               this.$store.commit('updateuser',this.editfromdata)
               this.$Message.info('修改成功')
                 //重置表单
                this.$refs.editfrom.resetFields()
            })
           
            
        },
        //删除事件->删除用户
        deluser(row){
            this.$Modal.confirm({
            title: '警告',
            content: '<p>是否要删除该用户</p>',
            onOk: () => {
                this.$store.commit('deluser',row)
                this.$Message.info({
                    background:true,
                    content:"删除成功"
                });  
                    },
            onCancel: () => {
                this.$Message.info('取消删除');
                    }
                })
        },
        //清空搜索
        clear(){ }, 
        //添加用户
        adduser(){
           this.$refs.addFormRef.validate((v)=>{
            if(!v) return
            this.$store.commit('adduser',this.addform)
           })
        },
        //取消按钮
        close(){
           this.$refs.addFormRef.resetFields()
        }

         },
    watch:{
      monitor:{
          immediate:true,
          deep:true,
          handler(v){
             this.userdata=v.slice(0,this.queryinfo.pagesize)
          }
      }

}
}
</script>
<style lang="less" scoped>
.table{
    margin: 20px 0;
}

</style>