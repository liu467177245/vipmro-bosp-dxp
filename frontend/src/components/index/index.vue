<template>
  <div class="webui-tab">
    <vipmro-tab v-model="tabPosition" :list="tabList">



      <template slot="projectInfo">

        <vipmro-layout-right>
          <div class="webui-button">
            <vipmro-button
              :title="saveInfoBtn"
              :top="top"
              :right="right"  @click="saveProjectInfo"
            ></vipmro-button>
          </div>
        </vipmro-layout-right>


        <vipmro-layout-main>

            <div class="webui-input">
              <vipmro-input
                v-model="form.name"
                :width="500"
                :title="'项目名称'"
                :titleWidth="'100'"
                :titleAlign="titleAlign"
                :titleLeft="titleLeft"
                :required="true">
              </vipmro-input>
            </div>


            <div class="webui-textarea">
              <vipmro-textarea
                :width="sizeWidth"
                :rows="rows"
                :top="10"
                :title="'描述'"
                v-model="form.describe"
              ></vipmro-textarea>
            </div>


            <div class="webui-radio">
              <vipmro-radio
                v-model="form.needSynBack"
                :top="10"
                :options="radioOptions"
                :title="'立即获得结果'"
                @change="radioChange"
              ></vipmro-radio>
            </div>


            <vipmro-layout-main>
                <div class="webui-checkbox">
                  <vipmro-checkbox
                    :top="10"
                    :options="checkboxOptions"
                    v-model="form.callBack.postParams"
                    @change="showToggle"
                  ></vipmro-checkbox>

                  <vipmro-input
                    v-show="callBackIsShow"
                    :disable="callBackIsShow"
                    :width="300"
                    :top="10"
                    :title="'回调地址'"
                    :titleAlign="titleAlign"
                    :titleLeft="titleLeft"
                    :required="true"
                    v-model="form.callBack.address"
                  ></vipmro-input>
                </div>

            </vipmro-layout-main>



            <vipmro-layout-main>
              <div class="webui-checkbox">
                <vipmro-checkbox
                  :top="10"
                  :options="checkboxOptions1"
                  v-model="form.obtainDataType"
                  @change="showProtocol"
                ></vipmro-checkbox>


                  <vipmro-select
                    v-show="protocalIsShow"
                    :disable="protocalIsShow"
                    :top="10"
                    :title="'请选择协议'"
                    :options="selectProtocol"
                    v-model="form.connectProtocolIn.type"
                    :width="300"
                    @change="selectProtocol"
                  ></vipmro-select>

              </div>


            <vipmro-layout-main
              v-show="protocalIsShow"
              :disable="protocalIsShow"
            >
              <div class="webui-input">
                <vipmro-input v-model="form.connectProtocolIn.type.serverUrl" :width="300" :title="'服务器地址'" :titleWidth="'100'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
              </div>
              <div class="webui-input">
                <vipmro-input v-model="form.connectProtocolIn.type.serverPort" :width="300" :title="'端口'" :titleWidth="'100'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
              </div>
              <div class="webui-input">
                <vipmro-input v-model="form.connectProtocolIn.type.userName" :width="300" :title="'帐号'" :titleWidth="'100'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
              </div>
              <div class="webui-input">
                <vipmro-input v-model="form.connectProtocolIn.type.userPassword" :width="300" :title="'密码'" :titleWidth="'100'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
              </div>
              <div class="webui-input">
                <vipmro-input v-model="form.connectProtocolIn.type.filePath" :width="300" :title="'路径'" :titleWidth="'100'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
              </div>
              <div class="webui-input">
                <vipmro-input v-model="form.connectProtocolIn.type.fileName" :width="300" :title="'文件名称'" :titleWidth="'100'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
              </div>
            </vipmro-layout-main>




            </vipmro-layout-main>


        </vipmro-layout-main>
      </template>



      <template slot="inFormat">
        <vipmro-layout-right>
          <div class="webui-button">
            <vipmro-button
              :title="saveInfoBtn"
              :top="top"
              :right="right"
            ></vipmro-button>
          </div>
        </vipmro-layout-right>



        <vipmro-layout-main>

            <vipmro-select
              :top="10"
              :title="'请选择格式'"
              :options="selectFormat"
              v-model="formatValue"
              :width="300"
            ></vipmro-select>

        </vipmro-layout-main>

        <div class="webui-cascader-transfer">
          <vipmro-cascader-transfer
            v-model="rightFilterValue"
            :cascaderValue="cascaderValue"
            :cascaderOptions="cascaderOptions"
            :title="title"
          ></vipmro-cascader-transfer>
        </div>
      </template>



      <template slot="outFormat">
        <vipmro-layout-right>
          <div class="webui-button">
            <vipmro-button
              :title="saveInfoBtn"
              :top="top"
              :right="right"
            ></vipmro-button>
          </div>
        </vipmro-layout-right>



        <vipmro-layout-main>

          <vipmro-select
            :top="10"
            :title="'请选择格式'"
            :options="selectFormat"
            :titleWidth="'100'"
            v-model="formatValue"
            :width="300"
          ></vipmro-select>

        </vipmro-layout-main>
        <vipmro-layout-main>

          <vipmro-select
            :top="10"
            :title="'过滤类型'"
            :options="selectFilter"
            :titleWidth="'100'"
            v-model="filterValue"
            :width="300"
          ></vipmro-select>

        </vipmro-layout-main>

        <div class="webui-cascader-transfer">
          <vipmro-cascader-transfer
            v-model="rightFilterValue"
            :cascaderValue="cascaderValue"
            :cascaderOptions="cascaderOptions"
            :title="title"
          ></vipmro-cascader-transfer>
        </div>
      </template>


      <template slot="matchRelation">

        <vipmro-layout-main>
          <vipmro-layout-left>
            <vipmro-button
              :title="saveInfoBtn"
              @click="saveMatchInfo"
            ></vipmro-button>

            <div class="webui-tree">

              <vipmro-tree
                v-model="protocolInCheckedKey"
                :showCheckbox="showCheckbox"
                :data="protocalInData"
                :expandAll="true"
                :height="400"
                @clickText="protocalInTreeClick"
              ></vipmro-tree>
            </div>
          </vipmro-layout-left>

          <vipmro-layout-right>
            <div class="webui-tree">
              <vipmro-tree
                v-model="selectTreeCheckedKey"
                :expandOnClickNode="expandOnClickNode"
                :data="selectTreeData"
                :expandAll="true"
                :height="400"
              ></vipmro-tree>
            </div>
          </vipmro-layout-right>

        </vipmro-layout-main>


      </template>



      <template slot="outProtocol">
        <vipmro-layout-right>
          <div class="webui-button">
            <vipmro-button
              :title="saveInfoBtn"
              :top="top"
              :right="right"
            ></vipmro-button>
          </div>
        </vipmro-layout-right>

        <vipmro-layout-main>
          <vipmro-select
            :top="10"
            :title="'请选择协议'"
            :options="selectProtocol"
            v-model="protocolValue"
            :width="300"
            :titleWidth="'100'"
          ></vipmro-select>



          <vipmro-layout-main>
            <div class="webui-input">
              <vipmro-input :width="300" :title="'服务器地址'" :titleWidth="'100'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
            </div>
            <div class="webui-input">
              <vipmro-input :width="300" :title="'端口'" :titleWidth="'100'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
            </div>
            <div class="webui-input">
              <vipmro-input :width="300" :title="'帐号'" :titleWidth="'100'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
            </div>
            <div class="webui-input">
              <vipmro-input :width="300" :title="'密码'" :titleWidth="'100'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
            </div>
            <div class="webui-input">
              <vipmro-input :width="300" :title="'路径'" :titleWidth="'100'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
            </div>
            <div class="webui-input">
              <vipmro-input :width="300" :title="'文件名称'" :titleWidth="'100'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
            </div>

            <div class="vipmro-add-html">
              <vipmro-add-html
                v-model="packageArray"
              >
                <template slot-scope="props">
                  <vipmro-cols :cols="12">
                    <vipmro-input v-model="props.item.name" width="220" title="姓名1"></vipmro-input>
                  </vipmro-cols>
                </template>
              </vipmro-add-html>
            </div>

          </vipmro-layout-main>
        </vipmro-layout-main>
      </template>




      <template slot="rules">
        <vipmro-layout-right>
          <div class="webui-button">
            <vipmro-button
              :title="saveInfoBtn"
              :top="top"
              :right="right"
            ></vipmro-button>
          </div>
        </vipmro-layout-right>


        <vipmro-layout-main>
        <div class="webui-input">
          <vipmro-input :width="300" :top="10" :title="'规则'" :titleAlign="titleAlign" :titleLeft="titleLeft" :required="true"></vipmro-input>
          <vipmro-button
            :title="'删除'"
            :top="top"
            :right="right"
          ></vipmro-button>
        </div>
        <div class="webui-input">
          <vipmro-input :width="300" :top="10" :left="'100'"></vipmro-input>
          <vipmro-button
            :title="'删除'"
            :top="top"
            :right="right"
          ></vipmro-button>

        </div>

        </vipmro-layout-main>




      </template>


      <template slot="diyScript">
        <vipmro-button>

        </vipmro-button>
      </template>

    </vipmro-tab>
  </div>
