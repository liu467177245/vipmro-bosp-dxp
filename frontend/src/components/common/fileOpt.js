/**
 * 文件操作
 * @author cmf00627
 * @date 2018/1/3
 */

/**
 * 拼装文件参数 （出参）
 * @param fileKeys 要拼装的文件key值
 * @param target 最后要拼装的目标数据
 * @param oriDataForm 来源于服务器的数据
 */
export function renderFileParamOutputFn(fileKeys, target, oriDataForm) {
  fileKeys.forEach(key => {
    let urlDomain = 'urlDomain';
    let listKey = key + 'List';
    target[listKey] = [];
    if (oriDataForm[key]) {
      let urlArr = oriDataForm[key].split(',');
      urlArr.forEach(url => {
        target[listKey].push({
          name: url.substr(url.lastIndexOf('/') + 1),
          url: oriDataForm[urlDomain] + url,
          [key]: url
        });
      });
    }
  });
};
/**
 * 拼装文件参数（入参）
 * @param fileKeys 要拼装的文件key值
 * @param target
 */
export function renderFileParamInputFn(fileKeys, target) {
  fileKeys.forEach(key => {
    let listKey = key + 'List';
    let urls = '';
    if (target[listKey] && target[listKey].length > 0) {
      target[listKey].forEach(pic => {
        if (pic.response) {
          urls += pic.response.body + ',';
        } else {
          urls += pic[key] + ',';
        }
      });
    }
    if (urls) {
      urls = urls.substr(0, urls.length - 1);
    }
    target[key] = urls;
  });
}

/**
 * 上传文件名重置（单文件）
 * @param response 后台上传返回的参数
 * @param target 目标参数
 */
export function resetFileNameFn(response, target) {
  if (response.response && response.response.body) {
    let url = response.response.body;
    target.name = url.substr(url.lastIndexOf('/') + 1);
  }
}
