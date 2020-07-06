<template>
	<div class="room">
    <div class="nav">
      <img src="../assets/images/logo.png" title="返回首页" @click="toHome">
    </div>
    <div class="content">
      <div class="title">
        <h1>{{houseInfo.introduce}}</h1>
      </div>
      <div class="view">
        <div class="imgContainer">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(item,index) in houseInfo.images" :key="index">
              <img :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="textContainer">
          <div class="price">
              <span class="total">{{houseInfo.price}}<span class="unit">万</span></span>
              <span class="unitPrice">
                  {{houseInfo.unitPrice}}
                  <span>元/平方米</span>
              </span>
          </div>
          <div class="houseInfo">
              <span class="roomInfo">
                  {{houseInfo.type}}
              </span>
              <span class="areaInfo">
                  {{houseInfo.area}}平米
              </span>
          </div>
          <div class="others">
              <div class="visitTime o">
                <span class="label">看房时间段</span>
                <span class="con">随时看房</span>
              </div>
              <div class="seller o">
                <span class="label">房源发布人</span>
                <span class="con">{{houseInfo.userName}}</span>
              </div>
              <div class="address o">
                <span class="label">小区及地点</span>
                <span class="con">{{houseInfo.community}}</span>
              </div>
              <div class="tel o">
                <span class="label">联系电话tel</span>
                <span class="con">{{houseInfo.tel}}</span>
              </div>
          </div>
          <div class="btn" v-show="isSeller">
            <el-button size="small" type="success" plain @click="toBooked($event,houseInfo)">{{!isBooked?'预约看房':(isBooked&&isBookedName?'取消预约':'已被预约')}}</el-button>
          </div>
        </div>
      </div>
      <div class="msg">
          <h3>评论留言<span>（匿名以保护顾客隐私）</span></h3>
          <div class="msg-content">
            <el-form  label-width="80px" :model="formLabelAlign" v-show="isSeller">
                  <el-form-item label="标题">
                    <el-input v-model="formLabelAlign.title"></el-input>
                  </el-form-item>
                  <el-form-item label="内容">
                    <el-input type="textarea"
                      :rows="2"
                      placeholder="请输入内容" 
                      v-model="formLabelAlign.content">
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="onPublish(formLabelAlign)">发布</el-button>
                      <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
            </el-form>
            <el-table
              :data="tableData"
              style="width: 100%"
              max-height="300">
              <el-table-column
                fixed
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="title"
                label="标题"
                width="150">
              </el-table-column>
              <el-table-column
                prop="content"
                label="内容"
                width="640">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small">
                  删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </div>
    </div>
    <div class="footer">Copyright &copy; 2019-2020 WuPeng All Rights Reserved</div>
	</div>
</template>
  
