/*
	**************************************************************************************

		TMS.js
		Created by JulianaHeartz (@themitosan)
		https://github.com/themitosan/TMS.js

		This file exists because I don't want to deal with jQuery anymore!

		Original source / motivation:
		http://youmightnotneedjquery.com/

		Original creator: TemmieHeartz
		Thank you Temmie, you always will be alive on my heartz! <3

	**************************************************************************************
*/

/*
	Intarfaces
*/

// getCoords output
interface getCoordsData {
	T:number,
	L:number,
	W:number,
	H:number,
	TH:number,
	WL:number
}

/*
	Settings + debug functions
*/

// Log warnings
const logWarnings:boolean = !0;

/**
	* Warn if something go wrong
	* @param warnText text warning
*/
function tmsWarn(warnText:string){
	if (logWarnings === !0){
		const w = `[TMS.js] ${warnText}`;
		console.warn(w);
		window.alert(w);
	}
}

/*
	TMS.js Functions
*/

/**
	* Get element DOM
	* @param elementId DOM ID target
	* @param context where it will look for DOM. By default, is document. You dont need to change this option if your current application / website does't have external windows.
	* @returns HTML DOM elemenet or null
*/
export function getElement(elementId:string, context:any = document):any {
	var res:any = context.getElementById(elementId);
	if (res === null){
		res = context.getElementsByTagName(elementId)[0];
	}
	if (res === void 0){
		res = null;
	}
	return res;
}

/**
	* Append custom class
	* @param name class name
	* @param css class content
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function appendCustomClass(name:string, css:any = {}, context:object = document){

	// Check if can add custom class
	if (Object.keys(css).length !== 0){

		// Check if document has the class holder
		if (getElement('TMS_JS_CLASS_LIST', context) === null){
			append('body', '<div style="display:none !important;" id="TMS_JS_CLASS_LIST"></div>', context);
		}

		// Create custom class
		var finalHtml:string = `.${name} { `;
		Object.keys(css).forEach(function(cKey:string){
			finalHtml = `${finalHtml}${cKey}: ${css[cKey]}; `;
		});
		finalHtml = `${finalHtml.slice(0, (finalHtml.length - 1))} }`;

		// Append class
		if (getElement(`TMS_JS_CLASS_${name}`, context) !== null){
			getElement(`TMS_JS_CLASS_${name}`, context).innerHTML = finalHtml;
		} else {
			append('TMS_JS_CLASS_LIST', `<style id="TMS_JS_CLASS_${name}">${finalHtml}</style>`, context);
		}

	} else {
		tmsWarn('Unable to append new CSS class because no items were provided!');
	}

}

/**
	* Remove custom class
	* @param name custom class name
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function removeCustomClass(name:string, context:object = document){
	if (getElement(`TMS_JS_CLASS_${name}`, context) !== null){
		removeDOM(`TMS_JS_CLASS_${name}`, context);
	}
}

/**
	* Apply element CSS
	* @param elementId DOM ID target
	* @param cssChanges Object with new CSS data
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function css(elementId:string, cssChanges:object, context:object = document){
	var elId = getElement(elementId, context);
	if (elId !== null){
		Object.keys(cssChanges).forEach(function(cItem:string){
			elId.style[cItem] = (cssChanges as any)[cItem];
		});
	} else {
		tmsWarn(`Unable to apply CSS data because target it does not exist! (${elementId})`);
	}
}

/**
	* Focus element
	* @param elementId DOM ID target
	* @param sTimeout focus timeout (default: 0)
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function focus(elementId:string, sTimeout:number = 0, context:object = document){
	const elId = getElement(elementId, context);
	if (elId !== null){
		setTimeout(function(){
			elId.focus();
		}, sTimeout);
	} else {
		tmsWarn(`Unable to focus element because it does not exist! (${elementId})`);
	}
}

/**
	* Returns the attr value from CSS propriety
	* @param elementId DOM ID target
	* @param cssAttrName CSS attribute name
	* @returns String with css data or undentified
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function getCssStyle(elementId:string, cssAttrName:any, context:object = document):string | undefined {

	// Create main variable
	var res:string = '',
		elId = getElement(elementId, context);

	// Check if dom exists
	if (elId !== null){

		// Get style and computed style
		res = elId.style[cssAttrName];
		if (res === ''){
			res = window.getComputedStyle(elId)[cssAttrName];
		}
	
		// Get from DOM
		if (res === void 0){
			res = elId[cssAttrName];
		}

	} else {
		tmsWarn(`Unable to get element data because it does not exist! (${elementId})`);
	}

	// Return data
	return res;

}

/**
	* Get CSS data
	* @param elementId DOM target
	* @returns CSS args list or empty object if elementId doesn't exists
*/
export function getCssData(elementId:string, context:object = document):CSSStyleDeclaration {

	// Declare main vars
	var res:CSSStyleDeclaration | any = {},
		elId = getElement(elementId, context);

	// Check if dom target exists
	if (elId !== null){

		// Process all styles and check if current isn't empty
		Object.keys(window.getComputedStyle(elId)).forEach(function(cStyle:any){
			if (window.getComputedStyle(elId)[cStyle] !== '' && isNaN(Number(cStyle)) === !0){
				res[cStyle] = window.getComputedStyle(elId)[cStyle];
			}
		});

	} else {
		tmsWarn(`Unable to get element data because it does not exist! (${elementId})`);
	}

	// Return data
	return res;

}


