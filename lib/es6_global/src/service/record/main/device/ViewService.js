

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function getCanvas(param) {
  return param[/* canvas */0];
}

function unsafeGetCanvas(record) {
  return OptionService$Wonderjs.unsafeGet(record[/* canvas */0]);
}

function setCanvas(canvas, _) {
  return /* record */[/* canvas */Js_primitive.some(canvas)];
}

var getOffset = function (canvas){
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
