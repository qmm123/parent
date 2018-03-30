/**
 * 反向代理中间件
 */

let fs = require("fs"),
  path = require("path"),
  http = require("http"),
  httpProxy = require("http-proxy"),
  url = require("url"),
  proxy = httpProxy.createProxyServer({}); // 新建一个代理 Proxy Server 对象  

let mockbase = path.join(__dirname, "../src/mockRouteConfig.json"); // mock路由配置文件
let routeObj = JSON.parse(fs.readFileSync(mockbase)); // 获取配置对象

/**
 * @Author    李鹏
 * @email     542416615@qq.com
 * @DateTime  2017-11-28
 * @copyright [Post代理函数]
 * @param     {[String]}         hostStr  [中转地址，Host]
 * @param     {[String]}         pathStr  [中转接口地址，Path] * @param     {[String]}         postData [需要中转的数据]
 * @param     {Function}         cb       [成功的回调]
 */
let PostHttpProxy = (hostStr, pathStr, postData, cb) => {
  let options = {
    host    : hostStr.replace("http://", ""),
    path    : pathStr,
    method  : 'POST',
    headers : {
      // 'Accept': "application/json, text/javascript, */*; q=0.01",
      // 'Accept-Encoding': 'gzip, deflate',
      // 'Accept-Language': 'zh-CN,zh;q=0.8',
      // 'Content-Type'   : 'application/json',
      'Content-Type'   : 'application/x-www-form-urlencoded',
      'Content-Length' : postData.length
    }
  };

  let req = http.request(options, res => {
    let body = "";

    res.on("data", chunk => { // 取得数据
      body += chunk;
      // const parsedData = JSON.parse(chunk);
      // console.log(parsedData)
      // cb(parsedData);
    })

    res.on("end", chunk => { // 取得数据
      // console.log("response head:",res.headers)
      // console.log("=====================================================================");
      // console.log("respone body:",body)
      // console.log("=====================================================================");
      cb(body);
    })
  })

  req.on('error', function(e) {
    console.log("Got error: " + e.message);
  })

  // console.log("content length:",postData.length);
  // console.log("=====================================================================");
  req.write(postData);
  // console.log("request head:",req);
  // console.log("=====================================================================");
  // console.log("request body:",postData);
  // console.log("=====================================================================");

  req.end();
}

// let GetHttpProxy = (uri, postData, cb) => {
//   var req = http.request(uri, res => {
//     let rawData = "";

//     res.on("data", chunk => { // 取得数据
//       rawData += chunk;
//     })

//     res.on("end", () => { // 请求结束
//       try { // 成功
//         const parsedData = JSON.parse(rawData);
//         cb(parsedData);
//       } catch (e) { // 失败
//         console.error(e.message);
//         cb("error");
//       }
//     })
//   })


// }

/**
 * @Author    李鹏
 * @email     542416615@qq.com
 * @DateTime  2017-11-28
 * @copyright [判断get/post]
 * @param     {[String]}         hostStr  [中转地址，Host]
 * @param     {[String]}         pathStr  [中转接口地址，Path]
 * @param     {[Object]}         proxyreq [代理请求体]
 * @param     {Function}         cb       [成功回调]
 */
let Locations = (hostStr, pathStr, proxyreq, cb) => {
  let getData = "";
  if (proxyreq.method === "POST") {
    proxyreq.on('data', function(chunk){
      getData += chunk;
    });

    proxyreq.on('end', function () {
      PostHttpProxy(hostStr, pathStr, getData, cb);
    });
  } else {
    let query = url.parse(proxyreq.url).query;
    // uri += `?${query}`;
  }  
}

/**
 * @Author    李鹏
 * @email     542416615@qq.com
 * @DateTime  2017-10-09
 * @copyright [路由函数]
 * @param     {[Object]}       res      [相应体]
 * @param     {[Object]}       req      [请求体]
 * @param     {[String]}       pathname [路径]
 * @param     {Function}       next     [中间件next]
 */
let MockApi = (res, req, pathname, next) => { 

  // console.log("====================");
  // console.log(req.method)
  // console.log("====================");
  routeObj = JSON.parse(fs.readFileSync(mockbase));
  // 代理出现错误
  proxy.on("error", (err, req, res) => {
    res.writeHead(500, {
      "Content-Type": "text/plain"
    });

    res.end("Something went wrong. And we are reporting a custom error message.");
  })  

  // 遍历配置文件找到相应路由进行反向代理
  for (let route of routeObj.routes) {
    if (route.path === pathname) {
      let uri = "", hostStr = "", pathStr = "";
      let arr = [];

      if (!/^http/.test(route.to)) { // 如果不是http开头，即为本地相对mock
        let port = req.headers.host.split(":")[1];

        uri = `http://127.0.0.1:${port}${route.to}`;
      } else { // 跨域反向代理
        uri = route.to;
      }

      arr = uri.match(/^http(s)?:\/\/(.*?)\//);

      hostStr = arr[0].substring(0, arr[0].length-1);
      pathStr = uri.replace(hostStr, "");

      // console.log(hostStr);
      // console.log(pathStr);

      Locations(hostStr, pathStr, req, data => {
        res.setHeader("Content-Type", "application/x-www-form-urlencoded");
        // res.setEncoding('utf-8');
        res.end(data);
      });

      return;
    }
  }

  next();

  // 根据路径选择路由
  // switch (pathname) {
  //   // 反向代理
  //   case '/api/vote':
  //     var uri = 'http://www.baonahao.com/Ajaxs/getCategoryNameAndCourseNum';

  //     locations(uri, data => {
  //       res.setHeader('Content-Type', 'application/json');
  //       res.end(JSON.stringify(data));
  //     });

  //     return;
  //   // get请求
  //   case '/api/getUserInfo':
  //     var uri = 'http://127.0.0.1:8088/mock/post1.json';
  //                http://127.0.0.1:8088/mock/post1.json

  //     locations(uri, data => {
  //       res.setHeader('Content-Type', 'application/json');
  //       res.end(JSON.stringify(data));
  //     });

  //     return;
  // }
  
}

module.exports = MockApi;