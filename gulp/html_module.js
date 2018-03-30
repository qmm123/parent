/**
 * html处理
 */
import {
  gulp,
  path,
  root,
  srcFolder,
  distFolder,
  sourcemaps,
  options,
  gulpif
} from "./options_module.js";

import htmlmin from "gulp-htmlmin";
import fileinclude from "gulp-file-include";

// 获取配置文件，并返回对象
import {version, title} from "./getProjectConfig";

const htmltask = () => {
  gulp.task("html", ["copyBrotherArt"], () => {
    const _noneed = path.resolve(root.src, "!(header|footer|nav).html");
    const _index = path.resolve(root.src, "*.html");
    const _viewpage = path.resolve(root.src, "view/**");

    return gulp.src([_index, _noneed, _viewpage], {base: root.src})
      .pipe(gulpif(options.env === "development", fileinclude({
        prefix: '@@',
        basepath: '@file',
        context: {
          version: version,
          title: title,
          IsProxy: true
        }
      })))
      .pipe(gulpif(options.env === "production", fileinclude({
        prefix: '@@',
        basepath: '@file',
        context: {
          version: version,
          title: title,
          IsProxy: false
        }
      })))
      .pipe(gulpif(options.env === "production", htmlmin({
        collapseWhitespace: true
      })))
      .pipe(gulp.dest(root.dist));
  });


  gulp.task("copyBrotherArt", () => {
    const _html = path.resolve(root.src, "template/**");

    return gulp.src([_html], { base: root.src })
      .pipe(gulp.dest(root.dist));
  });
}

module.exports = htmltask;