

import * as Js_option from "./../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";

function _getElementIndexUint(gl) {
  var match = gl.getExtension("OES_element_index_uint");
  if (match == null) {
    Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getExtension", "not support OES_element_index_uint extension", "", "", ""));
    return false;
  } else {
    return true;
  }
}

function _getExtension(name, gl) {
  var tmp;
  switch (name) {
    case "element_index_uint" : 
        tmp = _getElementIndexUint(gl);
        break;
    case "instanced_arrays" : 
        tmp = gl.getExtension("ANGLE_instanced_arrays");
        break;
    default:
      tmp = gl.getExtension(name);
  }
  if (tmp == null) {
    return undefined;
  } else {
    return Caml_option.some(tmp);
  }
}

function _detectExtension(gl, record) {
  return /* record */[
          /* extensionInstancedArrays */_getExtension("instanced_arrays", gl),
          /* extensionElementIndexUint */_getExtension("element_index_uint", gl),
          /* precision */record[/* precision */2],
          /* maxTextureUnit */record[/* maxTextureUnit */3]
        ];
}

function _detectPrecision(gl, record) {
  var vertexShader = gl.VERTEX_SHADER;
  var fragmentShader = gl.FRAGMENT_SHADER;
  var highFloat = gl.HIGH_FLOAT;
  var mediumFloat = gl.MEDIUM_FLOAT;
  var vertexShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(vertexShader, highFloat);
  var vertexShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(vertexShader, mediumFloat);
  var fragmentShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(fragmentShader, highFloat);
  var fragmentShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(fragmentShader, mediumFloat);
  var highpAvailable = vertexShaderPrecisionHighpFloat.precision > 0 && fragmentShaderPrecisionHighpFloat.precision > 0;
  var mediumpAvailable = vertexShaderPrecisionMediumpFloat.precision > 0 && fragmentShaderPrecisionMediumpFloat.precision > 0;
  if (highpAvailable) {
    return /* record */[
            /* extensionInstancedArrays */record[/* extensionInstancedArrays */0],
            /* extensionElementIndexUint */record[/* extensionElementIndexUint */1],
            /* precision *//* HIGHP */0,
            /* maxTextureUnit */record[/* maxTextureUnit */3]
          ];
  } else if (mediumpAvailable) {
    Log$WonderLog.warn("not support highp, using mediump instead");
    return /* record */[
            /* extensionInstancedArrays */record[/* extensionInstancedArrays */0],
            /* extensionElementIndexUint */record[/* extensionElementIndexUint */1],
            /* precision *//* MEDIUMP */1,
            /* maxTextureUnit */record[/* maxTextureUnit */3]
          ];
  } else {
    Log$WonderLog.warn("not support highp and mediump, using lowp instead");
    return /* record */[
            /* extensionInstancedArrays */record[/* extensionInstancedArrays */0],
            /* extensionElementIndexUint */record[/* extensionElementIndexUint */1],
            /* precision *//* LOWP */2,
            /* maxTextureUnit */record[/* maxTextureUnit */3]
          ];
  }
}

function _getTextureCapability(gl, record) {
  return /* record */[
          /* extensionInstancedArrays */record[/* extensionInstancedArrays */0],
          /* extensionElementIndexUint */record[/* extensionElementIndexUint */1],
          /* precision */record[/* precision */2],
          /* maxTextureUnit */gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)
        ];
}

function _detectCapability(gl, record) {
  return _detectPrecision(gl, _getTextureCapability(gl, record));
}

function detect(gl, record) {
  return _detectCapability(gl, _detectExtension(gl, record));
}

var hasExtension = Js_option.isSome;

function unsafeGetInstanceExtension(record) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("extensionInstancedArrays exist", "not"), (function (param) {
                        return Contract$WonderLog.assertExist(record[/* extensionInstancedArrays */0]);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OptionService$Wonderjs.unsafeGet(record[/* extensionInstancedArrays */0]);
}

export {
  _getElementIndexUint ,
  _getExtension ,
  _detectExtension ,
  _detectPrecision ,
  _getTextureCapability ,
  _detectCapability ,
  detect ,
  hasExtension ,
  unsafeGetInstanceExtension ,
  
}
/* Log-WonderLog Not a pure module */
