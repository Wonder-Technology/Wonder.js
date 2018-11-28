

import * as SparseMapService$Wonderjs from "../../../../atom/SparseMapService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function create() {
  return /* record */[
          /* index */0,
          /* pointDownEventHandleFuncMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointUpEventHandleFuncMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointDragEventHandleFuncMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointScaleEventHandleFuncMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* keydownEventHandleFuncMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* dirtyArray */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* distanceMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* minDistanceMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* phiMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* thetaMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* thetaMarginMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* targetMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* moveSpeedXMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* moveSpeedYMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* rotateSpeedMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* wheelSpeedMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* gameObjectMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(param) {
  return /* record */[
          /* index */param[/* index */0],
          /* pointDownEventHandleFuncMap */SparseMapService$Wonderjs.copy(param[/* pointDownEventHandleFuncMap */1]),
          /* pointUpEventHandleFuncMap */SparseMapService$Wonderjs.copy(param[/* pointUpEventHandleFuncMap */2]),
          /* pointDragEventHandleFuncMap */SparseMapService$Wonderjs.copy(param[/* pointDragEventHandleFuncMap */3]),
          /* pointScaleEventHandleFuncMap */SparseMapService$Wonderjs.copy(param[/* pointScaleEventHandleFuncMap */4]),
          /* keydownEventHandleFuncMap */SparseMapService$Wonderjs.copy(param[/* keydownEventHandleFuncMap */5]),
          /* dirtyArray */SparseMapService$Wonderjs.copy(param[/* dirtyArray */6]),
          /* distanceMap */SparseMapService$Wonderjs.copy(param[/* distanceMap */7]),
          /* minDistanceMap */SparseMapService$Wonderjs.copy(param[/* minDistanceMap */8]),
          /* phiMap */SparseMapService$Wonderjs.copy(param[/* phiMap */9]),
          /* thetaMap */SparseMapService$Wonderjs.copy(param[/* thetaMap */10]),
          /* thetaMarginMap */SparseMapService$Wonderjs.copy(param[/* thetaMarginMap */11]),
          /* targetMap */SparseMapService$Wonderjs.copy(param[/* targetMap */12]),
          /* moveSpeedXMap */SparseMapService$Wonderjs.copy(param[/* moveSpeedXMap */13]),
          /* moveSpeedYMap */SparseMapService$Wonderjs.copy(param[/* moveSpeedYMap */14]),
          /* rotateSpeedMap */SparseMapService$Wonderjs.copy(param[/* rotateSpeedMap */15]),
          /* wheelSpeedMap */SparseMapService$Wonderjs.copy(param[/* wheelSpeedMap */16]),
          /* gameObjectMap */SparseMapService$Wonderjs.copy(param[/* gameObjectMap */17]),
          /* disposedIndexArray */param[/* disposedIndexArray */18].slice()
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* SparseMapService-Wonderjs Not a pure module */
