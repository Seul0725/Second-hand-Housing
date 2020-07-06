<template>
  <div class="myOrder">
    <div class="title">我的订单</div>
    <el-table
      :data="tableData"
      border
      @cell-click="handleToRoom"
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
        width="120"
        label="户型">
      </el-table-column>
      <el-table-column
        prop="area"
        width="150"
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
        prop="status"
        :filters="[{ text: '已交易', value: '已交易' }, { text: '未交易', value: '未交易' }]"
        :filter-method="filterTag2"
        filter-placement="bottom-end"
        label="交易状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.status==='已交易'"
            size="mini"
            type="danger"
            @click="handleCancel(scope.$index, scope.row)">取消预约</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
    
<script>
import { updateBooked,findAllHouseInfo } from '../../services.js'
  export default {
    name: 'myOrder',
    data() {
      return {
        tableData: [],
      };
    },
    methods: {
      tableDateGetAllHouseInfo(){
        findAllHouseInfo().then(res=>{
          if(res.code === 0){
            const date = res.date;
            let formatTable = [];
            date.forEach(item=>{
              if(item.bookedName === localStorage.getItem('user_name')){
                formatTable.push(item);
              }
            })
            formatTable.forEach(item=>{
              item.name = item.userName;
              item.booked = item.booked === false ? '否':'是';
              item.images = item.images.image;
              item.checked = item.checked === '0' ? '否':'是';
              item.ordered = item.ordered === '0' ? '否':'是';
              item.status = item.status === '0' ? '未交易':'已交易';
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
      filterTag(value, row) {
        return row.city === value;
      },
      filterTag2(value, row) {
        return row.status === value;
      },
      handleCancel(index, row){
        let obj = {
          id:row.id,
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
            this.tableData.splice(index, 1);
          }
        }).catch(err=>{
          console.log(err,'__err')
        })
      },
      handleToRoom(row,column){
        if(column.label !== '操作'){
          this.$router.push({
            name: 'room',
            params: row
          })
        }
      }
    },
    created() {
      this.tableDateGetAllHouseInfo();
    },
  }
</script>
    
<style scoped>
.myOrder {
	position: relative;
	padding: 50px 20px;
  min-height: 400px;
}
.myOrder .title {
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
.myOrder >>> .demo-table-expand label {
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table {
  cursor: pointer;
}
</style>
    