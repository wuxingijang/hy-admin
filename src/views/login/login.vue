<template>
    <div class='login_container'>
            <div class="login_box">
                <!-- logo开始 -->
                <div class="login_avatar">
                    <img src="@/assets/logo.png" alt="">
                </div>
                <!-- logo结束 -->

                <!-- 公司名开始 -->
                <div class="login_title">
                 汇业人力外包资源管理平台
                </div>
                
                <!-- 公司名结束 -->

                      <!-- 表单开始 -->
                <div class="from">
                    <Form 
                    ref="loginForm" 
                    class="from_box"
                    :model="loginForm"
                    :rules="loginFormRules">
                        <!-- //用戶名 -->
                         <FormItem prop="username">
                            <Input 
                            type="text"
                            size="large"
                            prefix="md-person-add"
                            v-model="loginForm.username"
                            ></Input>
                        </FormItem>
                          <!-- //用戶名結束 -->
                          <!-- 密碼開始 -->
                        <FormItem prop="password">
                            <Input type="password" 
                            password 
                            size="large" 
                            prefix="md-lock"
                            v-model="loginForm.password">
                            </Input>
                        </FormItem>
                        <!--密碼結束 -->
                        <!-- 暗流開始 -->
                        <FormItem class="btns">
                            <Button @click="login" type="info">登录</Button>
                            <Button @click="resetform">重置</Button>
                        </FormItem>
                        <!-- 暗流結束 -->
                    </Form>
                </div>
            </div>
        <!-- 變淡結束 -->
    </div>
    
</template>
<script>
export default {
    name:'login',
    components:{
 
    },
    data(){
        return{
            loginForm:{
                username:'admin',
                password:'123456'

            },
            //表达验证规则
            loginFormRules:{
                //验证用户名是否合法
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    {
                        min:3,max:7,message:"用户名长度应该为3-7位"
                    }
                ],
                //验证用户名是否
               password:[
                   { required: true, message: '密码不能为空', trigger: 'blur' },
                    {
                        min:6,max:16,message:"密码长度因该为6-16位"
                    }
               ] 
            }
        }
    },
    created(){

    },
    methods:{
        resetform(){
            //清理表单内容
            this.$refs.loginForm.resetFields()
        },
        //获取表单验证结果
        login () {
            this.$refs.loginForm.validate(async v=>{
               if(!v) return
                   if(localStorage.getItem(this.loginForm.username)){
                       if(this.loginForm.password===localStorage.getItem(this.loginForm.username)){
                           this.$Message.success('登录成功！');
                           //设置token 一般是后台传过来的
                           window.sessionStorage.setItem('token','21232F297A57A5A743894A0E4A801FC3')
                           this.$router.push('/home')
                       }
                       else{
                            this.$Message.error('密码错误');
                       }
                   }
                   else{
                       this.$Message.error('用户名不存在！');
                   }
                
            })
        }
}
}
</script>
<style lang="less" scoped>
.login_container{
    background-color: rgb(80, 160, 160);
    height: 100%;
    position: relative;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    box-shadow: 10px -10px 30px rgba(0,0, 0, 0.2);
    transform: translate(-50%,-50%);
    .login_avatar{
        height: 100px;
        width: 100px;
        text-align: center;
        border-radius: 50%;
        border: 1px #eeeeee solid;
        box-shadow: 0 0 20px #dddddd;
        padding: 5px;
       position: absolute;
       left: 50%;
       transform: translate(-50%,-50%);

        img{
            height: 100%;
            width: 100%;
            border-radius: 50%;
        }
    }
    .login_title{
        text-align: center;
        margin-top: 60px;
        font-size: 20px;
        color: #666666;
    }
    .from{
        position: absolute;
        bottom: 0;
        width: 100%;
        .from_box{
            padding:0 40px;
        }
        .btns{
        float: right;
        Button{
            margin: 0 10px;
        }

    }
    }
    
}
</style>