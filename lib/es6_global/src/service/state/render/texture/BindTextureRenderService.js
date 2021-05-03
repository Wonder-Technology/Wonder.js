

import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../main/state/IsDebugMainService.js";
import * as OperateGlTextureMapService$Wonderjs from "../../../primitive/texture/OperateGlTextureMapService.js";

function _bind(gl, param, texture, glTextureMap) {
  var unit = param[1];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("unit should >= 0", "is " + (String(unit) + "")), (function (param) {
                        return Contract$WonderLog.Operators[/* >= */7](unit, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = OperateGlTextureMapService$Wonderjs.getTexture(texture, glTextureMap);
  if (match !== undefined) {
    gl.activeTexture(gl.TEXTURE0 + unit | 0);
    gl.bindTexture(param[0], Caml_option.valFromOption(match));
    return glTextureMap;
  } else {
    return glTextureMap;
  }
}

function _bindBasicSourceTexture(basicSourceTexture, param) {
  var state = param[2];
  var gl = param[0];
  _bind(gl, /* tuple */[
        gl.TEXTURE_2D,
        param[1]
      ], basicSourceTexture, state[/* basicSourceTextureRecord */10][/* glTextureMap */9]);
  return state;
}

function _bindArrayBufferViewSourceTexture(arrayBufferViewTexture, param) {
  var state = param[2];
  var gl = param[0];
  _bind(gl, /* tuple */[
        gl.TEXTURE_2D,
        param[1]
      ], arrayBufferViewTexture, state[/* arrayBufferViewSourceTextureRecord */11][/* glTextureMap */11]);
  return state;
}

function _bindCubemapTexture(cubemapTexture, param) {
  var state = param[2];
  var gl = param[0];
  _bind(gl, /* tuple */[
        gl.TEXTURE_CUBE_MAP,
        param[1]
      ], cubemapTexture, state[/* cubemapTextureRecord */12][/* glTextureMap */24]);
  return state;
}

function bind(gl, unit, param, state) {
  var texture = param[0];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("unit should >= 0", "is " + (String(unit) + "")), (function (param) {
                        return Contract$WonderLog.Operators[/* >= */7](unit, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  switch (param[1]) {
    case 0 : 
        return _bindBasicSourceTexture(texture, /* tuple */[
                    gl,
                    unit,
                    state
                  ]);
    case 1 : 
        return _bindArrayBufferViewSourceTexture(texture, /* tuple */[
                    gl,
                    unit,
                    state
                  ]);
    case 2 : 
        return _bindCubemapTexture(texture, /* tuple */[
                    gl,
                    unit,
                    state
                  ]);
    
  }
}

export {
  _bind ,
  _bindBasicSourceTexture ,
  _bindArrayBufferViewSourceTexture ,
  _bindCubemapTexture ,
  bind ,
  
}
/* Log-WonderLog Not a pure module */
