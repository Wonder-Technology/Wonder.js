

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/main/state/IsDebugMainService.js";

function getUint8_1(index, typeArray) {
  return typeArray[index];
}

function getUint16_1(index, typeArray) {
  return typeArray[index];
}

function getUint32_1(index, typeArray) {
  return typeArray[index];
}

function getFloat1(index, typeArray) {
  return typeArray[index];
}

function getFloat3(index, typeArray) {
  return /* array */[
          typeArray[index],
          typeArray[index + 1 | 0],
          typeArray[index + 2 | 0]
        ];
}

function getFloat4(index, typeArray) {
  return /* array */[
          typeArray[index],
          typeArray[index + 1 | 0],
          typeArray[index + 2 | 0],
          typeArray[index + 3 | 0]
        ];
}

function getFloat3TypeArray(index, typeArray) {
  return typeArray.subarray(index, index + 3 | 0);
}

function getFloat4TypeArray(index, typeArray) {
  return typeArray.subarray(index, index + 4 | 0);
}

function getFloat3Tuple(index, typeArray) {
  return /* tuple */[
          typeArray[index],
          typeArray[index + 1 | 0],
          typeArray[index + 2 | 0]
        ];
}

function getFloat4Tuple(index, typeArray) {
  return /* tuple */[
          typeArray[index],
          typeArray[index + 1 | 0],
          typeArray[index + 2 | 0],
          typeArray[index + 3 | 0]
        ];
}

function _checkNotExceedBound(index, typeArray, getLengthFunc) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not exceed bound", "exceed"), (function (param) {
                return Contract$WonderLog.Operators[/* < */9](index, Curry._1(getLengthFunc, typeArray));
              }));
}

