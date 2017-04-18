let express = require('express');
let path = require('path');
let app = express();
let APPID = 'wx4bc04730ea7aa5ca';
let APPSECRET = '1cbfbc33bf3af7aced8e89ea06dcdb98';
app.get('/',function (req,res) {
  res.sendFile(path.resolve('index.html'));
});
//一定是个公网地址，可以使用IP
let REDIRECT_URI = 'http://123.57.223.74/callback';
app.get('/login',function (req,res) {
  let authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
  res.redirect(authUrl);
});
app.get('/callback',function (req,res) {

});
app.listen(80);
