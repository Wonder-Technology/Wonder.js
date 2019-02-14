

import * as DirtyArrayService$Wonderjs from "../../../../primitive/DirtyArrayService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _setDefaultValue(index, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */record[/* dirtyArray */6],
          /* distanceMap */MutableSparseMapService$WonderCommonlib.set(index, 10, record[/* distanceMap */7]),
          /* minDistanceMap */MutableSparseMapService$WonderCommonlib.set(index, 0.05, record[/* minDistanceMap */8]),
          /* phiMap */MutableSparseMapService$WonderCommonlib.set(index, Math.PI / 2, record[/* phiMap */9]),
          /* thetaMap */MutableSparseMapService$WonderCommonlib.set(index, Math.PI / 2, record[/* thetaMap */10]),
          /* thetaMarginMap */MutableSparseMapService$WonderCommonlib.set(index, 0.05, record[/* thetaMarginMap */11]),
          /* targetMap */MutableSparseMapService$WonderCommonlib.set(index, /* tuple */[
                0,
                0,
                0
              ], record[/* targetMap */12]),
          /* moveSpeedXMap */MutableSparseMapService$WonderCommonlib.set(index, 1, record[/* moveSpeedXMap */13]),
          /* moveSpeedYMap */MutableSparseMapService$WonderCommonlib.set(index, 1, record[/* moveSpeedYMap */14]),
          /* rotateSpeedMap */MutableSparseMapService$WonderCommonlib.set(index, 1, record[/* rotateSpeedMap */15]),
          /* wheelSpeedMap */MutableSparseMapService$WonderCommonlib.set(index, 1, record[/* wheelSpeedMap */16]),
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
            /* pointDragStartEventHandleFuncMap */record$1[/* pointDragStartEventHandleFuncMap */1],
            /* pointDragDropEventHandleFuncMap */record$1[/* pointDragDropEventHandleFuncMap */2],
            /* pointDragOverEventHandleFuncMap */record$1[/* pointDragOverEventHandleFuncMap */3],
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
