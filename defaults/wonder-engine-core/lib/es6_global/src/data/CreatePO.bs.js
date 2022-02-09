

import * as MutableHashMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/hash_map/MutableHashMap.bs.js";
import * as ImmutableHashMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function createPO(param) {
  return {
          allRegisteredWorkPluginData: /* [] */0,
          states: ImmutableHashMap$WonderCommonlib.createEmpty(undefined, undefined),
          pluginData: {
            isDebug: false
          },
          componentData: {
            allRegisteredComponentData: ImmutableHashMap$WonderCommonlib.createEmpty(undefined, undefined),
            allUsedComponentData: MutableHashMap$WonderCommonlib.createEmpty(undefined, undefined)
          },
          gameObjectData: undefined,
          usedGameObjectData: undefined
        };
}

export {
  createPO ,
  
}
/* No side effect */
