<template>
  <div class="webui-tab">
    <vipmro-tab :position="table.position" :list="table.list" v-model="table.position">
      <template slot="list">
        <div class="">
          <vipmro-layout-top>
            <vipmro-query-select>
              <vipmro-input width="200" placeholder="请输入关键词" v-model="table.keyword" title="关键词"></vipmro-input>
            </vipmro-query-select>
            <vipmro-operation-button>
              <vipmro-button v-for="item in button" :title="item.name" @click="buttonMethod(item.method)"
                             :disabled="item.disabled" :key="item.name"></vipmro-button>
            </vipmro-operation-button>
          </vipmro-layout-top>

          <vipmro-layout-main>
            <template slot-scope="props">
              <vipmro-table :htmlEvents="htmlEvents" :readOnly="true" @dblClickRow="dblClickRow" :colHeaders="table.colHeaders" :columns="table.columns" :data="table.data" :height="props.height" >

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

    <vipmro-dialog :iconType="detailDialog.iconType" :title="detailDialog.title" v-model="detailDialog.dialogVisible"
                   :innerHeight="detailDialog.innerHeight" :innerOverflowY="detailDialog.innerOverflowY"
                   width="1000px" :content="DIALOG_CONTENT" :isHideCancel="detailDialog.isHideCancel"
                   :isHideConfirm="detailDialog.isHideConfirm">
      {{detailDialog.text}}
    </vipmro-dialog>
  </div>
</template>

<script type="text/javascript">
  import {API_LOG_REQUEST} from '../common/apiConstant';
  import {button, editHeight, table} from './data';
  import {vText, vNumber} from '../common/validator';

  export default {
    data() {
      return {
        button,
        table,
        editHeight,
        detailDialog: {
          dialogVisible: false,
          title: '提示',
          iconType: 'warning',
          text: '',
          innerHeight: 400,
          innerOverflowY: 'scroll',
          isHideCancel: true,
          isHideConfirm: true
        },
        DIALOG_CONTENT: {
          width: '400px',
          align: 'center'
        },
        htmlEvents: {
            showDetail: (item) => {
            this.showDetail(item);
          }
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
        this.load(JSON.stringify(this.queryData()), API_LOG_REQUEST.list, 'post', true).then((res) => {
          let code = res.errCode;
          if (code === 0) {
            table.data.splice(0, this.table.data.length);
            res.data.data.forEach(item => {
              item.operate = '<a href="javascript:;" :data="2222" class="showDetail">详情</a>';
              console.log(item);
              table.data.push(item);
            });
            table.total = res.data.totalCount;
          }
        });
      },
      showDetail(rowId) {
        this.detailDialog.text = table.data[rowId].content;
        this.detailDialog.dialogVisible = true;
        this.detailDialog.status = status;
      }
    },
    created() {
      this.search();
    }
  };
</script>
