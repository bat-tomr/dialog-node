# simple-dialog

simple-dialog is providing developers a cross platform and easy way to use interactive dialogs for desktop applications written in nodejs. The code has been heavily inspired and influenced by Tomás Pollak and his dialog project (https://www.npmjs.com/package/dialog). simple-dialog takes the same concept of providing a wrapper around OS specific dialog tools like zenity, apple script and VBS but extends it to dialogs that request user inputs (like questions, input dialog or file selector). The approach of calling UI tools included int the OS by default has the advantage of avoiding heavier cross platform UI frameworks like electron.js or Qt and provides the following benefits:
* no external dependencies since simple-dialog does all the UI dialogs with onboard tools
* low memory foot print, important for IoT platforms like Raspberry
* low CPU consumption 

## Installation

```
npm install simple-dialog
```

## Running the tests

In order to run the test after installation:

```
cd simple-dialog
nodejs test-simple-dialog
```

This test will run through all available dialogs with some example settings

## Example
```
var dialog = require('../simple-dialog');

var callback = function(code, retVal, stderr)
	{
   		console.log("return value = <" + retVal + ">");
	}

dialog.entry('Type some text', "entry prompt", 0, callback);
```

## Supported Dialogs

### info

Information dialog with text and title and an OK button

### warn

Warning dialog with text and title and an OK button

### error

Error dialog with text and title and an OK button

### question

A dialog that displays text and title and that prompts user to click a Cancel or an OK button. OK is the default answer. 

Return value (see also callback mechanism) will contain the following values:
"" - dialog was killed through some other means (like close button, if there is one)
"CANCEL" - user clicked "Cancel' button"
"OK" - user clicked "OK" button

### entry

Dialog querying user to type in some text.

Return value (see also callback mechanism) will contain the following values:
"" - either user didn't type anything or dialog just got killed 
"<text>" - text that user typed before pressing 'OK' button

### calendar

Prompts user to select or type a date.

This one varies quite a bit from OS to OS

Return value (see also callback mechanism) will contain the following values:
"" - either user didn't select a date or dialog got killed

#### OS specific explanations

##### Linux
##### OSX
##### Windows

### file dialog

Prompts user to select a file. 

Return value (see also callback mechanism) will contain the following values:
"" - either user didn't  select a file or dialog got killed
"<path>" Absolute path of the file the user selected

## Callback mechanism

simple-dialogs are non-blocking and call a callback function after the user action happened (i.e. clicking 'OK' button). For dialogs that return some information (i.e. the entry text that the user typed), callback hands in retVal which contains the user's response as a string.

### Definition of callback
```
function(code, retVal, stderr)

code = return code from dialog 
retVal = user's response as a string
stderr = any error information that the dialog created
```

## Comments


## Known Bugs / Issues

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Thomas Ruge** - *Initial work*

## License

This project is licensed under the MIT License -

## Acknowledgments

* Tomás Pollak for the inspiration and elegant but short dialog code, see also https://github.com/tomas/dialog
* 

