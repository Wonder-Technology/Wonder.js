

import * as OptionService$Wonderjs from "../../atom/OptionService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var getTexture = MutableSparseMapService$WonderCommonlib.get;

function unsafeGetTexture(texture, glTextureMap) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(texture, glTextureMap));
}

var setTexture = MutableSparseMapService$WonderCommonlib.set;

export {
  getTexture ,
  unsafeGetTexture ,
  setTexture ,
  
}
/* OptionService-Wonderjs Not a pure module */
