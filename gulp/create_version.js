/**
 * 生成新版本到线上svn
 */

import {
  gulp,
  path,
  root,
  revPath,
  srcFolder,
  distFolder,
  sourcemaps,
  options,
  gulpif
} from "./options_module.js";

import fs from "fs";

const createVersion = () => {
  gulp.task("version", () => {
    var os = require("os");
    var path = require("path");
    var _path = "";
    let jsonObj = JSON.parse(fs.readFileSync("./getProjectConfig")); // 配置文件

    if (os.platform() == "darwin") { // MAC系统
      _path = path.resolve("/", "/Users/lipeng/Desktop/线上svn/organ_center/tag/", "v" + jsonObj.svnVersion);
    } else { // WINDOWS系统
      _path = path.resolve("/");
    }

    return gulp.src(path.resolve(root.dist, "**"))
      .pipe(gulp.dest(_path));
  });
}

module.exports = createVersion;