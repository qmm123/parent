var gulp = require("gulp"); 
/* 列队 */
var sequence = require("gulp-sequence");
var cleanTask = require("./gulp/clean_module.js")();
var jsTask = require("./gulp/js_module.js")();
var cssTask = require("./gulp/css_module.js")();
var imageTask = require("./gulp/image_module.js")();
// var serverTask = require("./gulp/server_module.js")();
var htmlTask = require("./gulp/html_module.js")();
// var revTask = require("./gulp/rev_module.js")();
var watch = require("./gulp/watch_module.js")();

var createVersion = require("./gulp/create_version.js")();

var sftpTask = require("./gulp/sftp_module.js")();

var copyAgentTask = require("./gulp/agent_module.js")();

gulp.task("do", sequence("html", "less", "copylibcss", "copyAgent", "js", "image", "server", "watch"));
// 服务器端编译
gulp.task("build", sequence("html", "less", "copylibcss", "copyAgent", "js", "image"));