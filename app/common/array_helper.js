export default {
  //判断字符串数组中是否包含特定字符串
  include: (allItems, item) => {
    if (allItems == null)
      return false;

    for (let item_value of allItems) {
      if (item_value === item)
        return true;
    }
    return false;
  },
};