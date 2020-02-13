

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../main/state/IsDebugMainService.js";
import * as CacheTextureService$Wonderjs from "../../../primitive/texture/CacheTextureService.js";
import * as IndexSourceTextureService$Wonderjs from "../../../record/all/texture/IndexSourceTextureService.js";
import * as OperateGlTextureMapService$Wonderjs from "../../../primitive/texture/OperateGlTextureMapService.js";

function _bind(gl, unit, texture, dataTuple) {
  var glTextureMap = dataTuple[1];
  var bindTextureUnitCacheMap = dataTuple[0];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("unit should >= 0", "is " + (String(unit) + "")), (function (param) {
                        return Contract$WonderLog.Operators[/* >= */7](unit, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = OperateGlTextureMapService$Wonderjs.getTexture(texture, glTextureMap);
  if (match !== undefined) {
    var match$1 = CacheTextureService$Wonderjs.isCached(unit, texture, bindTextureUnitCacheMap);
    if (match$1) {
      return dataTuple;
    } else {
      var bindTextureUnitCacheMap$1 = CacheTextureService$Wonderjs.addActiveTexture(unit, texture, bindTextureUnitCacheMap);
      var target = gl.TEXTURE_2D;
      gl.activeTexture(gl.TEXTURE0 + unit | 0);
      gl.bindTexture(target, Caml_option.valFromOption(match));
      return /* tuple */[
              bindTextureUnitCacheMap$1,
              glTextureMap
            ];
    }
  } else {
    return dataTuple;
  }
}

function _bindBasicSourceTexture(basicSourceTexture, param) {
  var state = param[2];
  var basicSourceTextureRecord = state[/* basicSourceTextureRecord */10];
  _bind(param[0], param[1], basicSourceTexture, /* tuple */[
        basicSourceTextureRecord[/* bindTextureUnitCacheMap */10],
        basicSourceTextureRecord[/* glTextureMap */9]
      ]);
  return state;
}

function _bindArrayBufferViewSourceTexture(arrayBufferViewTexture, param) {
  var state = param[2];
  var arrayBufferViewSourceTextureRecord = state[/* arrayBufferViewSourceTextureRecord */11];
  _bind(param[0], param[1], arrayBufferViewTexture, /* tuple */[
        arrayBufferViewSourceTextureRecord[/* bindTextureUnitCacheMap */12],
        arrayBufferViewSourceTextureRecord[/* glTextureMap */11]
      ]);
  return state;
}

function bind(gl, unit, texture, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("unit should >= 0", "is " + (String(unit) + "")), (function (param) {
                        return Contract$WonderLog.Operators[/* >= */7](unit, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return IndexSourceTextureService$Wonderjs.handleByJudgeSourceTextureIndex(texture, state[/* arrayBufferViewSourceTextureRecord */11][/* textureIndexOffset */14], /* tuple */[
              gl,
              unit,
              state
            ], /* tuple */[
              _bindBasicSourceTexture,
              _bindArrayBufferViewSourceTexture
            ]);
}

export {
  _bind ,
  _bindBasicSourceTexture ,
  _bindArrayBufferViewSourceTexture ,
  bind ,
  
}
/* Log-WonderLog Not a pure module */
