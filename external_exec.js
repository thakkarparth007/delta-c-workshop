var child_process = require('child_process');
var spawn = child_process.spawn;

var program_name = process.argv[2];
var program = spawn(program_name, [process.argv[3]], { stdio: 'inherit' });

