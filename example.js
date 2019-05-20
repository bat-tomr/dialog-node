'use strict';
var dialog = require('../dialog-node');

//will be called after user closes the dialog
var callback = function(code, retVal, stderr)
{
	console.log("return value = <" + retVal + ">");
};

// dialog.setCwd(__dirname);
dialog.fileselect('Type some text', "entry prompt", 0, callback);

/*
(async () => {

const retVal = await dialog.entry('Type some text', "entry prompt");
console.log("return2 value = <" + retVal + ">");

})();
*/
