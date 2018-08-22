import {buttonName} from '../common/constant';

export let dataDicts = [{
  nameKey: 'rangeType',
  dictItems: [{
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
}];
export let table = {
  position: 'list',
  list: [{
    title: '列表',
    name: 'list'
  }, {
    title: '明细',
    name: 'detail'
  }],
  keyword: null,
  currentPage: 1,
  pageSize: 20,
  total: null,
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
  del: {
    name: buttonName.del,
    disabled: false,
    method: 'del'
  }
};
export let detailForm = {
  id: null,
  name: '',
  conditionFiledList: [],
  targetFiledList: []
};
export let editHeight = {
  top: 0,
  bottom: 0,
  detailHeight: 0
};
