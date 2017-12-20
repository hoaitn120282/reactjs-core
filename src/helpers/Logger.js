/* eslint no-console: 0 */

class Logger {
    static log(...args) {
        !(process.env.NODE_ENV === 'production') && console.log(...args);
    }

    static info(...args) {
        !(process.env.NODE_ENV === 'production') && console.info(...args);
    }

    static error(...args) {
        console.error(...args);
    }
}

export default Logger;
