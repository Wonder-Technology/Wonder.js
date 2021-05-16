

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function unsafeGetMoveSpeed(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* moveSpeedMap */7]));
}

function setMoveSpeed(cameraController, moveSpeed, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */MutableSparseMapService$WonderCommonlib.set(cameraController, moveSpeed, record[/* moveSpeedMap */7]),
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function unsafeGetWheelSpeed(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* wheelSpeedMap */8]));
}

function setWheelSpeed(cameraController, wheelSpeed, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */MutableSparseMapService$WonderCommonlib.set(cameraController, wheelSpeed, record[/* wheelSpeedMap */8]),
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function unsafeGetRotateSpeed(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* rotateSpeedMap */9]));
}

function setRotateSpeed(cameraController, rotateSpeed, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */MutableSparseMapService$WonderCommonlib.set(cameraController, rotateSpeed, record[/* rotateSpeedMap */9]),
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function unsafeGetEulerAngleDiff(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* eulerAngleDiffMap */10]));
}

function setEulerAngleDiff(cameraController, value, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */MutableSparseMapService$WonderCommonlib.set(cameraController, value, record[/* eulerAngleDiffMap */10]),
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function unsafeGetTranslationDiff(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* translationDiffMap */11]));
}

function setTranslationDiff(cameraController, value, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */MutableSparseMapService$WonderCommonlib.set(cameraController, value, record[/* translationDiffMap */11]),
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function unsafeGetDirectionArray(cameraController, record) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* directionArrayMap */14]));
}

function hasDirection(cameraController, record) {
  return ArrayService$Wonderjs.hasItem(OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(cameraController, record[/* directionArrayMap */14])));
}

function setDirectionArray(cameraController, directionArray, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */MutableSparseMapService$WonderCommonlib.set(cameraController, directionArray, record[/* directionArrayMap */14]),
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

function getLocalEulerAngle(transformComponent, record) {
  return MutableSparseMapService$WonderCommonlib.get(transformComponent, record[/* localEulerAngleMap */15]);
}

function setLocalEulerAngle(transformComponent, value, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */record[/* gameObjectMap */12],
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */MutableSparseMapService$WonderCommonlib.set(transformComponent, value, record[/* localEulerAngleMap */15])
        ];
}

export {
  unsafeGetMoveSpeed ,
  setMoveSpeed ,
  unsafeGetWheelSpeed ,
  setWheelSpeed ,
  unsafeGetRotateSpeed ,
  setRotateSpeed ,
  unsafeGetEulerAngleDiff ,
  setEulerAngleDiff ,
  unsafeGetTranslationDiff ,
  setTranslationDiff ,
  unsafeGetDirectionArray ,
  hasDirection ,
  setDirectionArray ,
  getLocalEulerAngle ,
  setLocalEulerAngle ,
  
}
/* ArrayService-Wonderjs Not a pure module */
