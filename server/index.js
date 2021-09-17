const PORT = process.env.PORT || 3000;
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://techsessions-demo.web.app",
    methods: ["GET", "POST"]
  }
});

io.on("connection", socket => {

	socket.on("create-channel", channel => {
		socket.join(channel)
	});

	socket.on("join-channel", channel => {
		socket.join(channel);
		socket.emit("joined-channel", "you joined " + channel);
		socket.broadcast.to(channel).emit("joined-channel", "new member joined");
	});

	socket.on("send-message", message => {
		socket.broadcast.to(message.channel).emit("message", message.text);
	});

});

httpServer.listen(PORT);