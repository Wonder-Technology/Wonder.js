'use strict';

var SparseMap$Wonderjs = require("./SparseMap.bs.js");

function set(map, key, value) {
  var newMap = SparseMap$Wonderjs.copy(map);
  newMap[key] = value;
  return newMap;
}

function remove(map, key) {
  var newMap = SparseMap$Wonderjs.copy(map);
  newMap[key] = undefined;
  return newMap;
}

var createEmpty = SparseMap$Wonderjs.createEmpty;

var copy = SparseMap$Wonderjs.copy;

var get = SparseMap$Wonderjs.get;

var getNullable = SparseMap$Wonderjs.getNullable;

var has = SparseMap$Wonderjs.has;

exports.createEmpty = createEmpty;
exports.copy = copy;
exports.get = get;
exports.getNullable = getNullable;
exports.has = has;
exports.set = set;
exports.remove = remove;
/* No side effect */
