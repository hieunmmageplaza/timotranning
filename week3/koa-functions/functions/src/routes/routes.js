const Router = require('koa-router');
const {helloWorld} = require("../../index");
const {hello} = require("../handlers/controller/helloWorldController");

const router = new Router({
    prefix: '/api'
});

router.get('/hello', hello)

module.exports = router;