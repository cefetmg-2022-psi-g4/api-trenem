const WebSocket = require('ws');

function broadcast(number) {
    if (!this.clients) return
    this.clients.forEach(client => {
        console.log("Mais um cliente.");
    })
}

function onError(ws, err) {
    console.error(`onError: ${err.message}`)
}
 
function onConnection(ws, req) {
    ws.on('message', function(msg){ console.log(msg) })
    ws.on('error', error => onError(ws, error))
    console.log(`onConnection`)
}

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    })
 
    wss.on('connection', onConnection)
    wss.broadcast = broadcast

    console.log(`Web-Socket do Trenem online!`)
    return wss
}