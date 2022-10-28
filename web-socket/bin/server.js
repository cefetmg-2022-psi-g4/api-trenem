const httpServer = require("http").createServer();
const { off } = require("process");
const Auth = require("../middlewares/Auth");

const io = require("socket.io")(httpServer, {
    cors: {
        origin: ["http://localhost:19006"],
        methods: ["GET", "POST"]
      }
});

io.on("connection", (socket) => {
    console.log("Nós no trampo ");
});



httpServer.listen(3010);