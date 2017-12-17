# simple-dialog

simple-dialog is providing developers an easy cross platform way to use interactive dialogs for desktop applications written in nodejs. The code has been heavily inspired and influenced by Tomás Pollak and his dialog project (https://www.npmjs.com/package/dialog). simple-dialog takes the same concept of providing a wrapper around OS specific dialog tools like zenity, apple script and VBS but extends it to dialogs that request user inputs (like questions, input dialog or file selector). The approach of calling UI tools included int the OS by default has the advantage of avoiding the usage of heavier cross platform UI frameworks like electron.js or Qt and provides the following benefits:

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

### Example 

```
var dialog = require('../simple-dialog');

//will be called after user closes the dialog
var callback = function(code, retVal, stderr)
{
	console.log("return value = <" + retVal + ">");
}

dialog.entry('Type some text', "entry prompt", 0, callback);
```
## Usage

### Parameter for all dialogs
```
simple-dialog.<dialog>(msg, title, timeout, callback);

msg      = string containing specific dialog message
title    = string containing title of dialog (this parameter is not observed for all dialogs)
timeout  = dialog is timing out after <timeout> seconds, if parameter is 0 dialog does not time out
callback = to be called after user closes dialog, for further description see further below
```

### info

Information dialog with text and title and an OK button
```
simple-dialog.info(msg, title, timeout, callback);
```

### warn

Warning dialog with text and title and an OK button

```
simple-dialog.warn(msg, title, timeout, callback);
```

### error

Error dialog with text and title and an OK button
```
simple-dialog.error(msg, title, timeout, callback);
```

### question

A dialog that displays text and title and that prompts user to click a Cancel or an OK button. OK is the default answer. 

```
simple-dialog.question(msg, title, timeout, callback);
```

Returns the result of the user action as a string handed into the callback function (see also callback mechanism):
* "CANCEL" when user clicks the 'Cancel' button
* "OK" when user clicks the 'OK' button
* Empty string when user or system closed the dialog through other actions

### entry

Dialog querying user to type in some text.

```
simple-dialog.entry(msg, title, timeout, callback);
```

Returns the text the user typed as a string handed into the callback function (see also callback mechanism):
* Text that user typed in the entry mask before pressing the 'OK' button
* Empty string when user did not type anything or the system closed the dialog through other actions

### calendar

Prompts user to select or type a date. This one varies quite a bit across the different OSes.

```
simple-dialog.calendar(msg, title, timeout, callback);
```

Returns the date the user selected as a string handed into the callback function (see also callback mechanism):
* Date that user selected in the date picker before pressing the 'OK' button. Currently the date format is different for different OSes. This will be harmonized across all OSes at a later time.
* Empty string when user did not select a date or the system closed the dialog through other actions


### file select

Prompts user to select a file. 

```
simple-dialog.fileselect(msg, title, timeout, callback);
```

Returns the path of a selected file as a string handed into the callback function (see also callback mechanism):
* Path of file that user selected in the file picker before pressing the 'OK' button. Currently the path format is different for different OSes. This will be harmonized across all OSes at a later time.
* Empty string when user did not select a date or the system closed the dialog through other actions

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

* timeout not a functional parameter for some dialogs (i.e. file select) 

## Authors

* **Thomas Ruge** - *Initial work*

## License

This project is licensed under the MIT License -

## Acknowledgments

* Tomás Pollak for the inspiration and elegant but short dialog code, see also https://github.com/tomas/dialog
* OSX date picker from Shane Stanley, modified by Christopher Stone, see also https://forum.keyboardmaestro.com/t/feature-request-date-picker-in-prompt-for-user-action/3281


