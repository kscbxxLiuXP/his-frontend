<template>
  <div style="margin-top: 2px">

    <el-card>

      <div class="patient-search">
      <span>病历号:
      <el-input v-model.number="inputSearch" placeholder="请输入病历号" style="width: 200px;margin-left: 10px"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchData" style="margin-left: 20px">搜索</el-button>
      </span>
      </div>
    </el-card>


    <el-card style="margin:20px">
      <div class="tiptag">
        患者信息确认
      </div>
      <div style="margin-top: 10px">
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

    <el-card style="margin:20px">
      <div class="tiptag">
        患者挂号信息
      </div>
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
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100">

          </el-table-column>
          <el-table-column
            prop="doctorName"
            label="看诊医生"
            width="150">
          </el-table-column>
          <el-table-column
            label="看诊日期"
            prop="diagnoseDate"
            width="150"
          >

          </el-table-column>
          <el-table-column
            label="挂号时间"
            prop="registerTime"
            width="160">
          </el-table-column>
          <el-table-column
            prop="registerUserName"
            label="挂号员"
            width="150">
          </el-table-column>
          <el-table-column
            prop="state"
            label="看诊状态"
            width="150">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state === '已挂号' ? 'success' : 'danger'"
                disable-transitions>{{scope.row.state}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column

            label="操作"
            width="120">
            <template slot-scope="scope">

              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row) " :disabled="scope.row.state === '已挂号' ? false : true">退号
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">

        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import request from '@/utils/request'

  export default {
    data() {
      return {
        inputSearch: '',
        tableData: [],
        multipleSelection: [],
        patientName: '',
        idNumber: '',
        address: '',
        patient: {},
        oldsearch:''
      }

    }, methods: {

      searchData() {

        const patientID = this.inputSearch
        if (this.oldsearch === patientID) {
          this.$message.success('患者挂号记录查找成功！')
        } else {
          this.oldsearch = patientID
          request({
            url: 'patient/search',
            method: 'get',
            params: { patientID }
          }).then(res => {
            if (res.code == '0') {
              this.patient = res.data
              request({
                url: 'register/getPatientRecord',
                method: 'get',
                params: { patientID }
              }).then(res => {
                if (res.code == '0') {
                  this.tableData = res.data
                  this.$message.success('患者挂号记录查找成功！')
                } else {
                  this.$message.warning('患者查找成功，该患者没有挂号记录！')
                }
              })
            } else {
              this.$message.error('查找失败，没有这个患者！')
            }
          })
        }

        // this.patientName="李白"
        // this.idNumber="321283200003127618"
        // this.address="辽宁省沈阳市浑南区东北大学"
        // this.$message.success("查找成功！")
        // this.tableData=[{
        //   patientID: '600600',
        //   name: '李白',
        //   doctor: '李时珍',
        //   diagnosedate: '2020-07-18',
        //   registertime: '2020-07-18 00:00:00',
        //   registerUser: '扁鹊',
        //   state: '已就诊',
        //   unregistertime: '-',
        //   unregisterUser: '-'
        // }, {
        //   patientID: '600600',
        //   name: '李白',
        //   doctor: '李时珍',
        //   diagnosedate: '2020-07-18',
        //   registertime: '2020-07-18 00:00:00',
        //   registerUser: '扁鹊',
        //   state: '已就诊',
        //   unregistertime: '-',
        //   unregisterUser: '-'
        // }, {
        //   patientID: '600600',
        //   name: '李白',
        //   doctor: '扁鹊',
        //   diagnosedate: '2020-07-18',
        //   registertime: '2020-07-18 00:00:00',
        //   registerUser: '挂号员',
        //   state: '已就诊',
        //   unregistertime: '-',
        //   unregisterUser: '-'
        // }, {
        //   patientID: '600600',
        //   name: '李白',
        //   doctor: '扁鹊',
        //   diagnosedate: '2020-07-18',
        //   registertime: '2020-07-18 00:00:00',
        //   registerUser: '挂号员',
        //   state: '已就诊',
        //   unregistertime: '-',
        //   unregisterUser: '-'
        // }, {
        //   patientID: '600600',
        //   name: '李白',
        //   doctor: '扁鹊',
        //   diagnosedate: '2020-07-18',
        //   registertime: '2020-07-18 00:00:00',
        //   registerUser: '挂号员',
        //   state: '已退号',
        //   unregistertime: '2020-07-18 00:00:00',
        //   unregisterUser: '杜甫'
        // }, {
        //   patientID: '600600',
        //   name: '李白',
        //   doctor: '扁鹊',
        //   diagnosedate: '2020-07-20',
        //   registertime: '2020-07-20 07:30:00',
        //   registerUser: '挂号员',
        //   state: '已挂号',
        //   unregistertime: '-',
        //   unregisterUser: '-'
        // }]
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
      },

      selectInit(row, index) {
        if (row.state !== '已挂号') {    //判断条件               

          return false  //不可勾选

        } else {

          return true  //可勾选

        }
      },
      handleDelete(index, row) {

        this.$confirm('确认要给这条记录退号?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.state = '已退号'
          const registerID = this.inputSearch

          request({
            url: '/unregister',
            method: 'get',
            params: { registerID }
          }).then(res => {
            if (res.code == '0') {
              row.unregistertime = this.getFormatDate()
              row.unregisterUser = this.name
              this.$message({
                type: 'success',
                message: '退号成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '退号失败!'
              })
            }
          })

        })
      },
      getFormatDate() {
        var date = new Date()
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        var currentDate = date.getFullYear() + '-' + month + '-' + strDate
          + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        return currentDate
      }
    },
    computed: {
      ...mapGetters(['name', 'nowuser'])
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
</style>
