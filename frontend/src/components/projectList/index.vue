<template>
  <div class="webui-tab">
    <vipmro-tab :position="table.position" :list="table.list" v-model="table.position">
      <template slot="list">
        <div class="">
          <vipmro-layout-top>
            <vipmro-query-select>
              <vipmro-input width="200" placeholder="请输入规则名称" v-model="table.keyword" title="关键词"></vipmro-input>
            </vipmro-query-select>
            <vipmro-operation-button>
              <vipmro-button v-for="item in button" :title="item.name" @click="buttonMethod(item.method)"
                             :disabled="item.disabled" :key="item.name"></vipmro-button>
            </vipmro-operation-button>
          </vipmro-layout-top>

          <vipmro-layout-main>
            <template slot-scope="props">
              <vipmro-table :readOnly="true" @dblClickRow="dblClickRow" :colHeaders="table.colHeaders" :columns="table.columns" :data="table.data" :height="props.height" >

              </vipmro-table>
            </template>
          </vipmro-layout-main>

          <vipmro-layout-bottom>
            <vipmro-paging :page="table.currentPage" :pageSize="table.pageSize" :total="table.total"
                           @getList="search"></vipmro-paging>
          </vipmro-layout-bottom>
        </div>
      </template>
    </vipmro-tab>

    <vipmro-dialog :iconType="deleteDialog.iconType" :title="deleteDialog.title" v-model="deleteDialog.dialogVisible"
                   @confirm="updateStatus" width="400px" :content="DIALOG_CONTENT">
      {{deleteDialog.text}}
    </vipmro-dialog>
    <vipmro-dialog :iconType="stopDialog.iconType" :title="stopDialog.title" v-model="stopDialog.dialogVisible"
                   @confirm="stopProject" width="400px" :content="DIALOG_CONTENT">
      {{stopDialog.text}}
    </vipmro-dialog>
    <vipmro-dialog :iconType="startDialog.iconType" :title="startDialog.title" v-model="startDialog.dialogVisible"
                   @confirm="startProject" width="400px" :content="DIALOG_CONTENT">
      {{startDialog.text}}
    </vipmro-dialog>
  </div>
</template>

<script type="text/javascript">
  import {API_PROJECT} from '../common/apiConstant';
  import {button, editHeight, table, dict} from './data';
  import {vText, vNumber} from '../common/validator';

  export default {
    data() {
      return {
        button,
        table,
        dict,
        editHeight,
        deleteDialog: {
          dialogVisible: false,
          title: '提示',
          iconType: 'warning',
          text: ''
        },
        stopDialog: {
          dialogVisible: false,
          title: '提示',
          iconType: 'warning',
          text: ''
        },
        startDialog: {
          dialogVisible: false,
          title: '提示',
          iconType: 'warning',
          text: ''
        },
        DIALOG_CONTENT: {
          width: '400px',
          height: '50px',
          align: 'center'
        }
      };
    },
    methods: {
      vText,
      vNumber,
      dblClickRow() {

      },
      buttonMethod(method) {
        this[method]();
      },
      dictSet(dict, status) {
        for (var item of dict) {
          if (item.value === status) {
            return item.text;
          }
        }
        return '';
      },
      queryData() {
        return {
          keyword: table.keyword,
          currentPage: table.currentPage,
          pageSize: table.pageSize
        };
      },
      search(currentPage, pageSize) {
        if (currentPage) {
          table.currentPage = currentPage;
          table.pageSize = pageSize;
        };
        this.load(JSON.stringify(this.queryData()), API_PROJECT.list, 'post', true).then((res) => {
          let code = res.errCode;
          if (code === 0) {
              console.log(res.data);
            table.data.splice(0, this.table.data.length);
            res.data.data.forEach(item => {
              item.status = this.dictSet(this.dict.status, item.status);
              item.obtainDataType = this.dictSet(this.dict.obtainDataType, item.obtainDataType);
              item.needSynBack = this.dictSet(this.dict.needSynBack, item.needSynBack);
              table.data.push(item);
            });
            table.total = res.data.totalCount;
          }
        });
      },
      del() {
        this.openBatch(-1, '确定删除所选数据？');
      },
      stop() {
        let ids = '';
        this.table.data.forEach(item => {
          if (item.checked) {
            ids = ids + item.id + ',';
          }
        });
        if (ids === '') {
          this.$message({type: 'error', message: '请至少选择一条数据', showClose: true});
          return;
        }
        this.stopDialog.dialogVisible = true;
        this.stopDialog.text = '确定停止任务？';
        this.stopDialog.status = -1;
      },
      startProject() {
        let ids = '';
        this.table.data.forEach(item => {
          if (item.checked) {
            ids = ids + item.id + ',';
          }
        });
        if (ids === '') {
          this.$message({type: 'error', message: '请至少选择一条数据', showClose: true});
          return;
        };
        let model = {
          idArr: ids.split(',')
        };
        this.load(JSON.stringify(model), API_PROJECT.start, 'post').then((res) => {
          if (res.errCode === 0) {
            this.$message({type: 'success', message: res.msg, showClose: true});
            this.search();
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      start() {
        let ids = '';
        this.table.data.forEach(item => {
          if (item.checked) {
            ids = ids + item.id + ',';
          }
        });
        if (ids === '') {
          this.$message({type: 'error', message: '请至少选择一条数据', showClose: true});
          return;
        }
        this.startDialog.dialogVisible = true;
        this.startDialog.text = '确定启动任务？';
        this.startDialog.status = -1;
      },
      stopProject() {
        let ids = '';
        this.table.data.forEach(item => {
          if (item.checked) {
            ids = ids + item.id + ',';
          }
        });
        if (ids === '') {
          this.$message({type: 'error', message: '请至少选择一条数据', showClose: true});
          return;
        };
        let model = {
          idArr: ids.split(',')
        };
        this.load(JSON.stringify(model), API_PROJECT.stop, 'post').then((res) => {
          if (res.errCode === 0) {
            this.$message({type: 'success', message: res.msg, showClose: true});
            this.search();
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      openBatch(status, msg) {
        let ids = '';
        this.table.data.forEach(item => {
          if (item.checked) {
            ids = ids + item.id + ',';
          }
        });
        if (ids === '') {
          this.$message({type: 'error', message: '请至少选择一条数据', showClose: true});
          return;
        }
        this.deleteDialog.dialogVisible = true;
        this.deleteDialog.text = msg;
        this.deleteDialog.status = status;
      },
      updateStatus(status, msg) {
        let ids = '';
        this.table.data.forEach(item => {
          if (item.checked) {
            ids = ids + item.id + ',';
          }
        });
        if (ids === '') {
          this.$message({type: 'error', message: '请至少选择一条数据', showClose: true});
          return;
        };
        let delForm = {
          idArr: ids.split(',')
        };
        this.load(JSON.stringify(delForm), API_PROJECT.delete, 'post').then((res) => {
          if (res.errCode === 0) {
            this.$message({type: 'success', message: res.msg, showClose: true});
            this.search();
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      }
    },
    created() {
      this.search();
    }
  };
</script>
