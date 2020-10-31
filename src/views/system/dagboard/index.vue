<!-- 纯净版示范 -->
<template>
  <!-- 最外层容器监mouse系列事件, 用来做节点拖拽 -->
  <div
    class="diagramExample"
    @mousedown="startNodesBus($event)"
    @mousemove="moveNodesBus($event)"
    @mouseup="endNodesBus($event)"
  >
    <!-- 左侧导航 -->
    <div class="page-left">
<!--      <div class="logo">DAG-Board</div>-->
      <div id="pages">
        <el-col id="side-menu">
          <el-row class="menu-unit" v-for="(menu, i) in menus" :key="i">
            <div id="menu-url" v-bind:href="menu.url"
               v-bind:class="{ 'menu-active': menu.active && !menu.secondMenus}"
               v-on:click="showToggle(menu)"
            >
              <span>{{ menu.name }}</span>
<!--              <i v-if="menu.downIcon" v-bind:class="menu.downIcon"></i>-->
            </div>
            <el-row id="side-second-menu" v-if="menu.secondMenus && menu.active">
              <div v-for="(secMenu, i) in menu.secondMenus"
                  class="basic-node"
                  :key="'nodes_basic' + i"
                   v-on:click="showToggle(menu, secMenu)"
                  @mousedown="dragIt(secMenu)"
              >{{ secMenu.name }}</div>
            </el-row>
          </el-row>
        </el-col>
      </div>
    </div>

    <!-- 顶栏 -->
<!--    <div class="headbar">顶栏可以放一些button, 比如发布模型, 保存模型等</div>-->

    <!-- 右侧表单 -->
    <div class="right-form">
      <div class="title">这里是编辑区域, 选中节点进行编辑</div>
      <el-form
        v-if="formDetail.currentEditNodeId"
        ref="form"
        :model="formDetail.form"
        label-width="80px"
      >
        <el-form-item label="节点描述">
          <el-input v-model="formDetail.form.details"></el-input>
        </el-form-item>
        <el-form-item label="生成时间">
          <el-input v-model="formDetail.form.createTime"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存变更</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- DAG-Diagram主体 -->
    <DAGBoard
      ref="DAGBoard"
      :DataAll="yourJSONDataFillThere"
      @updateDAG="updateDAG"
      @editNodeDetails="editNodeDetails"
      @doSthPersonal="doSthPersonal"
    ></DAGBoard>

    <!-- 用来模拟拖拽添加的元素 -->
    <node-bus
      v-if="dragBus"
      :value="busValue.value"
      :pos_x="busValue.pos_x"
      :pos_y="busValue.pos_y"
    />
  </div>
</template>

