<template>
  <div class="admin5">
    <div class="content">
      <h2>报表信息统计</h2>
      <div id="main" style="width: 600px;height:400px;"></div>
    </div>
  </div>
</template>
    
<script>
import { bookedFindAll,orderedFindAll } from '../../services.js';
import {dateFormat} from '../../utils.js'
  export default {
    name: 'admin5',
    data() {
      return {
        data1: [],
        data2: []
      };
    },
    methods: {
      drawChart() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("main"));
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: "2020年度报表统计"
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ["预约看房数","业务接单数"]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
                saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
          },
          yAxis: {
            type: 'value'
          },
          series: [
              {
                name: '预约看房数',
                type: 'line',
                data: this.data1
            },
            {
                name: '业务接单数',
                type: 'line',
                data: this.data2
            },
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    },
    created() {
    },
    mounted() {
      bookedFindAll().then(res=>{
        if(res.code === 0){
          res.date = res.date.map(item=>{
            return dateFormat('mm',new Date(item.time));
          })
          let April = res.date.filter(item=>{
            return item === '04'
          }).length;
          let May = res.date.filter(item=>{
            return item === '05'
          }).length;
          let date = dateFormat('mm',new Date());
          if(date === '04'){
            this.data1 = [0,0,0,April]
          }else if(date === '05'){
            this.data1 = [0,0,0,April,May]
          }
          orderedFindAll().then(res=>{
            if(res.code === 0){
              res.date = res.date.map(item=>{
                return dateFormat('mm',new Date(item.time));
              })
              let April = res.date.filter(item=>{
                return item === '04'
              }).length;
              let May = res.date.filter(item=>{
                return item === '05'
              }).length;
              let date = dateFormat('mm',new Date());
              if(date === '04'){
                this.data2 = [0,0,0,April]
              }else if(date === '05'){
                this.data2 = [0,0,0,April,May]
              }
              this.drawChart();
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      }).catch(err=>{
        console.log(err)
      })
      
    }
  }
</script>
    
<style scoped>
.admin5 {
    position: relative;
}
.content {
  padding: 30px 50px;
  position: relative;
}
#main{
  margin: 0 auto;
}
</style>
    