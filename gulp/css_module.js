/**
 * 编译LESS
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

import less from "gulp-less";
// import uncss from "gulp-uncss";
import changed from "gulp-changed"; // 监测文件变动插件
import LessAutoprefix from 'less-plugin-autoprefix'; // LESS不全CSS3前缀插件
// import rev from "gulp-rev";
import clean from "gulp-clean"; // 删除
import cleancss from "gulp-clean-css"; // 压缩CSS
import plumber from "gulp-plumber"; // 阻止 gulp 插件发生错误导致进程退出并输出错误日志

const browserSync = require('browser-sync').create(); // http服务器
const reload = browserSync.reload; // 刷新

const autoprefix = new LessAutoprefix({ // less-plugin-autoprefix配置对象
  browsers: [
    "ie >= 8",
    "ie_mob >= 10",
    "ff >= 26",
    "chrome >= 30",
    "safari >= 6",
    "opera >= 23",
    "ios >= 5",
    "android >= 2.3",
    "bb >= 10"
  ]
});

const csstask = () => {
  gulp.task("cleandistcss", () => {
    return gulp.src(distFolder.css).pipe(clean());
  });
  gulp.task("less", () => {
    let _less = path.resolve(srcFolder.css, "**/entry-**.less");
    return gulp.src(_less)
      .pipe(gulpif(options.env === "development", sourcemaps.init()))
      .pipe(plumber())
      .pipe(changed(distFolder.css))
      .pipe(less({
        plugins: [autoprefix]
      }))
      .pipe(gulpif(options.env === "production", cleancss()))
      .pipe(gulpif(options.env === "development", sourcemaps.write()))
      .pipe(gulp.dest(distFolder.css)).on('change', reload);
  })
  gulp.task("copylibcss", () => {
    let _libcss = path.resolve(root.src, "lib/*.css");
    // let _html = path.resolve(root.src, "*.html");

    return gulp.src(_libcss)
      //.pipe(uncss({html:["src/*.html"]}))
      .pipe(gulp.dest(path.resolve(root.dist, "lib"))).on('change', reload);
  });
}
module.exports = csstask;