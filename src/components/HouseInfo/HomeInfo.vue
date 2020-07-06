<template>
  <div class="houseInfo">
    <div class="header">
			<div class="banner-text"></div>
			<div class="carousel">
				<el-carousel height="50px" direction="vertical" indicator-position="none">
					<el-carousel-item v-for="item in cycleLists" :key="item">
					  <h3 class="medium">{{ item }}</h3>
					</el-carousel-item>
				  </el-carousel>
			</div>
			<div class="input-box">
				<el-input autocomplete="on" @change="inputChange" placeholder="请输入区域、商圈或小区名开始找房" v-model="input" class="input-with-select">
				  <el-button slot="append" icon="el-icon-search">开始找房</el-button>
				</el-input>
			</div>
		</div>
		<div class="content-box">
			<div class="radio-box">
				<ul class="radio-ul">
					<li class="radio-li">位置&nbsp;&nbsp;&nbsp;&nbsp;
						<el-radio-group @change="cityChange" size="mini" v-model="radio1">
							<el-radio-button v-for="city in cities" :label="city" :key="city">{{city}}</el-radio-button>
						</el-radio-group>
					</li>
					<li class="radio-li">售价&nbsp;&nbsp;&nbsp;&nbsp;
						<el-radio-group @change="priceChange" v-model="radio2">
							<el-radio label="200万以下"></el-radio>
							<el-radio label="200-250万"></el-radio>
							<el-radio label="250-300万"></el-radio>
							<el-radio label="300-400万"></el-radio>
							<el-radio label="400万以上"></el-radio>
						</el-radio-group>
					</li>
					<li class="radio-li">房型&nbsp;&nbsp;&nbsp;&nbsp;
						<el-radio-group @change="typeChange" v-model="radio3">
							<el-radio label="一室"></el-radio>
							<el-radio label="二室"></el-radio>
							<el-radio label="三室"></el-radio>
							<el-radio label="四室"></el-radio>
							<el-radio label="五室及以上"></el-radio>
						</el-radio-group>
					</li>
					<li class="radio-li">面积&nbsp;&nbsp;&nbsp;&nbsp;
						<el-radio-group @change="areaChange" v-model="radio4">
							<el-radio label="50m²以下"></el-radio>
							<el-radio label="50-70m²"></el-radio>
							<el-radio label="70-90m²"></el-radio>
							<el-radio label="90-110m²"></el-radio>
							<el-radio label="110m²以上"></el-radio>
						</el-radio-group>
          </li>
          <li class="radio-btn">
            <el-button type="primary" icon="el-icon-delete" @click="flashList">清除选项</el-button>
          </li>
        </ul>
			</div>
			<div class="resultDes">
				<h2 class="total">
					共找到 <span> {{listTotal}} </span> 套{{radio1?radio1:''}}二手房
				</h2>
			</div>
			<ul class="sellListContent">
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
			<div class="page">
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
  </div>
</template>
    
