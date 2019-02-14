

import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function create() {
  return /* record */[
          /* index */0,
          /* pointDragStartEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointDragDropEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointDragOverEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointScaleEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* keydownEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* dirtyArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
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
          /* gameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(param) {
  return /* record */[
          /* index */param[/* index */0],
          /* pointDragStartEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.copy(param[/* pointDragStartEventHandleFuncMap */1]),
          /* pointDragDropEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.copy(param[/* pointDragDropEventHandleFuncMap */2]),
          /* pointDragOverEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.copy(param[/* pointDragOverEventHandleFuncMap */3]),
          /* pointScaleEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.copy(param[/* pointScaleEventHandleFuncMap */4]),
          /* keydownEventHandleFuncMap */MutableSparseMapService$WonderCommonlib.copy(param[/* keydownEventHandleFuncMap */5]),
          /* dirtyArray */param[/* dirtyArray */6].slice(),
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
          /* gameObjectMap */MutableSparseMapService$WonderCommonlib.copy(param[/* gameObjectMap */17]),
          /* disposedIndexArray */param[/* disposedIndexArray */18].slice()
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
