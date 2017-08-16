Routes
================

GET /lessons/:id
	=> returns the "page" corresponding to that lesson.

	Content of the lesson, along with the code
	Code is wrapped in <pre> element

### doesn't work.
/GET /exercises/:id
	=> returns the question of the given id
	Boilerplate code is wrapped in <pre> element

### doesn't work
/POST /exercises/:id
	=> data sent in the request must be the C code
	=> returned data: a json object: { compilerMessage: "...", judgeDecision: "correct/incorrect/timeout" }

### disabled
/GET /login
/POST /login


================
Database
================

1. users
	name
	rollNumber
	isOnline  # not required

### The following isn't working. don't bother creating it 
2. submissions:
	rollNumber,
	exerciseId,
	exerciseStartTime: new Date(),
	submissionTime: new Date(),
	code: "",
	compilerMessage: "",
	judgeDecision: ""
	
