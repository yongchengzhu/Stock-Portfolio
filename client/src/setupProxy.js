const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy(['/signin', '/signup', '/transactions', '/balance', '/owned', '/buy', '/update_owned'], { target: 'http://localhost:3090' }));
}
