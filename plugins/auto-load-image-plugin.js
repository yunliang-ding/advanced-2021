const path = require("path");
const glob = require('glob');
const fs = require("fs");
module.exports = class AutoLoadImagePlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    //加载图片资源
    compiler.hooks.emit.tapAsync("AutoLoadImagePlugin", (compilation, cb) => {
      const files = glob.sync(path.resolve(__dirname,`../src/${this.options.dir}/*`));
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
    // compiler.hooks.afterCompile.tap(
    //   "AutoLoadImagePlugin",
    //   (compilation) => {
    //     // 把路由添加到文件依赖列表
    //     compilation.fileDependencies.add(
    //       path.resolve(__dirname, `../src/${this.options.dir}`)
    //     );
    //     console.log(compilation.fileDependencies)
    //   }
    // );
  }
};
