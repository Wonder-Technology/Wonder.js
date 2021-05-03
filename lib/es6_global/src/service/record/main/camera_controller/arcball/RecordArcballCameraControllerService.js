

import * as ArrayService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function create(param) {
  return /* record */[
          /* index */0,
          /* pointDragStartEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointDragDropEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointDragOverEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointScaleEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* keydownEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* keyupEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* distanceMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* minDistanceMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* phiMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* thetaMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* thetaMarginMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* targetMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* moveSpeedXMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* moveSpeedYMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* rotateSpeedMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* wheelSpeedMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* directionArrayMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* gameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(param) {
  return /* record */[
          /* index */param[/* index */0],
          /* pointDragStartEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.copy(param[/* pointDragStartEventHandleFuncListMap */1]),
          /* pointDragDropEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.copy(param[/* pointDragDropEventHandleFuncListMap */2]),
          /* pointDragOverEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.copy(param[/* pointDragOverEventHandleFuncListMap */3]),
          /* pointScaleEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.copy(param[/* pointScaleEventHandleFuncListMap */4]),
          /* keydownEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.copy(param[/* keydownEventHandleFuncListMap */5]),
          /* keyupEventHandleFuncListMap */MutableSparseMapService$WonderCommonlib.copy(param[/* keyupEventHandleFuncListMap */6]),
          /* distanceMap */MutableSparseMapService$WonderCommonlib.copy(param[/* distanceMap */7]),
          /* minDistanceMap */MutableSparseMapService$WonderCommonlib.copy(param[/* minDistanceMap */8]),
          /* phiMap */MutableSparseMapService$WonderCommonlib.copy(param[/* phiMap */9]),
          /* thetaMap */MutableSparseMapService$WonderCommonlib.copy(param[/* thetaMap */10]),
          /* thetaMarginMap */MutableSparseMapService$WonderCommonlib.copy(param[/* thetaMarginMap */11]),
          /* targetMap */MutableSparseMapService$WonderCommonlib.copy(param[/* targetMap */12]),
          /* moveSpeedXMap */MutableSparseMapService$WonderCommonlib.copy(param[/* moveSpeedXMap */13]),
          /* moveSpeedYMap */MutableSparseMapService$WonderCommonlib.copy(param[/* moveSpeedYMap */14]),
          /* rotateSpeedMap */MutableSparseMapService$WonderCommonlib.copy(param[/* rotateSpeedMap */15]),
          /* wheelSpeedMap */MutableSparseMapService$WonderCommonlib.copy(param[/* wheelSpeedMap */16]),
          /* directionArrayMap */MutableSparseMapService$WonderCommonlib.copy(param[/* directionArrayMap */17]),
          /* gameObjectMap */MutableSparseMapService$WonderCommonlib.copy(param[/* gameObjectMap */18]),
          /* disposedIndexArray */param[/* disposedIndexArray */19].slice()
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* No side effect */
