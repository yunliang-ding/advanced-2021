const glob = require("glob");
const path = require("path");
const fs = require("fs");

module.exports = function (source) {
  const dir = this.query.useDir || "pages"; // 路由文件夹, 默认pages

  const pages = glob.sync(path.resolve(__dirname, `../src/${dir}/**/*.md`));

  const imports = pages.map((item) => {
    let path = item.substr(item.indexOf(dir) + dir.length);
    path = path.substr(0, path.lastIndexOf("."));
    let component = path.substr(1).replace("/", "");
    return `import ${component} from '@/${dir}${path}.md'`;
  });

  const routers = pages.map((item, index) => {
    let path = item.substr(item.indexOf(dir) + dir.length);
    path = path.substr(0, path.lastIndexOf("."));
    let component = path.substr(1).replace("/", "");
    let router = `<Route path="${path}" component={() => <Rmd content={${component}} />} />`;
    if (index > 0) {
      router = `        ` + router;
    }
    return router;
  });

  // 处理之后的文件内容

  const result = source
    .replace("// imports", imports.join("\n"))
    .replace("{/* routers */}", routers.join("\n"));

  // 创建文件
  if (!fs.existsSync(path.resolve(__dirname, `../src/.cache/app-router.js`))) {
    fs.mkdirSync(path.resolve(__dirname, `../src/.cache`));
  }
  // 写入到缓存文件
  fs.writeFileSync(
    path.resolve(__dirname, `../src/.cache/app-router.js`),
    result
  );

  // 交给webpack处理
  return result;
};
