<template>
  <div class="admin1">
    <div class="people content">
      <h2>人员信息管理</h2>
      <div class="table">
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          border>
          <el-table-column
            label="Id"
            prop="id"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            label="Name"
            align="center"
            width="200">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="身份"
            prop="identify"
            align="center"
            :filters="[{ text: '客户', value: '客户' }, { text: '业务员', value: '业务员' },{ text: '管理员', value: '管理员' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
            width="200">
          </el-table-column>
          <el-table-column
            label="手机号"
            prop="tel"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column
            label="是否禁止登陆"
            :filters="[{ text: '允许登录', value: '允许登录' }, { text: '禁止登录', value: '禁止登录' }]"
            :filter-method="filterTag2"
            filter-placement="bottom-end"
            align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.disabled" placement="top">
                <el-switch
                  :disabled="scope.row.identify==='管理员'"
                  v-model="scope.row.disabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="允许登录"
                  inactive-value="禁止登录"
                  @change="switchChange(scope.row)">
                </el-switch>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="center">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入Name关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.identify==='管理员'"
                size="mini"
                type="danger"
                @click.native.prevent="handleDelete(scope, tableData)">Delete</el-button>
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
    </div>
  </div>
</template>
    
<script>
import { findAll,deleteClient,update } from '../../services.js'
  export default {
    name: 'admin1',
    data() {
      return {
        tableData: [],
        search: '',
        currentPage:1,
        listTotal:0,
        list: []
      };
    },
    methods: {
      switchChange(value){
        let disabled = value.disabled==='允许登录'?'0':'1';
        let identify = value.identify==='客户'?'client':(value.identify==='业务员'?'salesman':'admin');
        const obj = {
          id:value.id,
          name:value.name,
          identify: identify,
          tel: value.tel,
          pass:value.pass,
          disabled: disabled
        }
        update(obj).then(res=>{
          if(res.code === 0){
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            });
          }
        }).catch(err=>{
          console.log(err,'__err')
        })
      },
      filterTag(value, row) {
        return row.identify === value;
      },
      filterTag2(value, row) {
        return row.disabled === value;
      },
      handleDelete(scope, tableData) {
        this.$confirm(`确认删除用户 ${scope.row.name} ？`)
          .then(_ => {
            deleteClient(scope.row.id).then(res=>{
              if(res.code === 0){
                tableData.splice(scope.$index, 1);
                this.$notify({
                  title: '成功',
                  message: '用户删除成功',
                  type: 'success'
                });
              }
            }).catch(err=>{
              console.log(err,'__error')
            })
          })
          .catch(_ => {});
      },
      findAllFun(){
        findAll().then(res=>{
          if(res.code === 0 && res.date){
            res.date.forEach(item=>{
              item.identify = item.identify === 'client'?'客户':(item.identify==='salesman'?'业务员':'管理员');
              item.disabled = item.disabled === '0' ? '允许登录' : '禁止登录'
            })
            this.listTotal = res.date.length;
            for(var i=0;i<res.date.length;i+=10){
              this.list.push(res.date.slice(i,i+10));
            }
            this.tableData = this.list[this.currentPage-1]
          }
        }).catch(err=>{
          console.log(err,'__error')
        })
      },
      currentChange(page){
        this.currentPage = page;
        this.tableData = this.list[this.currentPage-1]
      },
      prevClick(page){
        this.currentPage--;
        this.tableData = this.list[this.currentPage-1]
      },
      nextClick(page){
        this.currentPage++;
        this.tableData = this.list[this.currentPage-1]
      },
    },
    created() {
      this.findAllFun();
    },
  }
</script>
    
<style scoped>
.admin1 {
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
    