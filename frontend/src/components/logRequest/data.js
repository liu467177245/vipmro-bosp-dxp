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
  colHeaders: ['id', '创建时间', '耗时', '内容', '操作'],
  columns: [{
    data: 'id',
    cellType: 'number',
    width: '200'
  }, {
    data: 'requestDatetime',
    cellType: 'text',
    width: '200'
  }, {
    data: 'costMinute',
    width: '100',
    /* 下拉 */
    cellType: 'text'
  }, {
    data: 'highlightContent',
    cellType: 'html',
    width: '1120'
  }, {
    data: 'operate',
    cellType: 'html',
    width: '100'
  }],
  data: []
};
export let button = {
  search: {
    name: buttonName.search,
    disabled: false,
    method: 'search'
  }
};
export let editHeight = {
  top: 0,
  bottom: 0,
  detailHeight: 0
};