function setUint8_1(index, value, typeArray) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkNotExceedBound(index, typeArray, (function (prim) {
                        return prim.length;
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  typeArray[index] = value;
  return typeArray;
}

function setUint16_1(index, value, typeArray) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkNotExceedBound(index, typeArray, (function (prim) {
                        return prim.length;
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  typeArray[index] = value;
  return typeArray;
}

function setUint32_1(index, value, typeArray) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkNotExceedBound(index, typeArray, (function (prim) {
                        return prim.length;
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  typeArray[index] = value;
  return typeArray;
}

function setFloat1(index, value, typeArray) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkNotExceedBound(index, typeArray, (function (prim) {
                        return prim.length;
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  typeArray[index] = value;
  return typeArray;
}

function setFloat3(index, record, typeArray) {
  Contract$WonderLog.requireCheck((function (param) {
          var len = record.length;
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("record.length === 3", "is " + (String(len) + "")), (function (param) {
                  return Contract$WonderLog.Operators[/* = */0](len, 3);
                }));
          return _checkNotExceedBound(index + 2 | 0, typeArray, (function (prim) {
                        return prim.length;
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  for(var i = index ,i_finish = index + 2 | 0; i <= i_finish; ++i){
    typeArray[i] = record[i - index | 0];
  }
  return typeArray;
}

function setFloat4(index, record, typeArray) {
  Contract$WonderLog.requireCheck((function (param) {
          var len = record.length;
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("record.length === 4", "is " + (String(len) + "")), (function (param) {
                  return Contract$WonderLog.Operators[/* = */0](len, 4);
                }));
          return _checkNotExceedBound(index + 3 | 0, typeArray, (function (prim) {
                        return prim.length;
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  for(var i = index ,i_finish = index + 3 | 0; i <= i_finish; ++i){
    typeArray[i] = record[i - index | 0];
  }
  return typeArray;
}

function setFloat3ByTuple(index, param, typeArray) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkNotExceedBound(index + 2 | 0, typeArray, (function (prim) {
                        return prim.length;
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  typeArray[index] = param[0];
  typeArray[index + 1 | 0] = param[1];
  typeArray[index + 2 | 0] = param[2];
  return typeArray;
}

function setFloat4ByTuple(index, param, typeArray) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkNotExceedBound(index + 3 | 0, typeArray, (function (prim) {
                        return prim.length;
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  typeArray[index] = param[0];
  typeArray[index + 1 | 0] = param[1];
  typeArray[index + 2 | 0] = param[2];
  typeArray[index + 3 | 0] = param[3];
  return typeArray;
}

function getFloat16(index, typeArray) {
  return /* array */[
          typeArray[index],
          typeArray[index + 1 | 0],
          typeArray[index + 2 | 0],
          typeArray[index + 3 | 0],
          typeArray[index + 4 | 0],
          typeArray[index + 5 | 0],
          typeArray[index + 6 | 0],
          typeArray[index + 7 | 0],
          typeArray[index + 8 | 0],
          typeArray[index + 9 | 0],
          typeArray[index + 10 | 0],
          typeArray[index + 11 | 0],
          typeArray[index + 12 | 0],
          typeArray[index + 13 | 0],
          typeArray[index + 14 | 0],
          typeArray[index + 15 | 0]
        ];
}

function getFloat16TypeArray(index, typeArray) {
  return typeArray.subarray(index, index + 16 | 0);
}

function setFloat16(index, record, typeArray) {
  Contract$WonderLog.requireCheck((function (param) {
          var len = record.length;
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("record.length === 16", "is " + (String(len) + "")), (function (param) {
                  return Contract$WonderLog.Operators[/* = */0](len, 16);
                }));
          return _checkNotExceedBound(index + 15 | 0, typeArray, (function (prim) {
                        return prim.length;
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  for(var i = index ,i_finish = index + 15 | 0; i <= i_finish; ++i){
    typeArray[i] = record[i - index | 0];
  }
  return typeArray;
}

function fillFloat32ArrayWithOffset(targetTypeArr, sourceTypeArr, offset) {
  Contract$WonderLog.requireCheck((function (param) {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("offset should >= 0", "is " + (String(offset) + "")), (function (param) {
                  return Contract$WonderLog.Operators[/* >= */7](offset, 0);
                }));
          var sourceTypeArrLen = sourceTypeArr.length;
          var targetTypeArrLen = targetTypeArr.length;
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("sourceTypeArr.length:" + (String(sourceTypeArrLen) + (" + offset:" + (String(offset) + (" <= targetTypeArr.length:" + (String(targetTypeArrLen) + ""))))), "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* <= */11](sourceTypeArrLen + offset | 0, targetTypeArrLen);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  targetTypeArr.set(sourceTypeArr, offset);
  return /* () */0;
}

function getFloat32Array(typeArray, startIndex, endIndex) {
  return typeArray.slice(startIndex, endIndex);
}

function fillUint16ArrayWithOffset(targetTypeArr, sourceTypeArr, offset) {
  Contract$WonderLog.requireCheck((function (param) {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("offset should >= 0", "is " + (String(offset) + "")), (function (param) {
                  return Contract$WonderLog.Operators[/* >= */7](offset, 0);
                }));
          var sourceTypeArrLen = sourceTypeArr.length;
          var targetTypeArrLen = targetTypeArr.length;
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("sourceTypeArr.length:" + (String(sourceTypeArrLen) + (" + offset:" + (String(offset) + (" <= targetTypeArr.length:" + (String(targetTypeArrLen) + ""))))), "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* <= */11](sourceTypeArrLen + offset | 0, targetTypeArrLen);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  targetTypeArr.set(sourceTypeArr, offset);
  return /* () */0;
}

function fillUint32ArrayWithOffset(targetTypeArr, sourceTypeArr, offset) {
  Contract$WonderLog.requireCheck((function (param) {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("offset should >= 0", "is " + (String(offset) + "")), (function (param) {
                  return Contract$WonderLog.Operators[/* >= */7](offset, 0);
                }));
          var sourceTypeArrLen = sourceTypeArr.length;
          var targetTypeArrLen = targetTypeArr.length;
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("sourceTypeArr.length:" + (String(sourceTypeArrLen) + (" + offset:" + (String(offset) + (" <= targetTypeArr.length:" + (String(targetTypeArrLen) + ""))))), "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* <= */11](sourceTypeArrLen + offset | 0, targetTypeArrLen);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  targetTypeArr.set(sourceTypeArr, offset);
  return /* () */0;
}

function getUint16Array(typeArray, startIndex, endIndex) {
  return typeArray.slice(startIndex, endIndex);
}

function getUint32Array(typeArray, startIndex, endIndex) {
  return typeArray.slice(startIndex, endIndex);
}

function _setFloat32ArrayWithFloat32Array(targetTypeArr, sourceTypeArr, typeArrIndex, i) {
  targetTypeArr[typeArrIndex] = sourceTypeArr[i];
  return /* () */0;
}

function _setUint8ArrayWithUint8Array(targetTypeArr, sourceTypeArr, typeArrIndex, i) {
  targetTypeArr[typeArrIndex] = sourceTypeArr[i];
  return /* () */0;
}

function _setUint16ArrayWithUint16Array(targetTypeArr, sourceTypeArr, typeArrIndex, i) {
  targetTypeArr[typeArrIndex] = sourceTypeArr[i];
  return /* () */0;
}

function _setUint32ArrayWithUint32Array(targetTypeArr, sourceTypeArr, typeArrIndex, i) {
  targetTypeArr[typeArrIndex] = sourceTypeArr[i];
  return /* () */0;
}

function _fillTypeArrayWithTypeArr(param, param$1, endIndex, _setTypeArrWithTypeArr) {
  var sourceTypeArr = param$1[0];
  var targetTypeArr = param[0];
  var typeArrIndex = param[1];
  for(var i = param$1[1] ,i_finish = endIndex - 1 | 0; i <= i_finish; ++i){
    _setTypeArrWithTypeArr(targetTypeArr, sourceTypeArr, typeArrIndex, i);
    typeArrIndex = typeArrIndex + 1 | 0;
  }
  return typeArrIndex;
}

function fillUint8ArrayWithUint8Array(targetData, sourceData, endIndex) {
  return _fillTypeArrayWithTypeArr(targetData, sourceData, endIndex, _setUint8ArrayWithUint8Array);
}

function fillUint16ArrayWithUint16Array(targetData, sourceData, endIndex) {
  return _fillTypeArrayWithTypeArr(targetData, sourceData, endIndex, _setUint16ArrayWithUint16Array);
}

function fillUint32ArrayWithUint32Array(targetData, sourceData, endIndex) {
  return _fillTypeArrayWithTypeArr(targetData, sourceData, endIndex, _setUint32ArrayWithUint32Array);
}

function fillFloat32ArrayWithFloat32Array(targetData, sourceData, endIndex) {
  return _fillTypeArrayWithTypeArr(targetData, sourceData, endIndex, _setFloat32ArrayWithFloat32Array);
}

function setUint8Array(sourceTypeArr, targetTypeArr) {
  targetTypeArr.set(sourceTypeArr);
  return targetTypeArr;
}

function setUint16Array(sourceTypeArr, targetTypeArr) {
  targetTypeArr.set(sourceTypeArr);
  return targetTypeArr;
}

function setUint32Array(sourceTypeArr, targetTypeArr) {
  targetTypeArr.set(sourceTypeArr);
  return targetTypeArr;
}

function setFloat32Array(sourceTypeArr, targetTypeArr) {
  targetTypeArr.set(sourceTypeArr);
  return targetTypeArr;
}

export {
  getUint8_1 ,
  getUint16_1 ,
  getUint32_1 ,
  getFloat1 ,
  getFloat3 ,
  getFloat4 ,
  getFloat3TypeArray ,
  getFloat4TypeArray ,
  getFloat3Tuple ,
  getFloat4Tuple ,
  _checkNotExceedBound ,
  setUint8_1 ,
  setUint16_1 ,
  setUint32_1 ,
  setFloat1 ,
  setFloat3 ,
  setFloat4 ,
  setFloat3ByTuple ,
  setFloat4ByTuple ,
  getFloat16 ,
  getFloat16TypeArray ,
  setFloat16 ,
  fillFloat32ArrayWithOffset ,
  getFloat32Array ,
  fillUint16ArrayWithOffset ,
  fillUint32ArrayWithOffset ,
  getUint16Array ,
  getUint32Array ,
  _setFloat32ArrayWithFloat32Array ,
  _setUint8ArrayWithUint8Array ,
  _setUint16ArrayWithUint16Array ,
  _setUint32ArrayWithUint32Array ,
  _fillTypeArrayWithTypeArr ,
  fillUint8ArrayWithUint8Array ,
  fillUint16ArrayWithUint16Array ,
  fillUint32ArrayWithUint32Array ,
  fillFloat32ArrayWithFloat32Array ,
  setUint8Array ,
  setUint16Array ,
  setUint32Array ,
  setFloat32Array ,
  
}
/* Log-WonderLog Not a pure module */
