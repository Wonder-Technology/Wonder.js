

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function create(param) {
  return /* record */[
          /* objectInstanceTransformIndexMap */undefined,
          /* objectInstanceTransformCollections */undefined,
          /* isTransformStatics */undefined,
          /* matrixInstanceBufferCapacityMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* matrixFloat32ArrayMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* isSendTransformMatrixDataMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function unsafeGetObjectInstanceTransformIndexMap(record) {
  return OptionService$Wonderjs.unsafeGet(record[/* objectInstanceTransformIndexMap */0]);
}

function unsafeGetObjectInstanceTransformCollections(record) {
  return OptionService$Wonderjs.unsafeGet(record[/* objectInstanceTransformCollections */1]);
}

function unsafeGetIsTransformStaticMap(record) {
  return OptionService$Wonderjs.unsafeGet(record[/* isTransformStatics */2]);
}

export {
  create ,
  unsafeGetObjectInstanceTransformIndexMap ,
  unsafeGetObjectInstanceTransformCollections ,
  unsafeGetIsTransformStaticMap ,
  
}
/* OptionService-Wonderjs Not a pure module */
