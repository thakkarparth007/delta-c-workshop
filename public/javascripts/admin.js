(function() {

	socket.emit("message", "I'm the boss.");
	socket.on("message", alert.bind(window));

})();