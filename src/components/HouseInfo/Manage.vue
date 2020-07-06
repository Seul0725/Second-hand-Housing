<template>
  <div class="manage">
    <div class="title">我的房源管理</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" label-width="130px">
            <el-form-item label="小区">
              <span>{{ props.row.community }}</span>
            </el-form-item>
            <el-form-item label="小区所在城市">
              <span>{{ props.row.city }}</span>
            </el-form-item>
            <el-form-item label="房源户型">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="房子面积（平米）">
              <span>{{ props.row.area }}</span>
            </el-form-item>
            <el-form-item label="售价（万元）">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="单价（元/平米）">
              <span>{{ props.row.unitPrice }}</span>
            </el-form-item>
            <el-form-item label="房源图片">
              <el-image 
                style="width: 150px; height: 100px"
                :src="props.row.images[0]" 
                :preview-src-list="props.row.images">
              </el-image>
            </el-form-item>
            <el-form-item label="房源介绍">
              <span>{{ props.row.introduce }}</span>
            </el-form-item>
            <el-form-item label="发布人">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="发布人联系电话">
              <span>{{ props.row.tel }}</span>
            </el-form-item>
            <el-form-item label="是否被审核">
              <span>{{ props.row.checked }}</span>
            </el-form-item>
            <el-form-item label="是否被预约">
              <span>{{ props.row.booked }}</span>
            </el-form-item>
            <el-form-item label="预约人">
              <span>{{ props.row.bookedName }}</span>
            </el-form-item>
            <el-form-item label="预约人联系电话">
              <span>{{ props.row.bookedTel }}</span>
            </el-form-item>
            <el-form-item label="是否被接单">
              <span>{{ props.row.ordered }}</span>
            </el-form-item>
            <el-form-item label="接单业务员">
              <span>{{ props.row.orderedName }}</span>
            </el-form-item>
            <el-form-item label="业务员联系电话">
              <span>{{ props.row.orderedTel }}</span>
            </el-form-item>
            <el-form-item label="交易状态">
              <span>{{ props.row.status }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="community"
        label="小区">
      </el-table-column>
      <el-table-column
        prop="city"
        width="120"
        :filters="[{ text: '上海', value: '上海' }, { text: '北京', value: '北京' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        label="小区所在城市">
      </el-table-column>
      <el-table-column
        prop="type"
        label="户型">
      </el-table-column>
      <el-table-column
        prop="area"
        label="房子面积（平米）">
      </el-table-column>
      <el-table-column
        prop="price"
        label="售价（万元）">
      </el-table-column>
      <el-table-column
        prop="unitPrice"
        label="单价（元/平米）">
      </el-table-column>
      <el-table-column
        prop="checked"
        :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
        :filter-method="filterTag2"
        filter-placement="bottom-end"
        label="是否被审核">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible2"
      width="55%"
      :before-close="handleClose">
      <el-form ref="form2" :model="form2" :rules="rules" label-width="200px">
        <el-form-item label="小区" prop="community">
          <el-input v-model="form2.community" placeholder="请输入小区名"></el-input>
        </el-form-item>
        <el-form-item label="小区所在城市" prop="city">
          <el-select v-model="form2.city" placeholder="请选择所在城市">
            <el-option label="上海" value="上海"></el-option>
            <el-option label="北京" value="北京"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房户类型" prop="type">
          <el-input v-model="form2.type" placeholder="请输入房户类型"></el-input>
        </el-form-item>
        <el-form-item label="房子面积(单位:平米)" prop="area">
          <el-input v-model="form2.area" placeholder="请输入房子面积"></el-input>
        </el-form-item>
        <el-form-item label="期望售价(单位:万元)" prop="price">
          <el-input v-model.number="form2.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="单价(单位:元/平米)" prop="unitPrice">
          <el-input v-model.number="form2.unitPrice" placeholder="请输入单价"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="tel">
          <el-input v-model.number="form2.tel" placeholder="请输入您的电话"></el-input>
        </el-form-item>
        <el-form-item label="基本介绍" prop="introduce">
          <el-input v-model="form2.introduce" placeholder="请输入房子的基本介绍"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="toEditHouseInfo('form2')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
    
<script>
import { editHouseInfo,deleteHouseInfo,findAllHouseInfo } from '../../services.js'
  export default {
    name: 'manage',
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
			var checkPhone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入您的手机号'));
				}else{
					var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
          if (!myreg.test(value)) {
            callback(new Error('手机号格式不正确'));
          } else {
            callback();
          }
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
        rules: {
					community: [
						{ required: true, message: '请输入小区名称', trigger: 'blur' }
					],
					city: [
						{ required: true, message: '请选择小区所在城市', trigger: 'change' }
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
					phone: [
						{ validator: checkPhone, required: true, trigger: 'blur' }
          ],
          tel: [
						{ validator: checkPhone, required: true, trigger: 'blur' }
          ],
					introduce: [
						{ required: true, message: '请输入房子的基本介绍', trigger: 'blur' }
          ],
          images: [
						{ required: true, message: '请上传图片', trigger: 'blur' }
					],
        },
        tableData: [{
          id: 5,
          name: '锦绣花园小区',
          city: '上海',
          type: '二室一厅',
          area: 86.5,
          price: 340,
          unitPrice: 8900,
          booked: '否',
          images: ["https://second-hand-house.oss-cn-hangzhou.aliyuncs.com/images/ee912016-c5f3-4a72-bd54-1abc17c7b1ccroom1.jpg"],
          introduce: '111',
          tel: 10086
        }],
        form2: {
					name: '',
					city: '',
					type: '',
					area: '',
					price: '',
					unitPrice: '',
					tel: '',
					introduce: '',
					images: []
        },
        dialogVisible2: false,
      };
    },
    methods: {
      tableDateGetAllHouseInfo(){
        findAllHouseInfo().then(res=>{
          if(res.code === 0){
            const date = res.date;
            let formatTable = [];
            date.forEach(item=>{
              if(item.userName === localStorage.getItem('user_name')){
                formatTable.push(item);
              }
            })
            formatTable.forEach(item=>{
              item.name = item.userName;
              item.booked = item.booked === false ? '否':'是';
              item.images = item.images.image;
              item.checked = item.checked === '0' ? '否':'是';
              item.ordered = item.ordered === '0' ? '否':'是';
              item.status = item.status === '0' ? '未交易':'交易中';
              item.bookedName = item.bookedName ? item.bookedName:'无';
              item.bookedTel = item.bookedTel ? item.bookedTel:'无';
              item.orderedName = item.orderedName ? item.orderedName:'无';
              item.orderedTel = item.orderedTel ? item.orderedTel:'无';
            })
            this.tableData = formatTable;
          }
          
        }).catch(err=>{
          console.log(err,'__err')
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleEdit(index, row) {
        this.dialogVisible2 = true;
        this.form2 = row;
      },
      handleDelete(index, row) {
        deleteHouseInfo(row.id).then(res=>{
          if(res.code === 0){
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
            this.tableData.splice(index, 1);
          }
        }).catch(err=>{
          console.log(err,'__err')
        })
      },
      toEditHouseInfo(form2){
        this.$refs[form2].validate((valid) => {
					if (valid) {
						const obj = {
              id: this.form2.id,
              userName: localStorage.getItem('user_name'),
              community: this.form2.community,
              city: this.form2.city,
              type: this.form2.type,
              area: this.form2.area,
              price: this.form2.price,
              unitPrice: this.form2.unitPrice,
              tel: this.form2.tel,
              introduce: this.form2.introduce,
              images: {
                image:this.form2.images
              },
              booked: this.form2.booked === '是' ? true:false,
              checked: this.form2.checked === '否' ? '0':'1',
              ordered: this.form2.ordered === '否' ? '0':'1',
              status: this.form2.status === '未交易' ? '0':'1',
              bookedName: this.form2.bookedName === '无' ? '':this.form2.bookedName,
              bookedTel: this.form2.bookedTel === '无' ? '':this.form2.bookedTel,
              orderedName: this.form2.orderedName === '无' ? '':this.form2.orderedName,
              orderedTel: this.form2.orderedTel === '无' ? '':this.form2.orderedTel
            }
            editHouseInfo(obj).then(res=>{
              if(res.code === 0){
                this.$notify({
                  title: '成功',
                  message: '编辑成功',
                  type: 'success'
                });
                this.dialogVisible2 = false;
                // 房源管理房源信息
                this.tableDateGetAllHouseInfo();
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
      filterTag(value, row) {
        return row.city === value;
      },
      filterTag2(value, row) {
        return row.booked === value;
      },
    },
    created() {
      this.tableDateGetAllHouseInfo();
    },
  }
</script>
    
<style scoped>
.manage {
	position: relative;
	padding: 50px 20px;
  min-height: 400px;
}
.manage .title {
	font-weight: bold;
  color: #333;
  font-size: 33px;
	text-align: center;
	margin-bottom: 40px;
}
.el-input {
  width: 400px;
}
.demo-table-expand {
  font-size: 0;
}
.manage >>> .demo-table-expand label {
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
    