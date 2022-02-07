'use strict';

var MutableHashMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/hash_map/MutableHashMap.bs.js");
var ImmutableHashMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

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

exports.createPO = createPO;
/* No side effect */
