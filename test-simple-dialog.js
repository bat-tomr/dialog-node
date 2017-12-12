 var dialog = require('../simple-dialog');

 dialog.calendar("str", "title", 0, function(code, stdout, stderr){
   console.log("callback!");
   console.log("code = ", code);
   console.log("stdout = ", stdout);
   console.log("stderr = ", stderr);
 });
