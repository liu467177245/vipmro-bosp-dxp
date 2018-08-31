import {buttonName} from '../common/constant';

export let table = {
  position: 'list',
  list: [{
    title: '列表',
    name: 'list'
  }, {
    title: '详情',
    name: 'detail'
  }],
  keyword: null,
  currentPage: 1,
  pageSize: 20,
  total: null,
  colHeaders: ['', 'id', '项目名称', '数据获取方式', '状态', '同步/异步', '更新人', '更新时间', '创建人', '创建时间'],
  columns: [{
    data: 'checked',
    cellType: 'checkbox',
    width: '50'
  }, {
    data: 'id',
    type: 'text',
    width: '200'
  }, {
    data: 'name',
    width: '300'
  }, {
    data: 'obtainDataType',
    type: 'text',
    width: '100'
  }, {
    data: 'status',
    type: 'text',
    width: '100'
  }, {
    data: 'needSynBack',
    cellType: 'text',
    width: '100'
  }, {
    data: 'updateUser',
    width: '150'
  }, {
    data: 'updateDatetime',
    width: '200'
  }, {
    data: 'createUser',
    width: '150'
  }, {
    data: 'createDatetime',
    width: '200'
  }],
  data: []
};
export let button = {
  add: {
    name: buttonName.add,
    disabled: false,
    method: 'add'
  },
  search: {
    name: buttonName.search,
    disabled: false,
    method: 'search'
  },
  del: {
    name: buttonName.del,
    disabled: false,
    method: 'del'
  },
  enabled: {
    name: buttonName.start,
    disabled: false,
    method: 'start'
  },
  disabled: {
    name: buttonName.stop,
    disabled: false,
    method: 'stop'
  }
};
export let editHeight = {
  top: 0,
  bottom: 0,
  detailHeight: 0
};
export let dict = {
  status: [{
    value: 1,
    text: '运行中'
  }, {
    value: 4,
    text: '停止'
  }],
  obtainDataType: [{
    value: 1,
    text: '主动'
  }, {
    value: 2,
    text: '被动'
  }],
  needSynBack: [{
    value: true,
    text: '同步'
  }, {
    value: false,
    text: '异步'
  }]
};
