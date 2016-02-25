/**
 * Created by Rain on 2016/2/25.
 */
var chat_server = 'http://' + location.hostname + ':3000';
console.log('server: ' + chat_server);
var socket = io.connect(chat_server);//开启 io连接

//检测cookie中的昵称
socket.on('need_nickname', function () {
  if (null == $.cookie('chat_nickname')) {
    $('#login-modal').modal('show');
  } else {
    changeNickname($.cookie('chat_nickname'));
  }
});

//传出server 服务器信息
socket.on('server_message', function (_message) {
  console.log(_message);
//        addServerMessage(getLocalHMS(), _message);
});

//昵称错误界面信息
socket.on('change_nickname_error', function (_error_msg) {
  console.log('change_nickname_error : ' + _error_msg);
  $('#login-modal').modal('show');
  $("#nickname-error").text(_error_msg);
  $("#nickname-error").show();
  $('#nickname-edit').focus();
});

socket.on('user_change_nickname', function (_old_nick_name, _new_nick_name) {
  console.log('user_change_nickname(' + _old_nick_name + ', ' + _new_nick_name + ')');
  removeListUser(_old_nick_name);
  addUserToList(_new_nick_name);
  addServerMessage(getLocalHMS(), '[' + _old_nick_name + '] 改名为 [' + _new_nick_name + ']');
});

socket.on('user_join', function (_nick_name) {
  console.log('user_join(' + _nick_name + ')');
  addUserToList(_nick_name);
  updateListCount();
  addServerMessage(getLocalHMS(), '[' + _nick_name + '] 进入了聊天室。');
});

//更改昵称信息
function changeNickname(_nickname) {
  socket.emit('change_nickname', _nickname);
}