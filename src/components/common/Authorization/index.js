if (process.env.REACT_APP_ENV === 'production') {
    module.exports = require('./Authorization.prod');
} else {
    module.exports = require('./Authorization.dev');
}
