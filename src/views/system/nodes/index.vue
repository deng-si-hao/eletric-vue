<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="节点对应算法id" prop="nodeAlgorithmId">
        <el-input
          v-model="queryParams.nodeAlgorithmId"
          placeholder="请输入节点对应算法id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="算例id" prop="computeCaseId">
        <el-input
          v-model="queryParams.computeCaseId"
          placeholder="请输入算例id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="节点名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入节点名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="输入接口" prop="inPorts">
        <el-input
          v-model="queryParams.inPorts"
          placeholder="请输入输入接口"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="输出接口" prop="outPorts">
        <el-input
          v-model="queryParams.outPorts"
          placeholder="请输入输出接口"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="横坐标" prop="posX">
        <el-input
          v-model="queryParams.posX"
          placeholder="请输入横坐标"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="纵坐标" prop="posY">
        <el-input
          v-model="queryParams.posY"
          placeholder="请输入纵坐标"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="小图标" prop="icon">
        <el-input
          v-model="queryParams.icon"
          placeholder="请输入小图标"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="说明" prop="description">
        <el-input
          v-model="queryParams.description"
          placeholder="请输入说明"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:nodes:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:nodes:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:nodes:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:nodes:export']"
        >导出</el-button>
      </el-col>
      <div class="top-right-btn">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleQuery" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
          <el-button size="mini" circle icon="el-icon-search" @click="showSearch=!showSearch" />
        </el-tooltip>
      </div>
    </el-row>

    <el-table v-loading="loading" :data="nodesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="节点对应算法id" align="center" prop="nodeAlgorithmId" />
      <el-table-column label="算例id" align="center" prop="computeCaseId" />
      <el-table-column label="节点名称" align="center" prop="name" />
      <el-table-column label="输入接口" align="center" prop="inPorts" />
      <el-table-column label="输出接口" align="center" prop="outPorts" />
      <el-table-column label="横坐标" align="center" prop="posX" />
      <el-table-column label="纵坐标" align="center" prop="posY" />
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="小图标" align="center" prop="icon" />
      <el-table-column label="说明" align="center" prop="description" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:nodes:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:nodes:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改节点数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="节点对应算法id" prop="nodeAlgorithmId">
          <el-input v-model="form.nodeAlgorithmId" placeholder="请输入节点对应算法id" />
        </el-form-item>
        <el-form-item label="算例id" prop="computeCaseId">
          <el-input v-model="form.computeCaseId" placeholder="请输入算例id" />
        </el-form-item>
        <el-form-item label="节点名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入节点名称" />
        </el-form-item>
        <el-form-item label="输入接口" prop="inPorts">
          <el-input v-model="form.inPorts" placeholder="请输入输入接口" />
        </el-form-item>
        <el-form-item label="输出接口" prop="outPorts">
          <el-input v-model="form.outPorts" placeholder="请输入输出接口" />
        </el-form-item>
        <el-form-item label="横坐标" prop="posX">
          <el-input v-model="form.posX" placeholder="请输入横坐标" />
        </el-form-item>
        <el-form-item label="纵坐标" prop="posY">
          <el-input v-model="form.posY" placeholder="请输入纵坐标" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="小图标" prop="icon">
          <el-input v-model="form.icon" placeholder="请输入小图标" />
        </el-form-item>
        <el-form-item label="说明" prop="description">
          <el-input v-model="form.description" placeholder="请输入说明" />
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
import { listNodes, getNodes, delNodes, addNodes, updateNodes, exportNodes } from "@/api/system/nodes";

export default {
  name: "Nodes",
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
      // 节点数据表格数据
      nodesList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        nodeAlgorithmId: null,
        computeCaseId: null,
        name: null,
        inPorts: null,
        outPorts: null,
        posX: null,
        posY: null,
        type: null,
        icon: null,
        description: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询节点数据列表 */
    getList() {
      this.loading = true;
      listNodes(this.queryParams).then(response => {
        this.nodesList = response.rows;
        this.total = response.total;
        this.loading = false;
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
        id: null,
        nodeAlgorithmId: null,
        computeCaseId: null,
        name: null,
        inPorts: null,
        outPorts: null,
        posX: null,
        posY: null,
        type: null,
        icon: null,
        description: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加节点数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getNodes(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改节点数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateNodes(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addNodes(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除节点数据编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delNodes(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有节点数据数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportNodes(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
