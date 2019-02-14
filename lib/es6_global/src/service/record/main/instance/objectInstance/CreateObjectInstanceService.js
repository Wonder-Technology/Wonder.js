

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var _setSourceInstance = MutableSparseMapService$WonderCommonlib.set;

function create(sourceInstance, uid, record) {
  var match = IndexComponentService$Wonderjs.generateIndex(record[/* index */0], record[/* disposedIndexArray */2]);
  var index = match[0];
  return /* tuple */[
          /* record */[
            /* index */match[1],
            /* sourceInstanceMap */MutableSparseMapService$WonderCommonlib.set(index, sourceInstance, record[/* sourceInstanceMap */1]),
            /* disposedIndexArray */record[/* disposedIndexArray */2],
            /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(index, uid, record[/* gameObjectMap */3])
          ],
          index
        ];
}

export {
  _setSourceInstance ,
  create ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
