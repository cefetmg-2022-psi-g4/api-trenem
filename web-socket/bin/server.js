const app = require('../src/app');
const appws = require('../src/app-ws.js')
const port = normalizaPort(process.env.PORT || '3010');
const port2 = normalizaPort(process.env.PORT || '3011');

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

app.listen(port, function () {
    console.log(`App listening on port ${port}`)
})

appws(port2);