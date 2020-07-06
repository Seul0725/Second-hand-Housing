<template>
	<div class="login">
    <div class="nav">
        <img src="../assets/images/logo.png" alt="">
    </div>
    <div class="content">
      <div class="login-wrap">
        <div class="wrapper">
          <div class="login-content login" v-show="isLogin">
              <div class="head">账号密码登录
                <span class="to-register" @click="toRegister">没有账号? 去注册</span>
              </div>
              <div class="form-wrap">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="65px" class="demo-ruleForm">
                      <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="身份" prop="identity">
                        <el-select v-model="ruleForm.identity" placeholder="请选择您的身份">
                          <el-option label="客户" value="client"></el-option>
                          <el-option label="业务员" value="salesman"></el-option>
                          <el-option label="管理员" value="admin"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="密码" prop="pass">
                          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                      </el-form-item>
                  </el-form>
              </div>
          </div>
          <div class="login-content register" v-show="isRegister">
            <div class="head">账号注册
              <span class="to-register" @click="toLogin">已有账号? 去登录</span>
            </div>
            <div class="form-wrap">
                <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="65px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="name">
                      <el-input v-model="ruleForm2.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份" prop="registerIdentity">
                      <el-select v-model="ruleForm2.registerIdentity" placeholder="请选择您的身份">
                        <el-option label="客户" value="client"></el-option>
                        <el-option label="业务员" value="salesman"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="手机号" prop="tel">
                      <el-input v-model.number="ruleForm2.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="registerForm('ruleForm2')">立即注册</el-button>
                      <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">Copyright &copy; 2019-2020 WuPeng All Rights Reserved</div>
	</div>
</template>
  
<script>
import { register,login } from '../services.js'
  export default {
    name: 'login',
    data() {
      var checkTel = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入您的手机号'));
        }
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if (!myreg.test(value)) {
              callback(new Error('手机号格式不正确'));
            } else {
              callback();
            }
          }
      };
      return {
        ruleForm: {
          name: '',
          identity: '',
          pass: '',
        },
        ruleForm2: {
          name: '',
          registerIdentity: '',
          pass: '',
          tel: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入您的用户名', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入您的密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          identity: [
            { required: true, message: '请选择您的身份', trigger: 'change' }
          ],
          registerIdentity: [
            { required: true, message: '请选择您的身份', trigger: 'change' }
          ],
          tel: [
            { required: true, validator: checkTel, trigger: 'blur' }
          ]
        },
        isLogin: true,
        isRegister: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj = {
              name: this.ruleForm.name,
              identify: this.ruleForm.identity,
              pass: this.ruleForm.pass
            }
            login(obj).then(res=>{
              if(res.code === 0){
                if(res.date.disabled === '1'){
                  this.$notify({
                    title: '警告',
                    message: '该用户禁止登录',
                    type: 'warning'
                  });
                }else{
                  this.$notify({
                    title: '成功',
                    message: '登录成功',
                    type: 'success'
                  });
                  if(res.date && res.date.identify === 'client'){
                    this.$router.push({
                      name:'homeInfo',
                      params: res.date
                    })
                  }else if(res.date.identify === 'admin'){
                    this.$router.push({
                      name:'admin1',
                      params: res.date
                    })
                  }else if(res.date.identify === 'salesman'){
                    this.$router.push({
                      name:'saleHome',
                      params: res.date
                    })
                  }
                }                
              }else if (res.code === 3002){
                this.$notify({
                  title: '警告',
                  message: '该用户不存在',
                  type: 'warning'
                });
              }else if (res.code === 3003){
                this.$notify({
                  title: '警告',
                  message: '用户名或密码错误',
                  type: 'warning'
                });
              }else if (res.code === 3005){
                this.$notify({
                  title: '警告',
                  message: '身份不明，请选择身份',
                  type: 'warning'
                });
              }
            }).catch(err=>{
                console.log(err,'---err')
            })
          } else {
              console.log('error submit!!');
              return false;
          }
          });
      },
      registerForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let obj = {
                name: this.ruleForm2.name,
                pass: this.ruleForm2.pass,
                tel: this.ruleForm2.tel,
                identity: this.ruleForm2.registerIdentity
              }
              register(obj).then(res=>{
                  if(res.code === 0){
                      this.$notify({
                      title: '成功',
                      message: '注册成功',
                      type: 'success'
                    });
                    this.isRegister = false;
                    this.isLogin = true;
                  }else if (res.code === 3001){
                    this.$notify({
                      title: '警告',
                      message: '该用户名已存在',
                      type: 'warning'
                    });
                  }
              }).catch(err=>{
                  console.log(err,'---err')
              })
          } else {
              console.log('error register!!');
              return false;
          }
          });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toRegister(){
        this.isLogin = false;
        this.isRegister = true;
        this.$refs['ruleForm2'].resetFields();
      },
      toLogin(){
        this.isRegister = false;
        this.isLogin = true;
        this.$refs['ruleForm'].resetFields();
      }
    },
    beforeRouteEnter(to, from, next){
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_name_admin');
      localStorage.removeItem('user_name_sale');
      localStorage.removeItem('tel');
      localStorage.removeItem('tel_sale');
      localStorage.setItem('houseInfo',JSON.stringify({}));
      next();
    }
  }
</script>
  
<style scoped>
.home {
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
}
.content {
    width: 100%;
    position: relative;
    height: 706px;
    background: #fbfbfb url(../assets/images/bg.jpg) center center no-repeat;
}
.content .login-wrap {
    margin: 0 auto;
    padding-top: 70px;
    width: 1000px;
}
.content .login-wrap .wrapper {
    position: relative;
    margin: 0 auto;
    width: 540px;
    /* height: 400px; */
    background-color: #fff;
    box-shadow: 2px 2px 6px 2px rgba(0,0,0,0.23);
    border-radius: 5px;
}
.content .login-wrap .wrapper .login-content {
    position: relative;
    padding: 25px 45px;
    width: 450px;
}
.content .login-wrap .wrapper .login-content .head {
    margin-top: 14px;
    font-size: 24px;
    color: #43474D;
    font-weight: 500;
    line-height: 30px;
}
.content .login-wrap .wrapper .login-content .head .to-register {
    font-size: 12px;
    cursor: pointer;
}
.content .login-wrap .wrapper .login-content .form-wrap {
    margin-top: 25px;
}
/* .content .login-wrap .wrapper .login-content .form-wrap .client {
    border: 1px solid #DCDFE6;
    padding: 0 15px;
    background-color: #fff;
    border-radius: 4px;
    color: #606266;
    height: 40px;
    width: 206.33px;
    box-sizing: border-box;
} */
.el-select .el-input {
    width: 130px;
}
.footer {
    border-top: 1px solid #e6e6e6;
    font-size: 12px;
    color: #333;
    text-align: center;
    padding: 15px 0;
}
</style>
  