
/**
 * 根据分类id 查询分类编码 （后台需要的是分类编码，不是分类id）
 * @param id
 * @param categoryTree
 * @param categoryCodeList
 */
function getCategoryCodeById(id, categoryTree, categoryCodeList) {
  if (!categoryTree) {
    return;
  }
  categoryTree.forEach(category => {
    if (category.id === id) {
      categoryCodeList.push(category.code);
      return false;
    } else {
      getCategoryCodeById(id, category.children, categoryCodeList);
    }
  });
}

/**
 * 根据分类id 获取商品编码
 * @param categoryIds 要转换的分类id
 * @param categoryTree 分类数据
 * @returns {string}
 */
export function transferId2CodeFn(categoryIds, categoryTree) {
  let categoryCodeList = [];
  categoryIds.forEach(categoryId => {
    getCategoryCodeById(categoryId, categoryTree, categoryCodeList);
  });
  return categoryCodeList;
}
