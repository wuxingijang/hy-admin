import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //账号管理
    useradmin:{
      title:[
        {
        title:"工号",
        key:"job"
        },
         {
        title:"姓名",
        key:"name"
        },
        {
        title:"性别",
        key:'sex'
        },
        {
        title:"电话",
        key:"phone"
        },
        {
        title:"部门/职位",
        key:"department"
        },
        {
        title:"状态",
        slot:"active",
        key:"active"
        },
        {
        title:"操作",
        key:'operate',
        slot:"operate"
        }],
      //用户列表
    userdata:[
          { job:"A00000001",
            name:"吴兴江",
            sex:'男',
            phone:'15870447791',
            department:"CEO",
            active:true
          },
          {   
            job:"A00000002",
            name:"吴兴江",
            sex:'男',
            phone:'15870447791',
            department:"CEO",
            active:false
          },
          {
          job:"A00000003",
          name:"吴兴江",
          sex:'男',
          phone:'15870447791',
          department:"CEO",
          active:false
      },     
      {job:"A00000004",
      name:"吴兴江",
      sex:'男',
      phone:'15870447791',
      department:"CEO",
      active:false
      },  
  
      {
      job:"A00000005",
      name:"吴兴江",
      sex:'男',
      phone:'15870447791',
      department:"CEO",
      active:false}
      ]
    },
    //role所有的权限
    allRigths:
        [
          {
            title:"员工管理",
            children:[
              {title:"员工账号",
              expand:true,
              children:[
                {title:"账号删除"},
                {title:"账号创建"},
                {title:"账号修改"},
              ]
              },
              {title:"员工入职",
                expand:true,
               children:[
                {title:"入职登记"},
              ]
            },
              {title:"员工离职",
              expand:true,
               children:[
                {title:"离职办理"},
                {title:"物品交接"},
                {title:"薪资结算"},
              ]
            },
              
            ]
          },
          {
        title:"权限管理",
          children:[
            {title:"角色列表",
            expand:true,
            children:[
              {title:"权限分配"},
              {title:"角色添加"},
              {title:"角色删除"},
            ]
             },
            {
              title:"权限列表",
              expand:true,
              children:[
              {title:"权限列表"},
              ]
            },
            { title:"权限流程",
              expand:true,
              children:[
             {title:"权限流程"},
          ]
            },
          
          ]
          }, 
          {
        title:"考勤管理",
        children:[
          {title:"考勤配置",
          expand:true,
          children:[
          {title:"考勤设置"},
        ]
        },
        ]
          },
          {
        title:"数据统计",
        children:[
          {
            title:"考勤统计",
            expand:true,
            children:[
            {title:"考勤查询"},
            {title:"考勤修改"},
            {title:"考勤统计"},]
        },
          {title:"资金统计",
            expand:true,
            children:[
            {title:"部门支出"},
            {title:"人员薪资"},
            {title:"食堂支出"},]
        },

          {
            title:"人员统计",
            expand:true,
            children:[
            {title:"员工统计"},]  
          }, 
        ]
          },
          {
      title:"组织架构",
      children:[
        {title:"部门管理",
        expand:true,
        children:[
        {title:"新增部门"},
        {title:"部门领导"},
        {title:"删除部门"},]  
      },
        {title:"职位管理",
        expand:true,
        children:[
        {title:"新增职位"},
        {title:"删除职位"},
        {title:"职位调动"},] 
      },
        {title:"职级管理",       
        expand:true,
        children:[
        {title:"职级管理"},] 
      
      },
      
      ]
          }
        ]
    ,
    //roles权限列表
    roles:{
      data:[],  
    },


  },
  getters:{
    state(state){
      return state.useradmin.userdata
    },

    addjob(state){
      //查询最后的工号
      let arr=state.useradmin.userdata
      return arr[arr.length-1].job
    },
    // 查询数据信息
    selectuser(state){
      return (id)=>{
        return state.useradmin.userdata.find(v=>v.job===id)
      }
    },
    selectroles(state){
      return state.roles.data
    },

    //删除权限
    selectrights(state){
      return (value)=>{
        let i=state.roles.data.findIndex(v=>v.id==value[0].id)
        let data=value[0]
        let index=data.child.findIndex(v=>v.id==value[1])
        let index1=data.child[index].child.findIndex(v=>v.id==value[2])
        console.log(i,index,index1,value)
        //三级菜单权限删除
        if(value.length===4){
         let row = data.child[index].child[index1].child.filter(v=>{
          return (!(v.id==value[3]))
        })        
          data.child[index].child[index1].child=row
        }
      //二级权限删除
        else if(value.length===3){
          let row =data.child[index].child.filter(v=>{
            return (!(v.id==value[2]))
          })
          data.child[index].child=row
        }
        else if(value.length===2){

           let row=data.child.filter(v=>{
            return (!(v.id==value[1]))
          })
          data.child=row
        }

        return [i,data]
      }
    },
    // 渲染成iview Tree属性格式
    allotrights(state){
      return (id)=>{
        let i=state.roles.data.findIndex(v=>v.id==id)
        let row=[]
        //循环第一层权限
        state.roles.data[i].child.forEach((v,index)=> {
            row.push({title:v.authname,children:[],expand:true,checked:true})
            //循环第二次权限
            v.child.forEach((v,index1)=>{
                row[index].children.push({title:v.authname,children:[],checked:true,expand:true})
                //徐循环第三次权限
                v.child.forEach(v=>{
                    row[index].children[index1].children.push({title:v.authname,checked:true,expand:true})
                })
            })
        });
     
        return row
      }
    },
    //获取角色已有的权限
    // GetRightsExist(state){
      
    // }
    getallRigths(state){
      return JSON.parse(JSON.stringify(state.allRigths))
    }
  }
  ,
  mutations: {
    //修改用户状态
    userstate(state,i){
      state.useradmin.userdata[i.i].active=!state.useradmin.userdata[i.i].active
     this.commit('setuserdata')
    },
    //获取保存在localStorage里面的数据
    getuserdata(state){
      let data=window.localStorage.getItem('userdata')
      if(!data){
        this.commit('setuserdata')
      }
      state.useradmin.userdata=JSON.parse(data)
    },
    //修改过后的state数据重新保存到locastorage里面
    setuserdata(state){
      console.log(state);
      window.localStorage.setItem('userdata',JSON.stringify(state.useradmin.userdata))
    },
    //用户搜索框
    filteruserdate(state,loadpay){
      //定义正则表达
      const {values}=loadpay
      var reg=new RegExp(`.*${values}.*`)
      //获取localstorage里面的数据
      let data=window.localStorage.getItem('userdata')
      let arr=JSON.parse(data)
      let row=arr.filter(v=>{
        return reg.test(v.name)
      })
      state.useradmin.userdata=row
    },
    //每添加一个用户。自动生成一个jobid
    adduser(state,payload){
      //获取工号
      let jobid=this.getters.addjob
      //生成新的jobid
      let newjobid=jobid.slice(0,jobid.length-1)+(Number(jobid[jobid.length-1])+1)
      payload.job=newjobid
      state.useradmin.userdata.push(payload)
      //保存到本地
      this.commit('setuserdata')
    },
    //修改用户信息
    updateuser(state,value){
      let index = this.getters.state.findIndex(v=>v.job===value.job)
      state.useradmin.userdata[index].phone=value.phone
      state.useradmin.userdata[index].department=value.department
      this.commit('setuserdata')
    },
    //删除用户啊
    deluser(state,i){
      //删除账号
      const row = state.useradmin.userdata.filter(v=>{
      return (! (v.job===i))
      })
      state.useradmin.userdata=row
      //报错到本地loaclStorage
      this.commit('setuserdata')
    },
      //删除权限
    delright(state,value){
      console.log(value)
      state.roles.data[value[0]].child=value[1]
  },
  //添加角色
  Addrole(state,payload){
      state.roles.data.push(payload)
      localStorage.setItem('role',JSON.stringify(state.roles))
  },
  //更新权限
  update(state,payload){
    state.roles.data[payload[0]].child=payload[1]
  },
  delay(state,payload){
    state.roles.data.splice(payload,1)
  },
  editdec(state,payload){
    console.log(payload)
    state.roles.data[payload[0]].roleName=payload[1]
    state.roles.data[payload[0]].roleDesc=payload[2]
  },
  },
  actions: {
  },
  modules: {
  }
})
