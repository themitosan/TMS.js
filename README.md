<h1 align="center">
	<img src="https://raw.githubusercontent.com/themitosan/TMS.js/main/tmsjs.png" width="120">
	<br><b>TMS.js</b><br>
	<img src="https://img.shields.io/github/license/themitosan/TMS.js" alt="license">
	<img src="https://img.shields.io/github/actions/workflow/status/themitosan/TMS.js/main.yaml" alt="build_status">
</h1>

Created by [TheMitoSan](https://themitosan.github.io/), this is a simple plugin for managing css and HTML stuff ___without jQuery___.

## Setup
[TS] - It's deadly simple!
- Download TMS.ts file and put it among your source files
- Use a simple import to carry what you will need.<br>Example: `import * as TMS from './TMS.js';`
- Smile: you are a great person!

## Here is a preview of how to use some commands:

### TMS.css(domId, cssChanges)
Apply CSS style on a DOM Element.
```ts
TMS.css('myDiv', {'width': '1920px', height: '1080px'});
```

### TMS.focus(domId)
Gives focus to a specific DOM Element.
```ts
TMS.focus('myButton');
```

### TMS.scrollCenter(domId)
This function will focus a DOM Element inside a scrollable list, making it centered.
```ts
TMS.scrollCenter('betrayDiv');
```

### TMS.addClass(domId, className)
This will append a specified CSS class to a DOM Element.
```ts
TMS.addClass('myDiv', 'fixWidth');
```

### TMS.removeClass(domId, className)
This will remove some specific class from a DOM Element.
```ts
TMS.removeClass('myDiv', 'fixWidth');
```

## Context
You can also provide _other contexts_ for all available functions. This allows you to manipulate data from other windows (like [nwjs](https://nwjs.io/) `nw.Window.open` function).

Example: 
```ts

/*
	Using TMS.js context with TS
*/

// Import module and create context variable
import * as TMS from './TMS';
var context:Document;

// Open window
nw.Window.open('project/somePage.html', {}, function(data:any){
	context = data.window.document;
});

// Set div CSS data from new opened window by providing context
TMS.css('someDivInsideNewWindow', { 'width': '100%', height: '20px' }, context);
```

## External scripts / plugins used on this project:
- [uglify-js](https://www.npmjs.com/package/uglify-js)

## Many Thanks To:
- [You might not need jQuery](http://youmightnotneedjquery.com/)
