

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Matrix4Service$Wonderjs from "../../../../atom/Matrix4Service.js";
import * as Vector3Service$Wonderjs from "../../../../atom/Vector3Service.js";
import * as RecordTransformMainService$Wonderjs from "../../transform/RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../../record/main/transform/ModelMatrixTransformService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/OperateArcballCameraControllerService.js";
import * as GameObjectArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/GameObjectArcballCameraControllerService.js";

function _computeTarget(cameraController, param, state) {
  var dy = param[1];
  var dx = param[0];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  var target = OperateArcballCameraControllerService$Wonderjs.unsafeGetTarget(cameraController, arcballCameraControllerRecord);
  var transform = GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(GameObjectArcballCameraControllerService$Wonderjs.unsafeGetGameObject(cameraController, arcballCameraControllerRecord), gameObjectRecord);
  var match = RecordTransformMainService$Wonderjs.getRecord(state);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = match[/* localToWorldMatrixCacheMap */19];
  var localToWorldMatrixTypeArray = ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap);
  var match$1 = Vector3Service$Wonderjs.normalize(Matrix4Service$Wonderjs.getX(localToWorldMatrixTypeArray));
  var match$2 = Vector3Service$Wonderjs.normalize(Matrix4Service$Wonderjs.getY(localToWorldMatrixTypeArray));
  var __x = Vector3Service$Wonderjs.add(/* Float */0, target, /* tuple */[
        match$1[0] * dx,
        0,
        match$1[2] * dx
      ]);
  return Vector3Service$Wonderjs.add(/* Float */0, __x, /* tuple */[
              match$2[0] * dy,
              match$2[1] * dy,
              0
            ]);
}

function setTargetByKeyboardEvent(cameraController, keyboardEvent, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */24];
  var moveSpeedX = OperateArcballCameraControllerService$Wonderjs.unsafeGetMoveSpeedX(cameraController, arcballCameraControllerRecord);
  var moveSpeedY = OperateArcballCameraControllerService$Wonderjs.unsafeGetMoveSpeedY(cameraController, arcballCameraControllerRecord);
  var match = keyboardEvent[/* key */6];
  var match$1;
  switch (match) {
    case "a" : 
    case "left" : 
        match$1 = /* tuple */[
          -moveSpeedX,
          0
        ];
        break;
    case "d" : 
    case "right" : 
        match$1 = /* tuple */[
          moveSpeedX,
          0
        ];
        break;
    case "down" : 
    case "s" : 
        match$1 = /* tuple */[
          0,
          -moveSpeedY
        ];
        break;
    case "up" : 
    case "w" : 
        match$1 = /* tuple */[
          0,
          moveSpeedY
        ];
        break;
    default:
      match$1 = /* tuple */[
        0,
        0
      ];
  }
  var dy = match$1[1];
  var dx = match$1[0];
  var exit = 0;
  if (dx !== 0 || dy !== 0) {
    exit = 1;
  } else {
    return state;
  }
  if (exit === 1) {
    var newrecord = Caml_array.caml_array_dup(state);
    newrecord[/* arcballCameraControllerRecord */24] = OperateArcballCameraControllerService$Wonderjs.setTarget(cameraController, _computeTarget(cameraController, /* tuple */[
              dx,
              dy
            ], state), arcballCameraControllerRecord);
    return newrecord;
  }
  
}

export {
  _computeTarget ,
  setTargetByKeyboardEvent ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
