

import * as ArraySt$WonderCommonlib from "../structure/ArraySt.bs.js";
import * as MutableSparseMap$WonderCommonlib from "../structure/sparse_map/MutableSparseMap.bs.js";

function addValue(map, key, value) {
  var arr = MutableSparseMap$WonderCommonlib.get(map, key);
  if (arr !== undefined) {
    return MutableSparseMap$WonderCommonlib.set(map, key, ArraySt$WonderCommonlib.push(arr, value));
  } else {
    return MutableSparseMap$WonderCommonlib.set(map, key, [value]);
  }
}

export {
  addValue ,
  
}
/* No side effect */
