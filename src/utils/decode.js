/**
 * @copyright yukang
 * @description 解码
 * @type Array
 */
function decode(value, arr, params = "no") {
  return arr
    .map((item) => {
      if ((value & item[params]) > 0) {
        return item.name;
      }
    })
    .filter((item) => item !== undefined);
}

export default decode;