/**
	* Append data
	* @param elementId DOM ID target
	* @param newData HTML (or text) to be inserted
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function append(elementId:string, newData:string, context:object = document){

	// Create var and check if dom exists
	var elId = getElement(elementId, context);
	if (elId !== null){
		elId.insertAdjacentHTML('beforeend', newData);
	} else {
		tmsWarn(`Unable to append element data because parent DOM does not exist! (${elementId})`);
	}

}

/**
	* Add class
	* @param elementId DOM ID target
	* @param className CSS class name to be added
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function addClass(elementId:string, className:string, context:object = document){

	// Create var and check if dom exists
	const elId = getElement(elementId, context);
	if (elId !== null){

		// Check if class exists on current DOM
		if (Array.from(elId.classList).indexOf(className) === -1){
			elId.classList.add(className);
		}

	} else {
		tmsWarn(`Unable to add class because DOM does not exist! (${elementId})`);
	}

}

/**
	* Remove class
	* @param elementId DOM ID target
	* @param className CSS class name to be removed
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function removeClass(elementId:string, className:string, context:object = document){

	// Create var and check if dom exists
	const elId = getElement(elementId, context);
	if (elId !== null){
		elId.classList.remove(className);
	} else {
		tmsWarn(`Unable to remove class because DOM does not exist! (${elementId})`);
	}

}

/**
	* Trigger mouse click action on DOM element
	* @param elementId DOM ID target
	* @param timeout delay before triggering trick in ms [default = 0]
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function triggerClick(elementId:string, timeout:number = 0, context:object = document){

	// Create var and check if dom exists
	const elId = getElement(elementId, context);
	if (elId !== null){
		setTimeout(function(){ elId.click(); }, timeout);
	} else {
		tmsWarn(`Unable to trigger click action because DOM does not exist! (${elementId})`);
	}

}

/**
	* Scroll view with focus on specific elements
	* @param elementId DOM ID target
	* @param timeout timeout before focus (default: 0)
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function scrollCenter(elementId:string, timeout:number = 0, context:object = document){

	// Get element and check if it exists
	const elId = getElement(elementId, context);
	if (elId !== null){

		const
			parentDom = elId.parentElement,
			parentHeight = parentDom.offsetHeight,
			elHeight = parseFloat(window.getComputedStyle(elId).height.replace('px', ''));

		// Scroll center
		setTimeout(function(){
			parentDom.scrollTo(0, (elId.offsetTop - ((parentHeight / 2) - (elHeight / 2))));
		}, timeout);

	} else {
		tmsWarn(`Unable to scroll because DOM does not exist! (${elementId})`);
	}
}

/**
	* Set data inside DOM
	* @param elementId DOM ID target
	* @param htmlData HTML string to be inserted
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function setInnerHtml(elementId:string, htmlData:string, context:object = document){

	// Create var and check if dom exists
	const elId = getElement(elementId, context);
	if (elId !== null && elId.innerHTML !== htmlData){
		elId.innerHTML = htmlData;
	} else {
		tmsWarn(`Unable to set innerHTML because DOM does not exist or it contains the same innerHTML data (${elementId})`);
	}

}

/**
	* Remove HTML DOM
	* @param elementId DOM ID target
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function removeDOM(elementId:string, context:object = document){

	// Create var and check if dom exists
	const elId = getElement(elementId, context);
	if (elId !== null){
		elId.remove();
	} else {
		tmsWarn(`Unable to remove DOM because DOM does not exist! (${elementId})`);
	}

}

/**
	* Take out focus from HTML DOM (blur)
	* @param elementId DOM ID target
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function blur(elementId:string, context:object = document){

	// Create var and check if dom exists
	const elId = getElement(elementId, context);
	if (elId !== null){
		elId.blur();
	} else {
		tmsWarn(`Unable to blur DOM it does not exist! (${elementId})`);
	}

}

/**
	* Get number of DOM elements inside
	* @param elementId DOM ID target
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
	* @returns Number of elements inside or undefined
*/
export function getChildCount(elementId:string, context:object = document):number | undefined {

	// Create vars
	var res:number = 0,
		elId = getElement(elementId, context);

	// Check if dom exists
	if (elId !== null){

		// Get child number and prevent it being negative
		res = elId.childElementCount;
		if (res < 0){
			res = 0;
		}

		// Return count
		return res;

	} else {
		tmsWarn(`Unable to get HTML collection because DOM does not exist! (${elementId})`);
	}
}

