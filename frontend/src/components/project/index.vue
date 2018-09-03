<style>
  .custom-tree-node:hover{
    background-color: yellowgreen;
  }
  .is-current .el-tree-node__content .el-tree-node__label:first-child{
    background-color: yellowgreen;
  }

  .vipmro-json-editor{
    width: 100%!important;
  }
</style>

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
              <vipmro-layout-top v-model="ruleEditHeight.top">
                <vipmro-operation-button>
                  <vipmro-button :title="'保存'" @click="saveProject" :disabled="!saveBtnShow"></vipmro-button>
                </vipmro-operation-button>
              </vipmro-layout-top>
              <vipmro-layout-main>
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
                            @change="connectInDataChange"
                          ></vipmro-select>
                        </div>
                      </vipmro-form-item>
                    </vipmro-cols>
                    <div v-show="obtainShow">
                      <template name="http">
                        <vipmro-cols>
                          <vipmro-form-item title="url" v-show="connectInShow[0].show">
                            <vipmro-input v-model="connectIn.http.url"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="heads" v-show="connectInShow[0].show">
                            <div class="vipmro-add-html">
                              <vipmro-add-html v-model="connectIn.http.heads" :isLastShowMinus=true>
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
                          <vipmro-form-item title="params" v-show="connectInShow[0].show">
                            <div class="vipmro-add-html">
                              <vipmro-add-html v-model="connectIn.http.params" :isLastShowMinus=true>
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
                          <vipmro-form-item title="url" v-show="connectInShow[1].show">
                            <vipmro-input v-model="connectIn.https.url"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="heads" v-show="connectInShow[1].show">
                            <div class="vipmro-add-html">
                              <vipmro-add-html v-model="connectIn.https.heads">
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
                          <vipmro-form-item title="params" v-show="connectInShow[1].show">
                            <div class="vipmro-add-html">
                              <vipmro-add-html v-model="connectIn.https.params">
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
                          <vipmro-form-item title="url" v-show="connectInShow[2].show">
                            <vipmro-input v-model="connectIn.ftp.url"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="port" v-show="connectInShow[2].show">
                            <vipmro-input v-model="connectIn.ftp.port"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="filePath" v-show="connectInShow[2].show">
                            <vipmro-input v-model="connectIn.ftp.filePath"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="fileName" v-show="connectInShow[2].show">
                            <vipmro-input v-model="connectIn.ftp.fileName"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="account" v-show="connectInShow[2].show">
                            <vipmro-input v-model="connectIn.ftp.account"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="password" v-show="connectInShow[2].show">
                            <vipmro-input v-model="connectIn.ftp.password"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                      </template>
                      <template name="sftp">
                        <vipmro-cols>
                          <vipmro-form-item title="url" v-show="connectInShow[3].show">
                            <vipmro-input v-model="connectIn.sftp.url"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="port" v-show="connectInShow[3].show">
                            <vipmro-input v-model="connectIn.sftp.port"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="filePath" v-show="connectInShow[3].show">
                            <vipmro-input v-model="connectIn.sftp.filePath"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="fileName" v-show="connectInShow[3].show">
                            <vipmro-input v-model="connectIn.sftp.fileName"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="account" v-show="connectInShow[3].show">
                            <vipmro-input v-model="connectIn.sftp.account"
                                          :top="2"
                                          width="220"
                                          :changeBackground="true"
                                          :readonly="!saveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="password" v-show="connectInShow[3].show">
                            <vipmro-input v-model="connectIn.sftp.password"
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
              </vipmro-layout-main>
            </template>

            <template slot="inPutConnect">
            </template>

            <template slot="inPutData">
              <vipmro-layout-top v-model="ruleEditHeight.top">
                <vipmro-operation-button>
                  <vipmro-button :title="'保存'" @click="saveInputData" :disabled="!saveBtnShow"></vipmro-button>
                </vipmro-operation-button>
              </vipmro-layout-top>
              <vipmro-layout-main>
                <vipmro-form-validator :value="detailForm">
                  <vipmro-form-item title="数据类型">
                    <vipmro-select
                      :options="select.dataType.selectOptions"
                      v-model="inPutDataTree.dataFormat.type"
                      :width="220"
                    ></vipmro-select>
                  </vipmro-form-item>
                  <div class="webui-button" style="margin-left: 68px">
                    <vipmro-layout-left :width="'500px'" style="border: 1px solid #d8dce5;height: 600px;overflow: scroll;">
                      <VipmroJsonEditor
                        :widt="'100%'"
                        :props="inputTree.props"
                        :options="inPutDataTree.dataNodeList"
                        :forbitDrag="inputTree.forbitDrag"
                        :forbitDrop="inputTree.forbitDrop"
                        :defaultExpandedKeys="inputTree.defaultExpandedKeys"
                        @dragEnd="input_handleDragEnd"
                        @nodeClick="input_handleNodeClick"
                      ></VipmroJsonEditor>
                    </vipmro-layout-left>
                    <vipmro-layout-left style="border: 1px solid #d8dce5; margin-left: 150px" :width="'500px'">
                      <vipmro-cols>
                        <vipmro-form-item type="outputParamName" title="参数名称">
                          <vipmro-input v-model="chooseNode.input.name" :top="2" width="220"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item type="outputParamType" title="参数类型">
                          <vipmro-select
                            :options="select.nodeType.selectOptions"
                            v-model="chooseNode.input.dataType"
                            :width="220"
                          ></vipmro-select>
                        </vipmro-form-item>
                      </vipmro-cols>
                    </vipmro-layout-left>
                  </div>


                </vipmro-form-validator>
              </vipmro-layout-main>
            </template>

            <template slot="outPutData">
              <vipmro-layout-top v-model="ruleEditHeight.top">
                <vipmro-operation-button>
                  <vipmro-button :title="'保存'" @click="saveOutputData" :disabled="!saveBtnShow"></vipmro-button>
                </vipmro-operation-button>
              </vipmro-layout-top>
              <vipmro-layout-main>
                <vipmro-form-validator :value="detailForm">
                  <vipmro-form-item title="数据类型">
                    <vipmro-select
                      :options="select.dataType.selectOptions"
                      v-model="outPutDataTree.dataFormat.type"
                      :width="220"
                    ></vipmro-select>
                  </vipmro-form-item>
                  <div class="webui-button" style="margin-left: 68px">
                    <vipmro-layout-left :width="'500px'" style="border: 1px solid #d8dce5;height: 600px;overflow: scroll;">
                      <VipmroJsonEditor
                        :widt="'100%'"
                        :props="outputTree.props"
                        :options="this.outPutDataTree.dataNodeList"
                        :forbitDrag="outputTree.forbitDrag"
                        :forbitDrop="outputTree.forbitDrop"
                        :defaultExpandedKeys="outputTree.defaultExpandedKeys"
                        @dragEnd="output_handleDragEnd"
                        @nodeClick="output_handleNodeClick"
                      ></VipmroJsonEditor>
                    </vipmro-layout-left>
                    <vipmro-layout-left style="border: 1px solid #d8dce5; margin-left: 150px" :width="'500px'">
                      <vipmro-cols>
                        <vipmro-form-item type="paramName" title="参数名称">
                          <vipmro-input v-model="chooseNode.output.name" :top="2" width="220"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item type="paramType" title="参数类型">
                          <vipmro-select
                            :options="select.nodeType.selectOptions"
                            v-model="chooseNode.output.dataType"
                            :width="220"
                          ></vipmro-select>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item type="paramFilteType" title="过滤类型">
                          <vipmro-select
                            :options="select.filterType.selectOptions"
                            v-model="chooseNode.output.filterType"
                            :width="220"
                          ></vipmro-select>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item type="paramName" title="默认值">
                          <vipmro-input v-model="chooseNode.output.defaultValue" :top="2" width="220"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                    </vipmro-layout-left>
                  </div>
                </vipmro-form-validator>
              </vipmro-layout-main>
            </template>

            <template slot="mapping">
              <vipmro-layout-top>
                <vipmro-operation-button>
                  <vipmro-button :title="'保存'" @click="saveMapping" :disabled="!saveBtnShow"></vipmro-button>
                </vipmro-operation-button>
              </vipmro-layout-top>
              <vipmro-layout-left width="800px">
                <vipmro-tabletree
                  v-model="mappingTable.tableTreeValue"
                  :tabletreeHeader="mappingTable.tableTreeHeader"
                  @clickRow="selectInputMapping"
                ></vipmro-tabletree>
              </vipmro-layout-left>
              <vipmro-layout-left>
                <vipmro-cascader
                  v-model="selectInputTable.selectTreeValue"
                  :options="selectInputTable.selectTreeoptions"
                  :props="selectInputTable.props"
                  :changeOnSelect="true"
                  :width="300"
                  @change="changeInputSelectNode"
                ></vipmro-cascader>
              </vipmro-layout-left>

            </template>

            <template slot="outPutConnect">
              <vipmro-layout-top v-model="ruleEditHeight.top">
                <vipmro-operation-button>
                  <vipmro-button :title="'保存'" @click="saveOutputConnect" :disabled="!saveBtnShow"></vipmro-button>
                </vipmro-operation-button>
              </vipmro-layout-top>
              <vipmro-layout-main>
                <vipmro-form-validator>
                <div>
                  <vipmro-cols>
                    <vipmro-form-item title="协议">
                      <div class="webui-select">
                        <vipmro-select
                          :options="select.connectOut.selectOptions"
                          v-model="detailForm.outputProtocol.type"
                          :width="220"
                          :readonly="!saveBtnShow"
                          @change="connectOutDataChange"
                        ></vipmro-select>

                      </div>
                    </vipmro-form-item>
                  </vipmro-cols>

                  <div>
                    <template name="http">
                      <vipmro-cols>
                        <vipmro-form-item title="url" v-show="connectOutShow[0].show">
                          <vipmro-input v-model="connectOut.http.url"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="heads" v-show="connectOutShow[0].show">
                          <div class="vipmro-add-html">
                            <vipmro-add-html v-model="connectOut.http.heads" :isLastShowMinus=true>
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
                        <vipmro-form-item title="params" v-show="connectOutShow[0].show">
                          <div class="vipmro-add-html">
                            <vipmro-add-html v-model="connectOut.http.params" :isLastShowMinus=true>
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
                        <vipmro-form-item title="url" v-show="connectOutShow[1].show">
                          <vipmro-input v-model="connectOut.https.url"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="heads" v-show="connectOutShow[1].show">
                          <div class="vipmro-add-html">
                            <vipmro-add-html v-model="connectOut.https.heads">
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
                        <vipmro-form-item title="params" v-show="connectInShow[1].show">
                          <div class="vipmro-add-html">
                            <vipmro-add-html v-model="connectOut.https.params">
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
                        <vipmro-form-item title="url" v-show="connectOutShow[2].show">
                          <vipmro-input v-model="connectOut.ftp.url"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="port" v-show="connectOutShow[2].show">
                          <vipmro-input v-model="connectOut.ftp.port"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="filePath" v-show="connectOutShow[2].show">
                          <vipmro-input v-model="connectOut.ftp.filePath"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="fileName" v-show="connectOutShow[2].show">
                          <vipmro-input v-model="connectOut.ftp.fileName"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="account" v-show="connectOutShow[2].show">
                          <vipmro-input v-model="connectOut.ftp.account"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="password" v-show="connectOutShow[2].show">
                          <vipmro-input v-model="connectOut.ftp.password"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                    </template>
                    <template name="sftp">
                      <vipmro-cols>
                        <vipmro-form-item title="url" v-show="connectOutShow[3].show">
                          <vipmro-input v-model="connectOut.sftp.url"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="port" v-show="connectOutShow[3].show">
                          <vipmro-input v-model="connectOut.sftp.port"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="filePath" v-show="connectOutShow[3].show">
                          <vipmro-input v-model="connectOut.sftp.filePath"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="fileName" v-show="connectOutShow[3].show">
                          <vipmro-input v-model="connectOut.sftp.fileName"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="account" v-show="connectOutShow[3].show">
                          <vipmro-input v-model="connectOut.sftp.account"
                                        :top="2"
                                        width="220"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="password" v-show="connectOutShow[3].show">
                          <vipmro-input v-model="connectOut.sftp.password"
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
              </vipmro-layout-main>
            </template>

            <template slot="rule">
              <vipmro-tab :position="ruleTable.position":list="ruleTable.list" v-model="ruleTable.position">
                <template slot="list">
                <div class="">
                  <vipmro-layout-top>
                    <vipmro-operation-button>
                      <vipmro-button v-for="item in ruleButton" :title="item.name" @click="buttonMethod(item.method)"
                                     :disabled="!saveBtnShow" :key="item.name"></vipmro-button>
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
                  <vipmro-layout-top v-model="ruleEditHeight.top">
                    <vipmro-operation-button>
                      <vipmro-button :title="'保存'" @click="saveRule" :disabled="!rule.ruleSaveBtnShow"></vipmro-button>
                    </vipmro-operation-button>
                  </vipmro-layout-top>
                  <vipmro-layout-main :height="ruleEditHeight">
                    <template slot-scope="props">
                      <vipmro-form-validator :value="rule.form" ref="validatorForm">
                        <VipmroCols :cols="12">
                          <vipmro-form-item type="rule_name" title="规则名称" :validator="vText(30)"
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
                                  <vipmro-form-item type="param_name" title="字段名">
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
                                  <vipmro-form-item type="target_name" title="字段名">
                                    <vipmro-input v-model="props.item.filedName" :top="2" width="220"
                                                  :readonly="!rule.ruleSaveBtnShow"></vipmro-input>
                                  </vipmro-form-item>
                                  <vipmro-form-item type="target_value" title="值">
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
              <vipmro-dialog
                v-model="ruleImportTable.dialogShow"
                title="导入规则"
                width="1000px"
                :beforeConfirm="saveImportRule"
              >
                <vipmro-table
                  :colHeaders="ruleImportTable.colHeaders"
                  :columns="ruleImportTable.columns"
                  :data="ruleImportTable.data"
                  width="1000px"
                ></vipmro-table>
                <vipmro-paging :page="ruleImportTable.currentPage" :pageSize="ruleImportTable.pageSize" :total="ruleImportTable.total"
                               @getList="search"></vipmro-paging>

              </vipmro-dialog>
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
  import {API_PROJECT, API_DATA_TREE_INPUT, API_DATA_RULE, API_DATA_TREE_OUTPUT, API_DATA_MAPPING, API_PROJECT_CONNECT_OUT} from '../common/apiConstant';
  import {button, editHeight, table, dict} from './data';
  import {vText, vNumber} from '../common/validator';
  import {detail, radios, select, connectIn, connectOut, inputTree, outputTree, ruleTable, ruleButton,
    ruleEditHeight, ruleDetailForm, ruleImportTable, mappingTable, selectInputTable} from './detailData';

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
        ruleImportTable,
        mappingTable,
        selectInputTable,
        radios,
        select,
        detail,
        connectIn,
        connectOut,
        inputTree,
        outputTree,
        chooseNode: {
          input: {
            name: null,
            id: null,
            dataType: null
          },
          output: {
            name: null,
            id: null,
            dataType: null,
            filterType: null,
            defaultValue: ''
          }
        },
        connectInShow: [{
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
        connectOutShow: [{
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
          form: JSON.parse(JSON.stringify(ruleDetailForm))
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
        outPutDataTree: JSON.parse(JSON.stringify(detail.outPutDataTree)),
        mappingMap: new Map(),
        mapping: {
          outputNodeMap: new Map(),
          inputNodeMap: new Map(),
          inputIndexMap: new Map()
        }
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
            this.buildConnectInData(this.detailForm.inputProtocol);
            this.buildConnectOutData(this.detailForm.outputProtocol);
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
        this.rule.ruleSaveBtnShow = true;
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
      add() {
        table.position = 'detail';
        this.saveBtnShow = true;
        this.detailForm = JSON.parse(JSON.stringify(detail.detailForm));
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
      saveProject() {
      },
      saveInputData() {
      },
      saveOutputData() {
      },
      saveOutputConnect() {
        let protocol;
        if (select.connectOut.selectValue === 1) {
          protocol = connectOut.http;
        } else if (select.connectOut.selectValue === 2) {
          protocol = connectOut.https;
        } else if (select.connectOut.selectValue === 3) {
          protocol = connectOut.ftp;
        } else if (select.connectOut.selectValue === 4) {
          protocol = connectOut.sftp;
        }
        let model = {
          projectId: this.detailForm.id,
          type: select.connectOut.selectValue,
          connectParamsList: []
        };
        for (let k of Object.keys(protocol)) {
          console.log(k);
          console.log(protocol[k]);
          model.connectParamsList.push(new ConnectParam(k, protocol[k], ''));
        };

        console.log(model);
        this.load(JSON.stringify(model), API_PROJECT_CONNECT_OUT.update, 'post').then((res) => {
          if (res.errCode === 0) {
            this.$message({type: 'success', message: res.msg, showClose: true});
            this.loadDataRule();
            ruleTable.position = 'list';
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      saveImportRule() {
        let ids = '';
        ruleImportTable.data.forEach(item => {
          if (item.checked) {
            ids = ids + item.id + ',';
          }
        });
        if (ids === '') {
          this.$message({type: 'error', message: '请至少选择一条数据', showClose: true});
          return;
        };
        let model = {
          idArr: ids.split(','),
          projectId: this.detailForm.id
        };
        this.load(JSON.stringify(model), API_DATA_RULE.import, 'post').then((res) => {
          if (res.errCode === 0) {
            this.$message({type: 'success', message: res.msg, showClose: true});
            this.loadDataRule();
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      saveRule() {
        let apiAddress = null;
        if (this.rule.form.id != null) {
          apiAddress = API_DATA_RULE.update;
        } else {
          apiAddress = API_DATA_RULE.add;
        }
        this.rule.form.projectId = this.detailForm.id;
        this.load(JSON.stringify(this.rule.form), apiAddress, 'post').then((res) => {
          if (res.errCode === 0) {
            this.$message({type: 'success', message: res.msg, showClose: true});
            this.loadDataRule();
            ruleTable.position = 'list';
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      saveMapping() {
        let address;
        if (mappingTable.id == null) {
          address = API_DATA_MAPPING.add;
        } else {
          address = API_DATA_MAPPING.update;
        }
        let model = {
          id: mappingTable.id,
          projectId: this.detailForm.projectId,
          indexMap: null
        };
        model.indexMap = this.buildUpdateMapping(mappingTable.tableTreeValue, null);
        this.load(JSON.stringify(model), address, 'post').then((res) => {
          if (res.errCode === 0) {
            this.$message({type: 'success', message: res.msg, showClose: true});
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
      connectInDataChange(obj) {
        this.connectInShow.forEach((item) => {
            if (item.value === obj) {
              item.show = true;
            } else {
              item.show = false;
            }
        });
      },
      connectOutDataChange(obj) {
        select.connectOut.selectValue = obj;
        this.connectOutShow.forEach((item) => {
          if (item.value === obj) {
            item.show = true;
          } else {
            item.show = false;
          }
        });
      },
      selectInputMapping(obj) {
        if (obj == null || id === '' || obj.length === 0 || id === 'undefined') {
          selectInputTable.chooseId = null;
          return;
        }
        let id = obj.id;
        selectInputTable.chooseId = id;
        let inputIndexKey = this.findMappNode(id, mappingTable.tableTreeValue);
        if (inputIndexKey == null || inputIndexKey.length === 0) {
          selectInputTable.selectTreeValue.splice(0, selectInputTable.selectTreeValue.length);
          return;
        }

        let valueArr = [];
        while (inputIndexKey.indexOf('#') > 0) {
          valueArr.push(this.mapping.inputIndexMap.get(inputIndexKey));
          inputIndexKey = inputIndexKey.substring(0, inputIndexKey.lastIndexOf('#'));
        }
        valueArr.push(this.mapping.inputIndexMap.get(inputIndexKey));
        valueArr.reverse();
        selectInputTable.selectTreeValue.splice(0, selectInputTable.selectTreeValue.length);
        valueArr.forEach((item) => {
          selectInputTable.selectTreeValue.push(item);
        });
      },
      findMappNode(id, nodeList) {
        if (id == null) {
          return;
        }
        if (nodeList == null) {
          return;
        }
        let result;
        for (let k = 0; k < nodeList.length; k++) {
          let node = nodeList[k];
          if (id === node.id) {
            return node.inputNode;
          }
          if (node.children != null) {
            result = this.findMappNode(id, node.children);
          }
          if (result != null) {
            return result;
          }
        }
      },
      changeInputSelectNode(obj) {
        let id = (obj[obj.length - 1]);
        let mappingKey = this.mapping.inputNodeMap.get(id);
        this.replaceMapping(mappingTable.tableTreeValue, mappingKey);
      },
      replaceMapping(nodeList, mappingKey) {
        if (nodeList == null) {
           return;
        }
        nodeList.forEach((item) => {
          if (item.children != null) {
             this.replaceMapping(item.children, mappingKey);
          }
          if (item.id === selectInputTable.chooseId) {
            item.inputNode = mappingKey.indexKey;
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
      buildConnectInData(protocol) {
        if (protocol === null) {
          return;
        }
        let paramsMap = new Map();
        protocol.connectParamsList.forEach((item) => {
          paramsMap.set(item.name, item.value);
        });
        if (protocol.type === 1) {
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
          connectIn.http.url = paramsMap.get('url');
          connectIn.http.heads = headsArr;
          connectIn.http.params = paramsArr;
        } else if (protocol.type === 2) {
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
          connectIn.https.url = paramsMap.get('url');
          connectIn.https.heads = headsArr;
          connectIn.https.params = paramsArr;
        } else if (protocol.type === 3) {
          connectIn.ftp.host = paramsMap.get('host');
          connectIn.ftp.port = paramsMap.get('port');
          connectIn.ftp.filePath = paramsMap.get('filePath');
          connectIn.ftp.fileName = paramsMap.get('fileName');
          connectIn.ftp.account = paramsMap.get('account');
          connectIn.ftp.password = paramsMap.get('password');
        } else if (protocol.type === 4) {
          connectIn.sftp.host = paramsMap.get('host');
          connectIn.sftp.port = paramsMap.get('port');
          connectIn.sftp.filePath = paramsMap.get('filePath');
          connectIn.sftp.fileName = paramsMap.get('fileName');
          connectIn.sftp.account = paramsMap.get('account');
          connectIn.sftp.password = paramsMap.get('password');
        }
        this.connectInDataChange(protocol.type);
      },
      buildConnectOutData(protocol) {
        if (protocol === null) {
          return;
        }
        let paramsMap = new Map();
        protocol.connectParamsList.forEach((item) => {
          paramsMap.set(item.name, item.value);
        });
        if (protocol.type === 1) {
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
          connectOut.http.url = paramsMap.get('url');
          connectOut.http.heads = headsArr;
          connectOut.http.params = paramsArr;
        } else if (protocol.type === 2) {
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
          connectOut.https.url = paramsMap.get('url');
          connectOut.https.heads = headsArr;
          connectOut.https.params = paramsArr;
        } else if (protocol.type === 3) {
          connectOut.ftp.host = paramsMap.get('host');
          connectOut.ftp.port = paramsMap.get('port');
          connectOut.ftp.filePath = paramsMap.get('filePath');
          connectOut.ftp.fileName = paramsMap.get('fileName');
          connectOut.ftp.account = paramsMap.get('account');
          connectOut.ftp.password = paramsMap.get('password');
        } else if (protocol.type === 4) {
          connectOut.sftp.host = paramsMap.get('host');
          connectOut.sftp.port = paramsMap.get('port');
          connectOut.sftp.filePath = paramsMap.get('filePath');
          connectOut.sftp.fileName = paramsMap.get('fileName');
          connectOut.sftp.account = paramsMap.get('account');
          connectOut.sftp.password = paramsMap.get('password');
        }
        this.connectOutDataChange(protocol.type);
      },
      loadInputMap(dataNodeList) {
        if (dataNodeList == null) {
            return;
        }
        dataNodeList.forEach((item) => {
          this.mapping.inputNodeMap.set(item.id, item);
          this.loadInputMap(item.children);
        });
      },
      loadInputTree(id) {
        let model = {
          projectId: id
        };
        this.load(JSON.stringify(model), API_DATA_TREE_INPUT.detail, 'post').then((res) => {
          if (res.errCode === 0) {
            this.inPutDataTree = res.data;
            selectInputTable.selectTreeoptions = this.inPutDataTree.dataNodeList;
            this.loadInputMap(this.inPutDataTree.dataNodeList);
            this.loadInputIndexMap(this.inPutDataTree.dataNodeList);
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
      loadOutputMap(dataNodeList) {
        if (dataNodeList == null) {
          return;
        }
        dataNodeList.forEach((item) => {
          this.mapping.inputNodeMap.set(item.id, item);
          this.loadOutputMap(item.children);
        });
      },
      loadInputIndexMap(dataNodeList) {
        if (dataNodeList == null) {
          return;
        }
        dataNodeList.forEach((item) => {
          this.mapping.inputIndexMap.set(item.indexKey, item.id);
          this.loadInputIndexMap(item.children);
        });
      },
      loadOutputTree(id) {
        let model = {
          projectId: id
        };
        this.load(JSON.stringify(model), API_DATA_TREE_OUTPUT.detail, 'post').then((res) => {
          if (res.errCode === 0) {
            this.outPutDataTree = res.data;
            this.loadOutputMap(this.outPutDataTree.dataNodeList);
          } else {
          }
        });
      },
      loadMapping(id) {
        let model = {
            projectId: id
        };
        this.load(JSON.stringify(model), API_DATA_MAPPING.detail, 'post', true).then((res) => {
          let code = res.errCode;
          if (code === 0) {
            for (let k of Object.keys(res.data.indexMap)) {
              this.mappingMap.set(k, res.data.indexMap[k]);
            };
          }
          mappingTable.id = res.data.id;
          this.load(JSON.stringify(model), API_DATA_TREE_OUTPUT.detail, 'post', true).then((res) => {
            let code = res.errCode;
            if (code === 0) {
              mappingTable.tableTreeValue.splice(0, this.table.data.length);
              mappingTable.tableTreeValue = this.buildNode(res.data.dataNodeList);
            }
          });
        });
      },
      buildUpdateMapping(nodeList, map) {
        if (map == null) {
          map = Object.create(null);
        }
        if (nodeList == null) {
          return map;
        }
        nodeList.forEach((item) => {
          map[item.indexKey] = item.inputNode;
          this.buildUpdateMapping(item.children, map);
        });
        return map;
      },
      buildNode(itemList, indexKey) {
        if (itemList == null) {
            return null;
        };
        if (indexKey == null) {
            indexKey = '';
        } else {
            indexKey = indexKey + '#';
        }
        let treeList = [];
        if (itemList.size <= 1) {
          return null;
        }
        itemList.forEach((item) => {
          let treeNode = new TreeNode();
          treeNode.id = item.id;
          treeNode.name = item.name;
          treeNode.pid = item.fatherId;
          treeNode.indexKey = indexKey + item.name;
          treeNode.inputNode = this.mappingMap.get(treeNode.indexKey);
          treeNode.children = this.buildNode(item.children, indexKey + item.name);
          treeList.push(treeNode);
        });
        return treeList;
      },
      loadImportRule(currentPage, pageSize) {
        if (currentPage) {
          ruleImportTable.currentPage = currentPage;
          ruleImportTable.pageSize = pageSize;
        };
        let model = {
          keyword: ruleImportTable.keyword,
          currentPage: ruleImportTable.currentPage,
          pageSize: ruleImportTable.pageSize
        };
        this.load(JSON.stringify(model), API_DATA_RULE.list, 'post', true).then((res) => {
          let code = res.errCode;
          if (code === 0) {
            ruleImportTable.data.splice(0, this.table.data.length);
            res.data.data.forEach(item => {
              ruleImportTable.data.push(item);
            });
            ruleImportTable.total = res.data.totalCount;
          }
        });
      },
      importRule() {
        ruleImportTable.dialogShow = true;
      },
      input_handleDragEnd(draggingNode, dropNode, dropType, ev) {
      },
      input_handleNodeClick(data, node, component) {
        this.chooseNode.input = data;
      },
      output_handleDragEnd(draggingNode, dropNode, dropType, ev) {
      },
      output_handleNodeClick(data, node, component) {
        this.chooseNode.output = data;
      }
    },
    created() {
      this.search();
      this.loadImportRule();
    }
  };
  function KeyValue(key, value) {
    this.key = key;
    this.value = value;
  };
  function TreeNode(id, name, pid, children, inputNode, indexKey, operate) {
    this.id = id;
    this.name = name;
    this.pid = pid;
    this.inputNode = inputNode;
    this.indexKey = indexKey;
    this.children = children;
    this.operate = operate;
  }
  function ConnectParam(name, value, desc) {
      this.name = name;
      this.value = value;
      this.desc = desc;
  }
</script>
