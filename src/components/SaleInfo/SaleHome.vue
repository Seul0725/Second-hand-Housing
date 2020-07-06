<template>
  <div class="saleHome">
    <div class="title">接单信息</div>
    <el-table
      :data="tableData"
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
              <span>{{ props.row.userName }}</span>
            </el-form-item>
            <el-form-item label="发布人联系电话">
              <span>{{ props.row.tel }}</span>
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
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="community"
        label="小区">
      </el-table-column>
      <el-table-column
        prop="city"
        :filters="[{ text: '上海', value: '上海' }, { text: '北京', value: '北京' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        label="小区所在城市">
      </el-table-column>
      <el-table-column
        prop="introduce"
        width="250"
        label="房源介绍">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="发布人">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="发布人联系电话">
      </el-table-column>
      <el-table-column
        prop="booked"
        :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
        :filter-method="filterTag2"
        filter-placement="bottom-end"
        label="是否被预约">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click.native.prevent="handleSale(scope.$index, scope.row)">接单</el-button>
        </template>
      </el-table-column>
    </el-table>
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
</template>
    
<script>
import { findAllHouseInfo,updateOrdered } from '../../services.js'
  export default {
    name: 'saleHome',
    data() {
      return {
        tableData:[],
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
        return row.booked === value;
      },
      handleSale(index,rows){
        let obj = {
          id: rows.id,
          ordered: '1',
          orderedName: localStorage.getItem('user_name_sale'),
          orderedTel: localStorage.getItem('tel_sale')
        }
        updateOrdered(obj).then(res=>{
          if(res.code === 0){
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            });
            this.tableData.splice(index, 1);
          }
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
      findAll(){
        findAllHouseInfo().then(res=>{
          if(res.code === 0){
            this.tableData = res.date.filter(item=>{
              return item.checked === '1'&& item.ordered === '0' && item.booked
            })
            this.tableData.forEach(item=>{
              item.images = item.images.image;
              item.booked = item.booked?'是':'否';
              // item.bookedName = item.bookedName?item.bookedName:'无';
              // item.bookedTel = item.bookedTel?item.bookedTel:'无';
            })
            this.listTotal = this.tableData.length;
            for(var i=0;i<this.tableData.length;i+=5){
              this.list.push(this.tableData.slice(i,i+5));
            }
            this.tableData = this.list[this.currentPage-1];
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    created() {
      this.findAll();
    },
  }
</script>
    
<style scoped>
.saleHome {
  position: relative;
	padding: 50px 20px;
}
.saleHome .title {
	font-weight: bold;
  color: #333;
  font-size: 33px;
	text-align: center;
	margin-bottom: 40px;
}
.demo-table-expand {
  font-size: 0;
}
.saleHome >>> .demo-table-expand label {
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.page {
	position: absolute;
	right: 50px;
	margin: 20px 0;
}
</style>
    