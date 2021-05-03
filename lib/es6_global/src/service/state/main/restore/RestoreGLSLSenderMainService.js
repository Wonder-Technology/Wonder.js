

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function restore(currentState, targetState) {
  var newrecord = Caml_array.caml_array_dup(targetState);
  var init = targetState[/* glslSenderRecord */32];
  newrecord[/* glslSenderRecord */32] = /* record */[
    /* attributeSendDataMap */init[/* attributeSendDataMap */0],
    /* instanceAttributeSendDataMap */init[/* instanceAttributeSendDataMap */1],
    /* uniformCacheMap */init[/* uniformCacheMap */2],
    /* uniformRenderObjectSendModelDataMap */init[/* uniformRenderObjectSendModelDataMap */3],
    /* uniformRenderObjectSendMaterialDataMap */init[/* uniformRenderObjectSendMaterialDataMap */4],
    /* uniformShaderSendNoCachableDataMap */init[/* uniformShaderSendNoCachableDataMap */5],
    /* uniformShaderSendCachableDataMap */init[/* uniformShaderSendCachableDataMap */6],
    /* uniformShaderSendCachableFunctionDataMap */init[/* uniformShaderSendCachableFunctionDataMap */7],
    /* uniformInstanceSendNoCachableDataMap */init[/* uniformInstanceSendNoCachableDataMap */8],
    /* uniformNoMaterialShaderSendCachableDataMap */init[/* uniformNoMaterialShaderSendCachableDataMap */9],
    /* vertexAttribHistoryArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* lastSendMaterialData */undefined,
    /* lastSendGeometryData */init[/* lastSendGeometryData */12]
  ];
  return newrecord;
}

export {
  restore ,
  
}
/* No side effect */
