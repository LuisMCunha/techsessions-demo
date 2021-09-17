const PORT = process.env.PORT || 3000;
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
	cors: {
		origin: ["https://techsessions-demo.web.app", "https://aquele-chat.web.app", "http://localhost:8100"],
		methods: ["GET", "POST"]
	}
});

io.on("connection", socket => {
	socket.on("create-channel", channel => {
		console.log("create-channel", channel);
		socket.join(channel)
	});

	socket.on("join-channel", channel => {
		console.log("join-channel", channel);
		socket.join(channel.name);
		socket.emit("joined-channel", "you joined " + channel.name);
		socket.broadcast.to(channel.name).emit("joined-channel", channel.userName + " joined the channel");
	});

	socket.on("send-message", message => {
		console.log("send-message", message);
		socket.broadcast.to(message.channel).emit("message", message);
	});
});

httpServer.listen(PORT);
