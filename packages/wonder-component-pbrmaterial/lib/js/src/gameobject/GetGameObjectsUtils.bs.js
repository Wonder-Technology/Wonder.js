'use strict';

var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function get(param, material) {
  return ArraySt$WonderCommonlib.map(OptionSt$WonderCommonlib.getWithDefault(MutableSparseMap$WonderCommonlib.get(param.gameObjectsMap, material), []), (function (prim) {
                return prim;
              }));
}

exports.get = get;
/* No side effect */
