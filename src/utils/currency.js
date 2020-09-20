const digitsRE = /(\d{3})(?=\d)/g;

/**
 * @description 格式化金额
 * @param {Number} value 金额
 * @param {String} currencyVal 单位
 * @param {Number} decimals 保留小数点后几位
 * @returns {string} 格式化后的金额
 * @example
 * ::: demo
 *
 * ```html
 *  <template>
 *   <div>
 *    <p><b>189123456789.155555：格式化金额:</b>{{ currency }}</p>
 *   </div>
 *  </template>
 *  <script>
 *    export default {
 *      data() {
 *        return {
 *          currency: 189123456789.155555
 *        }
 *    },
 *    mounted() {
 *      this.currency = this.$portal.currency(this.currency, '¥', 2)
 *    }
 *  }
 *  </script>
 *
 * ```
 * :::
 */
function currency(value = "", currencyVal = "", decimals = 2) {
  const numValue = parseFloat(value);

  if (numValue.toString() === "NaN") {
    return value;
  }

  var stringified = Math.abs(numValue).toFixed(decimals);
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  var i = _int.length % 3;
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "";
  var _float = decimals ? stringified.slice(-1 - decimals) : "";
  var sign = numValue < 0 ? "-" : "";
  return (
    sign + currencyVal + head + _int.slice(i).replace(digitsRE, "$1,") + _float
  );
}

export default currency;

/*
 * formatMoney(type, value)
 * 功能：金额按千位逗号分割
 * 参数：value，需要格式化的金额数值.
 * 参数：type,判断格式化后的金额是否需要小数位.
 * 返回：返回格式化后的数值字符串.
 */
export function formatMoney(type, value = "0") {
  if (/[^0-9.]/.test(value)) {
    return "0";
  }
  value = value.toString().replace(/^(\d*)$/, "$1.");
  value = (value + "00").replace(/(\d*\.\d\d)\d*/, "$1");
  value = value.replace(".", ",");
  var re = /(\d)(\d{3},)/;
  while (re.test(value)) {
    value = value.replace(re, "$1,$2");
  }
  value = value.replace(/,(\d\d)$/, ".$1");
  if (type === 0) {
    // 不带小数位(默认是有小数位)
    var a = value.split(".");
    if (a[1] === "00") {
      value = a[0];
    }
  }
  return value;
}