</template>

<script type="text/javascript">
  import {form} from './data';
  export default {
    data() {
      return {
        saveInfoBtn: '保存',
        callBackIsShow: true,
        protocalIsShow: true,
        projectInfo: '项目名称',
        sizeWidth: '500',
        rows: 5,
        value: '',
        radioValue: 1,
        radioOptions: [{
          name: '是',
          value: true
        }, {
          name: '否',
          value: false
        }],
        checkboxAllValue: [1],
        checkboxOptions: [{
          value: 1,
          text: '需要回调'
        }],
        checkboxAllValue1: [2],
        checkboxOptions1: [{
          value: 2,
          text: '主动获取数据'
        }],
        protocolValue: 1,
        selectProtocol: [{
          value: 1,
          text: 'HTTP'
        }, {
          value: 2,
          text: 'HTTPS'
        }, {
          value: 3,
          text: 'FTP'
        }, {
          value: 4,
          text: 'SFTP'
        }],
        filterValue: 1,
        selectFilter: [{
          value: 1,
          text: '隐藏电话号码'
        }, {
          value: 2,
          text: '隐藏身份证'
        }],
        title: '级联穿梭框',
        form: JSON.parse(JSON.stringify(form)),
        rightFilterValue: [],
        cascaderValue: ['12231', '12567', '125671'],
        cascaderOptions: [{
          name: '江苏',
          id: '12231',
          children: [{
            name: '南京',
            id: '12567',
            children: [{
              name: '南京1',
              id: '125671'
            }]
          }, {
            name: '苏州',
            id: '125678'
          }]
        }, {
          name: '浙江',
          id: '122312'
        }, {
          name: '内蒙古自治区',
          id: '789',
          children: [{
            name: '呼伦贝尔市',
            id: '7891',
            children: [{
              name: '莫力达瓦达斡尔族自治旗',
              id: '78911'
            }]
          }]
        }],
        formatValue: 1,
        selectFormat: [{
          value: 1,
          text: 'JSON'
        }, {
          value: 2,
          text: 'XML'
        }, {
          value: 3,
          text: 'CSV'
        }, {
          value: 4,
          text: 'EXCEL'
        }],
        pagingPage: 1,
        tabPosition: 'list',
        tabList: [{
          title: '项目信息',
          name: 'projectInfo'
        }, {
          title: '输入格式',
          name: 'inFormat'
        }, {
          title: '输出格式',
          name: 'outFormat'
        }, {
          title: '映射关系',
          name: 'matchRelation'
        }, {
          title: '输出协议',
          name: 'outProtocol'
        }, {
          title: '规则',
          name: 'rules'
        }, {
          title: '自定义脚本',
          name: 'diyScript'
        }],
        colHeaders: ['', '图片', '日期', '下拉', 'url', 'html', '千分位', '对齐方式'],
        columns: [{
          data: 'checked',
          cellType: 'checkbox',
          width: '50'
        }, {
          data: 'image',
          cellType: 'image',
          width: '200'
        }, {
          data: 'date',
          cellType: 'date',
          width: '200'
        }, {
          data: 'select',
          width: '200',
          /* 下拉 */
          cellType: 'select',
          selectOptions: [{
            name: '男',
            value: 0
          }, {
            name: '女',
            value: 1
          }]
        }, {
          data: 'url',
          cellType: 'url',
          width: '200'
        }, {
          data: 'html',
          cellType: 'html',
          width: '200'
        }, {
          data: 'thousandth',
          cellType: 'thousandth',
          width: '200'
        }, {
          data: 'align',
          align: 'right',
          cellType: 'thousandth',
          width: '200'
        }],
        data: [{
          checked: true,
          image: 'http://192.168.1.60:9999/group1/M00/00/D4/wKgBPFthGBiARiBTAEjKG8WADrU268.jpg, https://image.vipmro.net/goodsImg/999999/70111099/10011fu/20170911/002a01!240240.jpg',
          date: '2018-9-12',
          select: 0,
          url: 'http://vipmro.com',
          html: '这是html<a href="">这是html</a>',
          thousandth: 1545125451,
          align: 1545125451
        }, {
          checked: false,
          image: 'http://192.168.1.60:9999/group1/M00/00/D4/wKgBPFthGBiARiBTAEjKG8WADrU268.jpg, https://image.vipmro.net/goodsImg/999999/70111099/10011fu/20170911/002a01!240240.jpg',
          date: '2019-5-8',
          select: 1,
          url: 'http://vipmro.net',
          html: '这是html<a href="">这是html</a>',
          thousandth: 1545125451.89,
          align: 1545125451
        }],
        showCheckbox: false,
        protocalInData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '孙 1-1',
            disabled: true,
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '孙 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '孙级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        expandOnClickNode: true,
        protocolInCheckedKey: [{id: 10}],
        selectTreeCheckedKey: [{id: 10}],
        selectTreeData: [{
          id: 1,
          label: '一级 1',
          disabled: true,
          children: [{
            id: 4,
            label: '孙 1-1',
            disabled: true,
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '孙 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          disabled: true,
          children: [{
            id: 5,
            label: '孙级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          disabled: true,
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }]
      };
    },
    methods: {
      radioChange(val) {
        console.log(val);
      },
      saveProjectInfo() {
        form.connectProtocolIn.connectParamsList.push({name: 'url', value: 'www.baidu.com'});
        var data = JSON.stringify(this.form);
        console.log(data);
        this.load(data, 'http://127.0.0.1:8081/api/v1.0.0/connectProtocol/list', 'post').then((res) => {
          if (res.result === 0) {
            this.search();
            this.form.id = res.body;
            this.tab.position = 'list';
            this.$message({type: 'success', message: '保存成功', showClose: true});
          } else {
            this.$message({type: 'error', message: res.msg, showClose: true});
          }
        });
      },
      showToggle() {
        this.callBackIsShow = !this.callBackIsShow;
      },
      showProtocol() {
        this.protocalIsShow = !this.protocalIsShow;
      },
      selectProtocol() {},
      protocalInTreeClick() {
        // console.log(this.protocolInCheckedKey);
        this.selectTreeData = [{
          id: 1,
          label: '一级 1',
          disabled: true,
          children: [{
            id: 4,
            label: '孙 1-1',
            disabled: true,
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '孙 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          disabled: true,
          children: [{
            id: 5,
            label: '孙级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          disabled: true,
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }];
        this.selectTreeCheckedKey = [{id: 10}];
      },
      saveMatchInfo() {
        console.log(this.selectTreeCheckedKey);
      }
    }
  };
</script>
