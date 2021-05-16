

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function create(param) {
  return /* record */[
          /* attributeSendDataMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* instanceAttributeSendDataMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* uniformCacheMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* uniformRenderObjectSendModelDataMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* uniformRenderObjectSendMaterialDataMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* uniformShaderSendNoCachableDataMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* uniformShaderSendCachableDataMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* uniformShaderSendCachableFunctionDataMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* uniformInstanceSendNoCachableDataMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* uniformNoMaterialShaderSendCachableDataMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* vertexAttribHistoryArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
          /* lastSendMaterialData */undefined,
          /* lastSendGeometryData */undefined
        ];
}

function deepCopyForRestore(record) {
  return /* record */[
          /* attributeSendDataMap */MutableSparseMapService$WonderCommonlib.copy(record[/* attributeSendDataMap */0]),
          /* instanceAttributeSendDataMap */MutableSparseMapService$WonderCommonlib.copy(record[/* instanceAttributeSendDataMap */1]),
          /* uniformCacheMap */record[/* uniformCacheMap */2],
          /* uniformRenderObjectSendModelDataMap */MutableSparseMapService$WonderCommonlib.copy(record[/* uniformRenderObjectSendModelDataMap */3]),
          /* uniformRenderObjectSendMaterialDataMap */MutableSparseMapService$WonderCommonlib.copy(record[/* uniformRenderObjectSendMaterialDataMap */4]),
          /* uniformShaderSendNoCachableDataMap */MutableSparseMapService$WonderCommonlib.copy(record[/* uniformShaderSendNoCachableDataMap */5]),
          /* uniformShaderSendCachableDataMap */MutableSparseMapService$WonderCommonlib.copy(record[/* uniformShaderSendCachableDataMap */6]),
          /* uniformShaderSendCachableFunctionDataMap */MutableSparseMapService$WonderCommonlib.copy(record[/* uniformShaderSendCachableFunctionDataMap */7]),
          /* uniformInstanceSendNoCachableDataMap */MutableSparseMapService$WonderCommonlib.copy(record[/* uniformInstanceSendNoCachableDataMap */8]),
          /* uniformNoMaterialShaderSendCachableDataMap */MutableSparseMapService$WonderCommonlib.copy(record[/* uniformNoMaterialShaderSendCachableDataMap */9]),
          /* vertexAttribHistoryArray */record[/* vertexAttribHistoryArray */10],
          /* lastSendMaterialData */record[/* lastSendMaterialData */11],
          /* lastSendGeometryData */record[/* lastSendGeometryData */12]
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* No side effect */
