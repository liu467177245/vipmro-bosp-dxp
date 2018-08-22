
const baseApi = 'http://localhost:8081/api';
/**
 * 基础api 上传 下载 ...
 * @type {{upload: string, download: string}}
 */
export const API_BASE = {
  upload: `${baseApi}/file/upload`,
  download: `${baseApi}/file/download`,
  getLink: `${baseApi}/file/getLink`,
  templete: `${baseApi}/file//templete/download`
};

/**
 * 店铺
 * @type {{list: string, add: string, delete: string, update: string}}
 */
export const API_DATA_RULE = {
  list: `${baseApi}/v1.0.0/rule/list`,
  add: `${baseApi}/v1.0.0/rule/add`,
  delete: `${baseApi}/v1.0.0/rule/delete`,
  update: `${baseApi}/v1.0.0/rule/update`
};
