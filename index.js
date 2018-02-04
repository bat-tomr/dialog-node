var join = require('path').join,
    spawn = require('child_process').spawn,
    os = require('os');

var OS = os.platform();
var retVal = "";

var cmd = [];

var OK = 1;
var CANCEL = 0;

var OK_STR = "OK";
var CANCEL_STR = "CANCEL"

if(OS != "linux" && OS != "darwin" && OS != "win32")
{
  console.log("unknown OS: ", OS);
  process.exit(9);
}

var dialogNode = module.exports = {

  init: function(){
    cmd = [];
  },

  info: function(str, title, timeout, callback){
    this.init();
    if( OS === "linux")
    {
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--info');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
      }

    }
    else if( OS === "darwin")
    {
      title = "information: " + title;
      str = str.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript') && cmd.push('-e');
      var script = 'tell app \"System Events\" to display dialog ';
      script += '\"' + str + '\" with title \"' + title + '\" buttons \"OK\"';
      script += ' giving up after ' + timeout;
      cmd.push(script);

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
      }

    }
    else if (OS === "win32")
    {
      cmd.push('cscript');
      cmd.push('//Nologo');
      cmd.push(__dirname + '\\msgbox.vbs');
      cmd.push('notification');
      cmd.push('information: ' + title);
      cmd.push(str);

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
      }
    }

    this.run(cmd, cb, callback);
  },

  warn: function(str, title, timeout, callback){
    this.init();
    if( OS === "linux")
    {
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--warning');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
      }

    }
    else if( OS === "darwin")
    {
      title = "warning: " + title;
      str = str.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript') && cmd.push('-e');
      var script = 'tell app \"System Events\" to display dialog ';
      script += '\"' + str + '\" with title \"' + title + '\" buttons \"OK\"';
      script += ' giving up after ' + timeout;
      cmd.push(script);

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
      }
    }
    else if (OS === "win32")
    {

      cmd.push('cscript');
      cmd.push('//Nologo');
      cmd.push(__dirname + '\\msgbox.vbs');
      cmd.push('notification');
      cmd.push('warning' + title);
      cmd.push(str);

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
      }
    }

    this.run(cmd, cb, callback);
  },

  error: function(str, title, timeout, callback){
    this.init();
    if( OS === "linux")
    {
      title = "error: " + title;
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--error');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
      }
    }
    else if( OS === "darwin")
    {
      str = str.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript') && cmd.push('-e');
      var script = 'tell app \"System Events\" to display dialog ';
      script += '\"' + str + '\" with title \"' + title + '\" buttons \"OK\"';
      script += ' giving up after ' + timeout;
      cmd.push(script);

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
      }
    }
    else if (OS === "win32")
    {
      cmd.push('cscript');
      cmd.push('//Nologo');
      cmd.push(__dirname + '\\msgbox.vbs');
      cmd.push('notification');
      cmd.push('error: ' + title);
      cmd.push(str);

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
      }
    }

    this.run(cmd, cb, callback);
  },

  question: function( str, title, timeout, callback){
    this.init();
    if( OS === "linux")
    {
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--question');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');
      cb = function(code, stdout, stderr){
        if(code)
          retVal = CANCEL_STR;
        else
          retVal = OK_STR;
        if(callback)
          callback(code, retVal, stderr);
      }
    }
    else if( OS === "darwin")
    {
      str = str.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript') && cmd.push('-e');
      var script = 'tell app \"System Events\" to display dialog ';
      script += '\"' + str + '\" with title \"' + title + '\" buttons {\"Cancel\", \"OK\"}';
      script += ' giving up after ' + timeout;
      cmd.push(script);
      cb = function(code, stdout, stderr){
        if(code)
          retVal = CANCEL_STR;
        else
          retVal = OK_STR;
        if(callback)
          callback(code, retVal, stderr);
      }
    }
    else if (OS === "win32")
    {
      cmd.push('cscript');
      cmd.push('//Nologo');
      cmd.push(__dirname + '\\msgbox.vbs');
      cmd.push('question');
      cmd.push(title);
      cmd.push(str);

      cb = function(code, stdout, stderr){
        if(stdout === "1")
          retVal = OK_STR;
        else
          retVal = CANCEL_STR;
        if(callback)
          callback(code, retVal, stderr);
      }
    }

    this.run(cmd, cb, callback);
  },

  entry: function( str, title, timeout, callback){
    this.init();
    if( OS === "linux")
    {
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--entry');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');
      cb = function(code, stdout, stderr){
        //remove line ending
        retVal = stdout.slice(0,-1);
        if(callback)
          callback(code, retVal, stderr);
      }
    }
    else if( OS === "darwin")
    {
      str = str.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript') && cmd.push('-e');

      var script = 'set theResponse to display dialog "' + str + '"';
      script += ' default answer "" ';
      script += ' with icon note with title \"' + title + '\"';
      script += ' buttons {"Cancel", "Continue"}';
      script += ' default button "Continue"'
      script += ' giving up after ' + timeout;

      // var script = 'tell app \"System Events\" to display dialog ';
      // script += '\"' + str + '\" with title \"' + title + '\" buttons {\"Cancel\", \"OK\"}';
      cmd.push(script);
      cb = function(code, stdout, stderr){
        //parse return from appl script code
        var findstr = "text returned:";
        retVal = stdout.slice(stdout.indexOf("text returned:") + findstr.length, -1);

        if(callback)
          callback(code, retVal, stderr);
      }
    }
    else if (OS === "win32")
    {
      cmd.push('cscript');
      cmd.push('//Nologo');
      cmd.push(__dirname + '\\msgbox.vbs');
      cmd.push('entry');
      cmd.push(title);
      cmd.push(str);

      cb = function(code, stdout, stderr){
        retVal = stdout;
        if(callback)
          callback(code, retVal, stderr);
      }
    }

    this.run(cmd, cb, callback);
  },

  calendar: function( str, title, timeout, callback){
    this.init();
    if( OS === "linux")
    {
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--calendar');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');
      cb = function(code, stdout, stderr){
        //remove line ending
        retVal = stdout.slice(0,-1);
        if(callback)
          callback(code, retVal, stderr);
      }
    }
    else if( OS === "darwin")
    {
      str = str.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript') && cmd.push(__dirname + '/datepicker.osa');
      cb = function(code, stdout, stderr){
        //remove line ending
        retVal = stdout.slice(0,-1);
        if(callback)
          callback(code, retVal, stderr);
      }
    }
    else if (OS === "win32")
    {
      this.entry( str, title, timeout, callback);
      return
    }

    this.run(cmd, cb, callback);
  },

  fileselect: function( str, title, timeout, callback){
    this.init();
    if( OS === "linux")
    {
      str = str.replace(/[<>]/g, '');
      cmd.push('zenity');
      cmd.push('--file-selection');
      cmd.push('--text') && cmd.push(str);
      cmd.push('--title') && cmd.push(title);
      cmd.push('--timeout') && cmd.push(timeout);
      if (str.length > 30) cmd.push('--width') && cmd.push('300');
      cb = function(code, stdout, stderr){
        //remove line ending
        retVal = stdout.slice(0,-1);
        if(callback)
          callback(code, retVal, stderr);
      }
    }
    else if( OS === "darwin")
    {
      str = str.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript') && cmd.push('-e');

      var script = 'set theDocument to (the POSIX path of (choose file with prompt "' + str + '"))';
      cmd.push(script);

      cb = function(code, stdout, stderr){
        //parse return from appl script code
        retVal = stdout.slice(0,-1);

        if(callback)
          callback(code, retVal, stderr);
      }
    }
    else if (OS === "win32")
    {
      cmd.push('cscript');
      cmd.push('//Nologo');
      cmd.push(__dirname + '\\msgbox.vbs');
      cmd.push('fileselect');
      cmd.push(title);
      cmd.push(str);

      cb = function(code, stdout, stderr){
        retVal = stdout;
        if(callback)
          callback(code, retVal, stderr);
      }
    }

    this.run(cmd, cb, callback);
  },

  debugprint: function(cmd,args,cb){
    console.log("debug-info: cmd = " + cmd );
    console.log("debug-info: args = " + args );
    console.log("debug-info: cb = " + cb);
    console.log('\n');
  },

  run: function(cmd, cb, callback){
    var bin = cmd[0],
        args = cmd.splice(1),
        stdout = '', stderr = '';

    try {
      var child = spawn(bin, args);
    } catch (err) {
        console.log('spawn failed : ' + err.message);
    }

    var stdoutlines = 0;

    //this.debugprint(cmd,args,callback);

    child.stdout.on('data', function(data){
      stdout += data.toString();
      stdoutlines++;
    })

    child.stderr.on('data', function(data){
      stderr += data.toString();
    })

    child.on('exit', function(code){
      cb && cb(code, stdout, stderr, callback);
    })
  }

}
