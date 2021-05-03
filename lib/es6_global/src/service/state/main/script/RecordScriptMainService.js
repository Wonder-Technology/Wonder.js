

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function getRecord(param) {
  return param[/* scriptRecord */27];
}

function create(param) {
  return /* record */[
          /* index */0,
          /* isScriptEventFunctionEnable */true,
          /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
          /* gameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* isActiveMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* scriptEventFunctionDataMap */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* scriptAttributeMap */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(state) {
  var record = getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* scriptRecord */27] = /* record */[
    /* index */record[/* index */0],
    /* isScriptEventFunctionEnable */record[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */record[/* disposedIndexArray */2].slice(),
    /* gameObjectMap */MutableSparseMapService$WonderCommonlib.copy(record[/* gameObjectMap */3]),
    /* isActiveMap */MutableSparseMapService$WonderCommonlib.copy(record[/* isActiveMap */4]),
    /* scriptEventFunctionDataMap */record[/* scriptEventFunctionDataMap */5],
    /* scriptAttributeMap */record[/* scriptAttributeMap */6]
  ];
  return newrecord;
}

export {
  getRecord ,
  create ,
  deepCopyForRestore ,
  
}
/* No side effect */
