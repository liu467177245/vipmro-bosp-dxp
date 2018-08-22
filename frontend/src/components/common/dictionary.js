/**
 * 数据字典
 * @author cmf00627
 * @date 2017/12/21
 */
import {load} from '@/common/js/interface';
import {API_DICT} from '@/components/common/apiConstant';
// 主类型(BDM)
export const TYPE_BDM = 1;

// 子类型(店铺类型)
export const BDM_SHOP_TYPE = 1;

// 子类型(仓库类型)
export const BDM_STORE_TYPE = 2;

// 子类型(货主类型)
export const BDM_CONSIGNOR_TYPE = 3;

// 子类型(货主-结算方式)
export const BDM_SETTLEMENT_TYPE = 4;

// 子类型(货主-结算周期)
export const BDM_SETTLEMENT_CYCLE = 5;

// 子类型(仓库-对接类型)
export const BDM_INTERFACE_TYPE = 6;

// 子类型(仓库-公司)
export const BDM_COMPANY = 7;

// 子类型(品牌-类型)
export const BDM_BRAND_TYPE = 8;

// 子类型(品牌授权-授权范围)
export const BDM_BRAND_CERTIFICATE_SCOPE = 9;

// 子类型(快递公司-类型)
export const BDM_DISTRIBUTION_TYPE = 10;

// 子类型(商品-类型)
export const BDM_GOODS_TYPE = 11;

// 子类型(商品-包装类型)
export const BDM_GOODS_PACKAGE_TYPE = 12;

// 子类型(资料范围策略-方案类型)
export const BDM_STRATEGY_TYPE = 16;

// 子类型(资料范围策略-生效条件)
export const BDM_STRATEGY_CONDITION = 17;

// 子类型(单位分组)
export const BDM_UNIT_GROUP = 18;

// 商品同步平台
export const BDM_GOODS_SYNC_PLATFORM = 19;

// 品牌性质
export const BDM_BRAND_IS_TEMPORARY = 21;
// 商品来源:KA
export const BDM_GOODS_SOURCE_TYPE = 23;

/**
 * 子类型(商品-类型) 具体商品类型
 * @type {{normal: number, gift: number, packageMaterial: number, virtualData: number, tempData: number, others: number}}
 */
export const GOODS_TYPE = {
  normal: 1,
  gift: 2,
  packageMaterial: 3,
  virtualData: 4,
  tempData: 5,
  others: 6
};
/**
 * 未定义的分组
 * @type {number}
 */
export const UNIT_GROUP_UNDEFINED = 0;

/**
 * 读取数据字典数据
 * @param subTypes
 * @returns {Promise}
 */
export function getBdmDictFn(...subTypes) {
  let subtTypeStr = '';
  subTypes.forEach(sub => {
    subtTypeStr += sub + ',';
  });
  if (subtTypeStr) {
    subtTypeStr = subtTypeStr.substr(0, subtTypeStr.length - 1);
  }
  return new Promise((resolve, reject) => {
    load({}, `${API_DICT.getDict}?type=${TYPE_BDM}&&subTypes=${subtTypeStr}`).then(res => {
      resolve.call(this, res);
    });
  });
}

/**
 * 翻译数据字典
 * @param dictData 数据字典的数据
 * @param targetData 要翻译的数据
 */
export function transDictFn(dictData, targetData) {
  targetData.forEach(form => {
    let dict = dictData.find(dict => dict.nameKey === form.nameKey);
    if (dict) {
      form.options = [];
      dict.dictItems.forEach(d => {
        form.options.push({value: d.key, text: d.value});
      });
    }
  });
}

/**
 * 递归处理数据字典数据
 * @param dictData
 * @param form
 */
function transTabDataDictUnitFn(dictData, form) {
  let dict = dictData.find(dict => dict.nameKey === form.nameKey);
  if (dict) {
    form.options = [];
    dict.dictItems.forEach(d => {
      form.options.push({value: d.key, text: d.value});
    });
  }
  if (form.children) {
    form.children.forEach(child => transTabDataDictUnitFn(dictData, child));
  }
}
/**
 * 翻译数据字典
 * @param dictData 数据字典的数据
 * @param targetData 要翻译的数据
 */
export function transTabDataDictFn(dictData, targetData) {
  for (let tabKey in targetData) {
    targetData[tabKey].forEach(form => {
      transTabDataDictUnitFn(dictData, form);
    });
  }
}

/**
 * 数据字典和下拉框的字段名转换
 * 后台和前端命名规范没有统一导致
 * @param dictItems
 * @param key
 * @param value
 * @returns {Array}
 */
export function transDict2OptionsFn(dictItems, key, value) {
  if (!key) {
    key = 'key';
  }
  if (!value) {
    value = 'value';
  }
  let selectArr = [];
  dictItems.forEach(item => {
    selectArr.push({value: item[key], text: item[value]});
  });
  // console.log(JSON.stringify(selectArr));
  return selectArr;
}
