 var simpleDialog = require('../simple-dialog');
 var os = require('os');
 var events = require('events');

 callback = function(exitCode, retVal, stderr){
   console.log("exitCode = ", exitCode);
   console.log("return value = <" + retVal + ">");
   console.log("stderr = ", stderr);
   console.log(os.EOL);
   eventEmitter.emit('nextCall');
 };

// loop through all dialogs and exit. Since simple-dialog is non-modal or non blocking
// We are handling the execution in our own little pseudo event queue

var eventEmitter = new events.EventEmitter();
var ptr = 0;

var eventQueue = [
	{ cmd:simpleDialog.info, 
		args:["This dialog closes in 3 sseconds", "timeout", 3, callback] },
	{ cmd:simpleDialog.warn, 
		args:["Your bank accounts just got wiped!", "Bank Account", 0, callback] },
	{ cmd:simpleDialog.error, 
		args:["Found only Windows", "Proper OS missing", 0, callback] },
	{ cmd:simpleDialog.question, 
		args:["Do you really want me to launch this rocket ?", "Launch control", 0, callback] },
	{ cmd:simpleDialog.entry, 
		args:["Dear user, what do you like about me ?", "Opinion", 0, callback] },
	{ cmd:simpleDialog.calendar, 
		args:["Date of the birth of the Universe", "The beginning", 0, callback] },
	{ cmd:simpleDialog.fileselect, 
		args:["Which file do you want to send to your boss ?", "Reignation letter", 0, callback] },
	{ cmd:process.exit,
		args:[] }
];

var evalNextFunction = function(){
	var evalFun = eventQueue[ptr].cmd.apply(simpleDialog, eventQueue[ptr].args);
	ptr++;
}

eventEmitter.on('nextCall', evalNextFunction);

evalNextFunction();
