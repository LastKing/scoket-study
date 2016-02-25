/**
 * Created by Rain on 2016/2/25.
 */
var net = require('net');
var chatServer = net.createServer();
var clientList = [];


chatServer.on('connection', function (client) {
  //JS可以为对象自由添加属性。
  client.name = client.remoteAddress + ":" + client.remotePort;
  client.write('Hi' + client.name + '!\n');
  clientList.push(client);

  client.on('data', function (data) {
    broadcast(data, client);//接受来自客户端的信息
  });

  client.on('end', function () {
    clientList.splice(clientList.indexOf(client), 1);// 删除数组中的制定元素。这是 JS 基本功哦
  });

  client.on('error', function (e) {
    console.log(e);
  });
});

function broadcast(message, client) {
  var cleanup = [];

  //循环 查找所有 客户端队列：所有非自身 客户端队列输出信息
  for (var i = 0; i < clientList.length; i += 1) {
    if (client !== clientList[i]) {
      if (clientList[i].writable) { // 先检查 sockets 是否可写
        clientList[i].write(client.name + " says " + message);
      } else {
        cleanup.push(clientList[i]);// 如果不可写，收集起来销毁。销毁之前要 Socket.destroy() 用 API 的方法销毁。
        clientList[i].destroy()
      }
    }
  }

  for (i = 0; i < cleanup.length; i += 1) {
    clientList.splice(clientList.indexOf(cleanup[i]), 1)
  }
}

chatServer.listen(9000, function () {
  console.log('服务器 已绑定！');
});
