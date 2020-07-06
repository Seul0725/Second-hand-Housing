<template>
  <div class="admin3">
    <div class="deal content">
      <h2>预约信息管理</h2>
      <div class="table">
        <el-table
          :data="tableData3"
          style="width: 100%"
          border>
          <el-table-column
            label="小区"
            align="center"
            fixed
            width="150"
            prop="community">
          </el-table-column>
          <el-table-column
            label="发布人"
            align="center"
            width="120"
            prop="userName">
          </el-table-column>
          <el-table-column
            label="发布人手机号"
            align="center"
            width="120"
            prop="tel">
          </el-table-column>
          <el-table-column
            label="是否被预约"
            align="center"
            width="120"
            :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
            prop="booked">
          </el-table-column>
          <el-table-column
            label="预约人"
            align="center"
            width="120"
            prop="bookedName">
          </el-table-column>
          <el-table-column
            label="预约人手机号"
            align="center"
            width="120"
            prop="bookedTel">
          </el-table-column>
          <el-table-column
            label="交易状态"
            :filters="[{ text: '已交易', value: '已交易' }, { text: '未交易', value: '未交易' }]"
            :filter-method="filterTag2"
            filter-placement="bottom-end"
            align="center"
            prop="status">
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
            align="center">
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.booked==='否'||scope.row.status==='已交易'"
                size="mini"
                type="primary"
                @click.native.prevent="handleEdit(scope, tableData3)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.status==='已交易'"
                @click.native.prevent="handleDelete3(scope, tableData3)">Delete</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="预约重置"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                :disabled="scope.row.booked==='否'||scope.row.status==='已交易'"
                @click.native.prevent="handleFlash(scope, tableData3)">重置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
				<el-pagination
					:page-size="10"
					layout="prev, pager, next"
					:total="listTotal"
					:current-page="currentPage"
					@current-change="currentChange"
					@prev-click="prevClick"
					@next-click="nextClick">
				</el-pagination>
      </div>
      <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="35%"
        :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
          <el-form-item label="预约人" prop="bookedName">
            <el-tag>{{ruleForm.bookedName}}</el-tag>
          </el-form-item>
          <el-form-item label="预约人手机号" prop="bookedTel">
            <el-input type="tel" v-model.number="ruleForm.bookedTel"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            <el-button @click="resetForm('ruleForm')">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
    
<script>
import { findAllHouseInfo,deleteHouseInfo,updateBooked } from '../../services.js'
  export default {
    name: 'admin3',
    data() {
      var checkTel = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入预约人的手机号'));
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
        tableData3: [],
        currentPage:1,
        listTotal:0,
        list: [],
        dialogVisible: false,
        ruleForm:{},
        rules: {
          bookedTel: [
            { required: true, validator: checkTel, trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
      filterTag(value, row) {
        return row.booked === value;
      },
      filterTag2(value, row) {
        return row.status === value;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj = {
              id: this.ruleForm.id,
              booked: true,
              bookedName: this.ruleForm.bookedName,
              bookedTel: this.ruleForm.bookedTel
            }
            updateBooked(obj).then(res=>{
              if(res.code === 0){
                this.dialogVisible = false;
                this.$notify({
                  title: '成功',
                  message: '编辑成功',
                  type: 'success'
                });
                this.tableData3.forEach(item=>{
                  if(item.id === this.ruleForm.id){
                    item.bookedTel = this.ruleForm.bookedTel
                  }
                })
              }
            }).catch(err=>{
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.dialogVisible = false;
        this.$refs['ruleForm'].resetFields();
      },
      handleFlash(scope, tableData3){
        this.$confirm(`确认重置该预约？`)
          .then(_ => {
            let obj = {
              id:scope.row.id,
              booked: false,
              bookedName: '',
              bookedTel: ''
            }
            updateBooked(obj).then(res=>{
              if(res.code === 0){
                this.$notify({
                  title: '成功',
                  message: '操作成功',
                  type: 'success'
                });
                scope.row.booked = '否';
                scope.row.bookedName = '无';
                scope.row.bookedTel = '无';
              }
            }).catch(err=>{
              console.log(err,'__err')
            })
          })
          .catch(_ => {});
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleEdit(scope, tableData3){
        this.dialogVisible = true;
        this.ruleForm = {
          id: scope.row.id,
          booked: true,
          bookedName: scope.row.bookedName,
          bookedTel: scope.row.bookedTel,
        }
      },
      handleDelete3(scope, tableData3){
        deleteHouseInfo(scope.row.id).then(res=>{
          if(res.code === 0){
            tableData3.splice(scope.$index, 1);
            this.$notify({
              title: '成功',
              message: '该交易信息删除成功',
              type: 'success'
            });
            this.findAllHouseInfoFun2();
          }
        }).catch(err=>{
          console.log(err,'__error')
        })
      },
      findAllHouseInfoFun2(){
        findAllHouseInfo().then(res=>{
          if(res.code === 0){
            res.date.forEach(item=>{
              item.booked = item.booked === false ? '否':'是';
              item.bookedName = item.bookedName?item.bookedName:'无';
              item.bookedTel = item.bookedTel?item.bookedTel:'无';
              item.status = item.status === '0' ? '未交易': '已交易';
            })
            this.listTotal = res.date.length;
            for(var i=0;i<res.date.length;i+=10){
              this.list.push(res.date.slice(i,i+10));
            }
            this.tableData3 = this.list[this.currentPage-1]
          }
        }).catch(err=>{
          console.log(err,'__err')
        })
      },
      currentChange(page){
        this.currentPage = page;
        this.tableData3 = this.list[this.currentPage-1]
      },
      prevClick(page){
        this.currentPage--;
        this.tableData3 = this.list[this.currentPage-1]
      },
      nextClick(page){
        this.currentPage++;
        this.tableData3 = this.list[this.currentPage-1]
      },
    },
    created() {
      this.findAllHouseInfoFun2();
    },
  }
</script>
    
<style scoped>
.admin3 {
    position: relative;
}
.content {
  padding: 30px 50px;
  position: relative;
}
.page {
	position: absolute;
	right: 50px;
	margin: 20px 0;
}
</style>
    