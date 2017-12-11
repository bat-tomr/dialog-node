var join = require('path').join,
    spawn = require('child_process').spawn,
    os = require('os');

var OS = os.platform();
var cmd = [];

var simpleDialog = module.exports = {

  info: function(str, title, timeout, callback){
    if( OS === "linux")
    {
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--info');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');

    }
    else if( OS === "darwin")
    {
      str = str.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript') && cmd.push('-e');
      var script = 'tell app \"System Events\" to display dialog ';
      script += '\"' + str + '\" with title \"' + title + '\" buttons \"OK\"';
      script += (type == 'info') ? " with icon 0" : "";
      cmd.push(script);
    }
    else if (OS === "win32")
    {

    }
    else
    {
      console.log("unknown OS: ", OS);
      process.exit(9);
    }

    this.debugprint(cmd,callback);
    this.run(cmd, callback);
  },

  warn: function(str, title, timeout, callback){
    if( OS === "linux")
    {
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--warning');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');

    }
    else if( OS === "darwin")
    {

    }
    else if (OS === "win32")
    {

    }
    else
    {
      console.log("unknown OS: ", OS);
      process.exit(9);
    }

    this.debugprint(cmd,callback);
    this.run(cmd, callback);
  },

  error: function(str, title, timeout, callback){
    if( OS === "linux")
    {
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--error');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');

    }
    else if( OS === "darwin")
    {

    }
    else if (OS === "win32")
    {

    }
    else
    {
      console.log("unknown OS: ", OS);
      process.exit(9);
    }

    this.debugprint(cmd,callback);
    this.run(cmd, callback);
  },

  question: function( str, title, timeout, callback){
    if( OS === "linux")
    {
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--question');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');

    }
    else if( OS === "darwin")
    {

    }
    else if (OS === "win32")
    {

    }
    else
    {
      console.log("unknown OS: ", OS);
      process.exit(9);
    }

    this.debugprint(cmd,callback);
    this.run(cmd, callback);
  },

  entry: function( str, title, timeout, callback){
    if( OS === "linux")
    {
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--entry');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');

    }
    else if( OS === "darwin")
    {

    }
    else if (OS === "win32")
    {

    }
    else
    {
      console.log("unknown OS: ", OS);
      process.exit(9);
    }

    this.debugprint(cmd,callback);
    this.run(cmd, callback);
  },

  calendar: function( str, title, timeout, callback){
    if( OS === "linux")
    {
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--calendar');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');

    }
    else if( OS === "darwin")
    {

    }
    else if (OS === "win32")
    {

    }
    else
    {
      console.log("unknown OS: ", OS);
      process.exit(9);
    }

    this.debugprint(cmd,callback);
    this.run(cmd, callback);
  },


  debugprint: function(cmd,cb){
    console.log("debug-info: cmd = " + cmd + "cb = " + cb);
  },

  run: function(cmd, cb){
    var bin = cmd[0],
        args = cmd.splice(1),
        stdout = '', stderr = '';

    var child = spawn(bin, args);

    child.stdout.on('data', function(data){
      stdout += data.toString();
    })

    child.stderr.on('data', function(data){
      stderr += data.toString();
    })

    child.on('exit', function(code){
      cb && cb(code, stdout, stderr);
    })
  }

}
