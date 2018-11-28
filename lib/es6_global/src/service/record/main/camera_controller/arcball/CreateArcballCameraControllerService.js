

import * as DirtyArrayService$Wonderjs from "../../../../primitive/DirtyArrayService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function _setDefaultValue(index, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDownEventHandleFuncMap */record[/* pointDownEventHandleFuncMap */1],
          /* pointUpEventHandleFuncMap */record[/* pointUpEventHandleFuncMap */2],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */record[/* dirtyArray */6],
          /* distanceMap */SparseMapService$WonderCommonlib.set(index, 10, record[/* distanceMap */7]),
          /* minDistanceMap */SparseMapService$WonderCommonlib.set(index, 0.05, record[/* minDistanceMap */8]),
          /* phiMap */SparseMapService$WonderCommonlib.set(index, Math.PI / 2, record[/* phiMap */9]),
          /* thetaMap */SparseMapService$WonderCommonlib.set(index, Math.PI / 2, record[/* thetaMap */10]),
          /* thetaMarginMap */SparseMapService$WonderCommonlib.set(index, 0.05, record[/* thetaMarginMap */11]),
          /* targetMap */SparseMapService$WonderCommonlib.set(index, /* tuple */[
                0,
                0,
                0
              ], record[/* targetMap */12]),
          /* moveSpeedXMap */SparseMapService$WonderCommonlib.set(index, 1, record[/* moveSpeedXMap */13]),
          /* moveSpeedYMap */SparseMapService$WonderCommonlib.set(index, 1, record[/* moveSpeedYMap */14]),
          /* rotateSpeedMap */SparseMapService$WonderCommonlib.set(index, 1, record[/* rotateSpeedMap */15]),
          /* wheelSpeedMap */SparseMapService$WonderCommonlib.set(index, 1, record[/* wheelSpeedMap */16]),
          /* gameObjectMap */record[/* gameObjectMap */17],
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

function create(record) {
  var match = IndexComponentService$Wonderjs.generateIndex(record[/* index */0], record[/* disposedIndexArray */18]);
  var index = match[0];
  var record$1 = _setDefaultValue(index, record);
  return /* tuple */[
          /* record */[
            /* index */match[1],
            /* pointDownEventHandleFuncMap */record$1[/* pointDownEventHandleFuncMap */1],
            /* pointUpEventHandleFuncMap */record$1[/* pointUpEventHandleFuncMap */2],
            /* pointDragEventHandleFuncMap */record$1[/* pointDragEventHandleFuncMap */3],
            /* pointScaleEventHandleFuncMap */record$1[/* pointScaleEventHandleFuncMap */4],
            /* keydownEventHandleFuncMap */record$1[/* keydownEventHandleFuncMap */5],
            /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(index, record[/* dirtyArray */6]),
            /* distanceMap */record$1[/* distanceMap */7],
            /* minDistanceMap */record$1[/* minDistanceMap */8],
            /* phiMap */record$1[/* phiMap */9],
            /* thetaMap */record$1[/* thetaMap */10],
            /* thetaMarginMap */record$1[/* thetaMarginMap */11],
            /* targetMap */record$1[/* targetMap */12],
            /* moveSpeedXMap */record$1[/* moveSpeedXMap */13],
            /* moveSpeedYMap */record$1[/* moveSpeedYMap */14],
            /* rotateSpeedMap */record$1[/* rotateSpeedMap */15],
            /* wheelSpeedMap */record$1[/* wheelSpeedMap */16],
            /* gameObjectMap */record$1[/* gameObjectMap */17],
            /* disposedIndexArray */match[2]
          ],
          index
        ];
}

export {
  _setDefaultValue ,
  create ,
  
}
/* DirtyArrayService-Wonderjs Not a pure module */
