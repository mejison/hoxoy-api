const Koa = require('koa');
const mongoose = require('mongoose');
const logger = require('koa-logger');
const convert = require('koa-convert');
const koaRes = require('koa-res');
const parser = require('koa-bodyparser');
mongoose.connect('mongodb://mjs:knopka100@ds163610.mlab.com:63610/hoxoy');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongodb connected!');
});

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = { status: false, message: err.message };
    ctx.app.emit('error', err, ctx)
  }
})

const router = require('./app/routers');

app
  .use(parser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(logger)
  .use(convert(koaRes()));
  


app.listen(3000);