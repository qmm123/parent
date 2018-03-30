/**
 * 删除dist目录
 */
import {
  gulp,
  root
} from "./options_module.js";
import clean from "gulp-clean";
const cleantask = () => {
  return gulp.task("clean", () => {
    gulp.src(root.dist).pipe(clean({
      force: true // 强行删除
    }));
  });
}
module.exports = cleantask;