

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GetAllComponentService$Wonderjs from "../../../../primitive/component/GetAllComponentService.js";
import * as LookAtTransfromMainService$Wonderjs from "../../transform/LookAtTransfromMainService.js";
import * as RecordTransformMainService$Wonderjs from "../../transform/RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../../record/main/transform/ModelMatrixTransformService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/OperateArcballCameraControllerService.js";
import * as GameObjectArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/GameObjectArcballCameraControllerService.js";
import * as TargetArcballCameraControllerMainService$Wonderjs from "./TargetArcballCameraControllerMainService.js";

function _updateTransform(cameraController, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var transform = GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(GameObjectArcballCameraControllerService$Wonderjs.unsafeGetGameObject(cameraController, arcballCameraControllerRecord), gameObjectRecord);
  var distance = OperateArcballCameraControllerService$Wonderjs.unsafeGetDistance(cameraController, arcballCameraControllerRecord);
  var phi = OperateArcballCameraControllerService$Wonderjs.unsafeGetPhi(cameraController, arcballCameraControllerRecord);
  var theta = OperateArcballCameraControllerService$Wonderjs.unsafeGetTheta(cameraController, arcballCameraControllerRecord);
  var match = TargetArcballCameraControllerMainService$Wonderjs.setAndGetTranslationTarget(cameraController, state);
  var target = match[0];
  var newrecord = Caml_array.caml_array_dup(match[1]);
  newrecord[/* transformRecord */11] = ModelMatrixTransformService$Wonderjs.setLocalPositionByTuple(transform, /* tuple */[
        distance * Math.cos(phi) * Math.sin(theta) + target[0],
        distance * Math.cos(theta) + target[1],
        distance * Math.sin(phi) * Math.sin(theta) + target[2]
      ], transformRecord);
  return LookAtTransfromMainService$Wonderjs.lookAt(transform, target, newrecord, undefined, /* () */0);
}

function _getAllArcballCameraControllers(state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  return GetAllComponentService$Wonderjs.getAllComponents(arcballCameraControllerRecord[/* index */0], arcballCameraControllerRecord[/* disposedIndexArray */19]);
}

function update(state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, cameraController) {
                return _updateTransform(cameraController, state);
              }), state, _getAllArcballCameraControllers(state));
}

export {
  _updateTransform ,
  _getAllArcballCameraControllers ,
  update ,
  
}
/* GetAllComponentService-Wonderjs Not a pure module */
