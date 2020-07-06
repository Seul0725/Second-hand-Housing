<template>
	<div class="sale">
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
    			<el-menu-item index="/editPwd">修改密码</el-menu-item>
    			<el-menu-item index="/">退出登录</el-menu-item>
			</el-submenu>
			<el-menu-item index="/saleHome">接单首页</el-menu-item>
			<el-menu-item index="/mySale">我的接单</el-menu-item>
    </el-menu>
    <router-view class="content"></router-view>
		<div class="footer">
			<div class="wrapper">
				<div class="f-title">
					<div class="fl">
						<ul>
							<li>关于我们</li>
							<li>联系我们</li>
							<li>加入我们</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
  
<script>
  export default {
	name: 'home',
    data() {
			return {
				activeIndex: '/saleHome',
        user_name: '',   
			};
		},
    methods: {
  },
	created() {
		if(this.$route.params.name&&this.$route.params.tel){
			if(!localStorage.getItem('user_name_sale')||!localStorage.getItem('tel_sale')){
				localStorage.setItem('user_name_sale',this.$route.params.name);
				localStorage.setItem('tel_sale',this.$route.params.tel);
				this.user_name = localStorage.getItem('user_name_sale');
			}else{
				this.user_name = localStorage.getItem('user_name_sale');
			}
		}else{
			if(localStorage.getItem('user_name_sale')){
				this.user_name = localStorage.getItem('user_name_sale');
			}else{
        this.$router.replace('/')
      }
    }
  },
}
</script>
  
<style scoped>
.sale {
	position: relative;
}
.content {
	min-height: 450px;
}
.footer {
	background: #222;
	clear: both;
	width: 100%;
	height: 75px;
	margin-top: 50px;
}
.wrapper {
	width: 1150px;
	margin: 0 auto;
}
.footer .f-title {
	height: 75px;
	line-height: 75px;
}
.footer .f-title .fl {
	float: left;
}
.footer .f-title .fl ul {
	list-style: none;
	margin: 0;
	display: flex;
	color: #fff;
}
.footer .f-title .fl ul li{
	padding-right: 10px;
	cursor: pointer;
}
</style>
  