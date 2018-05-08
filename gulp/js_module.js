/**
 * JS压缩、babel、拷贝
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
import babel from "gulp-babel";
// import rev from "gulp-rev";
import changed from "gulp-changed";
import uglify from "gulp-uglify";
import stripDebug from "gulp-strip-debug"; // 移除压缩信息
import clean from "gulp-clean";
// import requirejsOptimize from 'gulp-requirejs-optimize';

import plumber from "gulp-plumber";

const jstask = () => {
  gulp.task("cleandistjs", () => {
    return gulp.src(distFolder.js).pipe(clean());
  });
  gulp.task("js", ["copymock", "lib"], () => {
    const _js = path.resolve(srcFolder.js, "**");
    return gulp.src(_js)
      .pipe(plumber())
      .pipe(babel({
          presets: ['env']
      }))

      .pipe( changed(distFolder.js) )
      
      // .pipe( gulpif(options.env === "production", stripDebug() ) ) 
      .pipe( gulpif(options.env === "production", uglify() ) ) 
      //.pipe(rev())
      .pipe(gulp.dest(distFolder.js))
      //.pipe(rev.manifest()) 
      // .pipe(gulp.dest(revPath.revJson));
  });
  gulp.task("copymock", () => {
    const _mock = path.resolve(root.src, "mock/**");
    return gulp.src(_mock)
      .pipe(gulp.dest(path.resolve(root.dist, "mock")));
  });
  gulp.task("lib", () => {
    const _lib = path.resolve(srcFolder.lib, "**");
    return gulp.src(_lib)
      .pipe(gulp.dest(distFolder.lib));
  });
  // gulp.task('rjs', () => {
  //   return gulp.src('src/js/init.js').pipe(requirejsOptimize({
  //     mainConfigFile: 'src/js/config.js'
  //   })).pipe(gulp.dest('dist/js/mod'));
  // });
}
module.exports = jstask;