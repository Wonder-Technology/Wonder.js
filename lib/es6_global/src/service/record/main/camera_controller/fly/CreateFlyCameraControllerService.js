

import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _setDefaultValue(index, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */MutableSparseMapService$WonderCommonlib.set(index, 0.5, record[/* moveSpeedMap */7]),
          /* wheelSpeedMap */MutableSparseMapService$WonderCommonlib.set(index, 2.5, record[/* wheelSpeedMap */8]),
          /* rotateSpeedMap */MutableSparseMapService$WonderCommonlib.set(index, 100, record[/* rotateSpeedMap */9]),
          /* eulerAngleDiffMap */MutableSparseMapService$WonderCommonlib.set(index, /* record */[
                /* diffX */0,
                /* diffY */0
              ], record[/* eulerAngleDiffMap */10]),
          /* translationDiffMap */MutableSparseMapService$WonderCommonlib.set(index, /* tuple */[
                0,
                0,
                0
              ], record[/* translationDiffMap */11]),
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */MutableSparseMapService$WonderCommonlib.set(index, /* array */[], record[/* directionArrayMap */14]),
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function create(record) {
  var match = IndexComponentService$Wonderjs.generateIndex(record[/* index */0], record[/* disposedIndexArray */13]);
  var index = match[0];
  var record$1 = _setDefaultValue(index, record);
  return /* tuple */[
          /* record */[
            /* index */match[1],
            /* pointDragStartEventHandleFuncListMap */record$1[/* pointDragStartEventHandleFuncListMap */1],
            /* pointDragDropEventHandleFuncListMap */record$1[/* pointDragDropEventHandleFuncListMap */2],
            /* pointDragOverEventHandleFuncListMap */record$1[/* pointDragOverEventHandleFuncListMap */3],
            /* pointScaleEventHandleFuncListMap */record$1[/* pointScaleEventHandleFuncListMap */4],
            /* keydownEventHandleFuncListMap */record$1[/* keydownEventHandleFuncListMap */5],
            /* keyupEventHandleFuncListMap */record$1[/* keyupEventHandleFuncListMap */6],
            /* moveSpeedMap */record$1[/* moveSpeedMap */7],
            /* wheelSpeedMap */record$1[/* wheelSpeedMap */8],
            /* rotateSpeedMap */record$1[/* rotateSpeedMap */9],
            /* eulerAngleDiffMap */record$1[/* eulerAngleDiffMap */10],
            /* translationDiffMap */record$1[/* translationDiffMap */11],
            /* gameObjectMap */record$1[/* gameObjectMap */12],
            /* disposedIndexArray */match[2],
            /* directionArrayMap */record$1[/* directionArrayMap */14],
            /* localEulerAngleMap */record$1[/* localEulerAngleMap */15]
          ],
          index
        ];
}

export {
  _setDefaultValue ,
  create ,
  
}
/* No side effect */
