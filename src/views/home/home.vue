<template>
  <div id="home">
       <div class="layout home-container">
        <Layout class="content" >
            <!-- 头部开始 -->
            <Header class="header">
                <Menu mode="horizontal" theme="dark" active-name="1">
                  <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            人力资源管理后台
                        </MenuItem>
                        <MenuItem name="2">
                          <Button type="info" @click="userexit" class="bts">退出</Button>
                        </MenuItem>
                        </div>
                   
                </Menu>
            </Header>
            <!-- 头部结束 -->
            <Layout >
                <!-- /右边开始 -->
                <Sider hide-trigger :style="{background: '#fff'}" :value="true">
                    <!-- 边栏 -->
                    <Menu ref="menu" 
                    :active-name="navstate" 
                    theme="light" 
                    width="auto" 
                    :open-names="[]"
                    accordion
                    >
                       <!-- 一级菜单 -->
                        <Submenu :name="item.id" v-for="item in menuItem " :key="item.id">
                            <!-- 一级菜单名 -->
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                {{item.authname}}
                            </template>
                            <!-- 二级菜单 -->
                            <MenuItem :name="childrenItem.url+''" 
                                      :to="childrenItem.url" 
                                      v-for="childrenItem in item.children" 
                                      :key="childrenItem.id"
                                      @click.native="saveNavState(childrenItem.url)"
                                      >
                            <Icon type="ios-briefcase"/>
                            {{childrenItem.authname}}
                            </MenuItem>

                        </Submenu>
                    </Menu>
                </Sider>
                <!-- 右边菜单结束 -->
                <!-- 左边类容区域 -->
                <Content>
                    <router-view></router-view>   
                </Content>
            </Layout>
        </Layout>
    </div>
   
  </div>
</template>
<script>
export default {
    data(){
        return {

            menuItem:[
                {id:1,authname:"员工管理",children:[
                    {id:1,authname:"员工账号",url:"/staff"},
                    {id:2,authname:"员工入职"},
                    {id:3,authname:"员工离职"},
                    ]},
                {id:2,authname:"权限管理",children:[
                    {id:1,authname:"权限列表",url:'/rights'},
                    {id:1,authname:"角色列表",url:'/roles'},
                    {id:1,authname:"权限流程",url:'/step'}


                    
                    ]},
                {id:3,authname:"考勤管理",children:[
                    {id:1,authname:"打卡配置"},
                    {id:2,authname:"规则配置"},
                    {id:3,authname:"打卡记录"},
                    {id:4,authname:"考勤记录"},
                ]},
                {id:4,authname:"数据统计",children:[
                    {id:1,authname:"考勤统计"},
                    {id:2,authname:"资金统计"},
                    {id:3,authname:"人员统计"} 
                ]},
                {id:5,authname:"组织架构",children:[
                    {id:1,authname:"部门管理"},
                    {id:2,authname:"职位管理"},
                    {id:2,authname:"职级管理"},
                ]},
            ],
            childrenItem:[],
        }
    },    
    created(){
       this.navstate=window.sessionStorage.getItem('NavState')
       this.$store.state.roles=JSON.parse(window.localStorage.getItem('role'))
    },
    mounted(){
        this.$nextTick(()=>{
            this.$refs.menu.updateActiveName()
            this.$refs.menu.updateOpened()
        })
    },
    methods:{
        userexit(){
            window.sessionStorage.removeItem('token')
            this.$router.push('/login')
        },
        // 保存链接的激活状态
        saveNavState(active){
   
            window.sessionStorage.setItem('NavState',active)
        }
    }
}
</script>
<style lang="less" scoped>
#home{
    height: 100%;
    .layout-nav{
        display: flex;
        justify-content: space-between;
        font-size: 25px;
        .bts{
            background-color: #9999;
            border: none;
        
        }
    }
    .quit{
       
    }
    .content{
        height: 100%;
    }
    .home-container{
        height: 100vh;
    }
}
</style>