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
  .myInput{
    margin-left: 150px;
    margin-bottom: 10px;
    width: 188px;
    height: 28px;
    padding: 0 15px;
    float: left;
    font-size: inherit;
    border: 1px solid #d8dce5;
    border-radius: 4px;
    background-color: #fff;
  }
  .mylable{
    margin-left: 150px;
    font-size: large;
    background-color: yellow;
  }
</style>

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
                  <vipmro-button :title="'保存'" @click="saveProject" :disabled="!saveProjectShow"></vipmro-button>
                </vipmro-operation-button>
              </vipmro-layout-top>
              <vipmro-layout-main>
                <vipmro-form-validator :value="detailForm">
                  <vipmro-cols :cols="24">
                    <vipmro-form-item type="name" title="项目名称">
                      <vipmro-input v-model="detailForm.name" :top="2" width="444"
                                    :readonly="!saveProjectShow"></vipmro-input>
                    </vipmro-form-item>
                  </vipmro-cols>
                  <vipmro-cols>
                    <vipmro-form-item type="describe" title="项目描述">
                      <vipmro-textarea v-model="detailForm.describe"
                                       :top="2"
                                       width="444"
                                       :rows=10
                                       :changeBackground="true"
                                       :readonly="!saveProjectShow"></vipmro-textarea>
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
                                      width="444"
                                      :changeBackground="true"
                                      :readonly="!saveProjectShow"></vipmro-input>
                      </vipmro-form-item>
                    </vipmro-cols>
                    <vipmro-cols>
                      <vipmro-form-item title="自定义参数">
                        <div class="vipmro-add-html" style="width:600px">
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
                                      width="444"
                                      :changeBackground="true"
                                      :readonly="!saveProjectShow"></vipmro-input>
                      </vipmro-form-item>
                    </vipmro-cols>
                    <vipmro-cols>
                      <vipmro-form-item type="taskFrequency.inputProtocol" title="协议"  v-show="obtainShow">
                        <div class="webui-select">
                          <vipmro-select
                            :options="select.connectIn.selectOptions"
                            v-model="detailForm.inputProtocol.type"
                            :width="444"
                            :readonly="!saveProjectShow"
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
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="heads" v-show="connectInShow[0].show">
                            <div class="vipmro-add-html">
                              <vipmro-add-html style="width: 600px" v-model="connectIn.http.heads" :isLastShowMinus=true>
                                <template slot-scope="props">
                                  <vipmro-cols>
                                    <vipmro-input v-model="props.item.key" width="444"></vipmro-input>
                                    <vipmro-input v-model="props.item.value" width="444"></vipmro-input>
                                  </vipmro-cols>
                                </template>
                              </vipmro-add-html>
                            </div>
                          </vipmro-form-item>
                        </vipmro-cols>

                        <vipmro-cols>
                          <vipmro-form-item title="params" v-show="connectInShow[0].show">
                            <div class="vipmro-add-html">
                              <vipmro-add-html style="width: 600px" v-model="connectIn.http.params" :isLastShowMinus=true>
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
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="heads" v-show="connectInShow[1].show">
                            <div class="vipmro-add-html">
                              <vipmro-add-html style="width: 600px" v-model="connectIn.https.heads">
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
                              <vipmro-add-html style="width: 600px" v-model="connectIn.https.params">
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
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="port" v-show="connectInShow[2].show">
                            <vipmro-input v-model="connectIn.ftp.port"
                                          :top="2"
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="filePath" v-show="connectInShow[2].show">
                            <vipmro-input v-model="connectIn.ftp.filePath"
                                          :top="2"
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="fileName" v-show="connectInShow[2].show">
                            <vipmro-input v-model="connectIn.ftp.fileName"
                                          :top="2"
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="account" v-show="connectInShow[2].show">
                            <vipmro-input v-model="connectIn.ftp.account"
                                          :top="2"
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="password" v-show="connectInShow[2].show">
                            <vipmro-input v-model="connectIn.ftp.password"
                                          :top="2"
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                      </template>
                      <template name="sftp">
                        <vipmro-cols>
                          <vipmro-form-item title="url" v-show="connectInShow[3].show">
                            <vipmro-input v-model="connectIn.sftp.url"
                                          :top="2"
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="port" v-show="connectInShow[3].show">
                            <vipmro-input v-model="connectIn.sftp.port"
                                          :top="2"
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="filePath" v-show="connectInShow[3].show">
                            <vipmro-input v-model="connectIn.sftp.filePath"
                                          :top="2"
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="fileName" v-show="connectInShow[3].show">
                            <vipmro-input v-model="connectIn.sftp.fileName"
                                          :top="2"
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="account" v-show="connectInShow[3].show">
                            <vipmro-input v-model="connectIn.sftp.account"
                                          :top="2"
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                        <vipmro-cols>
                          <vipmro-form-item title="password" v-show="connectInShow[3].show">
                            <vipmro-input v-model="connectIn.sftp.password"
                                          :top="2"
                                          width="444"
                                          :changeBackground="true"
                                          :readonly="!saveProjectShow"></vipmro-input>
                          </vipmro-form-item>
                        </vipmro-cols>
                      </template>
                    </div>
                  </div>

                </vipmro-form-validator>
              </vipmro-layout-main>
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
                      :readonly="!saveBtnShow"
                      :width="220"
                    ></vipmro-select>
                  </vipmro-form-item>
                  <vipmro-button title="导入" :top="5" @click="showDataTreeInputImport">

                  </vipmro-button>
                  <div class="webui-button" style="margin-left: 68px">
                    <vipmro-layout-left :width="'500px'" style="border: 1px solid #d8dce5;height: 600px;overflow: scroll;">
                      <VipmroJsonEditor
                        :widt="'100%'"
                        :props="inputTree.props"
                        :options="inPutDataTree.dataNodeList"
                        :forbitDrag="inputTree.forbitDrag"
                        :forbitDrop="inputTree.forbitDrop"
                        :defaultExpandedKeys="inputTree.defaultExpandedKeys"
                        :expandAll="true"
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
                            :readonly="!saveBtnShow"
                            :width="220"
                          ></vipmro-select>
                        </vipmro-form-item>
                      </vipmro-cols>
                    </vipmro-layout-left>
                  </div>


                </vipmro-form-validator>
              </vipmro-layout-main>
            </template>

            <template slot="prefix">

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
                      :readonly="!saveBtnShow"
                      :width="220"
                    ></vipmro-select>
                  </vipmro-form-item>
                  <vipmro-button title="导入" :top="5" @click="showDataTreeOutputImport">
                  </vipmro-button>
                  <div class="webui-button" style="margin-left: 68px">
                    <vipmro-layout-left :width="'500px'" style="border: 1px solid #d8dce5;height: 600px;overflow: scroll;">
                      <VipmroJsonEditor
                        :widt="'100%'"
                        :props="outputTree.props"
                        :options="this.outPutDataTree.dataNodeList"
                        :forbitDrag="outputTree.forbitDrag"
                        :forbitDrop="outputTree.forbitDrop"
                        :defaultExpandedKeys="outputTree.defaultExpandedKeys"
                        :expandAll="true"
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
                            :readonly="!saveBtnShow"
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
                      <vipmro-cols>
                        <vipmro-form-item type="paramFilteType"  title="函数">
                          <vipmro-button
                            title="+系统"
                            @click="showGlobalScript"
                            :top="2"
                          ></vipmro-button>
                          <vipmro-button
                            title="+自定义"
                            :top="2"
                            @click="showProjectScript"
                          ></vipmro-button>
                        </vipmro-form-item>

                        <div>
                        <template v-for="(dataFilter,index) in chooseNode.output.dataFilter">
                          <vipmro-cols>
                            <div style="float: left;width: 83.7777%">
                              <label class="mylable">{{dataFilter.name}}</label>
                            </div>
                            <vipmro-button
                              title="删除"
                              :top="0"
                              @click="deleteDataFilter(index, chooseNode)"
                            ></vipmro-button>
                          </vipmro-cols>
                          <template v-if="dataFilter.paramsCount != null">
                            <template v-for="(props,index) in dataFilter.args" v-if="index<=dataFilter.paramsCount">
                              <vipmro-cols :cols="24">
                                <vipmro-input style="margin-left: 150px" v-model="dataFilter.args[index]" :width="220"></vipmro-input>
                              </vipmro-cols>
                            </template>
                          </template>
                          <template v-if="dataFilter.paramsCount == null">
                            <vipmro-add-html
                              v-model="dataFilter.args"
                              type="String"
                              :isLastShowMinus="true"
                            >
                              <template slot-scope="props">
                                <vipmro-cols :cols="12">
                                  <vipmro-input style="margin-left: 150px" :width="220" v-model="dataFilter.args[props.index]"></vipmro-input>
                                </vipmro-cols>
                              </template>
                            </vipmro-add-html>
                          </template>
                        </template>
                        </div>
                        <vipmro-cols>


                        </vipmro-cols>
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
              <vipmro-layout-left width="375.5px">
                <vipmro-tabletree
                  v-model="mappingTableIn.tableTreeValue"
                  :tabletreeHeader="mappingTableIn.tableTreeHeader"
                  :openAll="true"
                  @clickRow="selectInputMapping"
                ></vipmro-tabletree>
              </vipmro-layout-left>

              <vipmro-layout-left width="800px">
                <vipmro-tabletree
                  v-model="mappingTable.tableTreeValue"
                  :tabletreeHeader="mappingTable.tableTreeHeader"
                  :openAll="true"
                  @clickRow="changeInputSelectNodeTree"
                ></vipmro-tabletree>
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
                  <vipmro-cols :cols="24">
                    <vipmro-form-item title="协议">
                      <div class="webui-select">
                        <vipmro-select
                          :options="select.connectOut.selectOptions"
                          v-model="detailForm.outputProtocol.type"
                          :width="444"
                          :readonly="!saveBtnShow"
                          @change="connectOutDataChange"
                        ></vipmro-select>

                      </div>
                    </vipmro-form-item>
                  </vipmro-cols>
                  <vipmro-cols :cols="24">
                    <template name="http">
                      <vipmro-cols>
                        <vipmro-form-item title="url" v-show="connectOutShow[0].show">
                          <vipmro-input v-model="connectOut.http.url"
                                        :top="2"
                                        width="444"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols :cols="24">
                        <vipmro-form-item title="heads" v-show="connectOutShow[0].show">
                          <div class="vipmro-add-html">
                            <vipmro-add-html style="width: 600px" v-model="connectOut.http.heads" :isLastShowMinus=true>
                              <template id="heads" slot-scope="props">
                                <vipmro-cols :cols="24">
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
                            <vipmro-add-html style="width: 600px" v-model="connectOut.http.params" :isLastShowMinus=true>
                              <template slot-scope="props">
                                <vipmro-cols :cols="24">
                                  <vipmro-input v-model="props.item.key" width="220"></vipmro-input>
                                  <vipmro-input v-model="props.item.value" width="220"></vipmro-input>
                                </vipmro-cols>
                              </template>
                            </vipmro-add-html>
                          </div>
                        </vipmro-form-item>
                      </vipmro-cols>
                    </template>
                  </vipmro-cols>


                    <template name="https">
                      <vipmro-cols>
                        <vipmro-form-item title="url" v-show="connectOutShow[1].show">
                          <vipmro-input v-model="connectOut.https.url"
                                        :top="2"
                                        width="440"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="heads" v-show="connectOutShow[1].show">
                          <div class="vipmro-add-html">
                            <vipmro-add-html style="width: 600px" v-model="connectOut.https.heads">
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
                            <vipmro-add-html style="width: 600px" v-model="connectOut.https.params">
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
                                        width="440"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="port" v-show="connectOutShow[2].show">
                          <vipmro-input v-model="connectOut.ftp.port"
                                        :top="2"
                                        width="440"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="filePath" v-show="connectOutShow[2].show">
                          <vipmro-input v-model="connectOut.ftp.filePath"
                                        :top="2"
                                        width="440"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="fileName" v-show="connectOutShow[2].show">
                          <vipmro-input v-model="connectOut.ftp.fileName"
                                        :top="2"
                                        width="440"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="account" v-show="connectOutShow[2].show">
                          <vipmro-input v-model="connectOut.ftp.account"
                                        :top="2"
                                        width="440"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="password" v-show="connectOutShow[2].show">
                          <vipmro-input v-model="connectOut.ftp.password"
                                        :top="2"
                                        width="440"
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
                                        width="440"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="port" v-show="connectOutShow[3].show">
                          <vipmro-input v-model="connectOut.sftp.port"
                                        :top="2"
                                        width="440"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="filePath" v-show="connectOutShow[3].show">
                          <vipmro-input v-model="connectOut.sftp.filePath"
                                        :top="2"
                                        width="440"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="fileName" v-show="connectOutShow[3].show">
                          <vipmro-input v-model="connectOut.sftp.fileName"
                                        :top="2"
                                        width="440"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="account" v-show="connectOutShow[3].show">
                          <vipmro-input v-model="connectOut.sftp.account"
                                        :top="2"
                                        width="440"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                      <vipmro-cols>
                        <vipmro-form-item title="password" v-show="connectOutShow[3].show">
                          <vipmro-input v-model="connectOut.sftp.password"
                                        :top="2"
                                        width="440"
                                        :changeBackground="true"
                                        :readonly="!saveBtnShow"></vipmro-input>
                        </vipmro-form-item>
                      </vipmro-cols>
                    </template>


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
                      <vipmro-form-validator :value="rule.dataDetailForm" ref="validatorForm">
                        <VipmroCols :cols="12">
                          <vipmro-form-item type="rule_name" title="规则名称" :validator="vText(30)"
                                            :validatorType="!rule.saveBtnShow">
                            <vipmro-input v-model="rule.dataDetailForm.name" :top="2" width="220"
                                          :readonly="!rule.ruleSaveBtnShow"></vipmro-input>
                          </vipmro-form-item>
                        </VipmroCols>
                        <vipmro-title :title="'条件'" width="100%"></vipmro-title>

                        <template>
                          <div class="vipmro-add-html">
                            <vipmro-add-html
                              v-model="rule.dataDetailForm.conditionFiledList"
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
                              v-model="rule.dataDetailForm.targetFiledList"
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
                                  <vipmro-form-item type="target_name" title="目标字段">
                                    <vipmro-input v-model="props.item.filedName" :top="2" width="220"
                                                  :readonly="!rule.ruleSaveBtnShow"></vipmro-input>
                                  </vipmro-form-item>
                                </VipmroCols>
                                <vipmroCols v-show="props.item.type !== 2">
                                  <vipmro-form-item type="target_value" title="值" style="margin-left: 274px">
                                    <vipmro-input v-model="props.item.replaceValue" :top="2" width="220"
                                                  :readonly="!rule.ruleSaveBtnShow"></vipmro-input>
                                  </vipmro-form-item>
                                </vipmroCols>

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

            <template slot="script">
              <vipmro-layout-top>
                <vipmro-button
                  top="10"
                  title="保存"
                  :readonly="!saveBtnShow"
                  @click="saveScript">
                </vipmro-button>
              </vipmro-layout-top>
              <vipmro-layout-main>
                <vipmro-form-validator :value="detailForm">
                  <vipmro-cols :cols="24">
                    <vipmro-form-item type="type" title="脚本类型">
                      <vipmro-select
                        :options="select.scriptEngineType.selectOptions"
                        v-model="postScriptEngine.type"
                        :readonly="!saveBtnShow"
                        :width="220"
                      ></vipmro-select>
                    </vipmro-form-item>
                  </vipmro-cols>
                  <vipmro-cols :cols="24">
                    <vipmro-form-item type="content" title="code">
                      <vipmro-textarea v-model="postScriptEngine.content"
                                       :top="2"
                                       width="800"
                                       placeholder=""
                                       :trimFrontBackSpace="false"
                                       :trimSpace="false"
                                       :rows=15
                                       :changeBackground="true"
                                       :readonly="!saveBtnShow"></vipmro-textarea>
                    </vipmro-form-item>
                  </vipmro-cols>
                </vipmro-form-validator>
              </vipmro-layout-main>

            </template>

            <template slot="testing">
              <vipmro-layout-top>
                <vipmro-button
                  top="10"
                  title="运行"
                  @click="testing">
                </vipmro-button>
              </vipmro-layout-top>
              <vipmro-layout-left style="width:100%">
                <vipmro-textarea v-model="testingData.inputData"
                                 :top="2"
                                 width="800"
                                 placeholder=""
                                 :rows=15
                                 :changeBackground="true"
                                 :readonly="!saveBtnShow"></vipmro-textarea>
              </vipmro-layout-left>
              <vipmro-layout-left width="50">

              </vipmro-layout-left>
              <vipmro-layout-left style="width:100%">
                <div style="width: 800px;margin-top: 10px">
                  {{this.testingData.outputData}}
                </div>

              </vipmro-layout-left>

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
    <vipmro-dialog
      v-model="importInputDataTreeDialog.dialogVisible"
      @confirm="importDataNodeIn"
    >
      <vipmro-layout-main>
        <vipmro-textarea
          :width="720"
          :rows="30"
          :left="5"
          :trimHtml="false"
          :trimSpace="false"
          :trimFrontBackSpace="false"
          :top="0"
          v-model="importInputDataTreeDialog.importData"
        ></vipmro-textarea>
      </vipmro-layout-main>
    </vipmro-dialog>
    <vipmro-dialog
      v-model="importOutputDataTreeDialog.dialogVisible"
      @confirm="importDataNodeOut"
    >
      <vipmro-layout-main>
        <vipmro-textarea
          :width="720"
          :rows="30"
          :left="5"
          :trimHtml="false"
          :trimSpace="false"
          :trimFrontBackSpace="false"
          :top="0"
          v-model="importOutputDataTreeDialog.importData"
        ></vipmro-textarea>
      </vipmro-layout-main>
    </vipmro-dialog>
    <vipmro-dialog  v-model="globalScripTable.dialogVisible"
                    @confirm="importGlobalScript">
      <vipmro-table
        :colHeaders="globalScripTable.colHeaders"
        :columns="globalScripTable.columns"
        :data="globalScripTable.data"
        :dataDicts="globalScripTable.dataDicts"
      ></vipmro-table>
    </vipmro-dialog>
    <vipmro-dialog v-model="projectScriptTable.dialogVisible">
      <vipmro-layout-top
      >
        <vipmro-button
          title="新增"
        ></vipmro-button>
      </vipmro-layout-top>
      <vipmro-layout-main>
        <vipmro-button title="23"></vipmro-button>
      </vipmro-layout-main>
    </vipmro-dialog>
  </div>
