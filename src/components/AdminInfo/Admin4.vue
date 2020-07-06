<template>
  <div class="admin4">
    <div class="deal content">
      <h2>接单信息管理</h2>
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
            label="是否被接单"
            align="center"
            width="120"
            :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
            prop="ordered">
          </el-table-column>
          <el-table-column
            label="业务员"
            align="center"
            width="120"
            prop="orderedName">
          </el-table-column>
          <el-table-column
            label="业务员手机号"
            align="center"
            width="120"
            prop="orderedTel">
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
                size="mini"
                type="primary"
                :disabled="scope.row.ordered==='否'||scope.row.status==='已交易'"
                @click.native.prevent="handleEdit(scope, tableData3)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.status==='已交易'"
                @click.native.prevent="handleDelete3(scope, tableData3)">Delete</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="接单重置"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                :disabled="scope.row.ordered==='否'||scope.row.status==='已交易'"
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
          <el-form-item label="业务员" prop="orderedName">
            <el-tag>{{ruleForm.orderedName}}</el-tag>
          </el-form-item>
          <el-form-item label="业务员手机号" prop="orderedTel">
            <el-input type="tel" v-model.number="ruleForm.orderedTel"></el-input>
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
import { findAllHouseInfo,deleteHouseInfo,updateOrdered } from '../../services.js'
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
          orderedTel: [
            { required: true, validator: checkTel, trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
      filterTag(value, row) {
        return row.ordered === value;
      },
      filterTag2(value, row) {
        return row.status === value;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateOrdered
            let obj = {
              id: this.ruleForm.id,
              ordered: '1',
              orderedName: this.ruleForm.orderedName,
              orderedTel: this.ruleForm.orderedTel
            }
            updateOrdered(obj).then(res=>{
              if(res.code === 0){
                this.dialogVisible = false;
                this.$notify({
                  title: '成功',
                  message: '编辑成功',
                  type: 'success'
                });
                this.tableData3.forEach(item=>{
                  if(item.id === this.ruleForm.id){
                    item.orderedTel = this.ruleForm.orderedTel
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
        this.$confirm(`确认重置该接单？`)
          .then(_ => {
            let obj = {
              id:scope.row.id,
              ordered: '0',
              orderedName: '',
              orderedTel: ''
            }
            updateOrdered(obj).then(res=>{
              if(res.code === 0){
                this.$notify({
                  title: '成功',
                  message: '操作成功',
                  type: 'success'
                });
                scope.row.ordered = '否';
                scope.row.orderedName = '无';
                scope.row.orderedTel = '无';
              }
            }).catch(err=>{
              console.log(err,'__err')
            })
          })
          .catch(_ => {});
      },
      handleEdit(scope, tableData3){
        this.dialogVisible = true;
        this.ruleForm = {
          id: scope.row.id,
          ordered: '1',
          orderedName: scope.row.orderedName,
          orderedTel: scope.row.orderedTel
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
              item.ordered = item.ordered === '0' ? '否':'是';
              item.orderedName = item.orderedName ? item.orderedName: '无';
              item.orderedTel = item.orderedTel ? item.orderedTel: '无';
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
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    },
    created() {
      this.findAllHouseInfoFun2();
    },
  }
</script>
    
<style scoped>
.admin4 {
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
    