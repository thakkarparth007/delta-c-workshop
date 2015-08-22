Routes
================

GET /lessons/:id
	=> returns the "page" corresponding to that lesson.

	Content of the lesson, along with the code
	Code is wrapped in <pre> element

/GET /exercises/:id
	=> returns the question of the given id
	Boilerplate code is wrapped in <pre> element

/POST /exercises/:id
	=> data sent in the request must be the C code
	=> returned data: a json object: { compilerMessage: "...", judgeDecision: "correct/incorrect/timeout" }

/GET /login
/POST /login


================
Database
================

1. users
	name
	rollNumber
	isOnline

2. submissions:
	rollNumber,
	exerciseId,
	exerciseStartTime: new Date(),
	submissionTime: new Date(),
	code: "",
	compilerMessage: "",
	judgeDecision: ""
	