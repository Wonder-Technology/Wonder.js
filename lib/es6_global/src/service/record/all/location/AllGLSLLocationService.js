

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _getLocationAndCache(param, getGlLocationFunc, gl) {
  var locationMap = param[2];
  var name = param[1];
  var match = MutableHashMapService$WonderCommonlib.get(name, locationMap);
  if (match !== undefined) {
    return Caml_option.valFromOption(match);
  } else {
    var pos = getGlLocationFunc(param[0], name, gl);
    MutableHashMapService$WonderCommonlib.set(name, pos, locationMap);
    return pos;
  }
}

function _getGlAttribLocation(program, name, gl) {
  return gl.getAttribLocation(program, name);
}

function _getGlUniformLocation(program, name, gl) {
  return gl.getUniformLocation(program, name);
}

function getAttribLocationAndCache(program, name, attributeLocationMap, gl) {
  return _getLocationAndCache(/* tuple */[
              program,
              name,
              attributeLocationMap
            ], _getGlAttribLocation, gl);
}

function getUniformLocationAndCache(program, name, uniformLocationMap, gl) {
  return _getLocationAndCache(/* tuple */[
              program,
              name,
              uniformLocationMap
            ], _getGlUniformLocation, gl);
}

function getAttributeLocationMap(shaderIndex, glslLocationRecord) {
  return MutableSparseMapService$WonderCommonlib.get(shaderIndex, glslLocationRecord[/* attributeLocationMap */0]);
}

function setAttributeLocationMap(shaderIndex, attributeLocationMap, glslLocationRecord) {
  MutableSparseMapService$WonderCommonlib.set(shaderIndex, attributeLocationMap, glslLocationRecord[/* attributeLocationMap */0]);
  return glslLocationRecord;
}

function getUniformLocationMap(shaderIndex, glslLocationRecord) {
  return MutableSparseMapService$WonderCommonlib.get(shaderIndex, glslLocationRecord[/* uniformLocationMap */1]);
}

function setUniformLocationMap(shaderIndex, uniformLocationMap, glslLocationRecord) {
  MutableSparseMapService$WonderCommonlib.set(shaderIndex, uniformLocationMap, glslLocationRecord[/* uniformLocationMap */1]);
  return glslLocationRecord;
}

function clearUniformLocationMap(shaderIndex, glslLocationRecord) {
  return setUniformLocationMap(shaderIndex, MutableHashMapService$WonderCommonlib.createEmpty(/* () */0), glslLocationRecord);
}

function createLocationMap(param) {
  return MutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
}

function isAttributeLocationExist(pos) {
  return pos !== -1;
}

function isUniformLocationExist(pos) {
  return pos !== null;
}

export {
  _getLocationAndCache ,
  _getGlAttribLocation ,
  _getGlUniformLocation ,
  getAttribLocationAndCache ,
  getUniformLocationAndCache ,
  getAttributeLocationMap ,
  setAttributeLocationMap ,
  getUniformLocationMap ,
  setUniformLocationMap ,
  clearUniformLocationMap ,
  createLocationMap ,
  isAttributeLocationExist ,
  isUniformLocationExist ,
  
}
/* No side effect */
