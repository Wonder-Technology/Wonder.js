

import * as Caml_array from "../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Pervasives from "../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Caml_option from "../../../../node_modules/bs-platform/lib/es6/caml_option.js";

function findFirstHtmlElement($$document, str) {
  var elements = $$document.querySelectorAll(str);
  var match = elements.length;
  if (match !== 0) {
    return Caml_option.some(Caml_array.caml_array_get(elements, 0));
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
      _prepend(sourceElement, Caml_option.valFromOption(targetElement));
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

function requestPointerLock (element){
  element.requestPointerLock();
  };

function exitPointerLock (param){
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
