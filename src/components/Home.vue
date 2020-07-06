<template>
	<div class="home">
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
    			<el-menu-item index="/modifyPwd">修改密码</el-menu-item>
    			<el-menu-item index="/">退出登录</el-menu-item>
			</el-submenu>
			<el-menu-item index="/homeInfo">首页</el-menu-item>
			<el-submenu index="3">
				<template slot="title">房源发布与管理</template>
				<el-menu-item index="/publish">房源发布</el-menu-item>
				<el-menu-item index="/manage">房源管理</el-menu-item>
			</el-submenu>
			<el-menu-item index="/myOrder">我的订单</el-menu-item>
    </el-menu>
    <router-view></router-view>
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
		<div class="online" @click="drawer = true">
			<i class="el-icon-chat-dot-square"></i>
			<div class="contact">在线资讯</div>
		</div>
		<el-drawer
			title="在线咨询"
			:visible.sync="drawer"
			direction="rtl"
			:before-close="handleClose"
			custom-class="drawer">
			<div class="text">
				<h4>请选择需要咨询的内容：</h4>
				<el-link type="primary" @click="onlineConsult('first')">法律咨询</el-link>
				<el-link type="success" @click="onlineConsult('second')">律师陪购</el-link>
				<el-link type="warning" @click="onlineConsult('third')">房产析产</el-link>
				<el-link type="primary" @click="onlineConsult('fourth')">房产调查</el-link>
				<el-link type="success" @click="onlineConsult('fifth')">房产继承</el-link>
				<el-card class="box-card" v-show="isFirstShow">
					为人民群众、房产中介机构或者房产公司提供房产法律方面的各种咨询服务。
				</el-card>
				<el-card class="box-card" v-show="isSecondShow">
					二手房买卖过程中，阴阳合同造成的纠纷、房产买卖合同约定不明确等等主观或者客观原因容易使二手房买卖过程造成瑕疵，给后续过程预留隐患，律师全程陪购帮助客户审阅合同、审查程序，可有效避免后续纠纷。
				</el-card>
				<el-card class="box-card" v-show="isThirdShow">
					分家、离婚、产权人过世等需要对房产进行房产析产，房产律师凭借专业经验为此过程提供见证、诉讼、调解，可为客户妥善处理房产析产。
				</el-card>
				<el-card class="box-card" v-show="isFourthShow">
					离婚或者债权人隐匿财产的情况下，往往需要对对方进行房产调查，房产律师可以凭借专业经验帮客户调查对方隐匿的房产，挽回损失。
				</el-card>
				<el-card class="box-card" v-show="isFifthShow">
					产权人在世时订立遗嘱，需要律师见证，或者由产权人在世时委托律师执行遗嘱。另外，产权继承过程中产生的纠纷，亦可由房产律师提供调解、诉讼等服务。
				</el-card>
			</div>
    </el-drawer>
	</div>
</template>
  
<script>
  export default {
	name: 'home',
    data() {
			return {
				activeIndex: '/homeInfo',
				drawer: false,
				isFirstShow: true,
				isSecondShow: false,
				isThirdShow: false,
				isFourthShow: false,
				isFifthShow: false,
        user_name: '',   
			};
		},
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      onlineConsult(data){
        if(data === 'first'){
        this.isFirstShow = true,
        this.isSecondShow = false,
        this.isThirdShow = false,
        this.isFourthShow = false,
        this.isFifthShow = false
        }else if(data === 'second'){
        this.isFirstShow = false,
        this.isSecondShow = true,
        this.isThirdShow = false,
        this.isFourthShow = false,
        this.isFifthShow = false
        }else if(data === 'third'){
        this.isFirstShow = false,
        this.isSecondShow = false,
        this.isThirdShow = true,
        this.isFourthShow = false,
        this.isFifthShow = false
        }else if(data === 'fourth'){
        this.isFirstShow = false,
        this.isSecondShow = false,
        this.isThirdShow = false,
        this.isFourthShow = true,
        this.isFifthShow = false
        }else if(data === 'fifth'){
        this.isFirstShow = false,
        this.isSecondShow = false,
        this.isThirdShow = false,
        this.isFourthShow = false,
        this.isFifthShow = true
        }
      },   
  },
	created() {
		if(this.$route.params.name&&this.$route.params.tel){
			if(!localStorage.getItem('user_name')||!localStorage.getItem('tel')){
				localStorage.setItem('user_name',this.$route.params.name);
				localStorage.setItem('tel',this.$route.params.tel);
				this.user_name = localStorage.getItem('user_name');
			}else{
				this.user_name = localStorage.getItem('user_name');
			}
		}else{
			if(localStorage.getItem('user_name')){
				this.user_name = localStorage.getItem('user_name');
			}else{
        this.$router.replace('/')
      }
    }
  },
}
</script>
  
<style scoped>
.home {
	position: relative;
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
.online {
	box-shadow: 0 0 30px 0 rgba(0,0,0,0.45);
	position: fixed;
	right: 0;
	bottom: 0;
	width: 200px;
	height: 40px;
	background-color: #fff;
	padding-left: 20px;
	line-height: 40px;
	cursor: pointer;
}
.online .contact {
	display: inline-block;
	color: #333;
	font-size: 14px;
}
.drawer .text {
	padding: 0 20px;
}
.box-card {
	margin-top: 20px;
}
</style>
  