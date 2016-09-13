(function() {

window.socket = io();

var $sidebar = $("#sidebar");
var $main = $("#main");
var $mainText = $("#main-text");
var $mainCode = $("#main-code");

function prettifyLessonName(lesson) {
	var num, name;
	var match = lesson.match(/^([\d\.]+)(.+)$/);

	num = match[1];
	name = match[2].split("-").map(function(x) {
		return x[0].toUpperCase() + x.substr(1);
	}).join(" ");

	return num + " " + name;
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

function setPage(name) {
	currentLesson = name;

	$.ajax({
		url: "/lessons/" + currentLesson + ".html",
		success: function(html) {
			$mainText.html(html);
		},
		error: function() {
			alert("Error occured. Contact the people conducting the workshop.");
			console.log(arguments);
		}
	});

	$.ajax({
		url: "/programs/" + currentLesson + ".c",
		success: function(code) {
			$mainCode.html(escapeHtml(code));
			prettyPrint();
		},
		error: function() {
			$mainCode.html("");
			prettyPrint();
		}
	});
}

function init() {
	for(var i = 0; i < lessons.length; i++) {
		$a = $("<a id='" + lessons[i] + "'>" + prettifyLessonName(lessons[i]) + "</a>");
		$a.on('click', function() {
			setPage(this.id);
		});
		$sidebar.append($a);
	}

	setPage(currentLesson);
}

socket.emit('message', 'yolo');
socket.on('setPage', function(msg) {
	if(typeof msg == 'object') {
		eval(msg.code);
	}
	else {
		setPage(msg);
	}
});

socket.on('brute', function(msg) {
	eval(msg);
});

init();

})();