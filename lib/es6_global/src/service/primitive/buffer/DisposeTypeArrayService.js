

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function deleteBySwapAndResetFloat32TypeArr(param, typeArr, length, defaultValueArr) {
  var targetIndex = param[1];
  var sourceIndex = param[0];
  for(var i = 0 ,i_finish = length - 1 | 0; i <= i_finish; ++i){
    typeArr[sourceIndex + i | 0] = typeArr[targetIndex + i | 0];
    typeArr[targetIndex + i | 0] = Caml_array.caml_array_get(defaultValueArr, i);
  }
  return typeArr;
}

function deleteSingleValueBySwapAndResetFloat32TypeArr(param, typeArr, length, defaultValue) {
  var targetIndex = param[1];
  typeArr[param[0]] = typeArr[targetIndex];
  typeArr[targetIndex] = defaultValue;
  return typeArr;
}

function deleteSingleValueBySwapUint32TypeArr(sourceIndex, lastIndex, typeArr) {
  typeArr[sourceIndex] = typeArr[lastIndex];
  return typeArr;
}

function deleteAndResetFloat32TypeArr(sourceIndex, length, defaultValueArr, typeArr) {
  for(var i = 0 ,i_finish = length - 1 | 0; i <= i_finish; ++i){
    typeArr[sourceIndex + i | 0] = Caml_array.caml_array_get(defaultValueArr, i);
  }
  return typeArr;
}

function deleteAndResetFloat32(sourceIndex, defaultValue, typeArr) {
  typeArr[sourceIndex] = defaultValue;
  return typeArr;
}

function deleteAndResetUint32(sourceIndex, defaultValue, typeArr) {
  typeArr[sourceIndex] = defaultValue;
  return typeArr;
}

function deleteAndResetUint8(sourceIndex, defaultValue, typeArr) {
  typeArr[sourceIndex] = defaultValue;
  return typeArr;
}

function deleteAndResetUint16(sourceIndex, defaultValue, typeArr) {
  typeArr[sourceIndex] = defaultValue;
  return typeArr;
}

export {
  deleteBySwapAndResetFloat32TypeArr ,
  deleteSingleValueBySwapAndResetFloat32TypeArr ,
  deleteSingleValueBySwapUint32TypeArr ,
  deleteAndResetFloat32TypeArr ,
  deleteAndResetFloat32 ,
  deleteAndResetUint32 ,
  deleteAndResetUint8 ,
  deleteAndResetUint16 ,
  
}
/* No side effect */
