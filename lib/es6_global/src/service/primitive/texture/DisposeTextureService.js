

import * as ArrayService$Wonderjs from "../../atom/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../component/DisposeComponentService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var needDisposeGlTextureMap = MutableSparseMapService$WonderCommonlib.has;

var addDisposeIndex = ArrayService$Wonderjs.push;

var isAlive = DisposeComponentService$Wonderjs.isAlive;

export {
  needDisposeGlTextureMap ,
  addDisposeIndex ,
  isAlive ,
  
}
/* ArrayService-Wonderjs Not a pure module */
