/**
 * Created by zhouchunming on 2018/8/28.
 */
import {buttonName} from '../common/constant';

export let detail = {
  position: 'detail',
  detailTableList: [{
    title: '项目基本信息',
    name: 'baseInfo'
  }, {
    title: '输入格式',
    name: 'inPutData'
  }, {
    title: '输出格式',
    name: 'outPutData'
  }, {
    title: '映射关系',
    name: 'mapping'
  }, {
    title: '输出协议',
    name: 'outPutConnect'
  }, {
    title: '规则',
    name: 'rule'
  }, {
    title: '脚本',
    name: 'script'
  }, {
    title: '测试',
    name: 'testing'
  }],
  detailForm: {
    id: null,
    name: null,
    describe: null,
    obtainDataType: null,
    needSynBack: null,
    dataMapperId: null,
    status: null,
    taskFrequency: {
      cronExpression: ''
    },
    inputProtocol: {
      id: null,
      type: null,
      name: null,
      connectParamsList: []
    },
    outputProtocol: {
      id: null,
      type: null,
      name: null,
      connectParamsList: []
    },
    callBack: {
      id: null,
      projectId: null,
      address: '',
      postParams: []
    }
  },
  inPutDataTree: {
    id: null,
    projectId: null,
    dataFormat: {
      type: null
    },
    dataNodeList: []
  },
  outPutDataTree: {
    id: null,
    projectId: null,
    dataFormat: {
      type: null
    },
    dataNodeList: [],
    scriptEngine: {
      type: null,
      content: ''
    }
  },
  dataRuleList: []
};
export let radios = {
  obtainDataType: {
    radioValue: 1,
    radioOptions: [{
      name: '主动拉',
      value: 1
    }, {
      name: '被动推',
      value: 2
    }]
  },
  needSynBack: {
    radioValue: null,
    radioOptions: [{
      name: '同步',
      value: 1
    }, {
      name: '异步',
      value: 2
    }]
  }
};
export let select = {
  connectIn: {
    selectValue: null,
    selectOptions: [{
      value: 1,
      text: 'http'
    }, {
      value: 2,
      text: 'https'
    }, {
      value: 3,
      text: 'ftp'
    }, {
      value: 4,
      text: 'sftp'
    }]
  },
  connectOut: {
    selectValue: 0,
    selectOptions: [{
      value: 1,
      text: 'http'
    }, {
      value: 2,
      text: 'https'
    }, {
      value: 3,
      text: 'ftp'
    }, {
      value: 4,
      text: 'sftp'
    }]
  },
  scriptType: {
    selectValue: 1,
    selectOptions: [{
      value: 1,
      text: 'groovy'
    }]
  },
  dataType: {
    selectValue: 1,
    selectOptions: [{
      value: 1,
      text: 'json'
    }, {
      value: 2,
      text: 'xml'
    }, {
      value: 3,
      text: 'csv'
    }, {
      value: 4,
      text: 'excel'
    }]
  },
  rangeType: {
    selectValue: 0,
    selectOptions: [{
      value: 0,
      text: '='
    }, {
      value: 1,
      text: '>='
    }, {
      value: 2,
      text: '>'
    }, {
      value: 3,
      text: '<='
    }, {
      value: 4,
      text: '<'
    }, {
      value: 5,
      text: '<>'
    }]
  },
  nodeType: {
    selectValue: 1,
    selectOptions: [{
      value: 1,
      text: 'BigDecimal'
    }, {
      value: 2,
      text: 'String'
    }, {
      value: 3,
      text: 'Long'
    }, {
      value: 4,
      text: 'Object'
    }, {
      value: 6,
      text: 'BigDecimal[]'
    }, {
      value: 7,
      text: 'Long[]'
    }, {
      value: 8,
      text: 'String[]'
    }, {
      value: 9,
      text: 'Object[]'
    }]
  },
  filterType: {
    selectValue: 1,
    selectOptions: [{
      value: null,
      text: ''
    }, {
      value: 1,
      text: '隐藏手机号码'
    }, {
      value: 2,
      text: '隐藏身份证'
    }]
  },
  scriptEngineType: {
    selectValue: 1,
    selectOptions: [{
      value: 1,
      text: 'groovy'
    }]
  }
};
export let connectProtocolIn = {
  http: {
    url: '',
    heads: [],
    params: []
  },
  https: {
    url: '',
    heads: [],
    params: []
  },
  ftp: {
    host: null,
    port: null,
    filePath: '',
    fileName: '',
    account: '',
    password: ''
  },
  sftp: {
    host: null,
    port: null,
    filePath: '',
    fileName: '',
    account: '',
    password: ''
  }
};
export let connectProtocolOut = {
  http: {
    url: '',
    heads: [],
    params: []
  },
  https: {
    url: '',
    heads: [],
    params: []
  },
  ftp: {
    host: null,
    port: null,
    filePath: '',
    fileName: '',
    account: '',
    password: ''
  },
  sftp: {
    host: null,
    port: null,
    filePath: '',
    fileName: '',
    account: '',
    password: ''
  }
};
export let inputTree = {
  /* 节点参数 */
  props: {
    children: 'children',
    label: 'name'
  },
  /* 不允许拖拽的节点 */
  forbitDrag: [],
  /* 拖拽不允许放置的节点 */
  forbitDrop: [],
  /* 默认展开的节点 */
  defaultExpandedKeys: []
};
export let outputTree = {
  /* 节点参数 */
  props: {
    children: 'children',
    label: 'name'
  },
  /* 不允许拖拽的节点 */
  forbitDrag: [],
  /* 拖拽不允许放置的节点 */
  forbitDrop: [],
  /* 默认展开的节点 */
  defaultExpandedKeys: []
};
export let ruleTable = {
  position: 'list',
  list: [{
    title: '列表',
    name: 'list'
  }, {
    title: '明细',
    name: 'detail'
  }],
  colHeaders: ['', 'id', '规则名称', '更新人', '更新时间', '创建人', '创建时间'],
  columns: [{
    data: 'checked',
    cellType: 'checkbox',
    width: '50'
  }, {
    data: 'id',
    cellType: 'number',
    width: '200'
  }, {
    data: 'name',
    cellType: 'text',
    width: '200'
  }, {
    data: 'updateUser',
    width: '200',
    /* 下拉 */
    cellType: 'text'
  }, {
    data: 'updateDatetime',
    cellType: 'text',
    width: '200'
  }, {
    data: 'createUser',
    cellType: 'text',
    width: '200'
  }, {
    data: 'createDatetime',
    cellType: 'text',
    width: '200'
  }],
  data: []
};
export let ruleButton = {
  search: {
    name: buttonName.search,
    disabled: false,
    method: 'loadDataRule'
  },
  add: {
    name: buttonName.add,
    disabled: false,
    method: 'addRule'
  },
  import: {
    name: buttonName.import,
    disabled: false,
    method: 'importRule'
  },
  del: {
    name: buttonName.del,
    disabled: false,
    method: 'delRule'
  }
};
export let ruleDetailForm = {
  id: null,
  projectId: null,
  name: '',
  conditionFiledList: [],
  targetFiledList: []
};
export let ruleEditHeight = {
  top: 0,
  bottom: 0,
  detailHeight: 0
};
export let ruleImportTable = {
  domain: 'vipmro.net',
  dialogShow: false,
  colHeaders: ['', 'id', '规则名称', '更新人', '更新时间', '创建人', '创建时间'],
  columns: [{
    data: 'checked',
    cellType: 'checkbox',
    width: '50'
  }, {
    data: 'id',
    cellType: 'number',
    width: '200'
  }, {
    data: 'name',
    cellType: 'text',
    width: '200'
  }, {
    data: 'updateUser',
    width: '200',
    /* 下拉 */
    cellType: 'text'
  }, {
    data: 'updateDatetime',
    cellType: 'text',
    width: '200'
  }, {
    data: 'createUser',
    cellType: 'text',
    width: '200'
  }, {
    data: 'createDatetime',
    cellType: 'text',
    width: '200'
  }],
  data: [],
  total: null,
  currentPage: 1,
  pageSize: 20,
  dataDicts: [],
  type: 1,
  width: '1000px'
};
export let mappingTable = {
  id: null,
  chooseId: null,
  tableTreeHeader: [{
    name: '输出格式',
    width: '375',
    nameKey: 'name',
    isTree: true
  }, {
    name: '映射',
    width: '300',
    nameKey: 'inputNode'
  }],
  tableTreeValue: []
};
export let selectInputTable = {
  selectTreeValue: [],
  props: {
    children: 'children',
    label: 'name',
    value: 'id'
  },
  selectTreeoptions: []
};
export let scriptText = {
  content: '',
  type: null
};
