let express = require('express');
let request = require('request');
function getJSON(url, callback) {
  request(url, function (err, response, body) {
    callback(err, JSON.parse(body));
  });
}
let path = require('path');
let app = express();
app.set('view engine','ejs');
app.set('views',path.resolve('views'));
let APPID = 'wx4bc04730ea7aa5ca';
let APPSECRET = '1cbfbc33bf3af7aced8e89ea06dcdb98';
app.get('/', function (req, res) {
  res.sendFile(path.resolve('index.html'));
});
//一定是个公网地址，可以使用IP
let REDIRECT_URI = encodeURIComponent('http://123.57.223.74/callback');
app.get('/login', function (req, res) {
  let authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
  //console.log('authUrl',authUrl);
  res.redirect(authUrl);
});
app.get('/callback', function (req, res) {
  let {code} = req.query;
  console.log(`code ${code}`);
  let accessUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${APPSECRET}&code=${code}&grant_type=authorization_code`;
  //console.log('accessUrl',accessUrl);
  getJSON(accessUrl, function (err, data) {
    //console.log(data);
    let {access_token, openid} = data;
    //console.log(access_token, openid);
    let userUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
   // console.log(userUrl);
    getJSON(userUrl,function(err,user){
        res.render('user.ejs',{user});
    })
  });
});
app.listen(80);



