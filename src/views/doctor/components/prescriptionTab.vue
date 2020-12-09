<template>
  <div>
    <div class="title" style="display: inline-block;margin-top: 10px;margin-left: 10px">门诊诊断:</div>
    <el-tag type="warning" size="small">流行性感冒</el-tag>
    <el-tag type="warning" size="small">发烧</el-tag>
    <el-tag type="warning" size="small">咳嗽</el-tag>
    <div class="btnbar" style="margin-top: 10px">
      <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addPrescription" plain>增方</el-button>
      <el-button type="info" size="small" icon="el-icon-remove" @click="deletePrescription" plain>删方</el-button>
      <el-button type="success" size="small" icon="el-icon-success" @click="openPrescriptionConfirmVisible=true" plain>开立</el-button>
      <el-button type="info" size="small" icon="el-icon-delete-solid" plain>作废</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh-right" plain>刷新</el-button>
      <el-button type="primary" size="small" icon="el-icon-plus" style="margin-left: 130px"
                 @click="openAddNewDrugPageProperty=true" plain>增药
      </el-button>
      <el-button type="info" size="small" icon="el-icon-minus" plain>删药</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-row>
        <el-col :span="7">
          <div>
            <el-card shadow="hover">
              <div class="title" style="display: inline-block;margin-top: -10px;margin-left: -10px">门诊处方:</div>
              <el-table
                ref="singleTable"
                size="mini"
                :data="prescriptionData"
                highlight-current-row
                @current-change="handlePrescriptionChange"
                style="width: 100%;margin-left: -5px">
                <el-table-column
                  type="index"
                  width="20">
                </el-table-column>
                <el-table-column
                  property="prescriptionName"
                  label="处方名称"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="状态"
                >
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.state === '暂存' ? 'success' : 'danger'"
                      disable-transitions>{{scope.row.state}}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
        </el-col>
        <el-col :span="17">
          <div>


            <el-card shadow="hover" style="margin-left: 10px">
              <div class="title" style="display: inline-block;margin-top: -10px;margin-left: -10px">本处方金额合计:</div>
              <div class="fee" style="display: inline-block;margin-top: -10px;margin-left: 10px">{{totalCost}}元</div>
              <el-table
                ref="multipleTable"
                :data="prescriptionDetailData"
                tooltip-effect="dark"
                style="width: 100%"
                size="mini"
                @selection-change="handlePDetailSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="30" >
                </el-table-column>

                <el-table-column
                  prop="drugName"
                  label="药品名称"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="specification"
                  label="规格"
                  width="90"></el-table-column>
                <el-table-column
                  prop="drugPrice"
                  label="单价"
                  width="60"></el-table-column>
                <el-table-column
                  prop="dosage"
                  label="用法"
                  width="60"></el-table-column>
                <el-table-column
                  prop="usage"
                  label="用量"
                  width="70"></el-table-column>
                <el-table-column
                  prop="frequency"
                  label="频次"
                  width="70"></el-table-column>
                <el-table-column
                  prop="amount"
                  label="数量"
                  width="60"></el-table-column>


              </el-table>
            </el-card>
          </div>
        </el-col>
      </el-row>


    </div>
    <div>
      <el-card style="margin-top: 20px">
        <div slot="header" class="clearfix">
          <span>处方模板</span>
        </div>
        <el-row>
          <el-col :span="8">
            <el-card shadow="never">
              <div>
                <el-input size="small" v-model="inputModelSearch" placeholder="请输入处方名" style="margin-top: 10px">
                  <template slot="prepend">处方名：</template>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-table
                  ref="singleTable"
                  size="mini"
                  :data="prescriptModelData"
                  highlight-current-row
                  @current-change="handleModelCurrentChange"
                  style="width: 100%">

                  <el-table-column
                    property="pscriptTemplateName"
                    label="模板名称"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    property="useRange"
                    label="范围">
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>

          <el-col :span="16">
            <el-card style="margin-left: 10px" shadow="hover">
              <div slot="header" class="clearfix">
                <span>模板明细</span>
                <el-button style="float: right; padding: 3px 0" @click="modelUseConfirmVisible=true" use type="text">
                  使用该模板
                </el-button>
              </div>
              <el-table
                ref="multipleTable"
                :data="prescriptModelDetailData"
                tooltip-effect="dark"
                style="width: 100%"
                size="mini"
              >
                <el-table-column
                  prop="drugName"
                  label="药品名称"
                  width="230">
                </el-table-column>
                <el-table-column
                  prop="specification"
                  label="规格"
                  width="120"></el-table-column>
                <el-table-column
                  prop="price"
                  label="单价"
                  width="60"></el-table-column>
                <el-table-column
                  prop="usage"
                  label="用法"
                  width="50"></el-table-column>
                <el-table-column
                  prop="dosage"
                  label="用量"
                  width="50"></el-table-column>
                <el-table-column
                  prop="frequency"
                  label="频次"
                  width="50"></el-table-column>

              </el-table>
            </el-card>

          </el-col>
        </el-row>

      </el-card>
    </div>
    <el-dialog title="增药" :visible.sync="openAddNewDrugPageProperty">
      <el-input placeholder="输入药品首字符以检索" icon="search" v-model="drugFilter">
      </el-input>
      <el-table :data="drugData" style="width: 100%" class="diagnose-table">
        <el-table-column property="drugName" label="药品名称" width="100"></el-table-column>
        <el-table-column property="drugSpecification" label="药品规格" width="100"></el-table-column>
        <el-table-column property="drugHelperCode" label="药品助记码" width="100"></el-table-column>
        <el-table-column property="drugPrice" label="单价" width="100"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-circle-plus"
              @click="addDrug(scope.$index, scope.row)">增加
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="diagnose-pagination"
                     layout="prev, pager, next"
                     @current-change="drug_current_change"
                     :total="drugTotal"
                     background
      >
      </el-pagination>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="modelUseConfirmVisible"
      width="30%">
      <span>您确定要使用该模板吗</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="modelUseConfirmVisible = false">取 消</el-button>
    <el-button type="primary" @click="useTemplate">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="openPrescriptionConfirmVisible"
      width="30%">
      <span>您确定要开立处方吗</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="openPrescriptionConfirmVisible = false">取 消</el-button>
    <el-button type="primary" @click="openPrescription">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import request from '@/utils/request'

  export default {
    name: 'prescriptionTab',
    props: ['patient'],
    data() {
      return {
        totalCost:0,
        inputModelSearch: '',
        openAddNewDrugPageProperty: false,
        //患者处方
        prescriptionData: [],
        //患者处方明细
        prescriptionDetailData: [],
        //处方模板
        prescriptModelData: [],
        //处方模板明细
        prescriptModelDetailData: [],
        //药品数据
        drugData: [],
        //现在选中的模板ID
        currentPscriptTemplateID: 0,
        //当前用户ID
        userID: 0,
        //模板确认对话框
        modelUseConfirmVisible: false,
        currentPrescriptionID:0,
        //开立对话框
        openPrescriptionConfirmVisible:false
      }
    },

    ///初始化数据
    created() {
      //获取当前用户
      this.userID = this.$store.getters['nowuser'].userID
      //初始化模板
      request({
        url: '/prescriptionTemplate/all',
        method: 'get'
      }).then(res => {
        if (res.code == '0') {
          this.prescriptModelData = res.data
        }
      })
      //初始化药品
      request({
        url: '/drug/list',
        method: 'get'
      }).then(res => {
        if (res.code == '0') {
          this.drugData = res.data
        }
      })
      // //获取用户处方
      // this.refreshPrescriptionList()
    },
    methods: {

      /**
       * 模板点击事件
       */
      handleModelCurrentChange(val) {
        const prescriptionTemplateID = val.pscriptTemplateID
        this.currentPscriptTemplateID = prescriptionTemplateID
        console.log(prescriptionTemplateID)
        //获取模板明细
        request({
          url: '/prescriptionTemplate/detail',
          methos: 'get',
          params: { prescriptionTemplateID }
        }).then(res => {
          if (res.code == '0') {
            this.prescriptModelDetailData = res.data
          }
        })
      },
      /**
       * 使用模板，直接将模板中的数据全部返回给后端后端直接加入
       */
      useTemplate() {
        const registerID = this.patient.registerID
        const userID = this.userID
        const currentPscriptTemplateID = this.currentPscriptTemplateID
        const prescriptModelDetailData = this.prescriptModelDetailData
        request({
          url: '/prescriptionTemplate/use',
          method: 'get',
          params: { registerID, userID, currentPscriptTemplateID }
        }).then(res => {
          if (res.code == '0') {
            this.$message.success('使用模板成功！')
            //刷新处方列表
            this.prescriptionData.push(res.data)
            console.log(this.prescriptionData)
          }
        })

        this.modelUseConfirmVisible = false
      },
      /**
       * 刷新患者处方列表
       */
      refreshPrescriptionList(registerID) {

        request({
          url: '/patientPrescription/get',
          methos: 'get',
          params:{registerID}
        }).then(res=>{
          if(res.code=='0'){
            console.log(res.data)
            this.prescriptionData=res.data
          }
        })
      },
      /**
       * 处理患者处方点击事件
       */
      handlePrescriptionChange(val) {
        this.currentPrescriptionID =val.prescriptionID
        const prescriptionID=val.prescriptionID
        request({
          url:'/patientPrescription/detail',
          method:'get',
          params:{prescriptionID}
        }).then(res=>{
          if (res.code=='0'){
            this.prescriptionDetailData=res.data
          console.log(res.data)
            var sum = 0
            res.data.forEach(item => {
              console.log(item)
              sum = sum + item.drugPrice * item.amount

            })
            this.totalCost=parseFloat(sum).toFixed(2)
          }
        })
      },
      handlePDetailSelectionChange(val){

      },
      addPrescription() {
        this.$prompt('请输入处方名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          const registerID = this.patient.registerID
          const userID = this.userID
          const prescriptionName=value
          request({
            url: '/patientPrescription/add',
            method: 'post',
            params: { registerID, userID, prescriptionName }
          }).then(res => {
            if (res.code == '0') {
              this.$message.success('添加处方成功！')
              //刷新处方列表
              this.prescriptionData.push(res.data)
              console.log(this.prescriptionData)
            }
          })
        })
      },
      openPrescription() {
        const registerID = this.patient.registerID
       request({url:'/prescription/open',
        method:'get',
       params:{registerID}
       }).then(res=>{
         if(res.code=='0'){
           this.$message.success("开立成功！")
           this.openPrescriptionConfirmVisible=false
           this.refreshPrescriptionList(registerID)
         }
       })
      },
      deletePrescription() {
        console.log(this.patient)
      }
    }
  }
</script>
<style scoped>
  .btnbar {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: space-between;

    text-align: justify;

    padding: 8px 170px;

    margin-left: 20px;
    margin-right: 20px;

    background-color: #f5f7fa;
  }

  .title {
    width: fit-content;
    height: 25px;
    padding: 4px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 14px;
    border-radius: 5px;
    background-color: #D2E9FF;

  }
  .fee {
    width: fit-content;
    height: 25px;
    padding: 4px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 14px;
    border-radius: 5px;
    background-color: #f5c302;

  }
</style>
