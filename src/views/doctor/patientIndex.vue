<template>
  <div style="margin-top: 15px;margin-left: 10px">
    <el-row>

      <el-col class="col-patient-select" :span="5">
        <sticky :z-index="10" :sticky-top="5">
          <div class="flex">
            <div class="title" style="display: inline-block">患者选择:</div>
            <el-button icon="el-icon-refresh" style="display: inline-block;float: right;margin-right: 5px"
                       type="primary" @click="refreshPatientList"
                       size="mini"/>
          </div>
          <el-input size="mini"  v-model.number="inputSearch" placeholder="请输入患者ID" style="margin-top: 10px">
            <template slot="prepend">患者名：</template>
            <el-button slot="append" @click="search()" icon="el-icon-search"></el-button>
          </el-input>

          <el-card style="margin-top: 3px">
            <div slot="header" class="clearfix">
              <span>患者列表</span>
            </div>
            <div class="title" style="display: inline-block">待诊患者:</div>
            <el-table
              ref="untreatedTable"
              size="mini"
              :data="untreatedData"
              highlight-current-row
              @row-click="handleUntreatedPatientClick"
              style="width: 100%;margin-left: -5px ;">
              <el-table-column
                type="index"
                width="20">
              </el-table-column>
              <el-table-column
                property="patientID"
                label="病历号"
                width="70">
              </el-table-column>
              <el-table-column
                property="name"
                label="姓名"
                width="60">
              </el-table-column>
              <el-table-column
                property="age"
                label="年龄"
              width="75">
              </el-table-column>
            </el-table>
            <div class="title" style="display: inline-block ;margin-top: 40px">已诊患者:</div>
            <el-table
              ref="treatedTable"
              size="mini"
              :data="treatedData"
              highlight-current-row
              @row-click="handleTreatedPatientClick"
              style="width: 100%;margin-left: -5px ;">
              <el-table-column
                type="index"
                width="20">
              </el-table-column>
              <el-table-column
                property="patientID"
                label="病历号"
                width="70">
              </el-table-column>
              <el-table-column
                property="name"
                label="姓名"
                width="60">
              </el-table-column>
              <el-table-column
                property="age"
                label="年龄"
              width="75">
              </el-table-column>
            </el-table>
          </el-card>
        </sticky>
      </el-col>

      <el-col class="col-patient-index" :span="19">
        <sticky :z-index="10">
          <el-card style="margin-top:-10px;height: 60px">
          <div class="flex" style="border: 1px solid lightgray ;margin-top: -5px">
            <div>
              <div class="title" style="display: inline-block">患者信息:</div>
              <span style="display: inline-block;white-space: pre">  患者姓名：</span>
              <span style="display: inline-block">{{currentRow.name}}</span>
              <span style="display: inline-block;white-space: pre">  病历号：</span>
              <span style="display: inline-block">{{currentRow.patientID}}</span>
              <span style="display: inline-block;white-space: pre">  年龄：</span>
              <span style="display: inline-block">{{currentRow.age}}</span>
            </div>


            <el-button icon="el-icon-check" style="display: inline-block;float: right" type="primary" size="mini">诊毕
            </el-button>
          </div>
          </el-card>
        </sticky>
        <el-card style="margin-left: 1px;margin-top: -8px">
          <el-tabs v-model="tabactiveName">

            <el-tab-pane label="病例首页" name="first">
              <index-tab ref="indexChild"  @refreshPatientList="refreshPatientList" :patient="this.currentRow" :disable-property="this.disableProperty" />
            </el-tab-pane>

            <el-tab-pane label="检查申请" name="second">
              <check-request-tab/>
            </el-tab-pane>
            <el-tab-pane  label="成药处方" name="third">
              <prescription-tab  ref="prescriptChild" :patient="this.currentRow" />
            </el-tab-pane>

          </el-tabs>
        </el-card>

      </el-col>
    </el-row>

  </div>
</template>

