<template>
  <div style="margin-top: 2px">

    <el-card>

      <div class="patient-search">
      <span>病历号:
      <el-input v-model="inputSearch" placeholder="请输入病历号" style="width: 200px;margin-left: 10px"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchPatient" style="margin-left: 20px">搜索</el-button>
      </span>
      </div>
    </el-card>

    <div class="title" style="display: inline-block;margin-top: 10px;margin-left: 30px">患者信息确认:</div>
    <el-card style="margin:20px;" shadow="hover">

      <div>
        <el-alert
          title=""
          type="success"
          :closable="false"
          style="width:850px;margin-left: 75px;margin-bottom: 10px;white-space: pre;alignment: center">
          <span class="info-item">姓名：</span>
          <span class="info-item"> {{patient.name}}</span>
          <span class="info-item">      身份证号：</span>
          <span class="info-item"> {{patient.identifyID}}</span>
          <span class="info-item">      家庭住址：</span>
          <span class="info-item"> {{patient.address}}</span>
        </el-alert>
      </div>
    </el-card>

    <div class="title" style="display: inline-block;margin-top: 10px;margin-left: 30px">患者收费信息:</div>
    <el-card style="margin:20px">

      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55" :selectable='selectInit'>
          </el-table-column>

          <el-table-column
            prop="patientID"
            label="病历号"
            width="70">
          </el-table-column>
          <el-table-column
            prop="patientName"
            label="姓名"
            width="90">

          </el-table-column>
          <el-table-column
            prop="itemName"
            label="缴费项目"
            width="450">
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            width="90">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="数量"
            width="90">
          </el-table-column>
          <el-table-column
            prop="openDoctor"
            label="开立医师"
            width="90">
          </el-table-column>
          <el-table-column
            label="开立时间"
            prop="openTime"
            width="160">

          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="90">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state === '已开立' ? 'success' : 'danger'"
                disable-transitions>{{scope.row.state}}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection(tableData)">全选</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button icon="el-icon-s-promotion" type="primary" @click="handleSubmit()">项目结算</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog title="发票预览" :visible.sync="dialogVisible">
      <div class="invoice">
        <p style="text-align: center"><strong>东软云HIS医院通用发票</strong></p>
        <div style="text-align: right">发票号：{{invoiceNumber}}</div>
        <div>
          <div style="float: left;white-space: pre">患者ID：{{patient.patientID}}<br/>患者姓名：{{patient.name}}</div>
          <p style="text-align: right">开票时间：{{time}}</p>
        </div>


        <el-divider></el-divider>
        <p><strong>项目明细</strong></p>
        <div v-for="(item,i) in multipleSelection">
          <div style="float: left;white-space: pre">{{item.itemName}}</div>
          <p style="text-align: right;white-space: pre">单价 {{item.price}} 数量 {{item.amount}} </p>
        </div>

        <el-divider></el-divider>
        <div style="text-align: right;font-weight: bold">总计：{{totalPrice}} 元  </div>
        <div style="text-align: right; white-space: pre">数量 {{totoalNum}}  项</div>

        <div style="text-align: right;margin-top: 10px;font-size: 20px">应收：{{totalPrice}} 元</div>
        <div style="text-align: right;margin-top: 4px;font-size: 20px">实收：{{charge}} 元</div>
        <div style="text-align: right;margin-top: 4px;font-size: 20px">找零：{{parseFloat(charge-totalPrice).toFixed(2)}} 元</div>
      </div>


      <el-form :model="formInline">
        <el-form-item label="实收">
          <el-input v-model.number="charge"></el-input>
        </el-form-item>
      </el-form>

      <!--      <el-divider></el-divider>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button icon="el-icon-printer" style="float: right" type="primary" @click="Submit()">打印发票</el-button>
      </div>


    </el-dialog>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import moment from "moment"
  export default {
    data() {
      return {

        inputSearch: '',
        dialogVisible: false,
        tableData: [],
        multipleSelection: [],
        patient: {},
        totalPrice: 0,
        totoalNum: 0,
        time:'',
        charge:0,
        invoiceNumber: 0}

    }, methods: {
      searchPatient() {
        const patientID = this.inputSearch

        request({
          url: 'patient/search',
          method: 'get',
          params: { patientID }
        }).then(res => {
          if (res.code == '0') {
            this.patient = res.data
            request({
              url: 'patient/cost/charge',
              method: 'get',
              params: { patientID }
            }).then(res => {
              if (res.code == '0') {
                this.tableData = res.data
                this.$message.success('患者费用查找成功！')
              } else {
                this.$message.warning('患者查找成功，该患者没有缴费项目！')
              }
            })
          } else {
            this.$message.error('查找失败，没有这个患者！')
          }
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        console.log(this.multipleSelection)

        this.totalPrice=this.sumPrice();
        this.totoalNum=this.sumNum();
      },

      selectInit(row, index) {
        if (row.state !== '已开立') {    //判断条件               

          return false  //不可勾选

        } else {

          return true  //可勾选

        }
      }, handleSubmit() {
        this.dialogVisible = !this.dialogVisible
        this.getTime()
      },
      Submit() {

        this.multipleSelection.forEach(item => {
          request({
            url:'/chargePatient',
            method:'post',
            data:item
          })
        })


        this.$message.success('缴费成功！')
        this.dialogVisible = !this.dialogVisible
        this.tableData = []
      },
      sumPrice() {
        var sum = 0
        this.multipleSelection.forEach(item => {
          sum = sum + item.price * item.amount
        })
        return sum
      }, sumNum() {
        var sum = 0
        this.multipleSelection.forEach(item => {
          sum = sum + item.amount
        })
        return sum
      },
      getFormatDate() {
        var date = new Date();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentDate = date.getFullYear() + "-" + month + "-" + strDate
          + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return currentDate;
      }


    },created() {
      request({
        url:'/invoice/number',
        method:'get'

      }).then(res=>{
        this.invoiceNumber=res.data
      })
      this.time=this.getFormatDate()
    }
  }
</script>

<style>
  .patient-search {
    margin-left: 100px;

  }

  .info-item {
    font-size: 18px;
    white-space: pre;
  }

  .table {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 70px;
    margin-top: 30px;
  }

  .tiptag {
    width: 90px;
    margin-top: -20px;
    margin-left: -10px;
    background-color: lightblue;
    font-size: 13px;
    border-radius: 10px;
    text-align: center;
    color: #1c00cf;
  }

  .title {
    width: 140px;
    height: 25px;

    padding: 4px;
    padding-left: 8px;
    font-size: 14px;
    border-radius: 5px;
    background-color: #D2E9FF;
    /*margin-top: 10px;*/
  }
</style>
