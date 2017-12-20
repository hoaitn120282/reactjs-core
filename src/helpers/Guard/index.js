if (process.env.REACT_APP_ENV === 'production') {
    module.exports = require('./Guard.prod');
} else {
    module.exports = require('./Guard.dev');
}
