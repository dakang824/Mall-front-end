/*
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-10-09 23:07:12
 * @LastEditTime: 2020-10-17 19:49:19
 */
module.exports = {
  devServer: {
    port: 80,
    disableHostCheck: true,
    proxy: {
      "/service": {
        target: "http://47.101.210.167/",
        changeOrigin: true,
      },
    },
  },
};
