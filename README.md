<h1 align="center">
	<img src="https://raw.githubusercontent.com/themitosan/TMS.js/main/tmsjs.png" width="120">
	<br><b>TMS.js</b><br>
	<img src="https://img.shields.io/github/license/themitosan/TMS.js" alt="license">
	<img src="https://img.shields.io/github/actions/workflow/status/themitosan/TMS.js/main.yaml" alt="build_status">
</h1>

Created by [TheMitoSan](https://themitosan.github.io/), this is a simple plugin for managing css and HTML stuff ___without jQuery___.

## Setup
[TS] - It's deadly simple!
- Download TMS.ts file and put it among your source files,
- Use a simple import to carry what you will need.<br>Example: `import * as TMS from './TMS.js';`
- Smile: you are a great person!

## Here is a preview of how to use some commands:

### TMS.css(domId, cssChanges)
Example: ```TMS.css('myDiv', {'width': '1920px', height: '1080px'});```

### TMS.focus(domId)
Example: ```TMS.focus('myButton');```

### TMS.scrollCenter(domId)
This will focus a specific element based on parent height.
Example: ```TMS.scrollCenter('betrayDiv');```

### TMS.addClass(domId, className)
Example: ```TMS.addClass('myDiv', 'fixWidth');```

### TMS.removeClass(domId, className)
Example: ```TMS.removeClass('myDiv', 'fixWidth');```

**INFO**: You can also _provide other contexts_ for all available functions. This allows you to manipulate data from another opened windows (like `nw.js` Window.open function).

Example: <code>
// Import module and create context variable
import * as TMS from './TMS';
var context;

// Open window
nw.Window.open('project/somePage.html', {}, function(data:any){
	context = data.window.document;
});

// Set div CSS data from new opened window by providing context
TMS.css('someDivInsideNewWindow', { 'width': '100%', height: '20px' }, context);
</code>

## External scripts / plugins used on this project:
- [uglify-js](https://www.npmjs.com/package/uglify-js)

## Many Thanks To:
- [You might not need jQuery](http://youmightnotneedjquery.com/)