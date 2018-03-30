/**
 * 图片压缩
 */

import {
  gulp,
  path,
  root,
  srcFolder,
  distFolder,
  options,
  gulpif
} from "./options_module.js";
import changed from "gulp-changed";
import imagemin from "gulp-imagemin";

const imagetask = () => {
  gulp.task("image", () => {
    const _image = path.resolve(srcFolder.image, "**");
    return gulp.src(_image, {base: root.src})
    .pipe( changed(root.dist) )
    .pipe( gulpif(options.env === "production", imagemin({
      interlaced        : true,
      progressive       : true,
      optimizationLevel : 5,
      svgoPlugins: [{
        removeViewBox : true
      }]
    })) )
    .pipe(gulp.dest(root.dist));
  });
}
module.exports = imagetask;