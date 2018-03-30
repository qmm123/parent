/**
 * 拷贝agent配置文件，暂用于机构中心
 */
import {
  gulp,
  path,
  root
} from "./options_module.js";

const copyAgent = () => {
  gulp.task("copyAgent", () => { 
    return gulp.src(path.resolve(root.src, "agent/**"))
      .pipe(gulp.dest(path.resolve(root.dist, "agent")));
  });
}

module.exports = copyAgent;