
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
 *
 * @type {{list: string, add: string, delete: string, update: string}}
 */
export const API_DATA_RULE = {
  list: `${baseApi}/v1.0.0/rule/list`,
  add: `${baseApi}/v1.0.0/rule/add`,
  import: `${baseApi}/v1.0.0/rule/import`,
  delete: `${baseApi}/v1.0.0/rule/delete`,
  update: `${baseApi}/v1.0.0/rule/update`
};
export const API_PROJECT = {
  list: `${baseApi}/v1.0.0/project/list`,
  detail: `${baseApi}/v1.0.0/project/detail`,
  add: `${baseApi}/v1.0.0/project/add`,
  delete: `${baseApi}/v1.0.0/project/delete`,
  update: `${baseApi}/v1.0.0/project/update`,
  start: `${baseApi}/v1.0.0/project/start`,
  stop: `${baseApi}/v1.0.0/project/stop`
};
export const API_PROJECT_CONNECT_OUT = {
  update: `${baseApi}/v1.0.0/project/connect/out/update`
};
export const API_DATA_TREE_INPUT = {
  update: `${baseApi}/v1.0.0/dataTree/input/update`,
  detail: `${baseApi}/v1.0.0/dataTree/input/detail`,
  add: `${baseApi}/v1.0.0/dataTree/input/add`,
  delete: `${baseApi}/v1.0.0/dataTree/input/delete`
};
export const API_DATA_TREE_OUTPUT = {
  update: `${baseApi}/v1.0.0/dataTree/output/update`,
  detail: `${baseApi}/v1.0.0/dataTree/output/detail`,
  add: `${baseApi}/v1.0.0/dataTree/output/add`,
  delete: `${baseApi}/v1.0.0/dataTree/output/delete`
};
export const API_LOG_REQUEST = {
  list: `${baseApi}/v1.0.0/logRequest/list`
};
export const API_DATA_MAPPING = {
  detail: `${baseApi}/v1.0.0/dataMapper/detail`,
  add: `${baseApi}/v1.0.0/dataMapper/add`,
  delete: `${baseApi}/v1.0.0/dataMapper/delete`,
  update: `${baseApi}/v1.0.0/dataMapper/update`
};

