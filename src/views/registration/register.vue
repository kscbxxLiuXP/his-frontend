<template>
  <div style="margin-top: 1px">
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="150px">
      <el-card style="height: 80px">
        <el-form-item label="发票号：" prop="invoiceNumber" style="float: left;">
          <el-input v-model.number="registerForm.invoiceNumber" disabled
                    style="width: 150px;margin-right: 10px"></el-input>
        </el-form-item>
        <el-button @click="resetForm('registerForm') " style="float: right ;margin-right: 20px;margin-left: 10px">重置
        </el-button>
        <el-button type="primary" @click="submitForm('registerForm')" style="float: right">提交</el-button>
      </el-card>

      <el-row :gutter="25">
        <el-col :span="11">
          <el-card class="patient-card">
            <div slot="header" class="clearfix">
              <span>患者信息</span>
              <el-tag style="float: right" v-if="newUser== true" type="success">新患者</el-tag>
            </div>
            <el-form-item label="患者ID(病历号)：" prop="patientID" style="width: 500px">
              <el-input v-model.number="registerForm.patientID" @change="searchPatient"
                        style="width: 150px;margin-right: 10px" clearable></el-input>
              <el-button type="primary" icon="el-icon-search" @click="searchPatient()">搜索</el-button>
            </el-form-item>
            <el-form-item label="姓名：" prop="patientName">
              <el-input v-model="registerForm.patientName" style="width: 150px;margin-right: 10px" clearable></el-input>
            </el-form-item>

            <el-form-item label="性别：" prop="gender">
              <el-radio-group v-model="registerForm.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="出生日期" prop="birth">
              <el-date-picker placeholder="选择日期" v-model="registerForm.birth"></el-date-picker>
            </el-form-item>

            <el-form-item label="年龄：" prop="age">
              <el-input v-model.number="registerForm.age"
                        style="width: 80px;margin-right: 10px" clearable></el-input>
            </el-form-item>
            <el-form-item prop="ageType" style="">
              <el-select v-model="registerForm.ageType" style="width: 100px;" placeholder="">
                <el-option label="岁" value="岁"></el-option>
                <el-option label="月" value="月"></el-option>
                <el-option label="天" value="天"></el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="身份证号：" prop="patientIDNumber">
              <el-input v-model="registerForm.patientIDNumber" style="width: 300px;margin-right: 10px"
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="家庭住址：" prop="address">
              <el-input v-model="registerForm.address" style="width: 300px;margin-right: 10px" clearable></el-input>
            </el-form-item>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card class="register-card">
            <div slot="header" class="clearfix">
              <span>挂号信息</span>
              <el-tag style="float: right" v-if="registered== true" type="danger">已挂号</el-tag>
            </div>
            <el-form-item label="挂号日期" prop="diagnoseDate">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" @change="diagnoseDateChange"
                              v-model="registerForm.diagnoseDate"></el-date-picker>
              <el-button type="primary" size="medium" icon="el-icon-date" @click="chooseToday()">今天</el-button>
            </el-form-item>
            <el-form-item prop="noon" label="午别" style="">
              <el-select v-model="registerForm.noon" style="width: 250px;" placeholder="选择午别">
                <el-option label="上午" value="上午"></el-option>
                <el-option label="下午" value="下午"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="挂号科室：" prop="deptID">
              <el-select v-model="registerForm.deptID" style="width: 250px" placeholder="请选择科室"
                         @change="deptSelectionChange">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.deptID"
                  :label="item.deptName"
                  :value="item.deptID">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="号别：" prop="registerLevelID">
              <el-select v-model="registerForm.registerLevelID" style="width: 250px" placeholder="请选择号别"
                         @change="registerLevelSelectionChange">
                <el-option
                  v-for="item in registerLevelOptions"
                  :key="item.registerLevelID"
                  :label="item.registerLevelName"
                  :value="item.registerLevelID">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="看诊医生：" prop="doctorID">
              <el-select v-model="registerForm.doctorID" style="width: 250px" placeholder="请选择医生"
                         @change="doctorSelectionChange">
                <el-option
                  v-for="item in doctorOptions"
                  :key="item.userID"
                  :label="item.realName"
                  :value="item.userID"
                >
                </el-option>
              </el-select>

            </el-form-item>
            <el-collapse-transition>
              <el-alert
                type="success"
                :title="alertTitle"
                :closable="false"
                v-if="infoVisible===true"

                style="width: 250px;margin-left: 75px;margin-bottom: 10px;white-space: pre">
              </el-alert>
            </el-collapse-transition>
            <el-form-item label="病历本：" prop="needed">
              <el-switch v-model="registerForm.needed" @change="neededChange"></el-switch>
            </el-form-item>
            <el-form-item label="应收金额：" prop="price">
              <span style="font-size: 40px">￥</span>
              <el-input type="number"
                        style="font-size: 40px;text-align: right;display: inline-block;width: 120px;margin-right: 10px"
                        v-model="registerForm.price" :disabled="true">

              </el-input>
              元
            </el-form-item>
          </el-card>

        </el-col>
      </el-row>
    </el-form>

  </div>

