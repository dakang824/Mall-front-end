const rtv = {};
const allJs = require.context("./", true, /\.js$/);

// 可以把当前目录下非index 的所有js导出
allJs.keys().map((key) => {
  const [, fileName] = key.match(/\.\/([\w-_]*?)\.js/);

  if (fileName !== "index") {
    const fileNameCamel = fileName.replace(/[-_]([a-z])/g, ($0, $1) =>
      $1.toUpperCase()
    );
    rtv[fileNameCamel] = allJs(key).default;
  }
});

// console.log('loaded', 'api')
// Vue.prototype.$utils = rtv

export default rtv;
