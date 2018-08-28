import {buttonName} from '../common/constant';

export let tab = {
  position: 'list',
  list: [{
    title: '列表',
    name: 'list'
  }, {
    title: '明细',
    name: 'detail'
  }, {
    title: '联系人',
    name: 'linkMan'
  }]
};
export let containtHeight = {
  top: 0,
  bottom: 50,
  detailHeight: 0
};
export let editHeight = {
  top: 0,
  bottom: 0,
  detailHeight: 0
};
export let button = {
  search: {
    name: buttonName.search,
    disabled: false,
    method: 'search'
  },
  add: {
    name: buttonName.add,
    disabled: false,
    method: 'add'
  },
  enabled: {
    name: '启用',
    disabled: false,
    method: 'enabled'
  },
  disabled: {
    name: '禁用',
    disabled: false,
    method: 'disabled'
  },
  del: {
    name: buttonName.del,
    disabled: false,
    method: 'del'
  }
};
export let query = {
  code: {
    value: null,
    title: '仓库编码'
  },
  name: {
    value: null,
    title: '仓库名称'
  },
  status: {
    value: null,
    title: '仓库状态',
    options: [],
    disabled: false
  },
  type: {
    value: null,
    title: '仓库类型',
    options: [],
    disabled: false
  },
  negativeStockFlag: {
    value: null,
    title: '负库存出库',
    options: [],
    disabled: false
  },
  availableStockFlag: {
    value: null,
    title: '可用库存检测',
    options: [],
    disabled: false
  }
};
export let dict = {
  type: [],
  linkmanType: [],
  availableStockFlag: [{
    value: 1,
    text: '启用'
  }, {
    value: 0,
    text: '禁用'
  }],
  negativeStockFlag: [{
    value: 1,
    text: '启用'
  }, {
    value: 0,
    text: '禁用'
  }],
  status: [{
    text: '启用',
    value: 1
  }, {
    text: '禁用',
    value: 0
  }],
  isDefault: [{
    text: '是',
    value: 1
  }, {
    text: '否',
    value: 0
  }],
  area: []
};
export let table = {
  page: 1,
  pageSize: 20,
  total: 0,
  colHeaders: ['', '仓库编码', '仓库名称', '仓库类型', '仓库状态', '负库存出库', '可用库存检测', '地址', '仓库管理员', '仓库电话', '仓库面积', '仓库对接类型', '仓库对接参数', '其他对接参数', '备注'],
  colWidths: 120,
  data: [],
  columns: [{
    data: 'checked',
    type: 'checkbox',
    width: '50'
  }, {
    data: 'code',
    type: 'text',
    width: '142',
    readOnly: true
  }, {
    data: 'name',
    type: 'text',
    width: '150',
    readOnly: true
  }, {
    data: 'type',
    type: 'text',
    width: '250',
    readOnly: true
  }, {
    data: 'status',
    type: 'text',
    width: '150',
    readOnly: true
  }, {
    data: 'negativeStockFlag',
    type: 'text',
    width: '100',
    readOnly: true
  }, {
    data: 'availableStockFlag',
    type: 'text',
    width: '100',
    readOnly: true
  }, {
    data: 'address',
    type: 'text',
    width: '200',
    readOnly: true
  }, {
    data: 'keeper',
    type: 'text',
    width: '100',
    readOnly: true
  }, {
    data: 'phone',
    type: 'text',
    width: '100',
    readOnly: true
  }, {
    data: 'area',
    type: 'text',
    width: '150',
    readOnly: true
  }, {
    data: 'interfaceType',
    type: 'text',
    width: '100',
    readOnly: true
  }, {
    data: 'interfaceParam',
    type: 'text',
    width: '150',
    readOnly: true
  }, {
    data: 'otherParam',
    type: 'text',
    width: '150',
    readOnly: true
  }, {
    data: 'remark',
    type: 'text',
    width: '150',
    readOnly: true
  }]
};
export let linkManTable = {
  page: 0,
  pageSize: 100,
  total: 0,
  colHeaders: ['', '是否默认', '联系人类型', '联系人', '联系方式', '职位抬头', '地址'],
  colWidths: 120,
  data: [],
  columns: [{
    data: 'checked',
    type: 'checkbox',
    width: '50'
  }, {
    data: 'isDefault',
    type: 'text',
    width: '80',
    readOnly: true
  }, {
    data: 'type',
    type: 'text',
    width: '120',
    readOnly: true
  }, {
    data: 'name',
    type: 'text',
    width: '142',
    readOnly: true
  }, {
    data: 'phone',
    type: 'text',
    width: '150',
    readOnly: true
  }, {
    data: 'post',
    type: 'text',
    width: '250',
    readOnly: true
  }, {
    data: 'address',
    type: 'text',
    width: '200',
    readOnly: true
  }]
};
export let form = {
  name: '',
  describe: '',
  needSynBack: '',
  callBack: {address: '', postParams: ''},
  obtainDataType: '',
  type1: '',
  type: {serverUrl: '',
  serverPort: '',
  userName: '',
  userPassword: '',
  filePath: '',
  fileName: ''},
  connectProtocolIn: {type: '', connectParamsList: []},
  connectProtocolOut: null,
  status: '',
  startDatetime: '',
  endDatetime: ''
};
export let linkManform = {
  id: null,
  name: null,
  phone: null,
  post: null,
  area: null,
  address: null,
  storeId: null,
  areaStr: [],
  isDefault: false,
  type: null
};
