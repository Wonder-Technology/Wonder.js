

import * as NullService$Wonderjs from "./NullService.js";
import * as MutableHashMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function deleteValFromMap (key,map){
    delete map[key];

    return map;
    };

function fastGet(key, map) {
  var value = MutableHashMapService$WonderCommonlib.unsafeGet(key, map);
  return /* tuple */[
          NullService$Wonderjs.isInMap(value),
          value
        ];
}

export {
  deleteValFromMap ,
  fastGet ,
  
}
/* No side effect */