<script>
import DAGBoard from "./dagcomponent/dagContent/index"
import nodeBus from "./dagcomponent/nodeBus/index"
import { diagramExampleData, JSONFromService, nodesBasic, mymenus } from './data.js'
import { listNodes, getNodes, delNodes, addNodes, updateNodes, exportNodes } from "@/api/system/nodes";
export default {
  components: {
    DAGBoard,
    nodeBus
  },
  props: {},
  data () {
    return {
      data: this.diagramExampleData,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      initNodesBasic: nodesBasic,
      menus: mymenus,
      // 以下为svg必要内容
      dragBus: false, // 是否在拖拽,
      yourJSONDataFillThere: { // 用来展示的节点与连线
        nodes: [],
        sides: []
      },
      // 以下为拖拽方式添加节点必须内容
      busValue: {
        value: "name",
        pos_x: 100,
        pos_y: 100
      },
      // 以下为表单展示数据
      formDetail: {
        currentEditNodeId: null,
        form: {}
      },
      // 监听的事件
      onkeydown: null,
      // 复制的内容
      copyContent: [],
      nodeForm: {
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
      }
    }
  },
  created () {
    this.loadJSON()
    this.onkeydown = document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.key === 'c') {
        // 按下ctrl + c
        this.ctrlC()
      } else if (e.ctrlKey && e.key === 'v') {
        // 按下ctrl + v
        this.ctrlV()
      }
    })
  },
  mounted () {
  },
  beforeDestroy() {
    this.onkeydown = null // 销毁事件
  },
  methods: {
    ctrlC () {
      let currentChoice = this.$refs.DAGBoard.choice
      if (currentChoice.index > -1) { // 有选中元素
      let activeNodes = this.yourJSONDataFillThere.nodes.filter(item => currentChoice.paneNode.indexOf(item.id) > -1)
        this.copyContent = JSON.parse(JSON.stringify(activeNodes))
        this.copyContent.forEach(item => {
          item.id = item.id + this.yourJSONDataFillThere.nodes.length + 100 // 自定义id规范 这里随便写个长度+100作为id
          item.pos_x += (100 / (sessionStorage['svgScale'] || 1))
          item.pos_y += (100 / (sessionStorage['svgScale'] || 1))
        })
      }
    },
    ctrlV () {
      if (!this.copyContent.length) return false
      this.yourJSONDataFillThere.nodes.push(...this.copyContent)
      this.$refs.DAGBoard.choice = {
        paneNode: [], // 选取的节点下标组
        index: -1,
        point: -1
      }// 复制完成 取消选中状态
      this.copyContent = []
    },
    updateDAG (data, action, id) {
      console.log(...arguments)
      console.log(JSON.stringify(arguments[0]))
      switch (action) {
        case 'selectNode':
          this.showNodeDetails(data.nodes.find(item => item.id === id))
          break;
        default: () => {}
      }
    },
    editNodeDetails() {
      console.log(...arguments)
    },
    doSthPersonal() {
      console.log(...arguments)
    },
    loadJSON() {
      // 这里可以跟服务端交互获取数据
      setTimeout(() => {
              this.yourJSONDataFillThere = JSONFromService
      }, 500);
    },
    /**
     * 通过拖拽方式加入新节点必须的函数
     */
    startNodesBus(e) {
      /**
       *  别的组件调用时, 先放入缓存
       * dragDes: {
       *    drag: true,
       *    name: 组件名称
       *    type: 组件类型
       *    model_id: 跟后台交互使用
       * }
       **/
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag) {
        const x = e.pageX;
        const y = e.pageY;
        this.busValue = Object.assign({}, this.busValue, {
          pos_x: x,
          pos_y: y,
          value: dragDes.name
        });
        this.dragBus = true;
      }
    },
    moveNodesBus(e) {
      // 移动模拟节点
      if (this.dragBus) {
        const x = e.pageX;
        const y = e.pageY;
        this.busValue = Object.assign({}, this.busValue, {
          pos_x: x,
          pos_y: y
        });
      }
    },
    endNodesBus (e) {
      // 节点放入svg
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag && e.toElement.id === "svgContent") {
        const pos_x =
          (e.offsetX - 90 - (sessionStorage["svg_left"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        const pos_y =
          (e.offsetY - 15 - (sessionStorage["svg_top"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        delete dragDes.drag
        const params = {
          model_id: sessionStorage["newGraph"],
          desp: {
            pos_x,
            pos_y,
            name: this.busValue.value,
            ...dragDes
          }
        };
        this.yourJSONDataFillThere.nodes.push({
          ...params.desp,
          id: this.yourJSONDataFillThere.nodes.length + 100, // 这里注意, 新增的id一定不能重复, 建议id交由后端处理
          in_ports: [0],
          out_ports: [0]
       })
      }
      console.log(this.yourJSONDataFillThere.nodes.slice(-1))
      var nodeData = this.yourJSONDataFillThere.nodes.slice(-1)[0]
      this.nodeForm.icon = nodeData.iconClassName
      this.nodeForm.posX = nodeData.pos_x
      this.nodeForm.posY = nodeData.pos_y
      // this.nodeForm.inPorts = nodeData.in_ports
      // this.nodeForm.outPorts = nodeData.out_ports
      this.nodeForm.name = nodeData.name
      this.nodeForm.id = nodeData.id
      this.nodeForm.nodeAlgorithmId = 1001
      this.nodeForm.computeCaseId = 10021
      addNodes(this.nodeForm).then(response => {
        if (response.code === 200) {
          this.msgSuccess("新增成功");
        }
      })
      window.sessionStorage["dragDes"] = null;
      this.dragBus = false;
    },
    dragIt(val) {
      val.form.createTime = new Date().toDateString()
      sessionStorage["dragDes"] = JSON.stringify({
        drag: true,
        ...val
      });
    },
    /**
     * 右侧form展示逻辑
     */
    showNodeDetails(val) { // 展示选中的节点
      const { id, form } = val
      if (!form) return
      this.formDetail = {
        currentEditNodeId: id,
        form
      }
    },
    onSubmit() { // 更新所选节点的信息
      const { currentEditNodeId, form } = this.formDetail
      this.yourJSONDataFillThere.nodes.map(item => {
        if (item.id === currentEditNodeId) {
          item.form = form
        }
      })
      let _data = this.yourJSONDataFillThere.nodes.find(item => item.id === currentEditNodeId).form
      let str = JSON.stringify(_data, null, 4)
      alert('节点信息更新完成' + str)
    },
    showToggle: function (menu, secMenu) {
      // 如果传入了二级菜单
      if (secMenu) {
        secMenu.active = true;
        // 更新menus数据
        this.refreshMenuTree(this.menus, menu, secMenu);
      } else {
        if (menu.secondMenus) {
          menu.active = !menu.active;
        } else {
          menu.active = true;
          // 更新menus数据
          this.refreshMenuTree(this.menus, menu, secMenu);
        }
      }
    },

    /**
     * 解释：对于菜单栏active置为true的逻辑，可以简化为，我点击谁谁就active，其他的菜单项active都变为
     * false。但特殊情况为二级菜单，二级菜单点击后自己的active变为true，但父菜单项的active不能变false。
     * 所以问题简化为：
     * 1. 点击的菜单项的active变为true
     * 2. 遍历整个菜单的所有数据项，不等于我点击的这个菜单项的active都变为false
     * （但二级菜单要考虑其父菜单项不能变false，即除了我点击的这个和我的父菜单项外都变false）
     *
     * 关键问题即：用树的遍历解决菜单所有数据项的遍历和active取反,即对于被遍历的每个菜单项来说，
     * 只要不等于我传入的一级菜单和二级菜单，active就变成false
     *
     * 整体逻辑即：menus中的数据项，进行遍历，如果不等于传入的menu或者secMenu则直接置为false
     * @param menus 包含menu数据项的数组，如一级菜单数组，二级菜单数组
     * @param menu 应该激活的一级菜单项
     * @param secMenu 应该激活的二级菜单项
     */
    refreshMenuTree(menus, menu, secMenu) {
      // 开始遍历
      menus.forEach(function (item) {
        // 如果菜单项不等于传入的一级菜单项或二级菜单项，则active置为false
        if (!(item === menu || item === secMenu || (item.secondMenus && item.active))) {
          item.active = false;
        }

        // 如果菜单项包含二级菜单列表，则遍历此列表
        if (item.secondMenus) {
          this.refreshMenuTree(item.secondMenus, menu, secMenu);
        }
        // 使用.bind(this)给函数的this绑定为外层的作用域，要不然this.refreshMenuTree方法取不到
      }.bind(this));
    }
  }
}
</script>

<style lang="scss" scoped>
.diagramExample {
   width: 100%;
   height: 100vh;
   overflow: hidden;
   position: relative;
   .basic-node {
      margin-top: 5px;
      background: #fff;
      color:black;
      border-radius: 15px;
      height: 30px;
      width: 140px;
      border: 1px solid #289de9;
      line-height:30px;
      display: inline-block;
      cursor: pointer;
      user-select: none;
   }
   .page-left {
     position: absolute;
     left: 0;
     top: 0;
     width: 200px;
     height: 100vh;
     background: #717171;
     /*.logo {*/
     /*  font-size: 20px;*/
     /*  line-height: 40px;*/
     /*  font-weight: bold;*/
     /*  border-bottom: 1px solid #ccc;*/
     /*  background: #fff;*/
     /*}*/
   }
   /*.headbar {*/
   /*  position: absolute;*/
   /*  top: 0;*/
   /*  left: 200px;*/
   /*  right:0;*/
   /*  line-height: 40px;*/
   /*  text-align: left;*/
   /*  text-indent: 20px;*/
   /*  user-select:none;*/
   /*}*/
   .right-form {
     width: 400px;
     position: absolute;
     right: 0;
     top: 0;
     height: 100vh;
     border-left: 1px solid #ccc;
     background: #fff;
     .title {
       font-size: 20px;
       line-height: 80px;
     }
   }
}
/** 给svg添加格子背景 */
#svgContent {
  background-size: 50px 50px;
  background-image: linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent);
  background-color: rgb(60, 60, 60) !important;
  margin-left:200px;
  margin-top: 0px;
  margin-right: 200px;
}
</style>
