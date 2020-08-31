'use strict';

var HashMap$Wonderjs = require("./HashMap.bs.js");

function set(map, key, value) {
  map[key] = value;
  return map;
}

var createEmpty = HashMap$Wonderjs.createEmpty;

var get = HashMap$Wonderjs.get;

var getNullable = HashMap$Wonderjs.getNullable;

var has = HashMap$Wonderjs.has;

exports.createEmpty = createEmpty;
exports.set = set;
exports.get = get;
exports.getNullable = getNullable;
exports.has = has;
/* No side effect */
