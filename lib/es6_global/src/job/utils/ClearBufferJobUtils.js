

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function _getBitFromFlags(gl, param, getBufferBitFunc, bit) {
  var match = param[1].includes(param[0]);
  if (match) {
    if (bit !== undefined) {
      return bit | Curry._1(getBufferBitFunc, gl);
    } else {
      return Curry._1(getBufferBitFunc, gl);
    }
  } else {
    return bit;
  }
}

function getBit(gl, flags) {
  var match = _getBitFromFlags(gl, /* tuple */[
        "STENCIL_BUFFER",
        flags
      ], (function (prim) {
          return prim.STENCIL_BUFFER_BIT;
        }), _getBitFromFlags(gl, /* tuple */[
            "DEPTH_BUFFER",
            flags
          ], (function (prim) {
              return prim.DEPTH_BUFFER_BIT;
            }), _getBitFromFlags(gl, /* tuple */[
                "COLOR_BUFFER",
                flags
              ], (function (prim) {
                  return prim.COLOR_BUFFER_BIT;
                }), undefined)));
  if (match !== undefined) {
    return match;
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getBit", "should find bit", "", "", "flags:" + (String(flags) + "")));
  }
}

export {
  _getBitFromFlags ,
  getBit ,
  
}
/* Log-WonderLog Not a pure module */
