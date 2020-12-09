<template>
  <div style="margin-top: 2px">

    <el-card>

      <div class="patient-search">
      <span>病历号:
      <el-input v-model="inputSearch" placeholder="请输入病历号" style="width: 200px;margin-left: 10px"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchP" style="margin-left: 20px">搜索</el-button>
      </span>
      </div>
    </el-card>


    <el-card style="margin:20px">
      <div class="tiptag">
        患者收费信息
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
            prop="drugName"
            label="药品名称"
            width="500">
          </el-table-column>
          <el-table-column
            prop="drugPrice"
            label="单价"
            width="80">

          </el-table-column>
          <el-table-column
            prop="amount"
            label="数量"
            width="70">
          </el-table-column>
          <el-table-column
            prop="doctor"
            label="开立医师"
            width="90">
          </el-table-column>
          <el-table-column
            prop="pName"
            label="处方名称"
            width="120">
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
                :type="scope.row.state === '已缴费' ? 'success' : 'danger'"
                disable-transitions>{{scope.row.state}}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button icon="el-icon-s-promotion" type="primary" @click="handleSubmit()">发药</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog title="发票预览" :visible.sync="dialogVisible">
      <div class="invoice">
        <p>这是发票模板</p>
        <p>这是发票模板</p>
        <p>这是发票模板</p>
        <p>这是发票模板</p>
        <p>这是发票模板</p>
        <p>这是发票模板</p>
        <p>这是发票模板</p>
        <p>这是发票模板</p>
      </div>
      <div style="margin-top: 20px">
        总金额：<span style="font-size: 40px">￥10</span>元
      </div>
      <!--      <el-divider></el-divider>-->

      <el-button icon="el-icon-printer" type="primary" @click="handleSubmit()" style="text-align: right">打印发票</el-button>


    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inputSearch: '',
        dialogVisible: false,
        tableData: [],
        multipleSelection: []
      }

    }, methods: {
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
        if (row.state !== '已缴费') {    //判断条件               

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
          row.unregistertime = '2020-07-14 18:00:00'
          row.unregisterUser = '小龙女'
          this.tabledata
          this.$message({
            type: 'success',
            message: '退号成功!'
          })
        })
      },handleSubmit(){
      this.$message.success("发药成功！！")
        this.tableData=[];
      },
      searchP(){
        this.$message.success("查找成功")
        this.tableData=[{
          drugName: '0.9%氯化钠注射液(塑瓶)',
          drugPrice: '6.34',
          amount: '1',
          doctor: '扁鹊',
          pName: '模板：念珠菌性皮炎',
          openTime: '2020-07-20',
          state: '已缴费'
        },{
          drugName: '复方甘露醇注射液(伸宁)',
          drugPrice: '15.56',
          amount: '1',
          doctor: '扁鹊',
          pName: '模板：念珠菌性皮炎',
          openTime: '2020-07-20',
          state: '已缴费'
        },{
          drugName: '复方甘露醇注射液(伸宁)',
          drugPrice: '15.56',
          amount: '1',
          doctor: '扁鹊',
          pName: '模板：急性黄疸性丁型肝炎',
          openTime: '2020-07-20',
          state: '已缴费'
        }]
      }

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
