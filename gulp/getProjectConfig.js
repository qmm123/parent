/**
 * 获取项目配置文件，并返回对象
 */

import fs from "fs";

let jsonObj = JSON.parse(fs.readFileSync('src/projectConfig.json'));

module.exports = jsonObj;