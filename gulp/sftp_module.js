import {
  gulp,
  root,
  path
} from "./options_module.js";

import sftp from "gulp-sftp";
// 获取配置文件，并返回对象
import {sftpProjectConfig} from "./getProjectConfig";

// sftp 默认配置
let sftpConfig = {
  host       : sftpProjectConfig.host || '192.168.1.10' ,
  port       : sftpProjectConfig.port || '22',
  user       : sftpProjectConfig.user || 'xiaohe',
  pass       : sftpProjectConfig.pass || 'Wfzf6&uoxGwzcpvA4+eRgiuMbH6oZv^P^C',
  remotePath : sftpProjectConfig.remotePath || '/home/xiaohe/www/app/shangjia_pc_3.0/webroot/'
};

const sftpfn = () => {
  return gulp.task("sftp", () => {
    const _path = path.resolve(root.dist, "**");
    gulp.src(_path)
      .pipe(sftp(sftpConfig));
  });
}
module.exports = sftpfn;