</template>

<script type="text/javascript">
  import {API_PROJECT, API_DATA_TREE_INPUT, API_DATA_RULE, API_DATA_TREE_OUTPUT,
    API_DATA_MAPPING, API_PROJECT_CONNECT_OUT, API_SCRIPT_ENGINE} from '../common/apiConstant';
  import {button, editHeight, table, dict} from './data';
  import {vText, vNumber} from '../common/validator';
  import {detail, radios, select, connectProtocolIn, connectProtocolOut, inputTree, outputTree, ruleTable, ruleButton,
    ruleEditHeight, ruleDetailForm, ruleImportTable, mappingTable, mappingTableIn, selectInputTable, scriptText,
    globalScripTable, projectScriptTable} from './detailData';
  import xml2js from 'xml2js';

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
        mappingTableIn,
        selectInputTable,
        postScriptEngine: JSON.parse(JSON.stringify(scriptText)),
        globalScripTable: JSON.parse(JSON.stringify(globalScripTable)),
        projectScriptTable: JSON.parse(JSON.stringify(projectScriptTable)),
        radios,
        select,
        detail,
        connectIn: JSON.parse(JSON.stringify(connectProtocolIn)),
        connectOut: JSON.parse(JSON.stringify(connectProtocolOut)),
        inputTree,
        outputTree,
        inputDataNodeId: 1,
        outputDataNodeId: 1,
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
            dataFilter: [],
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
        saveBtnShow: false,
        callBackShow: false,
        obtainShow: false,
        saveProjectShow: false,
        typeValidator: {
          type: '',
          required: true,
          maxLength: 20
        },
        rule: {
          ruleSaveBtnShow: false,
          dataDetailForm: JSON.parse(JSON.stringify(ruleDetailForm))
        },
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
        importInputDataTreeDialog: {
          dialogVisible: false,
          title: '提示',
          iconType: 'warning',
          text: '',
          importData: ''
        },
        importOutputDataTreeDialog: {
          dialogVisible: false,
          title: '提示',
          iconType: 'warning',
          text: '',
          importData: ''
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
        },
        testingData: {
            inputData: null,
            outputData: null
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
            table.position = 'detail';
            this.detailTabPosition = 'baseInfo';
            this.saveProjectShow = true;
            this.saveBtnShow = true;
            table.list[1].title = res.data.id;
            this.detailForm.id = res.data.id;
            this.detailForm.name = res.data.name;
            this.detailForm.describe = res.data.describe;
            this.detailForm.obtainDataType = res.data.obtainDataType;
            if (res.data.needSynBack === true) {
              this.detailForm.needSynBack = 1;
            } else {
              this.detailForm.needSynBack = 2;
            }
            if (res.data.taskFrequency == null || res.data.taskFrequency === 'undefined') {
            } else {
              this.detailForm.taskFrequency = res.data.taskFrequency;
            }
            if (res.data.callBack == null || res.data.callBack === 'undefined') {
            } else {
              this.detailForm.callBack = res.data.callBack;
            }
            this.detailForm.dataMapperId = res.data.dataMapperId;
            if (res.data.inputProtocol == null || res.data.inputProtocol === 'undefined') {
            } else {
              this.detailForm.inputProtocol = res.data.inputProtocol;
            }
            if (res.data.outputProtocol == null || res.data.outputProtocol === 'undefined') {
            } else {
              this.detailForm.outputProtocol = res.data.outputProtocol;
            }
            this.obtainDataTypeChange(this.detailForm.obtainDataType);
            this.buildConnectInData(this.detailForm.inputProtocol);
            this.buildConnectOutData(this.detailForm.outputProtocol);
            this.buildCallbackData(res.data);
            this.loadInputTree(this.detailForm.id);
            this.loadOutputTree(this.detailForm.id);
            this.loadMapping(this.detailForm.id);
            this.loadDataRule(this.detailForm.id);
            this.loadGlobalScript();
            this.loadProjectScript(this.detailForm.id);
            /****
             *
             * @type {*}
             *

             */
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
        ruleTable.position = 'list';
      },
      dblClickRow_rule(obj) {
        this.rule.dataDetailForm = obj;
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
        table.list[1].title = '新增';
        table.position = 'detail';
        this.saveProjectShow = true;
        this.detailForm = JSON.parse(JSON.stringify(detail.detailForm));
        this.inPutDataTree = JSON.parse(JSON.stringify(detail.inPutDataTree));
        this.outPutDataTree = JSON.parse(JSON.stringify(detail.outPutDataTree));
        mappingTable.tableTreeValue.splice(0, this.table.data.length);
        this.mapping.outputNodeMap = new Map();
        this.mapping.inputNodeMap = new Map();
        this.mapping.inputIndexMap = new Map();
        this.connectIn = JSON.parse(JSON.stringify(connectProtocolIn));
        this.connectOut = JSON.parse(JSON.stringify(connectProtocolOut));
        this.ruleTable.data.splice(0, this.ruleTable.data.length);
      },
      addRule() {
        this.ruleTable.position = 'detail';
        this.rule.ruleSaveBtnShow = true;
        this.rule.dataDetailForm = JSON.parse(JSON.stringify(ruleDetailForm));
      },
      delRule() {
        this.openRuleBatch(-1, '确定删除所选数据？');
      },
      deleteDataFilter(index, chooseNode) {
        chooseNode.output.dataFilter.splice(index, 1);
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
      saveProject() {
        let address;
        if (this.detailForm.id == null || this.detailForm.id === 'undefined') {
          address = API_PROJECT.add;
        } else {
          address = API_PROJECT.update;
        }
        let model = {
          id: this.detailForm.id,
          name: this.detailForm.name,
          describe: this.detailForm.describe,
          needSynBack: this.detailForm.needSynBack,
          obtainDataType: this.detailForm.obtainDataType,
          callBack: null,
          taskFrequency: this.detailForm.taskFrequency,
          connectProtocolIn: this.buildConnectProtocol(select.connectIn.selectValue, this.connectIn)
        };
        let obj = Object.create(null);
        for (let k of Object.keys(this.detailForm.callBack.postParams)) {
          obj[this.detailForm.callBack.postParams[k].key] = this.detailForm.callBack.postParams[k].value;
        }
        model.callBack = {
          address: this.detailForm.callBack.address,
          postParams: obj
        };
        this.load(JSON.stringify(model), address, 'post').then((res) => {
          if (res.errCode === 0) {
            this.detailForm.id = res.data;
            this.saveProjectShow = true;
            this.$message({type: 'success', message: res.msg, showClose: true});
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      saveInputData() {
        let model = {
          id: this.inPutDataTree.id,
          projectId: this.detailForm.id,
          children: this.inPutDataTree.dataNodeList[0].children,
          dataFormat: {
              type: this.inPutDataTree.dataFormat.type
          }
        };
        let address;
        if (this.inPutDataTree.id == null || this.inPutDataTree.id === 'undefined') {
            address = API_DATA_TREE_INPUT.add;
        } else {
            address = API_DATA_TREE_INPUT.update;
        }
        this.load(JSON.stringify(model), address, 'post').then((res) => {
          if (res.errCode === 0) {
            this.$message({type: 'success', message: res.msg, showClose: true});
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      saveOutputData() {
        let model = {
          id: this.outPutDataTree.id,
          projectId: this.detailForm.id,
          children: this.outPutDataTree.dataNodeList[0].children,
          dataFormat: {
            type: this.outPutDataTree.dataFormat.type
          }
        };
        let address;
        if (this.outPutDataTree.id == null || this.outPutDataTree.id === 'undefined') {
          address = API_DATA_TREE_OUTPUT.add;
        } else {
          address = API_DATA_TREE_OUTPUT.update;
        }
        this.load(JSON.stringify(model), address, 'post').then((res) => {
          if (res.errCode === 0) {
            this.$message({type: 'success', message: res.msg, showClose: true});
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      saveOutputConnect() {
        let model = this.buildConnectProtocol(select.connectOut.selectValue, this.connectOut);
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
        if (this.rule.dataDetailForm.id != null) {
          apiAddress = API_DATA_RULE.update;
        } else {
          apiAddress = API_DATA_RULE.add;
        }
        this.rule.dataDetailForm.projectId = this.detailForm.id;
        this.load(JSON.stringify(this.rule.dataDetailForm), apiAddress, 'post').then((res) => {
          if (res.errCode === 0) {
            this.$message({type: 'success', message: res.msg, showClose: true});
            this.loadDataRule();
            this.rule.dataDetailForm.id = res.data;
            ruleTable.position = 'list';
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      saveMapping() {
        let address;
        if (mappingTable.id == null || mappingTable.id === 'undefined') {
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
      saveScript() {
        let model = {
          projectId: this.detailForm.projectId,
          content: this.postScriptEngine.content,
          type: this.postScriptEngine.type
        };
        this.load(JSON.stringify(model), API_SCRIPT_ENGINE.update, 'post').then((res) => {
          if (res.errCode === 0) {
            this.$message({type: 'success', message: res.msg, showClose: true});
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      callBackChange(obj) {
        if (obj === 1) {
            this.callBackShow = false;
        } else {
            this.callBackShow = true;
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
        select.connectIn.selectValue = obj;
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
        let inputIndexKey = this.findMappingNode(id, mappingTableIn.tableTreeValue);
        selectInputTable.chooseValue = inputIndexKey;
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
      findMappingNode(id, nodeList) {
        if (id == null || id === 'undefined') {
          return;
        }
        if (nodeList == null || nodeList === 'undefined') {
          return;
        }
        let result;
        for (let k = 0; k < nodeList.length; k++) {
          let node = nodeList[k];
          if (id === node.id) {
            return node.indexKey;
          }
          if (node.children != null) {
            result = this.findMappingNode(id, node.children);
          }
          if (result != null) {
            return result;
          }
        }
      },
      findMappingNodeIn(id, nodeList) {
        if (id == null || id === 'undefined') {
          return;
        }
        if (nodeList == null || nodeList === 'undefined') {
          return;
        }
        let result;
        for (let k = 0; k < nodeList.length; k++) {
          let node = nodeList[k];
          if (id === node.id) {
            return node;
          }
          if (node.children != null) {
            result = this.findMappingNodeIn(id, node.children);
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
      changeInputSelectNodeTree(obj) {
        let id = obj.id;
        let mappingKey = this.findMappingNodeIn(id, mappingTable.tableTreeValue);
        this.replaceMapping(mappingTable.tableTreeValue, mappingKey);
      },
      replaceMapping(nodeList, mappingKey) {
        if (nodeList == null || nodeList === 'undefined') {
           return;
        }
        nodeList.forEach((item) => {
          if (item.children != null) {
             this.replaceMapping(item.children, mappingKey);
          }
          if (item.id === mappingKey.id) {
            item.inputNode = selectInputTable.chooseValue;
          }
        });
      },
      buildCallbackData(obj) {
        if (obj == null || obj === 'undefined') {
           return;
        }
        let needSynBack;
        if (obj.needSynBack == null || obj.needSynBack === 'undefined' || obj.needSynBack === false) {
          needSynBack = 2;
        } else {
          needSynBack = 1;
        }
        this.detailForm.needSynBack = needSynBack;
        this.callBackChange(needSynBack);
        if (needSynBack === 2) {
          let paramsArr = [];
          let params = obj.callBack.postParams;
          for (let k of Object.keys(params)) {
            paramsArr.push(new KeyValue(k, params[k]));
          }
          this.detailForm.callBack.postParams = paramsArr;
        }
      },
      buildConnectInData(protocol) {
        if (protocol == null || protocol === 'undefined') {
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
          this.connectIn.http.url = paramsMap.get('url');
          this.connectIn.http.heads = headsArr;
          this.connectIn.http.params = paramsArr;
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
          this.connectIn.https.url = paramsMap.get('url');
          this.connectIn.https.heads = headsArr;
          this.connectIn.https.params = paramsArr;
        } else if (protocol.type === 3) {
          this.connectIn.ftp.host = paramsMap.get('host');
          this.connectIn.ftp.port = paramsMap.get('port');
          this.connectIn.ftp.filePath = paramsMap.get('filePath');
          this.connectIn.ftp.fileName = paramsMap.get('fileName');
          this.connectIn.ftp.account = paramsMap.get('account');
          this.connectIn.ftp.password = paramsMap.get('password');
        } else if (protocol.type === 4) {
          this.connectIn.sftp.host = paramsMap.get('host');
          this.connectIn.sftp.port = paramsMap.get('port');
          this.connectIn.sftp.filePath = paramsMap.get('filePath');
          this.connectIn.sftp.fileName = paramsMap.get('fileName');
          this.connectIn.sftp.account = paramsMap.get('account');
          this.connectIn.sftp.password = paramsMap.get('password');
        }
        this.connectInDataChange(protocol.type);
      },
      buildConnectOutData(protocol) {
        if (protocol == null || protocol === 'undefined') {
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
          this.connectOut.http.url = paramsMap.get('url');
          this.connectOut.http.heads = headsArr;
          this.connectOut.http.params = paramsArr;
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
          this.connectOut.https.url = paramsMap.get('url');
          this.connectOut.https.heads = headsArr;
          this.connectOut.https.params = paramsArr;
        } else if (protocol.type === 3) {
          this.connectOut.ftp.host = paramsMap.get('host');
          this.connectOut.ftp.port = paramsMap.get('port');
          this.connectOut.ftp.filePath = paramsMap.get('filePath');
          this.connectOut.ftp.fileName = paramsMap.get('fileName');
          this.connectOut.ftp.account = paramsMap.get('account');
          this.connectOut.ftp.password = paramsMap.get('password');
        } else if (protocol.type === 4) {
          this.connectOut.sftp.host = paramsMap.get('host');
          this.connectOut.sftp.port = paramsMap.get('port');
          this.connectOut.sftp.filePath = paramsMap.get('filePath');
          this.connectOut.sftp.fileName = paramsMap.get('fileName');
          this.connectOut.sftp.account = paramsMap.get('account');
          this.connectOut.sftp.password = paramsMap.get('password');
        }
        this.connectOutDataChange(protocol.type);
      },
      buildUpdateMapping(nodeList, map) {
        if (map == null || map === 'undefined') {
          map = Object.create(null);
        }
        if (nodeList == null || nodeList === 'undefined') {
          return map;
        }
        nodeList.forEach((item) => {
          map[item.indexKey] = item.inputNode;
          this.buildUpdateMapping(item.children, map);
        });
        return map;
      },
      buildNode(itemList, indexKey) {
        if (itemList == null || itemList === 'undefined') {
          return null;
        };
        if (indexKey == null || indexKey === 'undefined') {
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
      buildConnectProtocol(type, connect) {
        if (type == null || type === 'undefined') {
            return;
        }
        if (connect == null || connect === 'undefined') {
            return;
        }
        let protocol;
        if (type === 1) {
          protocol = connect.http;
        } else if (type === 2) {
          protocol = connect.https;
        } else if (type === 3) {
          protocol = connect.ftp;
        } else if (type === 4) {
          protocol = connect.sftp;
        }
        let model = {
          projectId: this.detailForm.id,
          type: type,
          connectParamsList: []
        };
        for (let k of Object.keys(protocol)) {
          model.connectParamsList.push(new ConnectParam(k, protocol[k], ''));
        };
        return model;
      },
      loadInputMap(dataNodeList) {
        if (dataNodeList == null || dataNodeList === 'undefined') {
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
            this.inPutDataTree.dataNodeList = [{
                id: 1,
                name: 'root',
                children: this.inPutDataTree.dataNodeList
            }];
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
        if (dataNodeList == null || dataNodeList === 'undefined') {
          return;
        }
        dataNodeList.forEach((item) => {
          this.mapping.inputNodeMap.set(item.id, item);
          this.loadOutputMap(item.children);
        });
      },
      loadInputIndexMap(dataNodeList) {
        if (dataNodeList == null || dataNodeList === 'undefined') {
          return;
        }
        dataNodeList.forEach((item) => {
          this.mapping.inputIndexMap.set(item.indexKey, item.id);
          this.loadInputIndexMap(item.children);
        });
      },
      loadScriptEngine(scriptEngine) {
        this.postScriptEngine.content = scriptEngine.content;
        this.postScriptEngine.type = scriptEngine.type;
      },
      loadOutputTree(id) {
        let model = {
          projectId: id
        };
        this.load(JSON.stringify(model), API_DATA_TREE_OUTPUT.detail, 'post').then((res) => {
          if (res.errCode === 0) {
            this.loadScriptEngine(res.data.scriptEngine);
            this.outPutDataTree = res.data;
            this.outPutDataTree.dataNodeList = [{
              id: 1,
              name: 'root',
              children: this.outPutDataTree.dataNodeList
            }];
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
            mappingTable.id = res.data.id;
            this.load(JSON.stringify(model), API_DATA_TREE_OUTPUT.detail, 'post', true).then((res) => {
              let code = res.errCode;
              if (code === 0) {
                mappingTable.tableTreeValue.splice(0, this.table.data.length);
                mappingTable.tableTreeValue = this.buildNode(res.data.dataNodeList);
              }
            });
            this.load(JSON.stringify(model), API_DATA_TREE_INPUT.detail, 'post', true).then((res) => {
              let code = res.errCode;
            if (code === 0) {
              mappingTableIn.tableTreeValue.splice(0, this.table.data.length);
              mappingTableIn.tableTreeValue = this.buildNode(res.data.dataNodeList);
            }
          });
          } else {
          }
        });
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
      loadGlobalScript() {
        let model = {
        };
        this.load(JSON.stringify(model), API_SCRIPT_ENGINE.globalList, 'post', true).then((res) => {
          let code = res.errCode;
          if (code === 0) {
            this.globalScripTable.data.splice(0, this.table.data.length);
            res.data.data.forEach(item => {
              this.globalScripTable.data.push(item);
            });
            this.globalScripTable.total = res.data.totalCount;
          }
        });
      },
      loadProjectScript(id) {
        let model = {
            projectId: id
        };
        this.load(JSON.stringify(model), API_SCRIPT_ENGINE.projectList, 'post', true).then((res) => {
          let code = res.errCode;
          if (code === 0) {
            projectScriptTable.data.splice(0, this.table.data.length);
            res.data.data.forEach(item => {
              projectScriptTable.data.push(item);
            });
            projectScriptTable.total = res.data.totalCount;
          }
        });
      },
      importRule() {
        ruleImportTable.dialogShow = true;
      },
      importDataNodeIn() {
        let jsonObject;
        if (this.inPutDataTree.dataFormat.type === 1) {
          try {
            jsonObject = JSON.parse(this.importInputDataTreeDialog.importData);
            this.$message({type: 'success', message: '解析成功', showClose: true});
          } catch (error) {
            this.$message({type: 'error', message: '解析错误', showClose: true});
          }
        } else if (this.inPutDataTree.dataFormat.type === 2) {
          try {
            let parser = new xml2js.Parser();
            parser.parseString(this.importInputDataTreeDialog.importData, function (err, result) {
              jsonObject = result;
              if (err === null) {
              } else {
                this.$message({type: 'error', message: '解析错误', showClose: true});
              }
            });
          } catch (error) {
            this.$message({type: 'error', message: '解析错误', showClose: true});
          }
        } else {
          this.$message({type: 'error', message: '暂不支持该格式', showClose: true});
        }
        this.inPutDataTree.dataNodeList = [{
          id: 1,
          name: 'root',
          children: this.buildDataNode(jsonObject)
        }];
      },
      importDataNodeOut() {
        let jsonObject;
        if (this.outPutDataTree.dataFormat.type === 1) {
          try {
            jsonObject = JSON.parse(this.importOutputDataTreeDialog.importData);
            this.$message({type: 'success', message: '解析成功', showClose: true});
          } catch (error) {
            this.$message({type: 'error', message: '解析错误', showClose: true});
          }
        } else if (this.outPutDataTree.dataFormat.type === 2) {
          try {
            let parser = new xml2js.Parser();
            parser.parseString(this.importOutputDataTreeDialog.importData, function (err, result) {
              jsonObject = result;
              if (err === null) {
              } else {
                this.$message({type: 'error', message: '解析错误', showClose: true});
              }
            });
          } catch (error) {
            this.$message({type: 'error', message: '解析错误', showClose: true});
          }
        } else {
          this.$message({type: 'error', message: '暂不支持该格式', showClose: true});
        }
        this.outPutDataTree.dataNodeList = [{
          id: 1,
          name: 'root',
          children: this.buildDataNode(jsonObject)
        }];
      },
      importGlobalScript() {
        let chooseItem;
        this.globalScripTable.data.forEach(item => {
          if (item.checked) {
            chooseItem = item;
          }
        });
        if (chooseItem === '') {
          this.$message({type: 'error', message: '请选择一条数据', showClose: true});
          return;
        };
        let filter = Object.create(null);
        filter.id = chooseItem.id;
        filter.paramsCount = chooseItem.paramsCount;
        filter.name = chooseItem.name;
        if (chooseItem.paramsCount != null) {
          filter.args = [];
          filter.args.length = chooseItem.paramsCount;
        } else {
          filter.args = [];
        }
        this.chooseNode.output.dataFilter.push(filter);
      },
      /***
       * object对象转换成dataNode
       * @param object
       * @returns {Array}
       */
      buildDataNode(object) {
        let nodeArr = [];
        if (Object.prototype.toString.call(object) === '[object Array]') {
          for (let k of Object.keys(object)) {
            object = object[k];
            break;
          }
        }
        for (let k of Object.keys(object)) {
          this.inputDataNodeId ++;
          let node = new DataNode();
          node.id = this.inputDataNodeId;
          node.name = k;
          if (typeof (object[k]) === 'object') {
            if (Object.prototype.toString.call(object[k]) === '[object Array]') {
              for (let j of Object.keys(object[k])) {
                if (typeof (object[k][j]) === 'object') {
                  node.children = this.buildDataNode(object[k][j]);
                }
                break;
              }
              node.dataType = 9;
            } else {
              node.children = this.buildDataNode(object[k]);
              node.dataType = 4;
            }
          } else if (typeof (object[k]) === 'string') {
              node.dataType = 2;
          } else if (typeof (object[k]) === 'number') {
              node.dataType = 1;
          }
          nodeArr.push(node);
        }
        return nodeArr;
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
        /**
         *  if (data.dataFilter != null && data.dataFilter.length > 0) {
          this.chooseNode.output.dataFilter.forEach(dataFilter => {
            this.globalScripTable.data.forEach(item => {
              if (dataFilter.id === item.id) {
                console.log(dataFilter);
                console.log(item);
                dataFilter.name = item.name;
              }
            });
          });
        }
         */
      },
      testing() {
        let model = {
          projectId: this.detailForm.id,
          data: this.testingData.inputData
        };
        this.load(JSON.stringify(model), API_PROJECT.testing, 'post', true).then((res) => {
          let code = res.errCode;
          if (code === 0) {
            this.testingData.outputData = res.data;
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      showDataTreeInputImport() {
        this.importInputDataTreeDialog.dialogVisible = true;
      },
      showDataTreeOutputImport() {
        this.importOutputDataTreeDialog.dialogVisible = true;
      },
      showGlobalScript() {
        this.globalScripTable.dialogVisible = true;
      },
      showProjectScript() {
        this.projectScriptTable.dialogVisible = true;
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
  function DataNode(id, name, children) {
    this.id = id;
    this.name = name;
    this.children = children;
  }
  function ConnectParam(name, value, desc) {
      this.name = name;
      if (typeof (value) === 'object') {
        let obj = Object.create(null);
        for (let k of Object.keys(value)) {
          obj[value[k].key] = value[k].value;
        }
        this.value = obj;
      } else {
        this.value = value;
      }
      this.desc = desc;
  }
</script>
