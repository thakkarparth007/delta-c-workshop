var io = null;

function onconnect(socket) {
	socket.on('setPage', function(msg) {
		if(socket.request.session.isAdmin)
			io.emit("setPage", msg);
	});
}

function init(_io) {
	io = _io;
	io.on('connection', onconnect);
}

module.exports = exports = init;