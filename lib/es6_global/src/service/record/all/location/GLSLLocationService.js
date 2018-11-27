

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function _getLocation(param, getGlLocationFunc, gl) {
  var locationMap = param[2];
  var name = param[1];
  var match = HashMapService$WonderCommonlib.get(name, locationMap);
  if (match !== undefined) {
    return Js_primitive.valFromOption(match);
  } else {
    var pos = getGlLocationFunc(param[0], name, gl);
    HashMapService$WonderCommonlib.set(name, pos, locationMap);
    return pos;
  }
}

function _getGlAttribLocation(program, name, gl) {
  return gl.getAttribLocation(program, name);
}

function _getGlUniformLocation(program, name, gl) {
  return gl.getUniformLocation(program, name);
}

function getAttribLocation(program, name, attributeLocationMap, gl) {
  return _getLocation(/* tuple */[
              program,
              name,
              attributeLocationMap
            ], _getGlAttribLocation, gl);
}

function getUniformLocation(program, name, uniformLocationMap, gl) {
  return _getLocation(/* tuple */[
              program,
              name,
              uniformLocationMap
            ], _getGlUniformLocation, gl);
}

function getAttributeLocationMap(shaderIndex, glslLocationRecord) {
  return SparseMapService$WonderCommonlib.get(shaderIndex, glslLocationRecord[/* attributeLocationMap */0]);
}

function setAttributeLocationMap(shaderIndex, attributeLocationMap, glslLocationRecord) {
  SparseMapService$WonderCommonlib.set(shaderIndex, attributeLocationMap, glslLocationRecord[/* attributeLocationMap */0]);
  return glslLocationRecord;
}

function getUniformLocationMap(shaderIndex, glslLocationRecord) {
  return SparseMapService$WonderCommonlib.get(shaderIndex, glslLocationRecord[/* uniformLocationMap */1]);
}

function setUniformLocationMap(shaderIndex, uniformLocationMap, glslLocationRecord) {
  SparseMapService$WonderCommonlib.set(shaderIndex, uniformLocationMap, glslLocationRecord[/* uniformLocationMap */1]);
  return glslLocationRecord;
}

function clearUniformLocationMap(shaderIndex, glslLocationRecord) {
  return setUniformLocationMap(shaderIndex, HashMapService$WonderCommonlib.createEmpty(/* () */0), glslLocationRecord);
}

function createLocationMap() {
  return HashMapService$WonderCommonlib.createEmpty(/* () */0);
}

function isAttributeLocationExist(pos) {
  return pos !== -1;
}

function isUniformLocationExist(pos) {
  return pos !== null;
}

export {
  _getLocation ,
  _getGlAttribLocation ,
  _getGlUniformLocation ,
  getAttribLocation ,
  getUniformLocation ,
  getAttributeLocationMap ,
  setAttributeLocationMap ,
  getUniformLocationMap ,
  setUniformLocationMap ,
  clearUniformLocationMap ,
  createLocationMap ,
  isAttributeLocationExist ,
  isUniformLocationExist ,
  
}
/* HashMapService-WonderCommonlib Not a pure module */
