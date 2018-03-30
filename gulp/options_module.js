/**
 * 公用参数便于维护
 */

/* var { gulp, path, srcFolder, distFolder, sourcemaps, options } = require("./options_module.js"); */
import gulp from "gulp";
import path from "path";
import minimist from "minimist"; // 命令行参数解析
import gulpif from "gulp-if";
import sourcemaps from "gulp-sourcemaps"; // 根 
const root = {
  src: "src",
  dist: "dist"
}; // 文件路径 
const srcFolder = {
  html: path.resolve(root.src, "template"),
  js: path.resolve(root.src, "js"),
  css: path.resolve(root.src, "less"),
  image: path.resolve(root.src, "img"),
  lib: path.resolve(root.src, "lib"),
};
const distFolder = {
  html: path.resolve(root.dist, "html"),
  js: path.resolve(root.dist, "js"),
  css: path.resolve(root.dist, "css"),
  image: path.resolve(root.dist, "img"),
  lib: path.resolve(root.dist, "lib")
};
const revPath = { //use rev to reset html resource url 
  revJson: path.resolve(root.dist, "rev/js"),
  revCsson: path.resolve(root.dist, "rev/css"),
  src: path.resolve(srcFolder.html, "*.html"), //root index.html 
  dest: distFolder.html
}
const knownOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'production'
  }
};
const options = minimist(process.argv.slice(2), knownOptions);
module.exports = {
  gulp,
  path,
  root,
  revPath,
  srcFolder,
  distFolder,
  sourcemaps,
  options,
  gulpif
};