(function() {

	$("#sidebar a").on('click', function(a) {
		socket.emit("setPage", this.id);
	});

})();