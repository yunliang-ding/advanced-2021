const path = require("path");
module.exports = class routerwebpackplugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.afterCompile.tap(
      "routerwebpackplugin",
      (compilation) => {
        // 把路由添加到文件依赖列表
        // compilation.fileDependencies.add(
        //   path.resolve(__dirname, `../src/${this.options.useDir}/**/*.md`)
        // );
        // console.log(compilation.fileDependencies)
      }
    );
  }
};
