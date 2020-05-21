const PORT = process.env.PORT || 3000;
const io = require("socket.io")(PORT);

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