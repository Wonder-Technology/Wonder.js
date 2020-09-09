'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../../construct/domain_layer/library/log/Log.bs.js");
var Result$Wonderjs = require("../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Contract$Wonderjs = require("../../../../../../construct/domain_layer/library/contract/Contract.bs.js");
var DpContainer$Wonderjs = require("../../../../../../construct/domain_layer/dependency/container/DpContainer.bs.js");

function _checkNotExceedBound(getLengthFunc, index, typeArray) {
  return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("not exceed bound", "exceed"), (function (param) {
                return Contract$Wonderjs.Operators.$less(index, Curry._1(getLengthFunc, typeArray));
              }));
}

function getFloat16TypeArray(index, typeArray) {
  return typeArray.subarray(index, index + 16 | 0);
}

function setMat3Data(index, mat3, typeArray) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return _checkNotExceedBound((function (prim) {
                                  return prim.length;
                                }), index + 11 | 0, typeArray);
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                typeArray[index] = mat3[0];
                typeArray[index + 1 | 0] = mat3[1];
                typeArray[index + 2 | 0] = mat3[2];
                typeArray[index + 3 | 0] = 0.0;
                typeArray[index + 4 | 0] = mat3[3];
                typeArray[index + 5 | 0] = mat3[4];
                typeArray[index + 6 | 0] = mat3[5];
                typeArray[index + 7 | 0] = 0.0;
                typeArray[index + 8 | 0] = mat3[6];
                typeArray[index + 9 | 0] = mat3[7];
                typeArray[index + 10 | 0] = mat3[8];
                typeArray[index + 11 | 0] = 0.0;
                
              }));
}

function setFloat1(index, value, typeArray) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return _checkNotExceedBound((function (prim) {
                                  return prim.length;
                                }), index + 0 | 0, typeArray);
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                typeArray[index] = value;
                
              }));
}

function setFloat2(index, param, typeArray) {
  var y = param[1];
  var x = param[0];
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return _checkNotExceedBound((function (prim) {
                                  return prim.length;
                                }), index + 1 | 0, typeArray);
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                typeArray[index] = x;
                typeArray[index + 1 | 0] = y;
                
              }));
}

function setFloat3(index, param, typeArray) {
  var z = param[2];
  var y = param[1];
  var x = param[0];
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return _checkNotExceedBound((function (prim) {
                                  return prim.length;
                                }), index + 2 | 0, typeArray);
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                typeArray[index] = x;
                typeArray[index + 1 | 0] = y;
                typeArray[index + 2 | 0] = z;
                
              }));
}

function setFloat4(index, param, typeArray) {
  var w = param[3];
  var z = param[2];
  var y = param[1];
  var x = param[0];
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return _checkNotExceedBound((function (prim) {
                                  return prim.length;
                                }), index + 3 | 0, typeArray);
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                typeArray[index] = x;
                typeArray[index + 1 | 0] = y;
                typeArray[index + 2 | 0] = z;
                typeArray[index + 3 | 0] = w;
                
              }));
}

function setFloat16(index, param, typeArray) {
  var a15 = param[15];
  var a14 = param[14];
  var a13 = param[13];
  var a12 = param[12];
  var a11 = param[11];
  var a10 = param[10];
  var a9 = param[9];
  var a8 = param[8];
  var a7 = param[7];
  var a6 = param[6];
  var a5 = param[5];
  var a4 = param[4];
  var a3 = param[3];
  var a2 = param[2];
  var a1 = param[1];
  var a0 = param[0];
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return _checkNotExceedBound((function (prim) {
                                  return prim.length;
                                }), index + 15 | 0, typeArray);
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                typeArray[index + 0 | 0] = a0;
                typeArray[index + 1 | 0] = a1;
                typeArray[index + 2 | 0] = a2;
                typeArray[index + 3 | 0] = a3;
                typeArray[index + 4 | 0] = a4;
                typeArray[index + 5 | 0] = a5;
                typeArray[index + 6 | 0] = a6;
                typeArray[index + 7 | 0] = a7;
                typeArray[index + 8 | 0] = a8;
                typeArray[index + 9 | 0] = a9;
                typeArray[index + 10 | 0] = a10;
                typeArray[index + 11 | 0] = a11;
                typeArray[index + 12 | 0] = a12;
                typeArray[index + 13 | 0] = a13;
                typeArray[index + 14 | 0] = a14;
                typeArray[index + 15 | 0] = a15;
                
              }));
}

function setFloat32Array(index, target, typeArray) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return _checkNotExceedBound((function (prim) {
                                  return prim.length;
                                }), index + 31 | 0, typeArray);
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                typeArray.set(target, index);
                
              }));
}

function setUint32_1(index, value, typeArray) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return _checkNotExceedBound((function (prim) {
                                  return prim.length;
                                }), index + 0 | 0, typeArray);
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                typeArray[index] = value;
                
              }));
}

function getFloat3Tuple(index, typeArray) {
  return [
          typeArray[index],
          typeArray[index + 1 | 0],
          typeArray[index + 2 | 0]
        ];
}

