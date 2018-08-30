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
        <vipmro-layout-top>

        </vipmro-layout-top>
        <vipmro-layout-main>

          <vipmro-tab v-model="detailTabPosition" :list="detailTableList">
            <template slot="baseInfo">
              <vipmro-form-validator :value="detailForm">
                <vipmro-cols :cols="24">
                <vipmro-form-item type="name" title="项目名称">
                  <vipmro-input v-model="detailForm.name" :top="2" width="220"
                                :readonly="!saveBtnShow"></vipmro-input>
                </vipmro-form-item>
                </vipmro-cols>
                <vipmro-cols>
                  <vipmro-form-item type="describe" title="项目描述">
                  <vipmro-textarea v-model="detailForm.describe"
                                   :top="2"
                                   width="500"
                                   :rows=10
                                   :changeBackground="true"
                                   :readonly="!saveBtnShow"></vipmro-textarea>
                  </vipmro-form-item>
                </vipmro-cols>
                <vipmro-cols>
                  <vipmro-form-item type="needSynBack" title="同步返回">
                    <vipmro-radio
                      :top="0"
                      :options="radios.needSynBack.radioOptions"
                      v-model="detailForm.needSynBack"
                      @change="callBackChange"
                    ></vipmro-radio>
                  </vipmro-form-item>
                </vipmro-cols>
                <div v-show="callBackShow">
                  <vipmro-cols>
                    <vipmro-form-item type="url" title="回调地址">
                      <vipmro-input v-model="detailForm.callBack.address"
                                    :top="2"
                                    width="220"
                                    :changeBackground="true"
                                    :readonly="!saveBtnShow"></vipmro-input>
                    </vipmro-form-item>
                  </vipmro-cols>
                  <vipmro-cols>
                    <vipmro-form-item title="自定义参数">
                      <div class="vipmro-add-html">
                        <vipmro-add-html v-model="detailForm.callBack.postParams" :isLastShowMinus=true>
                          <template slot-scope="props">
                            <vipmro-cols>
                              <vipmro-input v-model="props.item.key" width="220"></vipmro-input>
                              <vipmro-input v-model="props.item.value" width="220"></vipmro-input>
                            </vipmro-cols>
                          </template>
                        </vipmro-add-html>
                      </div>
                    </vipmro-form-item>
                  </vipmro-cols>
                </div>

                <vipmro-cols>
                  <vipmro-form-item type="obtainDataType" title="数据获取模式">
                    <vipmro-radio
                      :top="0"
                      :options="radios.obtainDataType.radioOptions"
                      v-model="detailForm.obtainDataType"
                      @change="obtainDataTypeChange"
                    ></vipmro-radio>
                  </vipmro-form-item>
                </vipmro-cols>
                <div>
                  <vipmro-cols>
                    <vipmro-form-item type="taskFrequency.cronExpression" title="频率" v-show="obtainShow">
                      <vipmro-input v-model="detailForm.taskFrequency.cronExpression"
                                    :top="2"
                                    width="220"
                                    :changeBackground="true"
                                    :readonly="!saveBtnShow"></vipmro-input>
                    </vipmro-form-item>
                  </vipmro-cols>
                  <vipmro-cols>
                    <vipmro-form-item type="taskFrequency.inputProtocol" title="协议"  v-show="obtainShow">
                      <div class="webui-select">
                        <vipmro-select
                          :options="select.connectIn.selectOptions"
                          v-model="detailForm.inputProtocol.type"
                          :width="220"
                          :readonly="!saveBtnShow"
                          @change="connectDataChange"
                        ></vipmro-select>
                      </div>
                    </vipmro-form-item>
                  </vipmro-cols>
                  <div v-show="obtainShow">
                    <template name="http">
                      <vipmro-cols>
                        <vipmro-form-item title="url" v-show="connectShow[0].show">
                          <vipmro-input v-model="connect.http.url"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="heads" v-show="connectShow[0].show">
                          <div class="vipmro-add-html">
                            <vipmro-add-html v-model="connect.http.heads" :isLastShowMinus=true>
                              <template slot-scope="props">
                                <vipmro-cols>
                                  <vipmro-input v-model="props.item.key" width="220"></vipmro-input>
                                  <vipmro-input v-model="props.item.value" width="220"></vipmro-input>
                                </vipmro-cols>
                              </template>
                            </vipmro-add-html>
                          </div>
                        </vipmro-form-item>
                      </vipmro-cols>

                      <vipmro-cols>
                        <vipmro-form-item title="params" v-show="connectShow[0].show">
                          <div class="vipmro-add-html">
                            <vipmro-add-html v-model="connect.http.params" :isLastShowMinus=true>
                              <template slot-scope="props">
                                <vipmro-cols>
                                  <vipmro-input v-model="props.item.key" width="220"></vipmro-input>
                                  <vipmro-input v-model="props.item.value" width="220"></vipmro-input>
                                </vipmro-cols>
                              </template>
                            </vipmro-add-html>
                          </div>
                        </vipmro-form-item>
                      </vipmro-cols>
                    </template>
                    <template name="https">
                      <vipmro-cols>
                        <vipmro-form-item title="url" v-show="connectShow[1].show">
                          <vipmro-input v-model="connect.https.url"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="heads" v-show="connectShow[1].show">
                          <div class="vipmro-add-html">
                            <vipmro-add-html v-model="connect.https.heads">
                              <template slot-scope="props">
                                <vipmro-cols>
                                  <vipmro-input v-model="props.item.key" width="220"></vipmro-input>
                                  <vipmro-input v-model="props.item.value" width="220"></vipmro-input>
                                </vipmro-cols>
                              </template>
                            </vipmro-add-html>
                          </div>
                        </vipmro-form-item>
                      </vipmro-cols>

                      <vipmro-cols>
                        <vipmro-form-item title="params" v-show="connectShow[1].show">
                          <div class="vipmro-add-html">
                            <vipmro-add-html v-model="connect.https.params">
                              <template slot-scope="props">
                                <vipmro-cols>
                                  <vipmro-input v-model="props.item.key" width="220"></vipmro-input>
                                  <vipmro-input v-model="props.item.value" width="220"></vipmro-input>
                                </vipmro-cols>
                              </template>
                            </vipmro-add-html>
                          </div>
                        </vipmro-form-item>
                      </vipmro-cols>
                    </template>
                    <template name="ftp">
                      <vipmro-cols>
                        <vipmro-form-item title="url" v-show="connectShow[2].show">
                          <vipmro-input v-model="connect.ftp.url"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="port" v-show="connectShow[2].show">
                          <vipmro-input v-model="connect.ftp.port"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="filePath" v-show="connectShow[2].show">
                          <vipmro-input v-model="connect.ftp.filePath"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="fileName" v-show="connectShow[2].show">
                          <vipmro-input v-model="connect.ftp.fileName"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="account" v-show="connectShow[2].show">
                          <vipmro-input v-model="connect.ftp.account"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="password" v-show="connectShow[2].show">
                          <vipmro-input v-model="connect.ftp.password"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                    </template>
                    <template name="sftp">
                      <vipmro-cols>
                        <vipmro-form-item title="url" v-show="connectShow[3].show">
                          <vipmro-input v-model="connect.sftp.url"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="port" v-show="connectShow[3].show">
                          <vipmro-input v-model="connect.sftp.port"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="filePath" v-show="connectShow[3].show">
                          <vipmro-input v-model="connect.sftp.filePath"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="fileName" v-show="connectShow[3].show">
                          <vipmro-input v-model="connect.sftp.fileName"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="account" v-show="connectShow[3].show">
                          <vipmro-input v-model="connect.sftp.account"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="password" v-show="connectShow[3].show">
                          <vipmro-input v-model="connect.sftp.password"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                    </template>
                  </div>
                </div>



              </vipmro-form-validator>
            </template>

            <template slot="inPutData">
              <vipmro-form-validator :value="detailForm">
                <vipmro-form-item title="数据类型">
                  <vipmro-select
                    :options="select.dataType.selectOptions"
                    v-model="inPutDataTree.dataFormat.type"
                    :width="220"
                  ></vipmro-select>
                </vipmro-form-item>
                <div class="webui-button" style="margin-left: 45px">
                  <vipmro-layout-left :width="'500px'" style="border: 1px solid;">
                      <VipmroJsonEditor
                        :props="inputTree.props"
                        :options="this.inPutDataTree.dataNodeList"
                        :forbitDrag="inputTree.forbitDrag"
                        :forbitDrop="inputTree.forbitDrop"
                        :defaultExpandedKeys="inputTree.defaultExpandedKeys"
                        @dragEnd="handleDragEnd"
                        @nodeClick="handleNodeClick"
                      ></VipmroJsonEditor>
                  </vipmro-layout-left>
                  <vipmro-layout-left style="border: 1px solid;" :width="'500px'">
                      <vipmro-cols>
                        <vipmro-form-item type="name" title="参数名称">
                          <vipmro-input v-model="chooseNode.name" :top="2" width="220"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item type="name" title="参数类型">
                          <vipmro-select
                            :options="select.nodeType.selectOptions"
                            v-model="chooseNode.dataType"
                            :width="220"
                          ></vipmro-select>
                        </vipmro-form-item>
                      </vipmro-cols>
                  </vipmro-layout-left>
                </div>


              </vipmro-form-validator>
            </template>

            <template slot="outPutData">

            </template>

            <template slot="rule">
              <vipmro-tab :position="ruleTable.position" :list="ruleTable.list" v-model="ruleTable.position">
                <template slot="list">
                <div class="">
                  <vipmro-layout-top>
                    <vipmro-operation-button>
                      <vipmro-button v-for="item in ruleButton" :title="item.name" @click="buttonMethod(item.method)"
                                     :disabled="item.dfisabled" :key="item.name"></vipmro-button>
                    </vipmro-operation-button>
                  </vipmro-layout-top>
                  <vipmro-layout-main>
                    <template slot-scope="props">
                      <vipmro-table :readOnly="true" @dblClickRow="dblClickRow_rule" :colHeaders="ruleTable.colHeaders" :columns="ruleTable.columns" :data="ruleTable.data" >

                      </vipmro-table>
                    </template>
                  </vipmro-layout-main>
                </div>
              </template>
                <template slot="detail">
                  <vipmro-layout-main :height="ruleTable.editHeight">
                    <template slot-scope="props">
                      <vipmro-form-validator :value="rule.form" ref="validatorForm">

                        <VipmroCols :cols="12">
                          <vipmro-form-item type="name" title="规则名称" :validator="vText(30)"
                                            :validatorType="!rule.saveBtnShow">
                            <vipmro-input v-model="rule.form.name" :top="2" width="220"
                                          :readonly="!rule.ruleSaveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </VipmroCols>
                        <vipmro-title :title="'条件'" width="100%"></vipmro-title>

                        <template>
                          <div class="vipmro-add-html">
                            <vipmro-add-html
                              v-model="rule.form.conditionFiledList"
                              :isLastShowMinus="true"
                            >
                              <template slot-scope="props">
                                <VipmroCols :cols="24">
                                  <vipmro-form-item type="name" title="字段名" :validator="vText(30)"
                                                    :validatorType="!rule.ruleSaveBtnShow">
                                    <vipmro-input v-model="props.item.filedName" :top="2" width="220"
                                                  :readonly="!rule.ruleSaveBtnShow"></vipmro-input>
                                  </vipmro-form-item>
                                  <vipmro-select :options="select.rangeType.selectOptions" v-model="props.item.rangeType" :top="2" width="100"
                                                 :readonly="!rule.ruleSaveBtnShow"></vipmro-select>
                                  <vipmro-input v-model="props.item.startValue" :top="2" width="220"
                                                :readonly="!rule.ruleSaveBtnShow" v-show="props.item.rangeType === 5"></vipmro-input>
                                  <vipmro-input v-model="props.item.endValue" :top="2" width="220"
                                                :readonly="!rule.ruleSaveBtnShow" v-show="props.item.rangeType === 5"></vipmro-input>
                                  <vipmro-input v-model="props.item.value" :top="2" width="220"
                                                :readonly="!rule.ruleSaveBtnShow" v-show="props.item.rangeType !== 5"></vipmro-input>
                                </VipmroCols>
                              </template>
                            </vipmro-add-html>
                          </div>
                        </template>

                        <vipmro-title :title="'目标字段'" width="100%"></vipmro-title>
                        <template>
                          <div class="vipmro-add-html">
                            <vipmro-add-html
                              v-model="rule.form.targetFiledList"
                              :isLastShowMinus="true"
                            >
                              <template slot-scope="props">
                                <VipmroCols :cols="24">
                                  <vipmro-form-item type="name" title="字段名" :validator="vText(30)" :validatorType="!rule.saveBtnShow">
                                    <vipmro-input v-model="props.item.filedName" :top="2" width="220"
                                                  :readonly="!rule.ruleSaveBtnShow"></vipmro-input>
                                  </vipmro-form-item>
                                  <vipmro-form-item type="name" title="值" :validator="vText(30)" :validatorType="!rule.saveBtnShow">
                                    <vipmro-input v-model="props.item.value" :top="2" width="220"
                                                  :readonly="!rule.ruleSaveBtnShow"></vipmro-input>
                                  </vipmro-form-item>
                                </VipmroCols>
                              </template>
                            </vipmro-add-html>
                          </div>
                        </template>
                      </vipmro-form-validator>
                    </template>
                  </vipmro-layout-main>
                </template>
              </vipmro-tab>

            </template>
          </vipmro-tab>

        </vipmro-layout-main>
      </template>
    </vipmro-tab>


    <vipmro-dialog :iconType="detailDialog.iconType" :title="detailDialog.title" v-model="detailDialog.dialogVisible"
                   @confirm="updateStatus" width="400px" :content="DIALOG_CONTENT">
      {{detailDialog.text}}
    </vipmro-dialog>
    <vipmro-dialog :iconType="stopDialog.iconType" :title="stopDialog.title" v-model="stopDialog.dialogVisible"
                   @confirm="stopProject" width="400px" :content="DIALOG_CONTENT">
      {{stopDialog.text}}
    </vipmro-dialog>
    <vipmro-dialog :iconType="startDialog.iconType" :title="startDialog.title" v-model="startDialog.dialogVisible"
                   @confirm="startProject" width="400px" :content="DIALOG_CONTENT">
      {{startDialog.text}}
    </vipmro-dialog>

    <vipmro-dialog :iconType="deleteRuleDialog.iconType" :title="deleteRuleDialog.title" v-model="deleteRuleDialog.dialogVisible"
                   @confirm="deleteRule" width="400px" :content="DIALOG_CONTENT">
      {{deleteRuleDialog.text}}
    </vipmro-dialog>
  </div>
