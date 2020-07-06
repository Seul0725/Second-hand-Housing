<template>
	<div class="search">
    <div class="nav">
      <img src="../assets/images/logo.png" alt="" title="返回首页" @click="toHome">
    </div>
    <div class="content">
      <div class="input">
        <el-input autocomplete="on" @change="inputChange" placeholder="请输入区域、商圈或小区名开始找房" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search">开始找房</el-button>
        </el-input>
      </div>
      <div class="resultDes">
				<h2 class="total">
					共找到 <span> {{listTotal}} </span> 套二手房
				</h2>
      </div>
      <div class="noHouseInfo" v-show="isShow">
        抱歉！！没有找到指定房源！！
      </div>
			<ul class="sellListContent" v-show="!isShow">
				<li v-for="(item, index) in listsContent[currentPage-1]" :key="index">
					<img :src="item.images[0]" alt="" @click="toRoom(item)">
					<div class="info">
						<div class="title">
							<span @click="toRoom(item)">{{item.introduce}}</span>
						</div>
						<div class="flood">
							<i class="el-icon-location"></i>
							<span>{{item.community}} - {{item.city}}</span>
						</div>
						<div class="address">
							<i class="el-icon-s-home"></i>
							<span>{{item.type}} | {{item.area}}平米</span>
						</div>
						<div class="followInfo">
							<i class="el-icon-star-on"></i>
							<span>发布人：{{item.userName}}</span>
						</div>
						<div class="tag"><el-tag size='small'>随时看房</el-tag></div>
						<div class="priceInfo">
							<div class="totalPrice">
								<span>{{item.price}}</span>万
							</div>
							<div class="unitPrice">
								<span>单价{{item.unitPrice}}元/平米</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<div class="page" v-show="!isShow">
				<el-pagination
					:page-size="5"
					layout="prev, pager, next"
					:total="listTotal"
					:current-page="currentPage"
					@current-change="currentChange"
					@prev-click="prevClick"
					@next-click="nextClick">
				</el-pagination>
			</div>
    </div>
    <div class="footer">Copyright &copy; 2019-2020 WuPeng All Rights Reserved</div>
	</div>
</template>
  
<script>
import { findAllHouseInfo } from '../services.js'
  export default {
    name: 'search',
    data() {
      return {
        input: '',
        listTotal:0,
        currentPage:1,
        listsContent:[],
        isShow:true,
        list: []
      };
    },
    methods: {
      toHome(){
        this.$router.replace({path:'/homeInfo'})
      },
      inputChange(value){
        if(value){
          this.totalList = 0;
          this.list = [];
          this.listsContent = [];
          findAllHouseInfo().then(res=>{
            if(res.code === 0){
              this.totalList = res.date;
              for (let i = 0; i < this.totalList.length; i++) {
                const item = this.totalList[i];
                item.images = item.images.image;
                if(item.community.search(value) !== -1){
                  this.isShow = false;
                  this.list.push(item);
                  this.listTotal = this.list.length;
                  for(var i=0;i<this.list.length;i+=5){
                    this.listsContent.push(this.list.slice(i,i+5));
                  }
                  return;
                }else{
                  this.isShow = true;
                  this.listTotal = 0;
                }
              }
            }
          }).catch(err=>{
            console.log(err,'__err')
          })
        }
        
      },
      currentChange(page){
        this.currentPage = page;
      },
      prevClick(page){
        this.currentPage--;
      },
      nextClick(page){
        this.currentPage++;
      },
      toRoom(item){
        this.$router.push({
          name: 'room',
          params: item
        })
      },
    },
    created() {
      if(!localStorage.getItem('user_name')){
        this.$router.replace('/')
      }
      if(this.$route.params.searchValue){
        this.input = this.$route.params.searchValue;
      }
      findAllHouseInfo().then(res=>{
        if(res.code === 0){
          this.totalList = res.date;
          this.totalList.forEach((item,index)=>{
            item.images = item.images.image;
            if(this.input){
              if(item.community.search(this.input) !== -1){
                this.isShow = false;
                this.list.push(item);
              }
            }
          })
          this.listTotal = this.list.length;
          for(var i=0;i<this.list.length;i+=5){
            this.listsContent.push(this.list.slice(i,i+5));
          }
        }
      }).catch(err=>{
        console.log(err,'__err')
      })
    },
  }
</script>
  
<style scoped>
.search {
	position: relative;
}
.nav {
  height: 70px;
  line-height: 70px;
  position: relative;
  border-bottom: 1px solid #63AD02;
}
.nav img {
  height: 60px;
  margin: 5px 0 0 10px;
  cursor: pointer;
}
.content{
  min-height: 400px;
  padding: 50px 40px;
}
.input {
  width: 60%;
}
.input-with-select {
	background-color: #fff;
}
.resultDes {
	line-height: 55px;
}
.total {
	font-size: 22px;
	color: #394043;
	border-bottom: 1px solid rgba(0, 0, 0, 0.5);
	margin-bottom: 0;
}
.total>span {
	color: green
}
.noHouseInfo {
  text-align: center;
  padding-top: 50px;
}
.sellListContent {
	list-style: none;
	padding-left: 0;
	margin-top: 0;
}
.sellListContent li {
	position: relative;
	overflow: hidden;
	width: 90%;
	padding: 30px 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
.sellListContent li img {
	position: relative;
	float: left;
	width: 232px;
	height: 174px;
	cursor: pointer;
}
.sellListContent li .info {
	width: 640px;
	color: #616669;
	font-size: 14px;
	min-width: 640px;
	float: right;
}
.sellListContent li .info .title{
	font-weight: bold;
	color: #394043;
	height: 25px;
	overflow: hidden;
	width: 500px;
}
.sellListContent li .info .title span {
	float: left;
  max-width: 420px;
  text-decoration: none;
  font-size: 22px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
	color: #9c9fa1;
	cursor: pointer;
}
.sellListContent li .info .title span:hover{
	color: green;
}
.sellListContent li .info .flood,.sellListContent li .info .followInfo,.sellListContent li .info .tag {
	margin-top: 18px;
}
.sellListContent li .info .address {
	margin-top: 20px;
}
.sellListContent li .info .priceInfo {
	position: absolute;
	right: 0;
	top: 20%;
}
.sellListContent li .info .priceInfo .totalPrice {
	text-align: right;
	width: 130px;
	font-size: 14px;
	color: #db4c3f;
}
.sellListContent li .info .priceInfo .totalPrice span {
	font-weight: bold;
	font-size: 26px;
	margin-right: 5px;
}
.sellListContent li .info .priceInfo .unitPrice {
	text-align: right;
	margin-top: 18px;
	width: 130px;
	font-size: 12px;
}
.page {
	position: absolute;
	right: 118px;
	margin: 20px 0;
}
.footer {
  border-top: 1px solid #e6e6e6;
  font-size: 12px;
  color: #333;
  text-align: center;
  padding: 15px 0;
}
</style>
  