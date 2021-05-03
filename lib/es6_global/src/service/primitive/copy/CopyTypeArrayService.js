

import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function copyFloat32Array(typeArr) {
  return typeArr.slice();
}

function copyFloat32ArrayWithEndIndex(endIndex, typeArr) {
  return typeArr.slice(0, endIndex);
}

function copyUint8ArrayWithEndIndex(endIndex, typeArr) {
  return typeArr.slice(0, endIndex);
}

function copyUint16ArrayWithEndIndex(endIndex, typeArr) {
  return typeArr.slice(0, endIndex);
}

function copyUint32ArrayWithEndIndex(endIndex, typeArr) {
  return typeArr.slice(0, endIndex);
}

function copyUint16Array(typeArr) {
  if (typeArr === undefined) {
    return undefined;
  } else {
    return typeArr.slice();
  }
}

function copyUint32Array(typeArr) {
  if (typeArr === undefined) {
    return undefined;
  } else {
    return typeArr.slice();
  }
}

function deepCopyMutableSparseMapOfFloat32Array(arr) {
  return MutableSparseMapService$WonderCommonlib.mapValid((function (typeArr) {
                return typeArr.slice();
              }), arr);
}

function deepCopyMutableSparseMapOfArray(arr) {
  return MutableSparseMapService$WonderCommonlib.mapValid((function (itemArr) {
                return itemArr.slice();
              }), arr);
}

export {
  copyFloat32Array ,
  copyFloat32ArrayWithEndIndex ,
  copyUint8ArrayWithEndIndex ,
  copyUint16ArrayWithEndIndex ,
  copyUint32ArrayWithEndIndex ,
  copyUint16Array ,
  copyUint32Array ,
  deepCopyMutableSparseMapOfFloat32Array ,
  deepCopyMutableSparseMapOfArray ,
  
}
/* No side effect */
