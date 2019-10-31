var http = require('http');
var express = require('express');
var open  = require('opn');
var path = require('path');

var app = express();
var port = "8848";
var config = require('./config');
var appName = config.appName;

app.use(require('morgan')('short'));

// ************************************
// This is the real meat of the example
// ************************************
(function() {

  // Step 1: Create & configure a webpack compiler
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  console.log("publicPath:"+webpackConfig.output.publicPath);
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(compiler));
  app.use(express.static(__dirname))

  app.use('/repay*', function (request, response){
      response.sendFile(path.resolve(__dirname, "./", 'repay.html'))
  })
  app.use('/*', function (request, response){
      response.sendFile(path.resolve(__dirname, "./", 'index.html'))
  })

     // debugger

    //
  // console.log("__dirname **** "+__dirname);
  // app.use('/reactDemo/', function (request, response){
  //     console.log("__dirname **** "+__dirname);
  //     response.sendFile(path.resolve(__dirname, "./", 'index.html'))
  // })


  //var server = http.createServer(app);
  // app.listen(port, function() {
  //   console.log("Listening on %j", port);
  // });

  var server = app.listen(port, function() {

    var host = server.address().address
    var port = server.address().port;
    //192.168.1.6
    var uri = "http://127.0.0.1:"+port+"/";
    console.log("应用实例，访问地址为"+uri);
    open(uri);
  })

})();