const path = require("path");
const glob = require('glob');
const fs = require("fs");
module.exports = class routerwebpackplugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    //加载图片资源
    compiler.hooks.emit.tapAsync("txtwebpackplugin", (compilation, cb) => {
      let fileList = Object.keys(compilation.assets);
      // 公共资源迁移
      const files = glob.sync(path.resolve(__dirname,`../src/${this.options.dir}/*`));
      console.log(files);
      files.forEach(file => {
        compilation.assets[`${this.options.dir}${file.substr(file.lastIndexOf('/'))}`] = {
          source: function () {
            return fs.readFileSync(file)
          },
          size: function () {
            return 1;
          },
        };
      })
      cb();
    });
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
