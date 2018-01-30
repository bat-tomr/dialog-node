var dialog = require('../dialog-node');

//will be called after user closes the dialog
var callback = function(code, retVal, stderr)
{
	console.log("return value = <" + retVal + ">");
}

dialog.fileselect('Type some text', "entry prompt", 0, callback);
