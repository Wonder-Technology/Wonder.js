'use strict';

var SparseMap$Wonderjs = require("./SparseMap.bs.js");

function set(map, key, value) {
  map[key] = value;
  return map;
}

function remove(map, key) {
  map[key] = undefined;
  return map;
}

var createEmpty = SparseMap$Wonderjs.createEmpty;

var copy = SparseMap$Wonderjs.copy;

var get = SparseMap$Wonderjs.get;

var getNullable = SparseMap$Wonderjs.getNullable;

var has = SparseMap$Wonderjs.has;

var map = SparseMap$Wonderjs.map;

var reducei = SparseMap$Wonderjs.reducei;

var getValues = SparseMap$Wonderjs.getValues;

var getKeys = SparseMap$Wonderjs.getKeys;

exports.createEmpty = createEmpty;
exports.copy = copy;
exports.get = get;
exports.getNullable = getNullable;
exports.has = has;
exports.set = set;
exports.remove = remove;
exports.map = map;
exports.reducei = reducei;
exports.getValues = getValues;
exports.getKeys = getKeys;
/* No side effect */