<script>
import { updateBooked,addComment,findComment,deleteComment } from '../services.js'
  export default {
    name: 'room',
    data() {
      return {
        formLabelAlign: {
          title: '',
          content: '',
        },
        tableData: [{
          title: '看房体验',
          content: '感觉还行',
        }],
        pics:[{
            src: ''
        }],
        houseInfo: {},
        isBooked: true,
        isBookedName: false,
        isSeller: true
      };
    },
    methods: {
      toHome(){
        this.$router.replace({path:'/homeInfo'})
      },
      onPublish(formName){
        if(formName.title && formName.content){
          const obj = {
            id: this.houseInfo.id,
            title: formName.title,
            content: formName.content
          }
          addComment(obj).then(res=>{
            if(res.code === 0){
              this.tableData.push(obj);
              this.$message({
                message: '评论发表成功',
                type: 'success'
              });
            }
          }).catch(err=>{
            console.log(err,'__err')
          })
          this.formLabelAlign = {}
        }else if(formName.title && !formName.content){
          this.$message({
            message: '警告哦，请填写留言内容',
            type: 'warning'
          });
        }else if(!formName.title && formName.content){
          this.$message({
            message: '警告哦，请填写留言标题',
            type: 'warning'
          });
        }else if(!formName.title && !formName.content){
          this.$message({
            message: '警告哦，请填写留言标题和内容',
            type: 'warning'
          });
        }
      },
      resetForm(){
        this.formLabelAlign = {}
      },
      deleteRow(index, rows) {
        if(this.houseInfo.userName !== localStorage.getItem('user_name')){
          this.$message.error('非发布者不可删除评论信息');
        }else{
          const obj = {
            id: this.houseInfo.id,
            commentId: rows[index].id
          }
          deleteComment(obj).then(res=>{
            if(res.code === 0){
              rows.splice(index, 1);
              this.$message({
                message: '该评论删除成功',
                type: 'success'
              });
            }
          }).catch(err=>{
            console.log(err,'__err')
          })
          
        }
      },
      toBooked(e,d){
        let text = e.target.innerText;
        if(text === '已被预约'){
          this.$message({
            message: '抱歉，该房源已被预约！',
            type: 'warning'
          });
        }else if(text === '预约看房'){
          let obj = {
            id:d.id,
            booked: true,
            bookedName: localStorage.getItem('user_name'),
            bookedTel: localStorage.getItem('tel')
          }
          updateBooked(obj).then(res=>{
            if(res.code === 0){
              this.$message({
                message: '恭喜你，预约成功',
                type: 'success'
              });
              const info = JSON.parse(localStorage.getItem('houseInfo'));
              info.booked = true;
              info.bookedName = localStorage.getItem('user_name');
              info.bookedTel = localStorage.getItem('tel');
              localStorage.setItem('houseInfo',JSON.stringify(info));
              this.isBooked = true;
              this.isBookedName = true;
            }
          }).catch(err=>{
            console.log(err,'__err')
          })
        }else if(text === '取消预约'){
          let obj = {
            id:d.id,
            booked: false,
            bookedName: '',
            bookedTel: ''
          }
          updateBooked(obj).then(res=>{
            if(res.code === 0){
              this.$message({
                message: '取消预约成功',
                type: 'success'
              });
              const info = JSON.parse(localStorage.getItem('houseInfo'));
              info.booked = false;
              info.bookedName = '';
              info.bookedTel = '';
              localStorage.setItem('houseInfo',JSON.stringify(info));
              this.isBooked = false;
              this.isBookedName = false;
            }
          }).catch(err=>{
            console.log(err,'__err')
          })
        }
      }
    },
    created() {
      if(!localStorage.getItem('user_name')){
        this.$router.replace('/')
      }
      if(this.$route.params.id){
        if(JSON.parse(localStorage.getItem('houseInfo'))){
          localStorage.setItem('houseInfo',JSON.stringify(this.$route.params));
          this.houseInfo = this.$route.params;
        }else{
          this.houseInfo = JSON.parse(localStorage.getItem('houseInfo'))
        }
      }else{
        this.houseInfo = JSON.parse(localStorage.getItem('houseInfo'))
      }
      this.isBooked = this.houseInfo.booked ? true:false;
      this.isBookedName = this.houseInfo.bookedName === localStorage.getItem('user_name')? true:false;
      this.isSeller = this.houseInfo.userName === localStorage.getItem('user_name') ? false : true;
      findComment(this.houseInfo.id).then(res=>{
        if(res.code === 0){
          this.tableData = res.date;
        }
      }).catch(err=>{
        console.log(err,'__err')
      })
    },
  }
</script>
  
<style scoped>
.room {
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
.content {
  padding: 20px 50px;
  background-color: #f5f5f6;
}
.content .title h1 {
  max-width: 790px;
  line-height: 29px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 26px;
  color: #333333;
  font-weight: bold;
  margin-bottom: 35px;
}
.view {
  overflow: hidden;
  background-color: #fff;
  padding: 15px;
}
.view .imgContainer {
  float: left;
  width: 700px;
}
.view .textContainer {
  float: right;
  margin-right: 120px;
}
.view .textContainer .price {
  border-bottom: 1px solid #eee;
}
.view .textContainer .price .total {
  font-size: 46px;
  line-height: 46px;
  color: #e4393c;
  font-weight: bold;
  letter-spacing: -1px;
  padding-right: 10px;
}
.view .textContainer .price .unit {
  color: #e4393c;
  font-size: 16px;
}
.view .textContainer .price .unitPrice {
  color: #394043;
  font-weight: bold;
}
.view .textContainer .price .unitPrice span {
  font-weight: normal;
}
.view .textContainer .houseInfo {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  margin-top: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}
.view .textContainer .houseInfo .roomInfo {
  margin-right: 30px;
}
.view .textContainer .others {
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}
.view .textContainer .others .label {
  color: #aeb0b1;
  margin-right: 24px;
  font-size: 14px;
}
.view .textContainer .others .con {
  font-size: 14px;
}
.view .textContainer .btn {
  padding-top: 10px;
  margin-left: 40px;
}
.msg {
  padding-top: 20px;
}
.msg h3 span{
  font-size: 12px;
  color: red;
}
.msg .msg-content {
  border-top: 1px solid #555;
  padding: 20px 150px 20px 40px;
}
  
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.footer {
  border-top: 1px solid #e6e6e6;
  font-size: 12px;
  color: #333;
  text-align: center;
  padding: 15px 0;
}
</style>
  