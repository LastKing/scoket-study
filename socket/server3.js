/**
 * Created by Rain on 2016/2/25.
 */
var net = require('net');


function start() {

  console.log('socket开始监听1314 端口');

  var server = net.createServer(function (socket) {

    socket.write(JSON.stringify({
          head: 'welcome client',
          ip: socket.remoteAddress,
          port: socket.port
        }) + "[END]");


  });


  server.listen(1314);
}

module.exports = {
  start: start
};
