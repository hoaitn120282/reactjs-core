if (process.env.REACT_APP_ENV === 'production') {
    module.exports = require('./RoleView.prod');
} else {
    module.exports = require('./RoleView.dev');
}
