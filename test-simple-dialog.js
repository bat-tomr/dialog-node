 var dialog = require('../simple-dialog');

 dialog.fileselect("str", "title", 0, function(code, retVal, stderr){
   console.log("callback!");
   console.log("code = ", code);
   console.log("retVal = <" + retVal + ">");
   console.log("stderr = ", stderr);
 });
