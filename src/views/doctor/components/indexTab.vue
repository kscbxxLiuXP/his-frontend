<template>
  <div>
    <el-form :model="indexForm" label-position="left" :rules="rules" ref="indexForm" label-width="90px"
             class="patientIndexForm">
      <div class="btnbar">
        <el-button type="primary" size="small" :disabled="disableProperty" icon="el-icon-edit" @click="save" plain>暂存
        </el-button>
        <el-button type="success" size="small" :disabled="disableProperty" icon="el-icon-upload2" @click="submit" plain>
          提交
        </el-button>
        <el-button type="info" size="small" icon="el-icon-circle-close" :disabled="disableProperty" @click="clear"
                   plain>清空
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-refresh-right" :disabled="disableProperty" @click="refresh"
                   plain>刷新
        </el-button>
      </div>

      <div class="title" style="display: inline-block;margin-top: 10px">病史内容:</div>
      <el-form-item style="margin-left:-90px " prop="chiefComplaint">
        <div style="margin-top: 10px ;display: flex">
          <span style="width:90px; ">主诉：</span>
          <el-input type="textarea" :disabled="disableProperty" :rows="2" placeholder="请输入内容"
                    style="display: inline-block" v-model="indexForm.chiefComplaint"/>
        </div>
      </el-form-item>
      <el-form-item style="margin-left:-90px " prop="presentMedicalHistory">
        <div style="display: flex">
          <span style="width:90px; margin-top: -7px">现病史：</span>
          <el-input type="textarea" :disabled="disableProperty" :rows="2" placeholder="请输入内容"
                    style="display: inline-block" v-model="indexForm.presentMedicalHistory"/>
        </div>
      </el-form-item>
      <el-form-item style="margin-left:-90px " prop="presentMedicalTreatment">
        <div style="display: flex">
          <span style="width:90px;padding-right: 5px; margin-top: -7px ">现病治疗情况：</span>
          <el-input type="textarea" :disabled="disableProperty" :rows="2" placeholder="请输入内容"
                    style="display: inline-block" v-model="indexForm.presentMedicalTreatment"/>
        </div>
      </el-form-item>
      <el-form-item style="margin-left:-90px " prop="pastMedicalHistory">
        <div style="display: flex">
          <span style="width:90px;margin-top: -7px ">既往史：</span>
          <el-input type="textarea" :disabled="disableProperty" :rows="2" placeholder="请输入内容"
                    style="display: inline-block" v-model="indexForm.pastMedicalHistory"/>
        </div>
      </el-form-item>
      <el-form-item style="margin-left:-90px " prop="allergicHistory">
        <div style="display: flex">
          <span style="width:90px;margin-top: -7px ">过敏史：</span>
          <el-input type="textarea" :disabled="disableProperty" :rows="2" placeholder="请输入内容"
                    style="display: inline-block" v-model="indexForm.allergicHistory"/>
        </div>
      </el-form-item>
      <el-form-item style="margin-left:-90px " prop="bodyCheck">
        <div style="display: flex">
          <span style="width:90px;margin-top: -7px ">体格检查：</span>
          <el-input type="textarea" :disabled="disableProperty" :rows="2" placeholder="请输入内容"
                    style="display: inline-block" v-model="indexForm.bodyCheck"/>
        </div>
      </el-form-item>
      <div class="title" style="display: inline-block;margin-top: 10px">评估/诊断:</div>
      <el-card style="margin-top: 10px">
        <div slot="header" class="clearfix">
          <span>西医诊断</span>
          <el-button style="float: right; padding: 3px 0" :disabled="disableProperty" @click="diseaseAddVisible=true"
                     type="text">增加
          </el-button>
          <el-button style="float: right; padding: 3px 0;margin-right: 10px" :disabled="disableProperty" type="text">
            删除
          </el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="this.diagnoses"
          tooltip-effect="dark"
          :disabled="disableProperty"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55" :selectable='selectableProperty'>
          </el-table-column>

          <el-table-column
            prop="ICDCode"
            label="ICD编码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="diseaseName"
            label="疾病名称"
            width="490"></el-table-column>
          <el-table-column
            label="发病时间"
            prop="diseaseTime"
          >

          </el-table-column>
        </el-table>

      </el-card>
      <el-form-item style="margin-left:-90px " prop="checkRec">
        <div style="margin-top: 20px; display: flex">
          <span style="width:90px;margin-top: -7px ">检查建议：</span>
          <el-input type="textarea" :rows="2" :disabled="disableProperty" placeholder="请输入内容"
                    style="display: inline-block" v-model="indexForm.checkRec"/>
        </div>
      </el-form-item>
      <el-form-item style="margin-left:-90px " prop="notice">
        <div style="display: flex">
          <span style="width:90px;margin-top: -7px ">注意事项：</span>
          <el-input type="textarea" :rows="2" :disabled="disableProperty" placeholder="请输入内容"
                    style="display: inline-block" v-model="indexForm.notice"/>
        </div>
      </el-form-item>
    </el-form>
    <el-dialog title="新增疾病诊断诊断" :visible.sync="diseaseAddVisible">
      <el-input placeholder="请输入拼音助记码" icon="search">
      </el-input>
      <el-table :data="diseaseList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"
                class="diagnose-table" :current-page.sync="currentPage">
        <el-table-column prop="diseaseID" label="序号" width="100"></el-table-column>
        <el-table-column prop="diseaseCode" label="拼音助记码" width="150"></el-table-column>
        <el-table-column prop="diseaseName" label="疾病名称" width="150"></el-table-column>
        <el-table-column prop="diseaseICDCode" label="ICD编码" width="150"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-plus"
              @click="openDateTimePick(scope.$index, scope.row)">选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-dialog>

    <el-dialog title="请选择发病时间" width="30%" :visible.sync="dateTimePickVisible">
      <div>
        <div style="display: inline-block">请选择发病时间：</div>
        <el-date-picker
          v-model="diseaseTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
          style="display: inline-block"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dateTimePickVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDiseae">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import Sticky from '@/components/Sticky/index'
  import request from '@/utils/request'

  export default {
    name: 'IndexTab',
    components: { Sticky },
    props: ['patient', 'disableProperty'],
    data() {
      return {
        tableData: [{
          ICDCode: 'A01.001',
          diseaseName: '伤寒',
          diseasetime: '2020-07-14 00:00:00'
        }, {
          ICDCode: 'A01.001',
          diseaseName: '伤寒',
          diseasetime: '2020-07-14 00:00:00'
        }],
        multipleSelection: [],
        indexForm: {
          patientIndexID: 0,
          patientID: 0,
          registerID: 0,
          chiefComplaint: '',
          presentMedicalHistory: '',
          presentMedicalTreatment: '',
          pastMedicalHistory: '',
          allergicHistory: '',
          bodyCheck: '',
          checkRec: '',
          notice: '',
          checkResult: '',
          diagnoseResult: '',
          treatmentSuggestion: '',
          state: 1
        },
        //存放DiagnoseVO的数据
        //添加数据的时候调用后台接口进行添加，刷新数据来显示
        diagnoses: [{
          diagnoseID: 0,
          patientIndexID: this.patient.patientIndexID,
          diseaseName: '',
          registerID: this.patient.registerID,
          diseaseID: 0,
          diagnoseType: 1,
          diseaseTime: ''
        }],
        rules: {
          chiefComplaint: [{ required: true, message: '请输入主诉', trigger: 'blur' }],
          presentMedicalHistory: [{ required: true, message: '请输入', trigger: 'blur' }],
          presentMedicalTreatment: [{ required: true, message: '请输入现病史', trigger: 'blur' }],
          pastMedicalHistory: [{ required: true, message: '请输入既往史', trigger: 'blur' }],
          allergicHistory: [{ required: true, message: '请输入过敏史', trigger: 'blur' }],
          bodyCheck: [{ required: true, message: '请输入身体检查', trigger: 'blur' }],
          checkRec: [{ required: true, message: '请输入检查建议', trigger: 'blur' }],
          notice: [{ required: true, message: '请输入注意事项', trigger: 'blur' }]
        },
        diseaseList: [],
        currentPage: 1,
        pagesize: 10,
        total: 100,
        diseaseAddVisible: false,
        dateTimePickVisible: false,
        diseaseTime: '',
        diseaseTmp: {},
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        }

      }
    }, methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      save() {
        console.log(this.patient)
        console.log(this.indexForm)
        request({
          url: '/patientIndex/save',
          method: 'post',
          data: this.indexForm
        }).then(res => {
          if (res.code == '0') {
            this.$message.success('暂存成功！')
          }
        })

      },
      submit() {
        this.$refs['indexForm'].validate((valid) => {
            if (valid) {
              this.$confirm('您确定要提交吗，一经提交就无法修改, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                request({
                  url: '/patientIndex/submit',
                  method: 'post',
                  data: this.indexForm
                }).then(res => {
                  if (res.code == '0') {
                    this.$message.success('提交成功！')
                    this.disableProperty=true;
                    this.$emit('refreshPatientList');
                  }
                })

              });
            }})
      },
      clear() {
        this.$refs['indexForm'].resetFields()
        //清空疾病列表
      }, refresh() {
        this.$emit('refreshPatientList');
      },
      selectableProperty(row, index) {
        return !this.disableProperty
        // return this.disableProperty
        // if (row.state !== '已挂号') {    //判断条件               
        //
        //   return false  //不可勾选
        //
        // } else {
        //
        //   return true  //可勾选
        //
        // }
      }, openDateTimePick(index, row) {
        this.diseaseTmp = row
        this.dateTimePickVisible = true
      },
      addDiseae() {
        this.dateTimePickVisible = false
        this.diseaseAddVisible = false
        const data = {
          patientIndexID: this.patient.patientIndexID,
          registerID: this.patient.registerID,
          diseaseID: this.diseaseTmp.diseaseID,
          diseaseTime: this.diseaseTime
        }
        request({
          url: 'diagnose/add',
          method: 'post',
          data: data
        }).then(res => {
          if (res.code == '0') {
            this.$message.success('添加诊断成功！')
            this.refreshDiagnose(this.patient.registerID)


          }
        })

      },
      ///分页功能
      handleSizeChange(val) {
        this.pagesize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
      }, refreshPatientIndex(registerID) {
        //获取病历首页
        request(
          {
            url: '/patientIndex/get',
            method: 'get',
            params: { registerID }
          }
        ).then(res => {
          if (res.code == '0') {
            this.indexForm = res.data
          }
        })

      },
      refreshDiagnose(registerID) {
        //获取诊断列表
        request(
          {
            url: '/diagnose/list',
            method: 'get',
            params: { registerID }
          }
        ).then(res => {
          if (res.code == '0') {
            this.diagnoses = res.data
            console.log(res.data)
          }
        })
      }

    },
    created() {
      console.log(this.patient)

      //获取疾病类
      request({
        url: '/disease/list',
        method: 'get'
      }).then(res => {
        if (res.code == '0') {
          this.diseaseList = res.data
        }
      })


    },
    // watch:{
    //   patient:{//深度监听，可监听到对象、数组的变化
    //     handler(val, oldVal){
    //       if(this.patient.patientID!='未选择'){
    //         this.indexForm.patientIndexID = this.patient.patientIndexID
    //         this.indexForm.patientID = this.patient.patientID
    //         this.indexForm.registerID=this.patient.registerID
    //
    //         const registerID = this.patient.registerID
    //         this.refreshPatientIndex(registerID)
    //         this.refreshDiagnose(registerID)
    //
    //       }
    //     },
    //     deep:true //true 深度监听
    //   }
    // }

  }
</script>
<style>
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