function getFloat4Tuple(index, typeArray) {
  return [
          typeArray[index],
          typeArray[index + 1 | 0],
          typeArray[index + 2 | 0],
          typeArray[index + 3 | 0]
        ];
}

function getUint32_1(index, typeArray) {
  return typeArray[index];
}

function getFloat1(index, typeArray) {
  return typeArray[index];
}

function getFloat32Array(typeArray, startIndex, endIndex) {
  return typeArray.slice(startIndex, endIndex);
}

function getUint32Array(typeArray, startIndex, endIndex) {
  return typeArray.slice(startIndex, endIndex);
}

function _setFloat32ArrayWithFloat32Array(targetTypeArr, sourceTypeArr, typeArrIndex, i) {
  targetTypeArr[typeArrIndex] = sourceTypeArr[i];
  
}

function _setUint32ArrayWithUint32Array(targetTypeArr, sourceTypeArr, typeArrIndex, i) {
  targetTypeArr[typeArrIndex] = sourceTypeArr[i];
  
}

function _fillTypeArrayWithTypeArr(param, param$1, endIndex, _setTypeArrWithTypeArr) {
  var sourceTypeArr = param$1[0];
  var targetTypeArr = param[0];
  var typeArrIndex = param[1];
  for(var i = param$1[1]; i < endIndex; ++i){
    _setTypeArrWithTypeArr(targetTypeArr, sourceTypeArr, typeArrIndex, i);
    typeArrIndex = typeArrIndex + 1 | 0;
  }
  return typeArrIndex;
}

function fillUint32ArrayWithUint32Array(targetData, sourceData, endIndex) {
  return _fillTypeArrayWithTypeArr(targetData, sourceData, endIndex, _setUint32ArrayWithUint32Array);
}

function fillFloat32ArrayWithFloat32Array(targetData, sourceData, endIndex) {
  return _fillTypeArrayWithTypeArr(targetData, sourceData, endIndex, _setFloat32ArrayWithFloat32Array);
}

function fillFloat32ArrayWithOffset(targetTypeArr, sourceTypeArr, offset) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("offset should >= 0", "is " + offset), (function (param) {
                            return Contract$Wonderjs.Operators.$great$eq(offset, 0);
                          }));
                    var sourceTypeArrLen = sourceTypeArr.length;
                    var targetTypeArrLen = targetTypeArr.length;
                    return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("sourceTypeArr.length:" + sourceTypeArrLen + " + offset:" + offset + " <= targetTypeArr.length:" + targetTypeArrLen, "not"), (function (param) {
                                  return Contract$Wonderjs.Operators.$less$eq(sourceTypeArrLen + offset | 0, targetTypeArrLen);
                                }));
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                targetTypeArr.set(sourceTypeArr, offset);
                
              }));
}

function fillUint32ArrayWithOffset(targetTypeArr, sourceTypeArr, offset) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("offset should >= 0", "is " + offset), (function (param) {
                            return Contract$Wonderjs.Operators.$great$eq(offset, 0);
                          }));
                    var sourceTypeArrLen = sourceTypeArr.length;
                    var targetTypeArrLen = targetTypeArr.length;
                    return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("sourceTypeArr.length:" + sourceTypeArrLen + " + offset:" + offset + " <= targetTypeArr.length:" + targetTypeArrLen, "not"), (function (param) {
                                  return Contract$Wonderjs.Operators.$less$eq(sourceTypeArrLen + offset | 0, targetTypeArrLen);
                                }));
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                targetTypeArr.set(sourceTypeArr, offset);
                
              }));
}

exports._checkNotExceedBound = _checkNotExceedBound;
exports.getFloat16TypeArray = getFloat16TypeArray;
exports.setMat3Data = setMat3Data;
exports.setFloat1 = setFloat1;
exports.setFloat2 = setFloat2;
exports.setFloat3 = setFloat3;
exports.setFloat4 = setFloat4;
exports.setFloat16 = setFloat16;
exports.setFloat32Array = setFloat32Array;
exports.setUint32_1 = setUint32_1;
exports.getFloat3Tuple = getFloat3Tuple;
exports.getFloat4Tuple = getFloat4Tuple;
exports.getUint32_1 = getUint32_1;
exports.getFloat1 = getFloat1;
exports.getFloat32Array = getFloat32Array;
exports.getUint32Array = getUint32Array;
exports._setFloat32ArrayWithFloat32Array = _setFloat32ArrayWithFloat32Array;
exports._setUint32ArrayWithUint32Array = _setUint32ArrayWithUint32Array;
exports._fillTypeArrayWithTypeArr = _fillTypeArrayWithTypeArr;
exports.fillUint32ArrayWithUint32Array = fillUint32ArrayWithUint32Array;
exports.fillFloat32ArrayWithFloat32Array = fillFloat32ArrayWithFloat32Array;
exports.fillFloat32ArrayWithOffset = fillFloat32ArrayWithOffset;
exports.fillUint32ArrayWithOffset = fillUint32ArrayWithOffset;
/* No side effect */