/**
	* Get element bounding client rect
	* @param elementId DOM ID target
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function getRect(elementId:string, context:object = document):any {

	// Create vars
	var res:any,
		elId = getElement(elementId, context);

	// Check if dom exists
	if (elId !== null){
		res = elId.getBoundingClientRect();
	} else {
		tmsWarn(`Unable to get rect because DOM does not exist! (${elementId})`);
	}

	// Return data
	return res;

}

/**
	* Get element coords based on parent element 
	* @param elementId DOM ID target
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
	* @returns Object - T: Y, L: X, W: Width, H: Height, WL: X Pos. + It's own width, TH: Y Pos. + It's own height
*/
export function getCoords(elementId:string, context:object = document):getCoordsData {

	// Variables
	var elId = getElement(elementId, context),
		res:getCoordsData = {
			T: 0,
			L: 0,
			W: 0,
			H: 0,
			TH: 0,
			WL: 0
		};

	// Check if element exists
	if (elId !== null){

		// Get coords data
		var top = elId.offsetTop,
			left = elId.offsetLeft,
			width = elId.getBoundingClientRect().width,
			height = elId.getBoundingClientRect().height;

		// Set res data
		res = {
			T: Number(top),
			L: Number(left),
			W: Number(width),
			H: Number(height),
			TH: parseFloat(top + height),
			WL: parseFloat(width + left),
		}

	} else {
		tmsWarn(`Unable to get coords because DOM does not exist! (${elementId})`);
	}

	// Return data
	return res;

}

/**
	* Set element disable status
	* @param elementId DOM id target
	* @param status disabled status
	* @param context window context. if not using external windows (like nwjs nw.Window.open), leave it alone.
*/
export function setDisabledStatus(elemenetId:string, status:boolean, context:object = document){

	// Get element data and check if element exists
	const elId = getElement(elemenetId, context);
	if (elId !== null){
		elId.disabled = status;
	} else {
		tmsWarn(`Unable to set disabled status because DOM does not exist! (${elemenetId})`);
	}

}

// Export module
export * as TMS from './TMS';