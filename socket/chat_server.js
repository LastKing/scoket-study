/**
 * Created by Rain on 2016/2/25.
 */
var io = require('socket.io')();

var nickname_list = [];

io.on('connection', function (_socket) {

  console.log(_socket.id + ': connection');

  _socket.emit('user_list', nickname_list);
  _socket.emit('need_nickname');
  _socket.emit('server_message', '欢迎来到千寻聊天室~<br/>' +
      '本聊天室源代码<a href="https://github.com/coofly/qx-chat" target="_blank">' +
      'https://github.com/coofly/qx-chat</a>，欢迎Star！');



  _socket.on('disconnect', function () {
    console.log(_socket.id + '离线');
  });

});


module.exports = {
  listen: function (_server) {
    return io.listen(_server);
  }
};