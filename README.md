# dialog-node

dialog-node is providing developers an easy cross platform way to use interactive dialogs for desktop applications written in nodejs. The code has been heavily inspired and influenced by Tomás Pollak and his dialog project (https://www.npmjs.com/package/dialog). dialog-node takes the same concept of providing a wrapper around OS specific dialog tools like zenity, apple script and VBS but extends it to dialogs that request user inputs (like questions, input dialog or file selector). The approach of calling UI tools included int the OS by default has the advantage of avoiding the usage of heavier cross platform UI frameworks like electron.js or Qt and provides the following benefits:

* no external dependencies since dialog-node does all the UI dialogs with onboard tools
* low memory foot print, important for IoT platforms like Raspberry
* low CPU consumption 

## Installation

```
npm install dialog-node
```

## Running the tests

In order to run the test after installation:

```
npm test
```

or

```
cd dialog-node
nodejs test-dialog-node
```

This test will run through all available dialogs with some example settings

### Example (see also example.js)

```
var dialog = require('dialog-node');

//will be called after user closes the dialog
var callback = function(code, retVal, stderr)
{
	console.log("return value = <" + retVal + ">");
}

dialog.entry('Type some text', "entry prompt", 0, callback);
```

in order to run example.js:

```
npm start
```
## Usage

### setCwd(directory) (optional)
Some packaging tools don't set `__dirname` properly (webpack or jxcore)
`setCwd` allows the calling module to set dialog-node's working directory properly
in order to find its assets
Needs to be called before any other function
You can safely ignore this function if using no packaging tool(npm is fine)

```
setCwd(directory);
directory = location of mode_modules folder that includes dialog-node
```

### Parameter for all dialogs
```
dialog-node.<dialog>(msg, title, timeout, callback);

msg      = string containing specific dialog message
title    = string containing title of dialog (this parameter is not observed for all dialogs)
timeout  = dialog is timing out after <timeout> seconds, if parameter is 0 dialog does not time out
callback = to be called after user closes dialog, for further description see further below
```

### info

Information dialog with text and title and an OK button
```
dialog-node.info(msg, title, timeout, callback);
```

### warn

Warning dialog with text and title and an OK button

```
dialog-node.warn(msg, title, timeout, callback);
```

### error

Error dialog with text and title and an OK button
```
dialog-node.error(msg, title, timeout, callback);
```

### question

A dialog that displays text and title and that prompts user to click a Cancel or an OK button. OK is the default answer. 

```
dialog-node.question(msg, title, timeout, callback);
```

Returns the result of the user action as a string handed into the callback function (see also callback mechanism):
* "CANCEL" when user clicks the 'Cancel' button
* "OK" when user clicks the 'OK' button
* Empty string when user or system closed the dialog through other actions

### entry

Dialog querying user to type in some text.

```
dialog-node.entry(msg, title, timeout, callback);
```

Returns the text the user typed as a string handed into the callback function (see also callback mechanism):
* Text that user typed in the entry mask before pressing the 'OK' button
* Empty string when user did not type anything or the system closed the dialog through other actions

### calendar

Prompts user to select or type a date. This one varies quite a bit across the different OSes.

```
dialog-node.calendar(msg, title, timeout, callback);
```

Returns the date the user selected as a string handed into the callback function (see also callback mechanism):
* Date that user selected in the date picker before pressing the 'OK' button. Currently the date format is different for different OSes. This will be harmonized across all OSes at a later time.
* Empty string when user did not select a date or the system closed the dialog through other actions


### file select

Prompts user to select a file. 

```
dialog-node.fileselect(msg, title, timeout, callback);
```

Returns the path of a selected file as a string handed into the callback function (see also callback mechanism):
* Path of file that user selected in the file picker before pressing the 'OK' button. Currently the path format is different for different OSes. This will be harmonized across all OSes at a later time.
* Empty string when user did not select a date or the system closed the dialog through other actions

## Callback mechanism

dialog-nodes are non-blocking and call a callback function after the user action happened (i.e. clicking 'OK' button). For dialogs that return some information (i.e. the entry text that the user typed), callback hands in retVal which contains the user's response as a string.

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


