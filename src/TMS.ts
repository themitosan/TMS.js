/*
	**************************************************************************************

		TMS.js
		Created by TheMitoSan (@TheMitoSan)
		https://github.com/themitosan/TMS.js

		This file exists because I don't want to deal with jQuery anymore!

		Original source / motivation:
		http://youmightnotneedjquery.com/

		Original creator: TemmieHeartz.
		Thank you Temmie, you always will live on my heartz. <3

	**************************************************************************************
*/

// Log warning
var logWarnings = !0;

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
*/
export function getElement(elementId:string){
	var res:any;
	res = document.getElementById(elementId);
	if (res === null){
		res = document.getElementsByTagName(elementId)[0];
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
*/
export function appendCustomClass(name:string, css:any = {}){

	// Check if can add custom class
	if (Object.keys(css).length !== 0){

		// Check if document has the class holder
		if (getElement('TMS_JS_CLASS_LIST') === null){
			append('body', '<div style="display:none !important;" id="TMS_JS_CLASS_LIST"></div>');
		}

		// Create custom class
		var finalHtml = `.${name} { `;
		Object.keys(css).forEach(function(cKey:string){
			finalHtml = `${finalHtml}${cKey}: ${css[cKey]}; `;
		});
		finalHtml = `${finalHtml.slice(0, (finalHtml.length - 1))} }`;

		// Append class
		if (getElement(`TMS_JS_CLASS_${name}`) !== null){
			document.getElementById(`TMS_JS_CLASS_${name}`)!.innerHTML = finalHtml;
		} else {
			append('TMS_JS_CLASS_LIST', `<style id="TMS_JS_CLASS_${name}">${finalHtml}</style>`);
		}

	} else {
		tmsWarn('Unable to append new css class because no items were provided!');
	}

}

/**
	* Apply element CSS
	* @param elementId DOM ID target
	* @param cssChanges Object with new CSS data
*/
export function css(elementId:string, cssChanges:object){
	var elId = getElement(elementId);
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
*/
export function focus(elementId:string, sTimeout:number = 0){
	const elId = getElement(elementId);
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
*/
export function getCssData(elementId:string, cssAttrName:any){
	var result = '',
		elId = getElement(elementId);
	if (elId !== null){
		result = elId.style[cssAttrName];
		// Get computed style
		if (result === ''){
			result = window.getComputedStyle(elId)[cssAttrName];
		}
		// Get from DOM
		if (result === void 0){
			result = elId[cssAttrName];
		}
	} else {
		tmsWarn(`Unable to get element because it does not exist! (${elementId})`);
	}
	return result;
}

/**
	* Append data
	* @param elementId DOM ID target
	* @param newData HTML (or text) to be inserted
*/
export function append(elementId:string, newData:string){
	var elId = getElement(elementId);
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
*/
export function addClass(elementId:string, className:string){
	const elId = getElement(elementId);
	if (elId !== null){
		elId.classList.add(className);
	} else {
		tmsWarn(`Unable to add class because DOM does not exist! (${elementId})`);
	}
}

/**
	* Remove class
	* @param elementId DOM ID target
	* @param className CSS class name to be removed
*/
export function removeClass(elementId:string, className:string){
	const elId = getElement(elementId);
	if (elId !== null){
		elId.classList.remove(className);
	} else {
		tmsWarn(`Unable to remove class because DOM does not exist! (${elementId})`);
	}
}

/**
	* Clear innerHTML
	* @param elementId DOM ID target
*/
export function clear(elementId:string){
	const elId = getElement(elementId);
	if (elId !== null){
		elId.innerHTML = '';
	} else {
		tmsWarn(`Unable to clear inner data because DOM does not exist! (${elementId})`);
	}
}

/**
	* Trigger mouse click action on DOM element
	* @param elementId DOM ID target
*/
export function triggerClick(elementId:string){
	const elId = getElement(elementId);
	if (elId !== null){
		elId.click();
	} else {
		tmsWarn(`Unable to trigger click action because DOM does not exist! (${elementId})`);
	}

}

/**
	* Scroll view with focus on specific elements
	* @param elementId DOM ID target
	* @param timeout timeout before focus (default: 0)
*/
export function scrollCenter(elementId:string, timeout:number = 0){
	const elId = getElement(elementId);
	if (elId !== null){
		var parentDom = elId.parentElement,
			parentHeight = parentDom.offsetHeight,
			elHeight = parseFloat(window.getComputedStyle(elId).height.replace('px', ''));
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
*/
export function setInnerHtml(elementId:string, htmlData:string){
	const elId = getElement(elementId);
	if (elId !== null && elId.innerHTML !== htmlData){
		document.getElementById(elementId)!.innerHTML = htmlData;
	} else {
		tmsWarn(`Unable to set innerHTML because DOM does not exist or it contains the same innerHTML data (${elementId})`);
	}
}

/**
	* Remove HTML DOM
	* @param elementId DOM ID target
*/
export function removeDOM(elementId:string){
	const elId = getElement(elementId);
	if (elId !== null){
		document.getElementById(elementId)!.remove();
	} else {
		tmsWarn(`Unable to remove DOM because DOM does not exist! (${elementId})`);
	}
}

/**
	* Take out focus from HTML DOM (blur)
	* @param elementId DOM ID target
*/
export function blur(elementId:string){
	const elId = getElement(elementId);
	if (elId !== null){
		document.getElementById(elementId)!.blur();
	} else {
		tmsWarn(`Unable to blur DOM it does not exist! (${elementId})`);
	}
}

/**
	* Get number of DOM elements inside
	* @param elementId DOM ID target
*/
export function getChildCount(elementId:string){
	var res = 0,
		elId = getElement(elementId);
	if (elId !== null){
		res = document.getElementById(elementId)!.childElementCount;
		if (res < 0){
			res = 0;
		}
		return res;
	} else {
		tmsWarn(`Unable to get html collection because DOM does not exist! (${elementId})`);
	}
}

/**
	* Get element bounding client rect
	* @param elementId DOM ID target
*/
export function getRect(elementId:string){
	var res,
		elId = getElement(elementId);
	if (elId !== null){
		res = elId.getBoundingClientRect();
	} else {
		tmsWarn(`Unable to get rect because DOM does not exist! (${elementId})`);
	}
	return res;
}

/**
	* Get element coords based on parent element 
	* @param elementId DOM ID target
	* @returns T: Y, L: X, W: Width, H: Height, WL: X Pos. + It's own width, TH: Y Pos. + It's own height
*/
export function getCoords(elementId:string){

	var res,
		elId = getElement(elementId);

	if (elId !== null){

		var top = elId.offsetTop,
			left = elId.offsetLeft,
			width = elId.getBoundingClientRect().width,
			height = elId.getBoundingClientRect().height;

		res = {
			T: top,
			L: left,
			W: width,
			H: height,
			WL: parseFloat(width + left),
			TH: parseFloat(top + height)
		}

	} else {
		tmsWarn(`Unable to get coords because DOM does not exist! (${elementId})`);
	}

	return res;

}

// Export module
export * as TMS from './TMS';