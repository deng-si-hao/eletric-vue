<template>
  <div class="app-container">
    <el-row :gutter="20">
        <!--通道数据-->
      <el-col :span="4" :xs="24">
          <div class="head-container">
            <el-input
              v-model="ChName"
              placeholder="请输入通道名称"
              clearable
              size="small"
              prefix-icon="el-icon-search"
              style="margin-bottom: 20px"
            />
          </div>
          <div class="head-container">
            <el-tree
              :filter-node-method="filterNode"
              check-on-click-node
              @check-change="handleNodeClick"
              :data="ChOptions"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps">
            </el-tree>
          </div>
      </el-col>
      <el-col :span="20" :xs="24">
        <div id="main" style="width: 100%;height:calc(100vh - 200px);"></div>
      </el-col>
    </el-row>
    <!-- 添加或修改采集通道对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="一级目录id" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入一级目录id" />
        </el-form-item>
        <el-form-item label="通道名称" prop="channelName">
          <el-input v-model="form.channelName" placeholder="请输入通道名称" />
        </el-form-item>
        <el-form-item label="显示顺序" prop="orderNum">
          <el-input v-model="form.orderNum" placeholder="请输入显示顺序" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="所属车辆id" prop="carId">
          <el-input v-model="form.carId" placeholder="请输入所属车辆id" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listChannel, getChannel, delChannel, addChannel, updateChannel, exportChannel, scannChannel, Chtreeselect} from "@/api/system/channel";
import {chart} from './lineChart'
export default {
  name: "Channel",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 采集通道表格数据
      channelList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parentId: null,
        ancestors: null,
        channelName: null,
        orderNum: null,
        unit: null,
        carId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      // 通道树选项
      ChOptions: undefined,
      defaultProps: {
        children: "children",
        label: "label"
      },
      ChName: undefined
    };
  },
  watch: {
    // 根据名称筛选通道树
    ChName(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getList();
    this.getChTreeselect();
  },
  mounted() {
    chart()
  },
  methods: {
    /** 查询采集通道列表 */
    getList() {
      this.loading = true;
      listChannel(this.queryParams).then(response => {
        this.channelList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询通道下拉树结构 */
    getChTreeselect() {
      Chtreeselect().then(response => {
        this.ChOptions = response.data;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        channelId: null,
        parentId: null,
        ancestors: null,
        channelName: null,
        orderNum: null,
        unit: null,
        carId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.channelId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加采集通道";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const channelId = row.channelId || this.ids
      getChannel(channelId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改采集通道";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.channelId != null) {
            updateChannel(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addChannel(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const channelIds = row.channelId || this.ids;
      this.$confirm('是否确认删除采集通道编号为"' + channelIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delChannel(channelIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有采集通道数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return exportChannel(queryParams);
      }).then(response => {
        this.download(response.msg);
      })
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      var plotD = {
        data: [],
          xAD: [],
          legend: [],
          selected: {}
      }
      var checked = this.$refs.tree.getCheckedNodes()
      var query = []
      checked.forEach((val,index)=>{
        if(!val.hasOwnProperty('children')){
          // if (query == undefined) {
          //   query = val.label;
          // } else {
          //   query = query +"::field" + val.label;
          // }
          query.push(val.label)
        }
      })
      if (query.length == 0) {
        chart(plotD)
      }else {
        scannChannel(query).then(response=>{
          plotD = response
        chart(plotD)});
      }

      // this.queryParams.deptId = data.id;
      // this.getList();
    },

    /**查看数据*/
    scann(row) {
      scannChannel(row.channelName).then(response=>{
        console.log(response)
      })
    }
  }
};
</script>
