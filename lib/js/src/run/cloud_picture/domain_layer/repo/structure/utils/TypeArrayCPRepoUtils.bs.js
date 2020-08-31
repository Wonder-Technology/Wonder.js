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

exports._checkNotExceedBound = _checkNotExceedBound;
exports.getFloat16TypeArray = getFloat16TypeArray;
exports.setFloat16 = setFloat16;
exports.setFloat3 = setFloat3;
exports.setFloat4 = setFloat4;
exports.getFloat3Tuple = getFloat3Tuple;
exports.getFloat4Tuple = getFloat4Tuple;
/* No side effect */
