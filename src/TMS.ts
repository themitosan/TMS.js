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

declare var TMS: any;

// Log warning
var logWarnings = !1;

// Warn if something go wrong
export function warn(warnText:string){
	if (logWarnings === !0){
		console.warn(`[TMS.js] ${warnText}`);
	}
}

/*
	TMS Functions
*/

/*
	Get element
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

/*
	CSS
*/
export function css(elementId:string, cssChanges:object){

	var eReason = [],
		elId = TMS.getElement(elementId);

	if (elId === null){
		eReason.push(`DOM or Tag does not exist! (${elementId})`);
	}

	// End
	if (eReason.length === 0){

		Object.keys(cssChanges).forEach(function(cItem:string){
			elId.style[cItem] = (cssChanges as any)[cItem];
		});

	} else {
		TMS.warn(`Unable to apply CSS data!\n${eReason.toString().replace(RegExp(',', 'gi'), '\n')}`);
	}

}

/*
	Focus Element
	sTimeout = time [ms]
*/
export function focus(elementId:string, sTimeout:number = 0){

	const elId = TMS.getElement(elementId);

	if (elId !== null){

		setTimeout(function(){
			elId.focus();
		}, sTimeout);

	} else {
		TMS.warn(`Unable to focus element because it does not exist! (${elementId})`);
	}

}

/*
	Disable Element
*/
export function disableElement(idList:string[]){

	idList.forEach(function(cItem){

		const elId = TMS.getElement(cItem);

		if (elId !== null){

			elId.disabled = !0;
			elId.disabled = 'disabled';

			// If is <input>
			if (elId.type === 'button'){
				TMS.css(cItem, {'filter': 'grayscale(1) blur(0.8px)', 'cursor': 'not-allowed', 'opacity': '0.6'});
			}

		} else {
			TMS.warn(`Unable to disable element because it does not exist! (${cItem})`);
		}

	});

}

/*
	Enable Element
*/
export function enableElement(elementId:string){

	const elId = TMS.getElement(elementId);

	if (elId !== null){

		elId.disabled = '';
		elId.disabled = !1;

		if (elId.type === 'button'){
			TMS.css(elementId, {'filter': 'grayscale(0) blur(0px)', 'cursor': 'pointer', 'opacity': '1'});
		}

	} else {
		TMS.warn(`Unable to enable element because it does not exist! (${elementId})`);
	}

}

/*
	Get CSS data
	Returns the attr value from CSS propriety
*/
export function getCssData(elementId:string, cssAttrName:any){

	var result = '',
		elId = TMS.getElement(elementId);

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
		TMS.warn(`Unable to get element because it does not exist! (${elementId})`);
	}

	return result;
}

/*
	Scroll top
	Usage: elementObjects = {HTML_DOM_ID_0: scrollInt, HTML_DOM_ID_1: scrollInt2} and goes on
*/
export function scrollTop(elementObjects:string[]){
	Object.keys(elementObjects).forEach(function(elementId:any){

		const elId = TMS.getElement(elementId);

		if (elId !== null){
			elId.scrollTop = elementObjects[elementId];
		} else {
			TMS.warn(`Unable to scroll element because it does not exist! (${elementId})`);
		}

	});
}

/*
	Append data
*/
export function append(elementId:string, newData:string){

	var elId = TMS.getElement(elementId);

	if (elId !== null){
		elId.insertAdjacentHTML('beforeend', newData);
	} else {
		TMS.warn(`Unable to append element data because parent DOM does not exist! (${elementId})`);
	}

}

/*
	Add Class
*/
export function addClass(elementId:string, className:string){

	const elId = TMS.getElement(elementId);

	if (elId !== null){
		elId.classList.add(className);
	} else {
		TMS.warn(`Unable to add class because DOM does not exist! (${elementId})`);
	}
}

/*
	Remove Class
*/
export function removeClass(elementId:string, className:string){

	const elId = TMS.getElement(elementId);

	if (elId !== null){
		elId.classList.remove(className);
	} else {
		TMS.warn(`Unable to remove class because DOM does not exist! (${elementId})`);
	}

}

/*
	Clear
	Removes all HTML inside
*/
export function clear(elementId:string){

	const elId = TMS.getElement(elementId);

	if (elId !== null){
		elId.innerHTML = '';
	} else {
		TMS.warn(`Unable to clear inner data because DOM does not exist! (${elementId})`);
	}

}

/*
	triggerClick
*/
export function triggerClick(elementId:string){

	const elId = TMS.getElement(elementId);

	if (elId !== null){
		elId.click();
	} else {
		TMS.warn(`Unable to clear inner data because DOM does not exist! (${elementId})`);
	}

}

/*
	scrollCenter
*/
export function scrollCenter(elementId:string, delay:number = 0){

	const elId = TMS.getElement(elementId);

	if (elId !== null){

		var parentDom = elId.parentElement,
			parentHeight = parentDom.offsetHeight,
			elHeight = parseFloat(window.getComputedStyle(elId).height.replace('px', ''));

		setTimeout(function(){
			parentDom.scrollTo(0, (elId.offsetTop - ((parentHeight / 2) - (elHeight / 2))));
		}, delay);

	} else {
		TMS.warn(`Unable to scroll because DOM does not exist! (${elementId})`);
	}

}

/*
	setInnerHtml
*/
export function setInnerHtml(elementId:string, htmlData:string){


	const elId = TMS.getElement(elementId);

	if (elId !== null && elId.innerHTML !== htmlData){
		document.getElementById(elementId)!.innerHTML = htmlData;
	} else {
		TMS.warn(`Unable to set innerHTML because DOM does not exist or it contains the same innerHTML data (${elementId})`);
	}

}

/*
	Remove HTML DOM
*/
export function removeDOM(elementId:string){

	const elId = TMS.getElement(elementId);

	if (elId !== null){
		document.getElementById(elementId)!.remove();
	} else {
		TMS.warn(`Unable to remove DOM because DOM does not exist! (${elementId})`);
	}

}

/*
	Blur element
*/
export function blur(elementId:string){

	const elId = TMS.getElement(elementId);

	if (elId !== null){
		document.getElementById(elementId)!.blur();
	} else {
		TMS.warn(`Unable to blur DOM because DOM does not exist! (${elementId})`);
	}

}

/*
	Get HTML child count
*/
export function getChildCount(elementId:string){

	var res = 0,
		elId = TMS.getElement(elementId);

	if (elId !== null){

		res = document.getElementById(elementId)!.childElementCount;
		if (res < 0){
			res = 0;
		}

		return res;

	} else {
		TMS.warn(`Unable to get html collection because DOM does not exist! (${elementId})`);
	}

}

/*
	Get HTML element rect
*/
export function getRect(elementId:string){

	var res,
		elId = TMS.getElement(elementId);

	if (elId !== null){
		res = elId.getBoundingClientRect();
	} else {
		TMS.warn(`Unable to get rect because DOM does not exist! (${elementId})`);
	}

	return res;

}

/*
	Get HTML dom coords.
	Get element coords based on parent element 

	T:  Y
	L:  X
	W:  Width
	H:  Height
	WL: X Pos. + It's own width
	TH: Y Pos. + It's own height
*/
export function getCoords(elementId:string){

	var res,
		elId = TMS.getElement(elementId);

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
		TMS.warn(`Unable to get coords because DOM does not exist! (${elementId})`);
	}

	return res;
}

// Export module
export * as TMS from './TMS.js';