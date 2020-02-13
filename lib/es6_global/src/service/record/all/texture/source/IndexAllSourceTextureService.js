

import * as Caml_obj from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../state/main/state/IsDebugMainService.js";

function getBasicSourceTextureIndexOffset(param) {
  return 0;
}

function getArrayBufferViewSourceTextureIndexOffset(basicSourceTextureCount) {
  return basicSourceTextureCount;
}

function generateBasicSourceTextureIndex(basicSourceTextureIndex) {
  return 0 + basicSourceTextureIndex | 0;
}

function generateArrayBufferViewSourceTextureIndex(arrayBufferViewSourceTextureIndex, basicSourceTextureCount) {
  return basicSourceTextureCount + arrayBufferViewSourceTextureIndex | 0;
}

function getArrayBufferViewSourceTextureIndexInTypeArray(arrayBufferViewSourceTextureIndex, arrayBufferViewSourceTextureIndexOffset) {
  return Contract$WonderLog.ensureCheck((function (index) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("index should >= 0", "is " + (String(index) + "")), (function (param) {
                              return Contract$WonderLog.Operators[/* >= */7](index, 0);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), arrayBufferViewSourceTextureIndex - arrayBufferViewSourceTextureIndexOffset | 0);
}

var isBasicSourceTextureIndex = Caml_obj.caml_lessthan;

var isArrayBufferViewSourceTextureIndex = Caml_obj.caml_greaterequal;

function handleByJudgeSourceTextureIndex(textureIndex, arrayBufferViewSourceTextureIndexOffset, funcDataTuple, param) {
  var match = Caml_obj.caml_lessthan(textureIndex, arrayBufferViewSourceTextureIndexOffset);
  if (match) {
    return param[0](textureIndex, funcDataTuple);
  } else {
    return param[1](textureIndex, funcDataTuple);
  }
}

function getSourceTextureType(sourceTextureIndex, arrayBufferViewSourceTextureIndexOffset) {
  var match = Caml_obj.caml_lessthan(sourceTextureIndex, arrayBufferViewSourceTextureIndexOffset);
  if (match) {
    return /* BasicSource */0;
  } else {
    return /* ArrayBufferViewSource */1;
  }
}

export {
  getBasicSourceTextureIndexOffset ,
  getArrayBufferViewSourceTextureIndexOffset ,
  generateBasicSourceTextureIndex ,
  generateArrayBufferViewSourceTextureIndex ,
  getArrayBufferViewSourceTextureIndexInTypeArray ,
  isBasicSourceTextureIndex ,
  isArrayBufferViewSourceTextureIndex ,
  handleByJudgeSourceTextureIndex ,
  getSourceTextureType ,
  
}
/* Log-WonderLog Not a pure module */
