 var dialogNode = require('../dialog-node');
 var os = require('os');
 var events = require('events');

 callback = function(exitCode, retVal, stderr){
   console.log("exitCode = ", exitCode);
   console.log("return value = <" + retVal + ">");
   console.log("stderr = ", stderr);
   console.log(os.EOL);
   eventEmitter.emit('nextCall');
 };

// loop through all dialogs and exit. Since dialog-node is non-modal or non blocking
// We are handling the execution in our own little pseudo event queue

var eventEmitter = new events.EventEmitter();
var ptr = 0;

var eventQueue = [
	{ cmd:dialogNode.info,
		args:["This dialog closes in 3 seconds", "timeout", 3, callback] },
	{ cmd:dialogNode.warn,
		args:["Your bank accounts just got wiped!", "Bank Account", 0, callback] },
	{ cmd:dialogNode.error,
		args:["Found only Windows", "Proper OS missing", 0, callback] },
	{ cmd:dialogNode.question,
		args:["Do you really want me to launch this rocket ?", "Launch control", 0, callback] },
	{ cmd:dialogNode.entry,
		args:["Dear user, what do you like about me ?", "Opinion", 0, callback] },
	{ cmd:dialogNode.calendar,
		args:["Date of the birth of the Universe", "The beginning", 0, callback] },
	{ cmd:dialogNode.fileselect,
		args:["Which file do you want to send to your boss ?", "Resignation letter", 0, callback] },
	{ cmd:dialogNode.info,
		args:["The end...", "Last Dialog", 3, callback] },
	{ cmd:process.exit,
		args:[] }
];

var evalNextFunction = function(){
	var evalFun = eventQueue[ptr].cmd.apply(dialogNode, eventQueue[ptr].args);
	ptr++;
}

console.log("starting test-dialog-node ...");

eventEmitter.on('nextCall', evalNextFunction);

evalNextFunction();

console.log("... test-dialog-node finished");
