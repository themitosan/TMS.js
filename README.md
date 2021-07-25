# TMS.js
Created by <a href="https://themitosan.gihtub.io/">TheMitoSan</a>, this is a simple plugin for managing css and HTML stuff without jQuery.<br>

## Setup
It's simple!
- Download TMS.js file
- Include it on your HTML page as you are used to do! `<script type="text/javascript" src="YourPath/TMS.js"></script>`
- Smile :D

## Available commands

### TMS.css(domId, cssChanges)
Example: ```TMS.css('myDiv', {'width': '1920px', height: '1080px'});```<br>
<i>For now, it works only with id.</i>

### TMS.animate(domId, cssChanges, duration, transition)
Example: ```TMS.animate('myDiv', {'width': '100px', 'height': '100px'}, 1200, 'cubic-bezier(0, 1.06, 0, 1.02)');```

### TMS.focus(domId)
Example: ```TMS.focus('myButton');```

### TMS.disableElement(domId)
This will disable an element, good for buttons and inputs.
Example: ```TMS.disableElement('myButton');```

### TMS.enableElement(domId)
This will enable an element, if disabled by the function above!
Example: ```TMS.enableElement('myButton');```

### TMS.scrollTop(elementObjects)
This will scroll a list of containers to a specific state.
Example: ```TMS.scrollTop({'divA': 0, 'divB': 10, 'divC': 20});```
`divA` will be scroll to 0, `divB` to 20 and goes on...

### TMS.append(parent, newData)
Example: ```TMS.append('myDiv', '<a href="#">A new link for you!</a>');```

### TMS.addClass(domId, className)
Example: ```TMS.addClass('myDiv', 'fixWidth');```

### TMS.removeClass(domId, className)
Example: ```TMS.removeClass('myDiv', 'fixWidth');```

### TMS.clear(domId)
This will clean the inner HTML from a element
Example: ```TMS.clear('myDiv');```

### TMS.fadeIn(domId, duration)
This will fade in an element
Example: ```TMS.fadeIn('mySassyDiv', 600);```

### TMS.fadeOut(domId, duration)
This will fade out an element
Example: ```TMS.fadeOut('mySassyDiv', 600);```

### TMS.scrollCenter(domId)
This will focus a specific element based on parents height.
Example: ```TMS.scrollCenter('betrayDiv');```

## Many Thanks To:
- You might not need jQuery: <a target="_blank" href="http://youmightnotneedjquery.com/">http://youmightnotneedjquery.com/</a>
