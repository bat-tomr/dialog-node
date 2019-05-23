'use strict';

const {spawn} = require('child_process'),
    os = require('os');

const OS = os.platform();

const OK_STR = 'OK';
const CANCEL_STR = 'CANCEL'

let cmd = [];
let cwd = __dirname; //preset cwd
let retVal = '';

if(OS != 'linux' && OS != 'darwin' && OS != 'win32')
{
  console.log('unknown OS: ', OS); // eslint-disable-line no-console
  process.exit(9);
}

/* const dialogNode = */ module.exports = {

  // some packaging tools don't set __dirname properly (webpack or jxcore)
  // this function allows the calling module to set dialog-node's working directory properly
  // which is necessary for dialog-node to find its assets
  // needs to be called before any other function
  // you can safely ignore this function if using no packaging tool(npm is fine)
  setCwd (dirname) {
    cwd = dirname;
  },

  init () {
    cmd = [];
  },

  info (message, title, timeout, callback){
    let cb;
    if (message && typeof message === 'object') {
        ({title, message, timeout, callback} = message);
    }
    timeout = timeout || 0;

    this.init();
    if( OS === 'linux')
    {
      message = message.replace(/[<>]/g, '');
      cmd.push(
        'zenity',
        '--info',
        '--text', message,
        '--title', title,
        '--timeout', timeout
      );
      if (message.length > 30) cmd.push('--width', '300');

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }

    }
    else if( OS === 'darwin')
    {
      title = 'information: ' + title;
      message = message.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript', '-e');
      let script = 'tell app "System Events" to display dialog ';
      script += `"${message}" with title "${title}" buttons "OK"`;
      script += ` giving up after ${timeout}`;
      cmd.push(script);

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }

    }
    else if (OS === 'win32')
    {
      cmd.push(
        'cscript',
        '//Nologo',
        'msgbox.vbs',
        'notification',
        'information: ' + title,
        message
      );

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }

    return this.run(cmd, cb, callback);
  },

  warn (message, title, timeout, callback){
    let cb;
    if (message && typeof message === 'object') {
        ({title, message, timeout, callback} = message);
    }
    timeout = timeout || 0;

    this.init();
    if( OS === 'linux')
    {
      message = message.replace(/[<>]/g, '');
      cmd.push(
        'zenity',
        '--warning',
        '--text', message,
        '--title', title,
        '--timeout', timeout
      );
      if (message.length > 30) cmd.push('--width', '300');

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }

    }
    else if( OS === 'darwin')
    {
      title = 'warning: ' + title;
      message = message.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript', '-e');
      let script = 'tell app "System Events" to display dialog ';
      script += `"${message}" with title "${title}" buttons "OK"`;
      script += ` giving up after ${timeout}`;
      cmd.push(script);

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }
    else if (OS === 'win32')
    {

      cmd.push(
        'cscript',
        '//Nologo',
        'msgbox.vbs',
        'notification',
        'warning' + title,
        message
      );

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }

    return this.run(cmd, cb, callback);
  },

  error (message, title, timeout, callback){
    let cb;
    if (message && typeof message === 'object') {
        ({title, message, timeout, callback} = message);
    }
    timeout = timeout || 0;

    this.init();
    if( OS === 'linux')
    {
      title = 'error: ' + title;
      message = message.replace(/[<>]/g, '');
      cmd.push(
        'zenity',
        '--error',
        '--text', message,
        '--title', title,
        '--timeout', timeout
      );
      if (message.length > 30) cmd.push('--width', '300');

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }
    else if( OS === 'darwin')
    {
      message = message.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript', '-e');
      let script = 'tell app "System Events" to display dialog ';
      script += `"${message}" with title "${title}" buttons "OK"`;
      script += ` giving up after ${timeout}`;
      cmd.push(script);

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }
    else if (OS === 'win32')
    {
      cmd.push(
        'cscript',
        '//Nologo',
        'msgbox.vbs',
        'notification',
        'error: ' + title,
        message
      );

      cb = function(code, stdout, stderr){
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }

    return this.run(cmd, cb, callback);
  },

  question ( message, title, timeout, callback){
    let cb;
    if (message && typeof message === 'object') {
        ({title, message, timeout, callback} = message);
    }
    timeout = timeout || 0;

    this.init();
    if( OS === 'linux')
    {
      message = message.replace(/[<>]/g, '');
      cmd.push(
        'zenity',
        '--question',
        '--text', message,
        '--title', title,
        '--timeout', timeout
      );
      if (message.length > 30) cmd.push('--width', '300');
      cb = function(code, stdout, stderr){
        if(code)
          retVal = CANCEL_STR;
        else
          retVal = OK_STR;
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }
    else if( OS === 'darwin')
    {
      message = message.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript', '-e');
      let script = 'tell app "System Events" to display dialog ';
      script += `"${message}" with title "${title}" buttons {"Cancel", "OK"}`;
      script += ` giving up after ${timeout}`;
      cmd.push(script);
      cb = function(code, stdout, stderr){
        if(code)
          retVal = CANCEL_STR;
        else
          retVal = OK_STR;
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }
    else if (OS === 'win32')
    {
      cmd.push(
        'cscript',
        '//Nologo',
        'msgbox.vbs',
        'question',
        title,
        message
      );

      cb = function(code, stdout, stderr){
        if(stdout === '1')
          retVal = OK_STR;
        else
          retVal = CANCEL_STR;
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }

    return this.run(cmd, cb, callback);
  },

  entry ( message, title, timeout, callback){
    let cb;
    if (message && typeof message === 'object') {
        ({title, message, timeout, callback} = message);
    }
    timeout = timeout || 0;
    this.init();
    if( OS === 'linux')
    {
      message = message.replace(/[<>]/g, '');
      cmd.push(
        'zenity',
        '--entry',
        '--text', message,
        '--title', title,
        '--timeout', timeout
      );
      if (message.length > 30) cmd.push('--width', '300');
      cb = function(code, stdout, stderr){
        //remove line ending
        retVal = stdout.slice(0,-1);
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }
    else if( OS === 'darwin')
    {
      message = message.replace(/"/g, "'"); // double quotes to single quotes
      cmd.push('osascript', '-e');

      let script = `set theResponse to display dialog "${message}"`;
      script += ' default answer "" ';
      script += ` with icon note with title "${title}"`;
      script += ' buttons {"Cancel", "Continue"}';
      script += ' default button "Continue"'
      script += ` giving up after ${timeout}`;

      // const script = 'tell app \"System Events\" to display dialog ';
      // script += '\"' + message + '\" with title \"' + title + '\" buttons {\"Cancel\", \"OK\"}';
      cmd.push(script);
      cb = function(code, stdout, stderr){
        //parse return from appl script code
        const findstr = 'text returned:';
        retVal = stdout.slice(stdout.indexOf('text returned:') + findstr.length, -1);

        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }
    else if (OS === 'win32')
    {
      cmd.push(
        'cscript',
        '//Nologo',
        'msgbox.vbs',
        'entry',
        title,
        message
      );

      cb = function(code, stdout, stderr){
        retVal = stdout;
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }

    return this.run(cmd, cb, callback);
  },

  calendar ( message, title, timeout, callback){
    let cb;
    if (message && typeof message === 'object') {
        ({title, message, timeout, callback} = message);
    }
    timeout = timeout || 0;

    this.init();
    if( OS === 'linux')
    {
      message = message.replace(/[<>]/g, '');
      cmd.push(
        'zenity',
        '--calendar',
        '--text', message,
        '--title', title,
        '--timeout', timeout
      );
      if (message.length > 30) cmd.push('--width', '300');
      cb = function(code, stdout, stderr){
        //remove line ending
        retVal = stdout.slice(0,-1);
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }
    else if( OS === 'darwin')
    {
      message = message.replace(/"/g, "'"); // double quotes to single quotes
      // cmd.push('osascript', 'datepicker.osa');
      cmd.push('/usr/bin/automator', 'datepicker.workflow');
      cb = function(code, stdout, stderr){
        //remove line ending
        retVal = stdout.slice(0,-1);
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }
    else if (OS === 'win32')
    {
      return this.entry( message, title, timeout, callback);
    }

    return this.run(cmd, cb, callback);
  },

  fileselect ( message, title, timeout, callback){
    let cb;
    if (message && typeof message === 'object') {
        ({title, message, timeout, callback} = message);
    }
    timeout = timeout || 0;

    this.init();
    if( OS === 'linux')
    {
      message = message.replace(/[<>]/g, '');
      cmd.push(
        'zenity',
        '--file-selection',
        '--text', message,
        '--title', title,
        '--timeout', timeout
      );
      if (message.length > 30) cmd.push('--width', '300');
      cb = function(code, stdout, stderr){
        //remove line ending
        retVal = stdout.slice(0,-1);
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }
    else if( OS === 'darwin')
    {
      message = message.replace(/"/g, "'"); // double quotes to single quotes


      const script =
          "const app = Application.currentApplication(); " +
          "app.includeStandardAdditions = true; " +
          "const document = app.chooseFile({withPrompt: \"" + message + "\" }); " +
          "console.log(\"text returned: \"+document);";

      cmd.push('osascript', '-l', 'JavaScript', '-e', script);

      cb = function(code, stdout, stderr){
        //parse return from appl script code
        const findstr = "text returned:";
        retVal = stdout.slice(stdout.indexOf(findstr) + findstr.length, -1).trim();
        if(!retVal)
            retVal = stderr.slice(stderr.indexOf(findstr) + findstr.length, -1).trim();
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }
    else if (OS === 'win32')
    {
      cmd.push(
        'cscript',
        '//Nologo',
        'msgbox.vbs',
        'fileselect',
        title,
        message
      );

      cb = function(code, stdout, stderr){
        retVal = stdout;
        if(callback)
          callback(code, retVal, stderr);
        return retVal;
      }
    }

    return this.run(cmd, cb, callback);
  },

  debugprint (cmd,args,cb){
    /* eslint-disable no-console */
    console.log('debug-info: cmd = ' + cmd );
    console.log('debug-info: args = ' + args );
    console.log('debug-info: cb = ' + cb);
    console.log('cwd = ' + cwd);
    console.log('\n');
    /* eslint-enable no-console */
  },

  run (cmd, cb, callback){
    const bin = cmd[0],
      args = cmd.splice(1);
    let stdout = '', stderr = '';

    return new Promise(function (resolve, reject) {
      let child;
      try {
        child = spawn(bin, args, {cwd:cwd});
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('spawn failed : ' + err.message);
      }

      //this.debugprint(cmd,args,callback);

      child.stdout.on('data', function(data){
        stdout += data.toString();
      })

      child.stderr.on('data', function(data){
        stderr += data.toString();
      })

      child.on('error', function(error){
        // eslint-disable-next-line no-console
        console.log('dialog-node, error = ', error);
      });

      child.on('exit', function(code){
        const response = cb && cb(code, stdout, stderr, callback);
        if (
          // Avoid treating as error (even with exit code 1, for cancel)
          !stderr.includes('User canceled') &&
          (
            code || (
              stderr &&
              // Avoid treating as error for:
              // ...fileselect response warning
              !stderr.includes('Class FIFinderSyncExtensionHost is implemented') &&
              // ...datepicker response warning
              !stderr.includes('Cache location entry for')
            )
          )
        ) {
          const err = new Error('exit');
          err.stderr = stderr;
          err.code = code;
          reject(err);
          return;
        }
        resolve({response, stderr});
      })
    });
  }
}
