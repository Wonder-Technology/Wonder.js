

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function getCanvas(param) {
  return param[/* canvas */0];
}

function unsafeGetCanvas(record) {
  return OptionService$Wonderjs.unsafeGet(record[/* canvas */0]);
}

function setCanvas(canvas, record) {
  return /* record */[/* canvas */Caml_option.some(canvas)];
}

function getOffset (canvas){
                var offset = [canvas.offsetLeft,  canvas.offsetTop];
                var offsetParent = canvas;

            while (offsetParent = offsetParent.offsetParent) {
                offset[0] += offsetParent.offsetLeft;
                offset[1] += offsetParent.offsetTop;
            }

            return offset;
};

export {
  getCanvas ,
  unsafeGetCanvas ,
  setCanvas ,
  getOffset ,
  
}
/* OptionService-Wonderjs Not a pure module */
