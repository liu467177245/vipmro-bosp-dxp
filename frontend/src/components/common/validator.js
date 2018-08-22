/**
 * 字符串校验
 * @param len 长度校验
 * @param is 是否必填
 * @returns {maxLength: {len}, required: {is}}
 */
export function vText(len, is) {
  let v = {};
  if (len) {
    v.maxLength = len;
  }
  if (is != null) {
    v.required = is;
  }
  return v;
}

/**
 * 数字校验
 * @param len 长度校验
 * @param is 是否必填
 * @returns {{type: string}}
 */
export function vNumber(len, is, max, min) {
  let v = {type: 'number', maxNum: 2147483647, minNum: -2147483647};
  if (max != null && max < 2147483647) {
    v.maxNum = max;
  }
  if (min != null && min > -2147483647) {
    v.maxNum = min;
  }
  if (len) {
    v.maxLength = len;
  }
  if (is != null) {
    v.required = is;
  }
  return v;
}

/**
 * 必填
 * @returns {{required: boolean}}
 */
export function required() {
  return {
    required: true
  };
};

/**
 * 数字(带小数点)校验
 * @param len 长度校验
 * @param is 是否必填
 * @returns {{type: string}}
 */
export function vFloat(len, is, max, min) {
  let v = {type: 'float', maxNum: 2147483647, minNum: -2147483647};
  if (len) {
    v.maxLength = len;
  }
  if (max != null && max < 2147483647) {
    v.maxNum = max;
  }
  if (min != null && min > -2147483647) {
    v.maxNum = min;
  }
  if (is != null) {
    v.required = is;
  }
  return v;
}

/**
 * 手机校验
 * @param is 是否必填
 * @returns {{type: string}}
 */
export function vMobile(is) {
  let v = {type: 'mobileTelephone'};
  if (is != null) {
    v.required = is;
  }
  return v;
}
