const glob = require("glob");
const path = require("path");
const fs = require("fs");

module.exports = function (source) {
  const dir = this.query.useDir || "pages"; // 路由文件夹, 默认pages

  const floders = fs.readdirSync(path.resolve(__dirname, `../src/${dir}`));

  const menuList = floders.map((floder) => {
    const menus = glob.sync(
      path.resolve(__dirname, `../src/${dir}/${floder}/*.md`)
    );
    return `
        <div className='navigate-menu'>
          ${floder}
          <div className='navigate-subMenu'>
            ${menus
              .map((item) => {
                let fileName = item.substr(item.lastIndexOf("/") + 1);
                let key = `${floder}/${fileName.substr(
                  0,
                  fileName.lastIndexOf(".")
                )}`;
                return `<div className={'${key}' === selectKey ? 'navigate-subMenu-label-select' : 'navigate-subMenu-label'} key='${key}'>
              <a onClick={
                () => {
                  setSelectKey('${key}')
                }
              }>${fileName}</a>
              </div>`;
              })
              .join("\n")}
          </div>
        </div>
      `;
  });

  // 处理之后的文件内容
  const result = source.replace("{/* navigation */}", menuList.join("\n"));

  // 创建文件
  if (
    !fs.existsSync(path.resolve(__dirname, `../src/.cache/navigation.auto.js`))
  ) {
    fs.mkdirSync(path.resolve(__dirname, `../src/.navigation`));
  }
  // 写入到缓存文件
  fs.writeFileSync(
    path.resolve(__dirname, `../src/.cache/navigation.auto.js`),
    result
  );

  // 交给webpack处理
  return result;
};
