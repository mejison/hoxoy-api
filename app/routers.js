const Router = require('koa-router');
const config = require('../config');
const router = new Router();
const controllers = require('./controllers');

router.get('/', (ctx) => {
    ctx.body = "Hoxoy API " + config.version;
});

router.get('/boards/:hash', async (ctx) => {
    const hash = ctx.params.hash;
    if ( ! hash) {
        throw new Error("Name is invalid");
    }
    ctx.body = await controllers.board.getOne(hash);
});

router.get('/boards', async (ctx) => {
    ctx.body = await controllers.board.getAll();
});

router.post('/boards', async (ctx) => {
    const name = ctx.request.body.name;
    if ( ! name) {
        throw new Error("Name requried");
    }

    controllers.board.create(ctx.request.body.name);
    ctx.body = {status: true, message: 'Success created.'};
});

router.put('/boards/:hash', async (ctx) => {
    controllers.board.update(ctx.params.hash, ctx.request.body);
    ctx.body = {status: true, message: 'Success update.'};
});


router.post('/tasks', async (ctx) => {
    const post = ctx.request.body;
    controllers.task.create(post);
    ctx.body = {status: true, message: 'Success created.'};
});


router.get('/tasks/:hash', async (ctx) => {
    const hash = ctx.params.hash;
    if ( ! hash) {
        throw new Error("Name is invalid");
    }
    ctx.body = await controllers.task.getOne(hash);
});

router.get('/tasks', async (ctx) => {
    ctx.body = await controllers.task.getAll();
});

router.put('/tasks/:hash', async (ctx) => {
    controllers.task.update(ctx.params.hash, ctx.request.body);

    ctx.body = {status: true, message: 'Success update.'};
});

module.exports = router;