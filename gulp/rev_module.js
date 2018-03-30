import {
  gulp,
  path,
  root,
  revPath,
  srcFolder,
  distFolder,
  sourcemaps,
  options
} from "./options_module.js";
import revCollector from 'gulp-rev-collector';

var revtask = () => {
  gulp.task("rev", () => {
    const _rev = path.resolve(root.dist, "rev/**/*.json");
    return gulp.src([_rev, revPath.src]).pipe(revCollector({
      replaceReved: true
    })).pipe(gulp.dest(revPath.dest));
  });
}
module.exports = revtask;