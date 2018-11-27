

import * as Caml_array from "../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Pervasives from "../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Js_primitive from "../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

function findFirstHtmlElement($$document, str) {
  var elements = $$document.querySelectorAll(str);
  var match = elements.length;
  if (match !== 0) {
    return Js_primitive.some(Caml_array.caml_array_get(elements, 0));
  }
  
}

function setInnerHtml(eleStr, htmlElement) {
  htmlElement.innerHTML = eleStr;
  return htmlElement;
}

function getFirstChild(htmlElement) {
  return htmlElement.firstChild;
}

function _prepend(sourceElement, targetElement) {
  var match = targetElement.prepend;
  if (match == null) {
    return targetElement.insertBefore(sourceElement, targetElement.firstChild);
  } else {
    return targetElement.prepend(sourceElement);
  }
}

function prependTo(sourceElement, targetElement) {
  if (targetElement !== undefined) {
    var match = sourceElement.nodeType;
    if (match !== 1) {
      return sourceElement;
    } else {
      _prepend(sourceElement, Js_primitive.valFromOption(targetElement));
      return sourceElement;
    }
  } else {
    return Pervasives.failwith("targetElement should exist");
  }
}

function setBatchStyle(element, cssText) {
  element.style.cssText = cssText;
  return element;
}

var requestPointerLock = function (element){
  element.requestPointerLock();
  };

var exitPointerLock = function (){
  document.exitPointerLock();
  };

export {
  findFirstHtmlElement ,
  setInnerHtml ,
  getFirstChild ,
  _prepend ,
  prependTo ,
  setBatchStyle ,
  requestPointerLock ,
  exitPointerLock ,
  
}
/* No side effect */
