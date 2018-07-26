

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_math from "../../../../../node_modules/bs-platform/lib/es6/js_math.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as NumberService$Wonderjs from "../primitive/NumberService.js";

var regex_num = (/^\#([0-9a-f]{6})$/i);

function _handleInValidHexStr(hexStr) {
  return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("convert16HexToRGBA", "color should be #xxxxxx, but actual is " + (String(hexStr) + ""), "", "", ""));
}

function convert16HexToRGBA(hexStr) {
  var match = regex_num.exec(hexStr);
  if (match !== null) {
    var match$1 = Caml_array.caml_array_get(match, 1);
    if (match$1 == null) {
      return _handleInValidHexStr(hexStr);
    } else {
      var hex = Js_math.floor(Curry._1(NumberService$Wonderjs.hexFloat_of_string, match$1));
      return /* tuple */[
              ((hex >>> 16) & 255) / 255,
              ((hex >>> 8) & 255) / 255,
              (hex & 255) / 255,
              1
            ];
    }
  } else {
    return _handleInValidHexStr(hexStr);
  }
}

export {
  regex_num ,
  _handleInValidHexStr ,
  convert16HexToRGBA ,
  
}
/* regex_num Not a pure module */
