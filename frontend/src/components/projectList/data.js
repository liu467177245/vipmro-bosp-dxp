import {buttonName} from '../common/constant';

export let table = {
  position: 'list',
  list: [{
    title: '列表',
    name: 'list'
  }],
  keyword: null,
  currentPage: 1,
  pageSize: 20,
  total: null,
  colHeaders: ['', 'id', '项目名称', '数据获取方式', '立即返回', '更新人', '更新时间', '创建人', '创建时间'],
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
    data: 'obtainDataType',
    cellType: 'text',
    width: '200'
  }, {
    data: 'needSynBack',
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
export let editHeight = {
  top: 0,
  bottom: 0,
  detailHeight: 0
};
