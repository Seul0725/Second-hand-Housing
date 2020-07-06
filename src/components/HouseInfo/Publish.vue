<template>
  <div class="publish">
    <div class="title">发布出售房源</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="300px">
      <el-form-item label="小区" prop="name">
        <el-input v-model="form.name" placeholder="请输入小区名"></el-input>
      </el-form-item>
      <el-form-item label="小区所在城市" prop="city">
        <el-select v-model="form.city" placeholder="请选择所在城市">
        <el-option label="上海" value="上海"></el-option>
        <el-option label="北京" value="北京"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房户类型" prop="type">
        <el-input v-model="form.type" placeholder="请输入房户类型"></el-input>
      </el-form-item>
      <el-form-item label="房子面积(单位:平米)" prop="area">
        <el-input v-model="form.area" placeholder="请输入房子面积"></el-input>
      </el-form-item>
      <el-form-item label="期望售价(单位:万元)" prop="price">
        <el-input v-model.number="form.price" placeholder="请输入您期望卖出的价格"></el-input>
      </el-form-item>
      <el-form-item label="单价(单位:元/平米)" prop="unitPrice">
        <el-input v-model.number="form.unitPrice" placeholder="请输入您期望卖出的单价"></el-input>
      </el-form-item>
      <!-- <el-form-item label="手机号码" prop="phone">
        <el-input v-model.number="form.phone" placeholder="您的电话，方便我们及时与您联系"></el-input>
      </el-form-item> -->
      <el-form-item label="基本介绍" prop="introduce">
        <el-input v-model="form.introduce" placeholder="请输入房子的基本介绍便于看房"></el-input>
      </el-form-item>
      <el-form-item label="图片上传" prop="images">
        <el-upload
          action="/api/upload/oss?folder=images"
          list-type="picture-card"
          :on-success="handleSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('form')">提交委托</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
    
<script>
import { addHouseInfo } from '../../services.js'
  export default {
    name: 'publish',
    data() {
      var checkPrice = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('售价不能为空'));
					}else if (!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					}else{
						callback()
					}
				};
			var checkUnitPrice = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('单价不能为空'));
				}else if (!Number.isInteger(value)) {
					callback(new Error('请输入数字值'));
				}else{
					callback()
				}
			};
      return {
        form: {
        name: '',
        city: '',
        type: '',
        area: '',
        price: '',
        unitPrice: '',
        // phone: '',
        introduce: '',
        images: []
      },
      rules: {
					name: [
						{ required: true, message: '请输入小区名称', trigger: 'blur' }
					],
					city: [
						{ required: true, message: '请选择小区所在城市', trigger: 'change' }
          ],
          booked: [
						{ required: true, message: '请选择是否被预约', trigger: 'change' }
					],
					type: [
						{ required: true, message: '请输入房户类型', trigger: 'blur' }
					],
					area: [
						{ required: true, message: '请输入房子面积', trigger: 'blur' }
					],
					price: [
						{ validator: checkPrice, required: true, trigger: 'blur' }
					],
					unitPrice: [
						{ validator: checkUnitPrice, required: true, trigger: 'blur' }
					],
					// phone: [
					// 	{ validator: checkPhone, required: true, trigger: 'blur' }
          // ],
					introduce: [
						{ required: true, message: '请输入房子的基本介绍', trigger: 'blur' }
          ],
          images: [
						{ required: true, message: '请上传图片', trigger: 'blur' }
					],
        },
        // 图片上传
				dialogImageUrl: '',
        dialogVisible: false,
      };
    },
    methods: {
      onPublish(form){
        this.$refs[form].validate((valid) => {
					if (valid) {
						var obj = {
              userName: localStorage.getItem('user_name'),
              tel: localStorage.getItem('tel'),
							community: this.form.name,
							city: this.form.city,
							type: this.form.type,
							area: this.form.area,
							price: this.form.price,
							unitPrice: this.form.unitPrice,
							introduce: this.form.introduce,
              images:{
                image:this.form.images
              }
            }
						addHouseInfo(obj).then(res=>{
							if(res.code === 0){
								this.$notify({
									title: '成功',
									message: '发布成功',
									type: 'success'
                });
                this.form = {};
                this.$router.push('/homeInfo')
							}
						}).catch(err=>{
							console.log(err,'__err')
						})
					}else {
						console.log('error submit!!');
						return false;
					}
        });
      },
      // 图片上传预览和删除
			handleRemove(file, fileList) {
        this.form.images.forEach((item,index)=>{
          if(item===file.response){
            this.form.images.splice(index,1);
          }
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
			},
			handleSuccess(res, file){
        if(file.response){
          this.rules.images = [];
        }
				this.dialogImageUrl = file.response;
				this.form.images.push(file.response);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
            this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    }
  }
</script>
    
<style scoped>
.publish {
	position: relative;
	padding: 50px 20px;
  min-height: 400px;
}
.publish .title {
	font-weight: bold;
  color: #333;
  font-size: 33px;
	text-align: center;
	margin-bottom: 40px;
}
.el-input {
	width: 60%;
}
</style>
    