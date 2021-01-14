/*
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-09-20 20:10:07
 * @LastEditTime: 2021-01-14 15:48:38
 */
module.exports = {
  // 开发以及部署时的URL 如"/test/"
  publicPath: "/",
  // 生产环境构建文件的目录名
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  //开发环境端口号
  devPort: "80",
  // @token在Cookie中存储的天数，默认1天
  cookieExpires: 30,
  // 默认的接口地址 如果是开发环境和生产环境走vab-mock-server，当然你也可以选择自己配置成需要的接口地址
  baseURL:
    process.env.NODE_ENV === "development" ? "/" : "/" || "vab-mock-server",
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
  //需要加loading层的请求，防止重复提交
  debounce: ["doEdit"],
  //最长请求时间
  requestTimeout: 60000,
  //操作正常code，支持String、Array、int多种类型
  successCode: [200],
  //token名称
  tokenName: "accessToken",
  //是否显示在页面高亮错误
  errorLog: ["development", "test", "production"],
  //加载时显示文字
  loadingText: "正在加载中...",
  //消息框消失时间
  messageDuration: 3000,
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: "嗨厨玩味",
  //token存储位置localStorage sessionStorage cookie
  storage: "localStorage",
  //token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: "lifeData",
  //登录失效code
  invalidCode: 402,
  //无权限code
  noPermissionCode: 401,
  fileUpload: "/service/common/fileUpload",
  routesWhiteList: [
    "/login",
    "/home",
    "/404",
    "/goods-detail",
    "/goods-list",
    "/store",
  ],
};