<script>
import { findAllHouseInfo,bookedFindAll,orderedFindAll } from '../../services.js';
import { dateFormat } from '../../utils.js'
  export default {
    name: 'houseInfo',
    data() {
      return {
        cycle1: '',
        cycle2: '',
        cycle3: '',
        cycleLists: [],
				input: '',
				radio1: '',
				cities: [ '北京', '上海'],
				radio2: '',
				radio3: '',
        radio4: '',
        totalList:[{
					introduce: '中海紫御南北通透中间楼层,开发商精装修',
					community: '中海紫御公馆',
					city: '北京',
					type: '二室一厅',
					area: '41.32',
					userName: 'peng',
					price: '100',
          unitPrice: '108410',
          images: []
				}],
				currentPage:1,
				listTotal:0,
				listsContent:[],
				list:[],
      };
    },
    methods: {
      inputChange(value){
        if(value){
          this.$router.push({
            name: 'search',
            params: {
              searchValue:value
            }
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
      cityChange(value){
        const that = this;
        this.list=[];
        this.listsContent = []
        this.totalList.forEach((item,index)=>{		
          if(item.city === value && !that.radio2 && !that.radio3 && !that.radio4){
            that.list.push(item);
            return;
          }else if(item.city === value && that.radio2 && that.formatPrice(that.radio2,item) && !that.radio3 && !that.radio4){
            that.list.push(item);
            return;
          }else if(item.city === value && that.radio3 && that.formatType(that.radio3,item) && !that.radio2 && !that.radio4){
            that.list.push(item);
            return;
          }else if(item.city === value && that.radio2 && that.formatPrice(that.radio2,item) && that.radio3 && that.formatType(that.radio3,item) && !that.radio4){
            that.list.push(item);
            return;
          }else if(item.city === value && that.radio4 && that.formatArea(that.radio4,item) && !that.radio2 &&  !that.radio3){
            that.list.push(item);
            return;
          }else if(item.city === value && that.radio4 && that.formatArea(that.radio4,item) && that.radio2 && that.formatPrice(that.radio2,item) &&  !that.radio3){
            that.list.push(item);
            return;
          }else if(item.city === value && that.radio4 && that.formatArea(that.radio4,item) && that.radio3 && that.formatType(that.radio3,item) &&  !that.radio3){
            that.list.push(item);
            return;
          }else if(item.city === value && that.radio4 && that.formatArea(that.radio4,item) && that.radio2 && that.formatPrice(that.radio2,item) &&  that.radio3 && that.formatType(that.radio3,item)){
            that.list.push(item);
            return;
          }
        })
        this.listTotal = this.list.length;
        for(var i=0;i<this.list.length;i+=5){
          this.listsContent.push(this.list.slice(i,i+5));
        }
      },
      priceChange(value){
        const that = this;
        this.list=[];
        this.listsContent = [];
        this.totalList.forEach((item,index)=>{
          if(that.formatPrice(value,item) && !that.radio1 && !that.radio3 && !that.radio4){
            that.list.push(item);
            return;
          }else if(that.formatPrice(value,item) && that.radio1 && that.radio1 === item.city && !that.radio3 && !that.radio4){
            that.list.push(item);
            return;
          }else if(that.formatPrice(value,item) && that.radio3 && that.formatType(that.radio3,item) && !that.radio1 && !that.radio4){
            that.list.push(item);
            return;
          }else if(that.formatPrice(value,item) && that.radio3 && that.formatType(that.radio3,item) && that.radio1 && that.radio1 === item.city && !that.radio4){
            that.list.push(item);
            return;
          }else if(that.formatPrice(value,item) && that.radio4 && that.formatArea(that.radio4,item) && !that.radio1 &&  !that.radio3){
            that.list.push(item);
            return;
          }else if(that.formatPrice(value,item) && that.radio4 && that.formatArea(that.radio4,item) && that.radio1 && that.radio1 === item.city &&  !that.radio3){
            that.list.push(item);
            return;
          }else if(that.formatPrice(value,item) && that.radio4 && that.formatArea(that.radio4,item) && that.radio3 && that.formatType(that.radio3,item) &&  !that.radio1){
            that.list.push(item);
            return;
          }else if(that.formatPrice(value,item) && that.radio4 && that.formatArea(that.radio4,item) && that.radio3 && that.formatType(that.radio3,item) &&  that.radio1 && that.radio1 === item.city){
            that.list.push(item);
            return;
          }
        })
        this.listTotal = this.list.length;
        for(var i=0;i<this.list.length;i+=5){
          this.listsContent.push(this.list.slice(i,i+5));
        }
      },
      typeChange(value){
        const that = this;
        this.list=[];
        this.listsContent = [];
        this.totalList.forEach((item,index)=>{
          if(that.formatType(value,item) && !that.radio1 && !that.radio2 && !that.radio4){
            that.list.push(item);
            return;
          }else if(that.formatType(value,item) && that.radio1 && that.radio1 === item.city && !that.radio2 && !that.radio4){
            that.list.push(item);
            return;
          }else if(that.formatType(value,item) && that.radio2 && that.formatPrice(that.radio2,item) && !that.radio1 && !that.radio4){
            that.list.push(item);
            return;
          }else if(that.formatType(value,item) && that.radio1 && that.radio1 === item.city && that.radio2 && that.formatPrice(that.radio2,item) && !that.radio4){
            that.list.push(item);
            return;
          }else if(that.formatType(value,item) && that.radio4 && that.formatArea(that.radio4,item) && !that.radio1 && !that.radio2){
            that.list.push(item);
            return;
          }else if(that.formatType(value,item) && that.radio4 && that.formatArea(that.radio4,item) && that.radio1 && that.radio1 === item.city && !that.radio2){
            that.list.push(item);
            return;
          }else if(that.formatType(value,item) && that.radio4 && that.formatArea(that.radio4,item) && that.radio2 && that.formatPrice(that.radio2,item) && !that.radio1){
            that.list.push(item);
            return;
          }else if(that.formatType(value,item) && that.radio4 && that.formatArea(that.radio4,item) && that.radio2 && that.formatPrice(that.radio2,item) && that.radio1 && that.radio1 === item.city){
            that.list.push(item);
            return;
          }
        })
        this.listTotal = this.list.length;
        for(var i=0;i<this.list.length;i+=5){
          this.listsContent.push(this.list.slice(i,i+5));
        }
      },
      areaChange(value){
        const that = this;
        this.list=[];
        this.listsContent = [];
        this.totalList.forEach((item,index)=>{
          if(that.formatArea(value,item) && !that.radio1 && !that.radio2 && !that.radio3){
            that.list.push(item);
            return;
          }else if(that.formatArea(value,item) && that.radio1 && that.radio1 === item.city && !that.radio2 && !that.radio3){
            that.list.push(item);
            return;
          }else if(that.formatArea(value,item) && that.radio2 && that.formatPrice(that.radio2,item) && !that.radio1 && !that.radio3){
            that.list.push(item);
            return;
          }else if(that.formatArea(value,item) && that.radio1 && that.radio1 === item.city && that.radio2 && that.formatPrice(that.radio2,item) && !that.radio3){
            that.list.push(item);
            return;
          }else if(that.formatArea(value,item) && that.radio3 && that.formatType(that.radio3,item) && !that.radio1 && !that.radio2){
            that.list.push(item);
            return;
          }else if(that.formatArea(value,item) && that.radio3 && that.formatType(that.radio3,item) && that.radio1 && that.radio1 === item.city && !that.radio2){
            that.list.push(item);
            return;
          }else if(that.formatArea(value,item) && that.radio3 && that.formatType(that.radio3,item) && that.radio2 && that.formatPrice(that.radio2,item) && !that.radio1){
            that.list.push(item);
            return;
          }else if(that.formatArea(value,item) && that.radio3 && that.formatType(that.radio3,item) && that.radio2 && that.formatPrice(that.radio2,item) && that.radio1 && that.radio1 === item.city){
            that.list.push(item);
            return;
          }
        })
        this.listTotal = this.list.length;
        for(var i=0;i<this.list.length;i+=5){
          this.listsContent.push(this.list.slice(i,i+5));
        }
      },
      formatPrice(value,item){
        if(value === '200万以下' && item.price <= 200){
          return true;
        }else if(value === '200-250万' && (item.price <= 250 && item.price > 200)){
          return true;
        }else if(value === '250-300万' && (item.price <= 300 && item.price > 250)){
          return true;
        }else if(value === '300-400万' && (item.price <= 400 && item.price > 300)){
          return true;
        }else if(value === '400万以上'&& item.price > 400){
          return true;
        }
      },
      formatType(value,item){
        if(value === '一室' && item.type.search("一室") != -1){
          return true;
        }else if(value === '二室' && item.type.search("二室") != -1){
          return true;
        }else if(value === '三室' && item.type.search("三室") != -1){
          return true;
        }else if(value === '四室' && item.type.search("四室") != -1){
          return true;
        }else if(value === '五室及以上' && item.type.search("一室") == -1 && item.type.search("二室") == -1 && item.type.search("三室") == -1 && item.type.search("四室") == -1){
          return true;
        }
      },
      formatArea(value,item){
        if(value === '50m²以下' && item.area <= 50){
          return true;
        }else if(value === '50-70m²' && (item.area <= 70 && item.area > 50)){
          return true;
        }else if(value === '70-90m²' && (item.area <= 90 && item.area > 70)){
          return true;
        }else if(value === '90-110m²' && (item.area <= 110 && item.area > 90)){
          return true;
        }else if(value === '110m²以上'&& item.area > 110){
          return true;
        }
      },
      flashList(){
        this.radio1 = '';
        this.radio2 = '';
        this.radio3 = '';
        this.radio4 = '';
        this.list = this.totalList;
        this.listsContent = [];
        this.listTotal = this.list.length;
        for(var i=0;i<this.list.length;i+=5){
          this.listsContent.push(this.list.slice(i,i+5));
        }
      },
      findAllHouse(){
        findAllHouseInfo().then(res=>{
          if(res.code === 0){
            this.totalList = res.date.filter(item=>{
              return item.checked === '1'&&item.status === '0'
            })
            this.totalList.forEach((item,index)=>{
              item.images = item.images.image;
              if(this.radio1 || this.radio2 || this.radio3 || this.radio4){
                if(item.city === this.radio1 || item.price === this.radio2 || item.type === this.radio3 || item.area === this.radio4){
                  this.list.push(item);
                }
              }else{
                this.list = this.totalList;
              }
            })
            this.listTotal = this.list.length;
            for(var i=0;i<this.list.length;i+=5){
              this.listsContent.push(this.list.slice(i,i+5));
            }
            this.cycle1 = `真实在售二手房${this.listTotal}套`;
            bookedFindAll().then(res=>{
              if(res.code === 0){
                this.cycle2 = `累计预约${res.date.length}套房`;
                orderedFindAll().then(res=>{
                  if(res.code === 0){
                    this.cycle3 = `累计接单${res.date.length}套房`;
                    this.cycleLists = [this.cycle1,this.cycle2,this.cycle3]
                  }
                }).catch(err=>{
                  console.log(err)
                })
              }
            }).catch(err=>{
              console.log(err)
            })
          }
        }).catch(err=>{
          console.log(err,'__err')
        })
      },
      toRoom(item){
        this.$router.push({
          name: 'room',
          params: item
        })
      },
    },
    created() {
      this.findAllHouse();
    },
  }
</script>
    
<style scoped>
.houseInfo {
  position: relative;
}
.header {
	background: #161616 url(../../assets/images/banner.jpg) no-repeat;
	width: 100%;
	height: 610px;
	background-position: center 0;
	background-attachment: fixed;
	padding-top: 30px;
  padding-right: 5px;
	position: relative;
}
.banner-text {
	margin: 120px auto 0 auto;
	background: url(../../assets/images/banner-text.png) no-repeat;
	width: 540px;
	height: 69px;
}
.carousel {
	width: 50%;
	margin: 0 auto;
}
.el-carousel__item h3 {
	color: #fff;
	font-size: 20px;
	opacity: 0.75;
	line-height: 50px;
	margin: 0;
	text-align: center;
}
.input-box {
	margin-top: 15px;
	text-align: center;
}
.el-input {
	width: 60%;
}
.input-with-select {
	background-color: #fff;
}
.tips{
	width: 600px;
	background-color: #fff;
	border:1px solid #000;
	margin-top: 0;
	border-top: 0;
	margin: 0 auto;
	list-style: none;
	position: relative;
	left: -59px;
}
.hot-name,.hot-list {
	height: 35px;
	line-height: 35px;
	padding: 3px 20px 3px 0;
	text-align: left;
	position: relative;
	left: -23px;
}
.hot-name {
	color: #849aae;
}
.hot-list {
  cursor: pointer;
}
.hot-list:hover {
	color: #849aae;
}
.content-box {
	background: #fff;
	padding: 25px;
	width: 1100px;
	margin: 0 auto;
	position: relative;
}
.radio-box {
	background: #F5F7FA;
	padding: 20px;
	position: relative;
	padding-left: 0;
	border-bottom: 1px solid #545C64;
}
.radio-ul {
	list-style: none;
}
.radio-li {
	font-size: 12px;
	color: #333;
	font-weight: 700;
	line-height: 40px;
}
.radio-btn{
  margin-top: 10px;
}
.el-checkbox-group {
	display: inline-block;
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
</style>
    