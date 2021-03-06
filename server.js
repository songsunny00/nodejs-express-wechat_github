var express = require('express');
var port = process.env.PORT || 8321;
var app = express(); //实例赋给变量
// const helmet = require('helmet');
// app.use(helmet({
//   frameguard: false
// }))

require('./config/express')(app);
require('./config/logger')(app);
require('./config/proxy')(app);
require('./router/routes')(app);
app.listen(port);
console.log('server start success!' + port);