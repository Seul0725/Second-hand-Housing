<template>
	<div class="admin">
    <el-menu
    :default-active="$route.path"
    router
		mode="horizontal"
		background-color="#545c64"
		text-color="#fff"
		active-text-color="#ffd04b">
			<el-submenu index="1">
				<template slot="title"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
					{{user_name}}</template>
    			<el-menu-item index="/">退出登录</el-menu-item>
			</el-submenu>
			<el-menu-item index="/admin1">人员信息管理</el-menu-item>
			<el-menu-item index="/admin2">房源信息管理</el-menu-item>
      <el-submenu index="4">
        <template slot="title">交易信息管理</template>
        <el-menu-item index="/admin3">预约信息管理</el-menu-item>
    		<el-menu-item index="/admin4">接单信息管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/admin5">报表信息统计</el-menu-item>
    </el-menu>
    <router-view></router-view>
	</div>
</template>
  
<script>
  export default {
    name: 'admin',
    data() {
      return {
        activeIndex: '/admin1',
        user_name: ''
      };
    },
    methods: {
    },
    created() {
      if(this.$route.params.name){
        if(!localStorage.getItem('user_name_admin')){
          localStorage.setItem('user_name_admin',this.$route.params.name);
          this.user_name = localStorage.getItem('user_name_admin');
        }else{
          this.user_name = localStorage.getItem('user_name_admin');
        }
      }else{
        if(localStorage.getItem('user_name_admin')){
          this.user_name = localStorage.getItem('user_name_admin');
        }else{
          this.$router.replace('/')
        }
      }
    },
  }
</script>
  
<style scoped>
.admin {
	position: relative;
}

.content {
  padding: 30px 50px;
  position: relative;
}
</style>
  