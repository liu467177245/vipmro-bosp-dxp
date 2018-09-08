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
      <template slot="detail">
        <vipmro-layout-top v-model="editHeight.top">
          <vipmro-operation-button>
            <vipmro-button :title="'保存'" @click="save" :disabled="!saveBtnShow"></vipmro-button>
          </vipmro-operation-button>
        </vipmro-layout-top>
        <vipmro-layout-main :height="editHeight">
          <template slot-scope="props">
            <vipmro-form-validator>

              <VipmroCols :cols="12">
                <vipmro-form-item type="name" title="规则名称" :validator="vText(30)"
                                  :validatorType="!saveBtnShow">
                  <vipmro-input v-model="dataDetailForm.name" :top="2" width="220"
                                :readonly="!saveBtnShow"></vipmro-input>
                </vipmro-form-item>
              </VipmroCols>
              <vipmro-title :title="'条件'" width="100%"></vipmro-title>

              <template>
                <div class="vipmro-add-html">
                  <vipmro-add-html
                    v-model="dataDetailForm.conditionFiledList"
                    :isLastShowMinus="true"
                  >
                    <template slot-scope="props">
                      <VipmroCols :cols="24">
                        <vipmro-form-item type="name" title="字段名" :validator="vText(30)"
                                          :validatorType="!saveBtnShow">
                          <vipmro-input v-model="props.item.filedName" :top="2" width="220"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                        <vipmro-select :options="dataDicts[0].dictItems" v-model="props.item.rangeType" :top="2" width="100"
                                       :readonly="!saveBtnShow"></vipmro-select>
                        <vipmro-input v-model="props.item.startValue" :top="2" width="220"
                                      :readonly="!saveBtnShow" v-show="props.item.rangeType === 5"></vipmro-input>
                        <vipmro-input v-model="props.item.endValue" :top="2" width="220"
                                      :readonly="!saveBtnShow" v-show="props.item.rangeType === 5"></vipmro-input>
                        <vipmro-input v-model="props.item.value" :top="2" width="220"
                                      :readonly="!saveBtnShow" v-show="props.item.rangeType !== 5"></vipmro-input>
                      </VipmroCols>
                    </template>
                  </vipmro-add-html>
                </div>
              </template>

              <vipmro-title :title="'目标字段'" width="100%"></vipmro-title>
              <template>
                <div class="vipmro-add-html">
                  <vipmro-add-html
                    v-model="dataDetailForm.targetFiledList"
                    :isLastShowMinus="true"
                  >
                    <template slot-scope="props">
                      <VipmroCols :cols="24">
                        <vipmro-form-item type="name" title="类型" :validator="vText(30)" :validatorType="!saveBtnShow">
                          <vipmro-select
                            :top="2"
                            :options="select.targetFileType.selectOptions"
                            v-model="props.item.type"
                            :readonly="!saveBtnShow"
                            :width="120"
                          ></vipmro-select>
                        </vipmro-form-item>
                        <vipmro-form-item type="name" title="目标字段" :validator="vText(30)" :validatorType="!saveBtnShow">
                          <vipmro-input v-model="props.item.filedName" :top="2" width="320"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </VipmroCols>
                      <vipmro-cols v-show="props.item.type !== 2">
                        <vipmro-form-item   style="margin-left: 274px" type="name" title="值" :validator="vText(30)" :validatorType="!saveBtnShow">
                          <vipmro-input v-model="props.item.replaceValue" :top="2" width="320"
                                        :readonly="!saveBtnShow"></vipmro-input>

                        </vipmro-form-item>
                      </vipmro-cols>

                      <vipmro-cols >
                        <vipmro-add-html
                          v-show="props.item.type === 2"
                          v-model="props.item.splicValueArr"
                          style="width: 1000px"
                        >
                          <template slot-scope="valueItem">
                            <vipmro-cols>
                              <vipmro-form-item   style="margin-left: 274px" type="name" title="拼接字段" :validator="vText(30)" :validatorType="!saveBtnShow">
                                <vipmro-input v-model="valueItem.item.value" :top="2" width="320"
                                              :readonly="!saveBtnShow"></vipmro-input>
                              </vipmro-form-item>
                            </vipmro-cols>
                          </template>
                        </vipmro-add-html>
                      </vipmro-cols>


                    </template>
                  </vipmro-add-html>
                </div>
              </template>
            </vipmro-form-validator>
          </template>
        </vipmro-layout-main>

      </template>
    </vipmro-tab>

    <vipmro-dialog :iconType="detailDialog.iconType" :title="detailDialog.title" v-model="detailDialog.dialogVisible"
                   @confirm="updateStatus" width="400px" :content="DIALOG_CONTENT">
      {{detailDialog.text}}
    </vipmro-dialog>

  </div>
</template>

<script type="text/javascript">
  import {API_DATA_RULE} from '../common/apiConstant';
  import {button, editHeight, table, detailForm, dataDicts, select} from './data';
  import {vText, vNumber} from '../common/validator';

  export default {
    data() {
      return {
        button,
        table,
        editHeight,
        detailForm,
        dataDicts,
        select,
        pagingPage: 1,
        saveBtnShow: false,
        dataDetailForm: JSON.parse(JSON.stringify(detailForm)),
        detailDialog: {
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
      buttonMethod(method) {
        this[method]();
      },
      add() {
        this.table.position = 'detail';
        this.$refs.validatorForm.reset();
        this.saveBtnShow = true;
        this.dataDetailForm = JSON.parse(JSON.stringify(detailForm));
      },
      save() {
          let apiAddress = null;
          if (this.dataDetailForm.id != null) {
            apiAddress = API_DATA_RULE.update;
          } else {
            apiAddress = API_DATA_RULE.add;
          }
          console.log(this.dataDetailForm);
          this.load(JSON.stringify(this.dataDetailForm), apiAddress, 'post').then((res) => {
            if (res.errCode === 0) {
              this.$message({type: 'success', message: res.msg, showClose: true});
              this.search();
            } else {
              this.$message({type: 'error', message: res.msg, showClose: true});
            }
          });
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
        this.load(JSON.stringify(delForm), API_DATA_RULE.delete, 'post').then((res) => {
            if (res.errCode === 0) {
              this.$message({type: 'success', message: res.msg, showClose: true});
              this.search();
            } else {
              this.$message({type: 'error', message: res.msg, showClose: true});
            }
        });
      },
      del() {
        this.openBatch(-1, '确定删除所选数据？');
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
        this.detailDialog.dialogVisible = true;
        this.detailDialog.text = msg;
        this.detailDialog.status = status;
      },
      search(currentPage, pageSize) {
        if (currentPage) {
          table.currentPage = currentPage;
          table.pageSize = pageSize;
        };
        this.load(JSON.stringify(this.queryData()), API_DATA_RULE.list, 'post', true).then((res) => {
          let code = res.errCode;
          if (code === 0) {
            table.data.splice(0, this.table.data.length);
            res.data.data.forEach(item => {
              table.data.push(item);
            });
            table.total = res.data.totalCount;
          }
        });
      },
      queryData() {
        return {
          keyword: table.keyword,
          currentPage: table.currentPage,
          pageSize: table.pageSize
        };
      },
      dblClickRow(obj) {
        this.dataDetailForm = obj;
        console.log(this.dataDetailForm);
        table.position = 'detail';
        this.saveBtnShow = true;
      }
    },
    created() {
        this.search();
    }
  };
</script>