</template>

<script type="text/javascript">
  import {API_PROJECT, API_DATA_TREE_INPUT, API_DATA_RULE} from '../common/apiConstant';
  import {button, editHeight, table, dict} from './data';
  import {vText, vNumber} from '../common/validator';
  import {detail, radios, select, connect, inputTree, ruleTable, ruleButton, ruleEditHeight, ruleDetailForm} from './detailData';

  export default {
    data() {
      return {
        button,
        table,
        dict,
        editHeight,
        ruleTable,
        ruleButton,
        ruleEditHeight,
        ruleDetailForm,
        radios,
        select,
        connect,
        inputTree,
        chooseNode: {
          name: null,
          id: null,
          dataType: null
        },
        connectShow: [{
            value: 1,
            name: 'http',
            show: false
        }, {
            value: 2,
            name: 'http',
            show: false
        }, {
            value: 3,
            name: 'ftp',
            show: false
        }, {
            value: 4,
            name: 'sftp',
            show: false
        }],
        callBackShow: false,
        obtainShow: false,
        typeValidator: {
          type: '',
          required: true,
          maxLength: 20
        },
        rule: {
          ruleSaveBtnShow: false,
          from: null
        },
        saveBtnShow: false,
        detailDialog: {
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
        deleteRuleDialog: {
          dialogVisible: false,
          title: '提示',
          iconType: 'warning',
          text: ''
        },
        DIALOG_CONTENT: {
          width: '400px',
          height: '50px',
          align: 'center'
        },
        detailTabPosition: detail.position,
        detailTableList: detail.detailTableList,
        detailForm: JSON.parse(JSON.stringify(detail.detailForm)),
        inPutDataTree: JSON.parse(JSON.stringify(detail.inPutDataTree)),
        outPutDataTree: JSON.parse(JSON.stringify(detail.outPutDataTree))
      };
    },
    methods: {
      vText,
      vNumber,
      dblClickRow(obj) {
        let model = {
          id: obj.id
        };
        /** 项目基本信息 **/
        this.load(JSON.stringify(model), API_PROJECT.detail, 'post').then((res) => {
          if (res.errCode === 0) {
            if (res.data.taskFrequency == null) {
              res.data.taskFrequency = this.detailForm.taskFrequency;
            }
            this.detailForm = res.data;
            this.obtainDataTypeChange(this.detailForm.obtainDataType);
            this.buildConnectData(this.detailForm.inputProtocol);
            this.buildCallbackData(res.data);
            table.position = 'detail';
            this.detailTabPosition = 'baseInfo';
            this.saveBtnShow = true;
            this.loadInputTree(this.detailForm.id);
            this.loadOutputTree(this.detailForm.id);
            this.loadMapping(this.detailForm.id);
            this.loadDataRule(this.detailForm.id);
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
        ruleTable.position = 'list';
      },
      dblClickRow_rule(obj) {
        this.rule.form = obj;
        ruleTable.position = 'detail';
        this.rule.saveBtnShow = true;
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
      openRuleBatch(status, msg) {
        let ids = '';
        this.ruleTable.data.forEach(item => {
          if (item.checked) {
            ids = ids + item.id + ',';
          }
        });
        if (ids === '') {
          this.$message({type: 'error', message: '请至少选择一条数据', showClose: true});
          return;
        }
        this.deleteRuleDialog.dialogVisible = true;
        this.deleteRuleDialog.text = msg;
        this.deleteRuleDialog.status = status;
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
      },
      addRule() {
        this.ruleTable.position = 'detail';
        this.rule.ruleSaveBtnShow = true;
        this.rule.form = JSON.parse(JSON.stringify(ruleDetailForm));
      },
      delRule() {
        this.openRuleBatch(-1, '确定删除所选数据？');
      },
      deleteRule() {
        let ids = '';
        this.ruleTable.data.forEach(item => {
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
            this.loadDataRule();
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      save() {
        this.load(JSON.stringify(detail), API_PROJECT.update, 'post').then((res) => {
          if (res.errCode === 0) {
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      callBackChange(obj) {
        if (obj === 1) {
            this.callBackShow = true;
        } else {
            this.callBackShow = false;
        }
      },
      obtainDataTypeChange(obj) {
          if (obj === 1) {
            this.obtainShow = true;
          } else {
            this.obtainShow = false;
          }
      },
      connectDataChange(obj) {
        this.connectShow.forEach((item) => {
            if (item.value === obj) {
              item.show = true;
            } else {
              item.show = false;
            }
        });
      },
      buildCallbackData(obj) {
        let needSynBack = 1;
        if (obj.needSynBack === null || obj.needSynBack === false) {
          needSynBack = 2;
        }
        this.detailForm.needSynBack = needSynBack;
        this.callBackChange(needSynBack);
        let paramsArr = [];
        let params = obj.callBack.postParams;
        for (let k of Object.keys(params)) {
          paramsArr.push(new KeyValue(k, params[k]));
        }
        this.detailForm.callBack.postParams = paramsArr;
      },
      buildConnectData(inputProtocol) {
        if (inputProtocol === null) {
            return;
        }
        let paramsMap = new Map();
        inputProtocol.connectParamsList.forEach((item) => {
          paramsMap.set(item.name, item.value);
        });

        if (inputProtocol.type === 1) {
          let headsArr = [];
          let paramsArr = [];
          let heads = paramsMap.get('heads');
          let params = paramsMap.get('params');
          for (let k of Object.keys(heads)) {
            headsArr.push(new KeyValue(k, heads[k]));
          }
          for (let k of Object.keys(params)) {
            paramsArr.push(new KeyValue(k, params[k]));
          }
          connect.http.url = paramsMap.get('url');
          connect.http.heads = headsArr;
          connect.http.params = paramsArr;
        } else if (inputProtocol.type === 2) {
          let headsArr = [];
          let paramsArr = [];
          let heads = paramsMap.get('heads');
          let params = paramsMap.get('params');

          for (let k of Object.keys(heads)) {
            headsArr.push(new KeyValue(k, heads[k]));
          }
          for (let k of Object.keys(params)) {
            paramsArr.push(new KeyValue(k, params[k]));
          }
          connect.https.url = paramsMap.get('url');
          connect.https.heads = headsArr;
          connect.https.params = paramsArr;
        } else if (inputProtocol.type === 3) {
          connect.ftp.host = paramsMap.get('host');
          connect.ftp.port = paramsMap.get('port');
          connect.ftp.filePath = paramsMap.get('filePath');
          connect.ftp.fileName = paramsMap.get('fileName');
          connect.ftp.account = paramsMap.get('account');
          connect.ftp.password = paramsMap.get('password');
        } else if (inputProtocol.type === 4) {
          connect.sftp.host = paramsMap.get('host');
          connect.sftp.port = paramsMap.get('port');
          connect.sftp.filePath = paramsMap.get('filePath');
          connect.sftp.fileName = paramsMap.get('fileName');
          connect.sftp.account = paramsMap.get('account');
          connect.sftp.password = paramsMap.get('password');
        }
        this.connectDataChange(inputProtocol.type);
      },
      loadInputTree(id) {
        let model = {
          projectId: id
        };
        this.load(JSON.stringify(model), API_DATA_TREE_INPUT.detail, 'post').then((res) => {
          if (res.errCode === 0) {
            this.inPutDataTree = res.data;
            console.log(this.inPutDataTree);
          } else {
          }
        });
      },
      loadDataRule() {
        let model = {
            projectId: this.detailForm.id,
            currentPage: -1
        };
        this.load(JSON.stringify(model), API_DATA_RULE.list, 'post', true).then((res) => {
          let code = res.errCode;
          if (code === 0) {
            this.ruleTable.data.splice(0, this.ruleTable.data.length);
            res.data.data.forEach(item => {
              this.ruleTable.data.push(item);
            });
          }
        });
      },
      loadOutputTree(id) {
      },
      loadMapping(id) {
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end');
      },
      handleNodeClick(data, node, component) {
        console.log(node);
        this.chooseNode = data;
      }
    },
    created() {
      this.search();
    }
  };
  function KeyValue(key, value) {
    this.key = key;
    this.value = value;
  };
</script>
