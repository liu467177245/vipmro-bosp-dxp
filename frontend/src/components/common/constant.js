/**
 * 默认显示数
 *
 * @type {number}
 */
export const pageSize = 20;

/**
 *  显示数数组
 *
 * @type {number[]}
 */
export const pageSizeArray = [20, 50, 100, 1000];

/**
 * 按钮名称
 *
 * @type {{search: string, add: string, del: string, edit: string, enabled: string, disabled: string, import: string,
 * export: string, show: string, hide: string, category: string}}
 */
export const buttonName = {
  search: '刷新',
  add: '新增',
  del: '删除',
  edit: '编辑',
  enabled: '启用',
  disabled: '禁用',
  import: '导入',
  export: '导出',
  show: '显示',
  hide: '隐藏',
  category: '分类维护',
  taxNoImport: '税务分类修改'
};

/**
 * del 删除
 * disabled 未启用
 * enabled 启用
 * expire 过期
 * forbidPurchase 禁采
 * @type {{del: number, disabled: number, enabled: number, expire: number, forbidPurchase: number}}
 */
export const STATUS = {
  del: -1,
  disabled: 0,
  enabled: 1,
  expire: 126,
  forbidPurchase: 125
};
/**
 * 是否
 *
 * @type {{yes: number, no: number}}
 */
export const IS_CHOICE = {
  yes: 1,
  no: 0
};
/**
 * 验证类型
 *
 * @type {{number: string}}
 */
export const VALIDATOR = {
  number: 'VALIDATOR_NUMBER'
};
/**
 * 最大值配置
 *
 * @type {{intNum: number, decimal_16_6: number}}
 */
export const MAX_VALUE = {
  intNum: 2147483647,
  decimal_16_6: 10000000000,
  decimal_16_3: 10000000000000
};
/**
 * 最小值配置
 *
 * @type {{intNum: number, decimal_16_6: number}}
 */
export const MIN_VALUE = {
  intNum: -2147483648,
  decimal_16_6: -10000000000,
  decimal_16_3: -10000000000000
};

/**
 * 上传类型限制
 *
 * @type {{video: string[], pic: string[], excel: string[], excel07: string[]}}
 */
export const UPLOAD_TYPE = {
  video: ['avi', 'wmv', 'rmvb', 'mpeg', 'mpe', 'asf', 'mp4'],
  pic: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
  excel: ['xls', 'xlsx'],
  excel07: ['xlsx']
};

/**
 * 确认弹出框的内容样式配置
 *
 * @type {{width: string, height: string, align: string}}
 */
export const DIALOG_CONTENT = {
  width: '400px',
  height: '50px',
  align: 'center'
};

/**
 * 统一提示语
 */
export const CONFIRM_MESSAGE = {
  enabled: '确定启用所选数据？',
  disabled: '确定禁用所选数据？',
  del: '确定删除所选数据？',
  remove: '确定移除所选数据？'
};

/**
 * 任务调度 key 值配置
 * @type {{addImportGoods: string, updateImportGoods: string, addImportPackage: string, updateImportPackage: string, importPurchase: string, exportGoods: string, importGoodsSync: string, batchHandleGoodsSync: string}}
 */
export const JOB_KEY = {
  addImportGoods: 'addImportGoods',
  updateImportGoods: 'updateImportGoods',
  addImportPackage: 'addImportPackage',
  updateImportPackage: 'updateImportPackage',
  importPurchase: 'importPurchase',
  exportGoods: 'exportGoods',
  importGoodsSync: 'importGoodsSync',
  batchHandleGoodsSync: 'batchHandleGoodsSync',
  addImportTempGoods: 'addImportTempGoods',
  updateImportTempGoods: 'updateImportTempGoods',
  importAttrGoods: 'importAttrGoods'
};
