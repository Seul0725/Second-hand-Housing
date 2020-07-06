<template>
  <div class="modifyPwd" element-loading-text="3秒后返回首页" v-loading="fullscreenLoading">
    <el-steps :space="200" :active="activeIndex" finish-status="success">
      <el-step title="修改密码"></el-step>
      <el-step title="修改成功"></el-step>
    </el-steps>
    <el-form v-show="isSuccess" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="旧密码" prop="oldPass">
        <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkNewPass">
        <el-input type="password" v-model="ruleForm.checkNewPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
      </el-form-item>
    </el-form>
    <div v-show="!isSuccess">
      <el-alert
        title="成功"
        type="success"
        description="修改密码成功"
        :closable="false"
        show-icon>
      </el-alert>
    </div>
  </div>
</template>
    
<script>
import { updatePass } from '../../services.js'
  export default {
    name: 'modifyPwd',
    data() {
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      var validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkNewPass !== '') {
            this.$refs.ruleForm.validateField('checkNewPass');
          }
          callback();
        }
      };
      var validateCheckNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          oldPass: '',
          newPass: '',
          checkNewPass: '',
        },
        rules: {
          newPass: [
            { required: true,validator: validateNewPass, trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          checkNewPass: [
            {  required: true,validator: validateCheckNewPass, trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          oldPass: [
            {  required: true,validator: validateOldPass, trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ]
        },
        isSuccess: true,
        activeIndex: 1,
        fullscreenLoading: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const obj = {
              name: localStorage.getItem('user_name'),
              oldPass: this.ruleForm.oldPass,
              newPass: this.ruleForm.checkNewPass
            }
            updatePass(obj).then(res=>{
              if(res.code === 0){
                this.isSuccess = false;
                this.activeIndex = 2;
                setTimeout(()=>{
                  this.fullscreenLoading = true;
                },2000)
                setTimeout(()=>{
                  this.fullscreenLoading = false;
                  this.$router.push('/homeInfo')
                },5000)
                this.$refs['ruleForm'].resetFields();
              }else if(res.code === 3006){
                this.$notify({
                  title: '警告',
                  message: '旧密码错误！',
                  type: 'warning'
                });
              }
            }).catch(err=>{
              console.log(err,'__err')
            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs['ruleForm'].resetFields();
      }
    },
    created() {
    },
  }
</script>
    
<style scoped>
.modifyPwd {
  position: relative;
  padding: 50px 100px;
  min-height: 350px;
}
.modifyPwd .title {
	font-weight: bold;
  color: #333;
  font-size: 20px;
	text-align: left;
	margin-bottom: 40px;
}
.el-input {
	width: 40%;
}
.el-steps {
  margin-bottom: 50px;
  padding-left: 30px;
}
.el-alert {
  width: 40%;
  margin-left: 30px;
  padding: 10px 10px;
}
</style>
      