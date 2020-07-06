<template>
  <div class="admin2">
    <div class="house content">
      <h2>房源信息管理</h2>
      <div class="table">
        <el-table
          :data="tableData2"
          style="width: 100%"
          border>
          <el-table-column
            label="小区"
            prop="community"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            label="城市"
            align="center"
            :filters="[{ text: '上海', value: '上海' }, { text: '北京', value: '北京' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
            prop="city">
          </el-table-column>
          <el-table-column
            label="房户类型"
            align="center"
            prop="type">
          </el-table-column>
          <el-table-column
            label="售价(单位：万)"
            align="center"
            prop="price">
          </el-table-column>
          <el-table-column
            label="发布人"
            align="center"
            prop="userName">
          </el-table-column>
          <el-table-column
            label="联系电话"
            align="center"
            prop="tel">
          </el-table-column>
          <el-table-column
            label="交易状态"
            :filters="[{ text: '已交易', value: '已交易' }, { text: '未交易', value: '未交易' }]"
            :filter-method="filterTag3"
            filter-placement="bottom-end"
            align="center"
            prop="status">
          </el-table-column>
          <el-table-column
            align="center"
            :filters="[{ text: '已审核', value: '已审核' }, { text: '未审核', value: '未审核' }]"
            :filter-method="filterTag2"
            filter-placement="bottom-end"
            label="审核状态">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.checked" placement="top">
                <el-switch
                  :disabled="scope.row.status==='已交易'"
                  v-model="scope.row.checked"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="已审核"
                  inactive-value="未审核"
                  @change="switchChange(scope.row)">
                </el-switch>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.status==='已交易'"
                @click.native.prevent="handleDelete2(scope, tableData2)">Delete</el-button>
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
import { findAllHouseInfo,deleteHouseInfo,updateChecked } from '../../services.js'
  export default {
    name: 'admin2',
    data() {
      return {
        tableData2: [],
        currentPage:1,
        listTotal:0,
        list: [],
      };
    },
    methods: {
      filterTag(value, row) {
        return row.city === value;
      },
      filterTag2(value, row) {
        return row.checked === value;
      },
      filterTag3(value, row) {
        return row.status === value;
      },
      switchChange(value){
        let checked = value.checked === '未审核'?'0':'1';
        let obj = {
          id:value.id,
          checked:checked
        }
        updateChecked(obj).then(res=>{
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
      handleDelete2(scope, tableData2){
        deleteHouseInfo(scope.row.id).then(res=>{
          if(res.code === 0){
            tableData2.splice(scope.$index, 1);
            this.$notify({
              title: '成功',
              message: '该房源信息删除成功',
              type: 'success'
            });
            this.findAllHouseInfoFun();
          }
        }).catch(err=>{
          console.log(err,'__error')
        })
      },
      findAllHouseInfoFun(){
        findAllHouseInfo().then(res=>{
          if(res.code === 0){
            this.listTotal = res.date.length;
            res.date.forEach(item=>{
              item.checked = item.checked === '0' ? '未审核': '已审核';
              item.status = item.status === '0' ? '未交易': '已交易';
            })
            for(var i=0;i<res.date.length;i+=10){
              this.list.push(res.date.slice(i,i+10));
            }
            this.tableData2 = this.list[this.currentPage-1];
          }
        }).catch(err=>{
          console.log(err,'__err')
        })
      },
      currentChange(page){
        this.currentPage = page;
        this.tableData2 = this.list[this.currentPage-1]
      },
      prevClick(page){
        this.currentPage--;
        this.tableData2 = this.list[this.currentPage-1]
      },
      nextClick(page){
        this.currentPage++;
        this.tableData2 = this.list[this.currentPage-1]
      },
    },
    created() {
      this.findAllHouseInfoFun();
    },
  }
</script>
    
<style scoped>
.admin2 {
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
    