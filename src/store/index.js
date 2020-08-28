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
    }
    //
  },
  actions: {
  },
  modules: {
  }
})
