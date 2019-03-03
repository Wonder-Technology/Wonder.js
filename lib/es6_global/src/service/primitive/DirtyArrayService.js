

import * as ArrayService$Wonderjs from "../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function create(param) {
  return ArrayService$WonderCommonlib.createEmpty(/* () */0);
}

var addToDirtyArray = ArrayService$Wonderjs.push;

function removeFromDirtyArray(index, dirtyArray) {
  return dirtyArray.filter((function (dirtyIndex) {
                return dirtyIndex !== index;
              }));
}

function getCount(dirtyArray) {
  return dirtyArray.length;
}

export {
  create ,
  addToDirtyArray ,
  removeFromDirtyArray ,
  getCount ,
  
}
/* ArrayService-Wonderjs Not a pure module */
