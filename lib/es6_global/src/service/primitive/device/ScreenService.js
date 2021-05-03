

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as DomExtend$Wonderjs from "../../../external/DomExtend.js";

function queryFullScreenData(param) {
  var root = window;
  return /* tuple */[
          0,
          0,
          root.innerWidth,
          root.innerHeight,
          "100%",
          "100%"
        ];
}

function _setAbsolutePosition(canvas) {
  canvas.style.position = "absolute";
  return canvas;
}

function setX(x, canvas) {
  canvas.style.left = "" + (String(x) + "px");
  return canvas;
}

function setY(y, canvas) {
  canvas.style.top = "" + (String(y) + "px");
  return canvas;
}

function setWidth(width, canvas) {
  canvas.width = width;
  return canvas;
}

function setHeight(height, canvas) {
  canvas.height = height;
  return canvas;
}

function setStyleWidth(width, canvas) {
  canvas.style.width = width;
  return canvas;
}

function setStyleHeight(height, canvas) {
  canvas.style.height = height;
  return canvas;
}

function _setBodyMargin($$document) {
  var bodies = $$document.querySelectorAll("body");
  if (bodies.length === 0) {
    return /* () */0;
  } else {
    DomExtend$Wonderjs.setBatchStyle(Caml_array.caml_array_get(bodies, 0), "margin:0");
    return /* () */0;
  }
}

function setToFullScreen(param, canvas) {
  _setBodyMargin(document);
  return setStyleHeight(param[5], setStyleWidth(param[4], setHeight(param[3], setWidth(param[2], setY(param[1], setX(param[0], _setAbsolutePosition(canvas)))))));
}

function setScreenSize(param, canvas) {
  return setStyleHeight(param[3], setStyleWidth(param[2], setHeight(param[1], setWidth(param[0], canvas))));
}

export {
  queryFullScreenData ,
  _setAbsolutePosition ,
  setX ,
  setY ,
  setWidth ,
  setHeight ,
  setStyleWidth ,
  setStyleHeight ,
  _setBodyMargin ,
  setToFullScreen ,
  setScreenSize ,
  
}
/* No side effect */
