

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as DirtyArrayService$Wonderjs from "../../../../primitive/DirtyArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GetAllComponentService$Wonderjs from "../../../../primitive/component/GetAllComponentService.js";
import * as LookAtTransfromMainService$Wonderjs from "../../transform/LookAtTransfromMainService.js";
import * as RecordTransformMainService$Wonderjs from "../../transform/RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../../record/main/transform/ModelMatrixTransformService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/OperateArcballCameraControllerService.js";
import * as GameObjectArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/GameObjectArcballCameraControllerService.js";

function _updateTransform(cameraController, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var transform = GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(GameObjectArcballCameraControllerService$Wonderjs.unsafeGetGameObject(cameraController, arcballCameraControllerRecord), gameObjectRecord);
  var distance = OperateArcballCameraControllerService$Wonderjs.unsafeGetDistance(cameraController, arcballCameraControllerRecord);
  var phi = OperateArcballCameraControllerService$Wonderjs.unsafeGetPhi(cameraController, arcballCameraControllerRecord);
  var theta = OperateArcballCameraControllerService$Wonderjs.unsafeGetTheta(cameraController, arcballCameraControllerRecord);
  var target = OperateArcballCameraControllerService$Wonderjs.unsafeGetTarget(cameraController, arcballCameraControllerRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* transformRecord */11] = ModelMatrixTransformService$Wonderjs.setLocalPositionByTuple(transform, /* tuple */[
        distance * Math.cos(phi) * Math.sin(theta) + target[0],
        distance * Math.cos(theta) + target[1],
        distance * Math.sin(phi) * Math.sin(theta) + target[2]
      ], transformRecord);
  return LookAtTransfromMainService$Wonderjs.lookAt(transform, target, newrecord, undefined, /* () */0);
}

function _clearDirtyArray(state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */24] = /* record */[
    /* index */arcballCameraControllerRecord[/* index */0],
    /* pointDragStartEventHandleFuncListMap */arcballCameraControllerRecord[/* pointDragStartEventHandleFuncListMap */1],
    /* pointDragDropEventHandleFuncListMap */arcballCameraControllerRecord[/* pointDragDropEventHandleFuncListMap */2],
    /* pointDragOverEventHandleFuncListMap */arcballCameraControllerRecord[/* pointDragOverEventHandleFuncListMap */3],
    /* pointScaleEventHandleFuncListMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncListMap */4],
    /* keydownEventHandleFuncListMap */arcballCameraControllerRecord[/* keydownEventHandleFuncListMap */5],
    /* dirtyArray */DirtyArrayService$Wonderjs.create(/* () */0),
    /* distanceMap */arcballCameraControllerRecord[/* distanceMap */7],
    /* minDistanceMap */arcballCameraControllerRecord[/* minDistanceMap */8],
    /* phiMap */arcballCameraControllerRecord[/* phiMap */9],
    /* thetaMap */arcballCameraControllerRecord[/* thetaMap */10],
    /* thetaMarginMap */arcballCameraControllerRecord[/* thetaMarginMap */11],
    /* targetMap */arcballCameraControllerRecord[/* targetMap */12],
    /* moveSpeedXMap */arcballCameraControllerRecord[/* moveSpeedXMap */13],
    /* moveSpeedYMap */arcballCameraControllerRecord[/* moveSpeedYMap */14],
    /* rotateSpeedMap */arcballCameraControllerRecord[/* rotateSpeedMap */15],
    /* wheelSpeedMap */arcballCameraControllerRecord[/* wheelSpeedMap */16],
    /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */17],
    /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */18]
  ];
  return newrecord;
}

function update(state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  return _clearDirtyArray(ArrayService$WonderCommonlib.reduceOneParam((function (state, dirtyIndex) {
                    return _updateTransform(dirtyIndex, state);
                  }), state, ArrayService$WonderCommonlib.removeDuplicateItems(arcballCameraControllerRecord[/* dirtyArray */6])));
}

function _getAllArcballCameraControllers(state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  return GetAllComponentService$Wonderjs.getAllComponents(arcballCameraControllerRecord[/* index */0], arcballCameraControllerRecord[/* disposedIndexArray */18]);
}

function updateAll(state) {
  return _clearDirtyArray(ArrayService$WonderCommonlib.reduceOneParam((function (state, cameraController) {
                    return _updateTransform(cameraController, state);
                  }), state, _getAllArcballCameraControllers(state)));
}

export {
  _updateTransform ,
  _clearDirtyArray ,
  update ,
  _getAllArcballCameraControllers ,
  updateAll ,
  
}
/* DirtyArrayService-Wonderjs Not a pure module */
