'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../../construct/domain_layer/library/log/Log.bs.js");
var Result$Wonderjs = require("../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Contract$Wonderjs = require("../../../../../../construct/domain_layer/library/contract/Contract.bs.js");
var ConfigDpRunAPI$Wonderjs = require("../../../../../../construct/external_layer/api/dependency/ConfigDpRunAPI.bs.js");

function _checkNotExceedBound(getLengthFunc, index, typeArray) {
  return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("not exceed bound", "exceed"), (function (param) {
                return Contract$Wonderjs.Operators.$less(index, Curry._1(getLengthFunc, typeArray));
              }));
}

function setMat3Data(index, mat3, typeArray) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return _checkNotExceedBound((function (prim) {
                                  return prim.length;
                                }), index + 11 | 0, typeArray);
                  }), Curry._1(ConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined)), (function (param) {
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
                  }), Curry._1(ConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined)), (function (param) {
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
                  }), Curry._1(ConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined)), (function (param) {
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
                  }), Curry._1(ConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined)), (function (param) {
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
                  }), Curry._1(ConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined)), (function (param) {
                typeArray[index] = x;
                typeArray[index + 1 | 0] = y;
                typeArray[index + 2 | 0] = z;
                typeArray[index + 3 | 0] = w;
                
              }));
}

function setFloat16WithFloat32Array(index, target, typeArray) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return _checkNotExceedBound((function (prim) {
                                  return prim.length;
                                }), index + 15 | 0, typeArray);
                  }), Curry._1(ConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined)), (function (param) {
                typeArray.set(target, index);
                
              }));
}

function setUint8_1WithoutCheck(index, value, typeArray) {
  typeArray[index] = value;
  
}

function setUint32_1(index, value, typeArray) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return _checkNotExceedBound((function (prim) {
                                  return prim.length;
                                }), index + 0 | 0, typeArray);
                  }), Curry._1(ConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined)), (function (param) {
                typeArray[index] = value;
                
              }));
}

function getUint8_1(index, typeArray) {
  return typeArray[index];
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
                  }), Curry._1(ConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined)), (function (param) {
                targetTypeArr.set(sourceTypeArr, offset);
                
              }));
}

exports._checkNotExceedBound = _checkNotExceedBound;
exports.setMat3Data = setMat3Data;
exports.setFloat1 = setFloat1;
exports.setFloat2 = setFloat2;
exports.setFloat3 = setFloat3;
exports.setFloat4 = setFloat4;
exports.setFloat16WithFloat32Array = setFloat16WithFloat32Array;
exports.setUint8_1WithoutCheck = setUint8_1WithoutCheck;
exports.setUint32_1 = setUint32_1;
exports.getUint8_1 = getUint8_1;
exports.fillUint32ArrayWithOffset = fillUint32ArrayWithOffset;
/* No side effect */