<script>
  import IndexTab from '@/views/doctor/components/indexTab'
  import CheckRequestTab from '@/views/doctor/components/checkRequestTab'
  import PrescriptionTab from '@/views/doctor/components/prescriptionTab'
  import Sticky from '@/components/Sticky/index'
  import request from '@/utils/request'

  export default {
    components: { PrescriptionTab, CheckRequestTab, IndexTab, Sticky },
    data() {
      return {
        tabactiveName: 'first',
        inputSearch: '',
        untreatedData: [{
          patientID: '1001',
          name: '张三丰',
          age: '24'
        }, {
          patientID: '1002',
          name: '白居易',
          age: '25'
        }, {
          patientID: '1003',
          name: '欧阳修',
          age: '26'
        }], treatedData: [{
          patientID: '1003',
          name: '东方不败',
          age: '24'
        }, {
          patientID: '1004',
          name: '火云邪神',
          age: '25'
        }, {
          patientID: '1005',
          name: '朱元璋',
          age: '26'
        }],
        currentRow: {
          patientID: '未选择',
          name: '未选择',
          age: '未选择'
        },
        userID: 0,
        disableProperty:true
      }

    }, created() {
      this.userID=this.$store.getters['nowuser'].userID
      //获取当前用户id
      this.refreshPatientList()

    }
    , methods: {
      //刷新患者列表
      refreshPatientList(){
        const userID=this.userID
        //获取未诊患者
        request({
          url: '/patient/untreated',
          method: 'get',
          params: { userID }
        }).then(response => {
          if (response.code === '0') {
            this.untreatedData = response.data
            //获取已诊患者
            request({
              url: '/patient/treated',
              method: 'get',
              params: { userID }
            }).then(response => {
              if (response.code === '0') {
                this.treatedData = response.data
                this.selectPatient(this.currentRow.patientID)
              }
            })
          }
        })



      },
      testParent(){
        console.log("测试子组件")
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row)
      },
      selectPatient(patientID){
        var patient1 = this.untreatedData.findIndex(item => item.patientID === patientID)
        var patient2 = this.treatedData.findIndex(item => item.patientID === patientID)
        console.log(this.untreatedData)
        console.log(this.treatedData)
        if(patient1!==-1){
          this.$refs.untreatedTable.setCurrentRow(this.untreatedData[patient1])
          this.$refs.treatedTable.setCurrentRow()
          this.currentRow=this.untreatedData[patient1]
          console.log(this.currentRow)
          this.$refs.indexChild.refreshPatientIndex(this.currentRow.registerID)
          this.$refs.indexChild.refreshDiagnose(this.currentRow.registerID)
          this.$refs.prescriptChild.refreshPrescriptionList(this.currentRow.registerID)
        }else if(patient2!==-1){
          console.log(this.treatedData[patient2])
          this.$refs.treatedTable.setCurrentRow(this.treatedData[patient2])

          this.$refs.untreatedTable.setCurrentRow()
          this.currentRow=this.treatedData[patient2]
          console.log(this.currentRow)
          this.$refs.indexChild.refreshPatientIndex(this.currentRow.registerID)
          this.$refs.indexChild.refreshDiagnose(this.currentRow.registerID)
          this.$refs.prescriptChild.refreshPrescriptionList(this.currentRow.registerID)
        }else {
          this.disableProperty=true
          this.$refs.treatedTable.setCurrentRow()
          this.$refs.untreatedTable.setCurrentRow()
          this.currentRow= {
            patientID: '未选择',
            name: '未选择',
            age: '未选择'
          }
        }
      },
      search(){
       this.selectPatient(this.inputSearch)
        console.log(this.currentRow)
      },

      handleUntreatedPatientClick(row,colum,event) {
        this.selectPatient(row.patientID)
        this.disableProperty=false
      },
      handleTreatedPatientClick(row,colum,event) {
        this.selectPatient(row.patientID)
        this.disableProperty=true
      }
    }
  }

</script>
<style>
  .flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: space-between;

    text-align: justify;


  }


  .title {
    width: 140px;
    height: 25px;

    padding: 4px;
    padding-left: 8px;
    font-size: 14px;
    border-radius: 5px;
    background-color: #D2E9FF;
  }
</style>