</template>


<script>

  import request from '@/utils/request'
  import moment from 'moment' //导入文件
  export default {
    data() {
      return {
        registerForm: {
          invoiceNumber: '',
          patientID: 600701,
          patientName: '',
          birth: '',
          gender: '',
          age: '',
          ageType: '岁',
          patientIDNumber: '',
          address: '',
          diagnoseDate: '',
          noon: '',
          deptID: '',
          registerLevelID: '',
          doctorID: '',
          needed: false,
          price: 0,
          registerUserID: 0
        },
        newUser: false,
        registerCost: 0,
        registered: false,
        alertTitle: '',
        infoVisible: false,
        rules: {
          invoiceNumber: [{ required: true, message: '请输入发票号', trigger: 'blur' },
            { type: 'number', message: '发票号必须为数字值' }
          ],
          patientID: [{ required: true, message: '请输入患者ID', trigger: 'blur' },
            { type: 'number', message: '患者ID必须为数字值' }],
          patientName: [{ required: true, message: '请输入患者姓名', trigger: 'blur' }],
          birth: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
          gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
          age: [{ required: true, message: '请输入患者年龄', trigger: 'blur' },
            { type: 'number', message: '年龄必须为数字值' }],
          ageType: [{ required: true, message: '请选择年龄类型', trigger: 'change' }],
          patientIDNumber: [{ required: true, message: '请输入正确的身份证号码', trigger: 'blur' },
            { min: 18, max: 19, message: '长度在 18 到 19 个字符', trigger: 'blur' }],
          address: [{ required: true, message: '请输入住址', trigger: 'blur' }],
          diagnoseDate: [{ required: true, message: '请选择看诊日期', trigger: 'change' }],
          noon: [{ required: true, message: '请选择午别', trigger: 'change' }],
          deptID: [{ required: true, message: '请选择挂号科室', trigger: 'change' }],
          registerLevelID: [{ required: true, message: '请选择挂号级别', trigger: 'change' }],
          doctorID: [{ required: true, message: '请选择看诊医生', trigger: 'change' }],
          needed: [{ required: true, message: '请选择是否要病历本', trigger: 'change' }],
          price: [{ required: true, message: '需要price', trigger: 'change' }]
        },

        registerLevelOptions: [],
        deptOptions: [],
        doctorOptions: []
      }
    },
    computed: {},
    created() {
      this.registerForm.registerUserID = this.$store.getters['nowuser'].userID

      //设置发票号
      request({
        url: '/invoice/number',
        method: 'get'
      }).then(response => {
        if (response.code === '0') {
          this.registerForm.invoiceNumber = response.data
        }
      })

      request({
        url: '/department/list',
        method: 'get'
      }).then(response => {
        if (response.code === '0') {
          this.deptOptions = response.data
        }
      })
      request({
        url: '/registerLevel/list',
        method: 'get'
      }).then(response => {
        if (response.code === '0') {
          this.registerLevelOptions = response.data
        }
      })

    },
    methods: {
      submitForm(formName) {
        const name = this.registerForm.patientName
        const date =this.registerForm.diagnoseDate
        if (this.registered){
          this.$alert('患者 '+name+' 在 '+date+' 已经挂号！', '错误提示', {
            confirmButtonText: '确定',
          });
          return
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            const h = this.$createElement
            this.$msgbox({
              title: '消息',
              message: h('p', null, [
                h('span', null, '您确定要给患者 '),
                h('i', { style: 'color: teal' }, this.registerForm.patientName),
                h('span', null, '  挂号吗？ ')
              ]),
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  const form = this.registerForm
                  console.log(form)
                  //提交表单
                  request({
                    url: '/register/submit',
                    method: 'post',
                    data: form
                  }).then(response => {
                    if (response.code === '0') {

                      this.$message({
                        message: '挂号成功！',
                        type: 'success',
                        duration: 1500
                      })
                      this.resetForm('registerForm')
                    }
                    done()
                  })

                } else {
                  done()
                }
              }
            })

          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      chooseToday() {
        const date = moment(new Date()).format('YYYY-MM-DD')
        this.registerForm.diagnoseDate = date
        const patientID = this.registerForm.patientID
        if (patientID && date !=null && date !="") {
          request({
            url: '/patient/registered',
            method: 'get',
            params: { patientID, date }
          }).then(response => {
            if (response.code === '0') {
              this.registered = false
            } else {
              this.registered = true
            }
          })
        }
        const doctorID = this.registerForm.doctorID

        const arr1 = this.registerLevelOptions.find(item => item.registerLevelID == this.registerForm.registerLevelID)
        if (doctorID && date != null) {
          request({
            url: '/register/registered/num',
            method: 'get',
            params: { doctorID, date }
          }).then(response => {

            if (response.code === '0') {
              this.alertTitle = `初始号额：${arr1.registerLimit}          已用号额：${response.data}`
              this.infoVisible = true
            }
          })

        } else {
          this.infoVisible = false
        }
      },
      diagnoseDateChange(value) {
        console.log(value)
        if(value==null){
          this.infoVisible=false
          return
        }
        const date = moment(value).format('YYYY-MM-DD')
        const patientID = this.registerForm.patientID
        if (patientID && date !=null && date !="") {
          request({
            url: '/patient/registered',
            method: 'get',
            params: { patientID, date }
          }).then(response => {
            if (response.code === '0') {
              this.registered = false
            } else {
              this.registered = true
            }
          })
        }


        const doctorID = this.registerForm.doctorID

        const arr1 = this.registerLevelOptions.find(item => item.registerLevelID == this.registerForm.registerLevelID)
        if (doctorID && date != null) {
          request({
            url: '/register/registered/num',
            method: 'get',
            params: { doctorID, date }
          }).then(response => {

            if (response.code === '0') {
              this.alertTitle = `初始号额：${arr1.registerLimit}          已用号额：${response.data}`
              this.infoVisible = true
            }
          })

        } else {
          this.infoVisible = false
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.registerCost=0
        this.newUser = false
        request({
          url: '/invoice/number',
          method: 'get'
        }).then(response => {
          if (response.code === '0') {
            this.registerForm.invoiceNumber = response.data
          }
        })
      },
      registerLevelSelectionChange(value) {
        const deptID = this.registerForm.deptID
        const registerLevelID = this.registerForm.registerLevelID
        this.registerForm.doctorID = null
        this.infoVisible = false
        const arr1 = this.registerLevelOptions.find(item => item.registerLevelID == registerLevelID)
        this.registerCost = arr1.registerCost
        this.registerForm.price = (this.registerForm.needed ? 1 : 0) + this.registerCost
        if (deptID) {
          request({
            url: '/doctor/list',
            method: 'get',
            params: { deptID, registerLevelID }
          }).then(response => {
            if (response.code === '0') {
              this.doctorOptions = response.data
            }
          })
        }
      },
      deptSelectionChange(value) {
        const deptID = this.registerForm.deptID
        const registerLevelID = this.registerForm.registerLevelID
        this.registerForm.doctorID = null
        //号额标签消失
        this.infoVisible = false
        //科室更新，重新获取医生列表
        if (registerLevelID) {
          request({
            url: '/doctor/list',
            method: 'get',
            params: { deptID, registerLevelID }
          }).then(response => {
            if (response.code === '0') {
              this.doctorOptions = response.data
            }
          })
        }
      },
      doctorSelectionChange(value) {
        const date = this.registerForm.diagnoseDate
        const doctorID = this.registerForm.doctorID

        const arr1 = this.registerLevelOptions.find(item => item.registerLevelID == this.registerForm.registerLevelID)
        if (date==null){
          this.infoVisible = false
          return
        }

        if (doctorID && date != null && date !="") {
          request({
            url: '/register/registered/num',
            method: 'get',
            params: { doctorID, date }
          }).then(response => {

            if (response.code === '0') {
              this.alertTitle = `初始号额：${arr1.registerLimit}          已用号额：${response.data}`
              this.infoVisible = true
            }
          })

        } else {
          this.infoVisible = false
        }

      },
      neededChange(value) {
        this.registerForm.price = (this.registerForm.needed ? 1 : 0) + this.registerCost
      },
      //查询患者
      searchPatient() {
        var patientID = this.registerForm.patientID
        if (patientID != '') {
          request({
            url: '/patient/info',
            method: 'get',
            params: { patientID }
          }).then(response => {
            if (response.code === '1') {
              this.$message.warning('该用户不存在,需要新建')
              this.newUser = true

            } else {
              this.$message.success('查询成功')
              this.newUser = false
              const patient = response.data
              this.registerForm.patientName = patient.name
              this.registerForm.ageType = patient.ageType
              this.registerForm.age = patient.age
              this.registerForm.gender = patient.sex
              this.registerForm.birth = patient.birth.substring(0, 10)
              this.registerForm.patientIDNumber = patient.identifyID
              this.registerForm.address = patient.address
            }
          }).catch(error => {
            reject(error)
          })
        } else {
          this.newUser = false
        }


      },
      invoiceInputChange() {
        this.$message('change')
      }
    }
  }
</script>


<style>
  .patient-card {
    margin: 20px;

  }

  .register-card {
    margin-top: 20px;
    margin-left: -10px;
  }
</style>
