

import * as SparseMapService$Wonderjs from "../../service/atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function createSparseMap() {
  return SparseMapService$WonderCommonlib.createEmpty(/* () */0);
}

var unsafeGetSparseMapValue = SparseMapService$WonderCommonlib.unsafeGet;

var getSparseMapValue = SparseMapService$WonderCommonlib.get;

var setSparseMapValue = SparseMapService$WonderCommonlib.set;

var mergeSparseMaps = SparseMapService$Wonderjs.mergeSparseMaps;

export {
  createSparseMap ,
  unsafeGetSparseMapValue ,
  getSparseMapValue ,
  setSparseMapValue ,
  mergeSparseMaps ,
  
}
/* SparseMapService-Wonderjs Not a pure module */
