import {load} from '@/common/js/interface';
/**
 * 读取省市区
 * @param subTypes
 * @returns {Promise}
 */
export function loadArea() {
  return new Promise((resolve, reject) => {
    var area = window.localStorage.getItem('area');
    if (area) {
      resolve.call(this, JSON.parse(area));
    } else {
      load({}, `/api/area/`).then(res => {
        res = res.body.rows;
        for (var item of res) {
          for (var child of res) {
            if (item.id === child.pid) {
              child.unparant = true;
              item.children.push(child);
            }
          }
        }
        for (let i = res.length - 1; i >= 0; i--) {
          res[i].id = res[i].name;
          if (res[i].type === 4) {
            res[i].children = null;
          }
          if (res[i].unparant) {
            res.splice(i, 1);
          }
        }
        window.localStorage.setItem('area', JSON.stringify(res));
        resolve.call(this, res);
      });
    }
  });
}
