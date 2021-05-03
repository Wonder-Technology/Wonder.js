

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Matrix4Service$Wonderjs from "../../../../atom/Matrix4Service.js";
import * as Vector3Service$Wonderjs from "../../../../atom/Vector3Service.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RecordTransformMainService$Wonderjs from "../../transform/RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../../record/main/transform/ModelMatrixTransformService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/OperateArcballCameraControllerService.js";
import * as GameObjectArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/GameObjectArcballCameraControllerService.js";

function _computeTarget(cameraController, param, state) {
  var dy = param[1];
  var dx = param[0];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
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

function setAndGetTranslationTarget(cameraController, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var moveSpeedX = OperateArcballCameraControllerService$Wonderjs.unsafeGetMoveSpeedX(cameraController, arcballCameraControllerRecord);
  var moveSpeedY = OperateArcballCameraControllerService$Wonderjs.unsafeGetMoveSpeedY(cameraController, arcballCameraControllerRecord);
  var initPosition = /* tuple */[
    0,
    0
  ];
  var match = OperateArcballCameraControllerService$Wonderjs.hasDirection(cameraController, arcballCameraControllerRecord);
  var match$1 = match ? ArrayService$WonderCommonlib.reduceOneParam((function (param, direction) {
            var dy = param[1];
            var dx = param[0];
            switch (direction) {
              case 0 : 
                  return /* tuple */[
                          -moveSpeedX,
                          dy
                        ];
              case 1 : 
                  return /* tuple */[
                          moveSpeedX,
                          dy
                        ];
              case 2 : 
                  return /* tuple */[
                          dx,
                          moveSpeedY
                        ];
              case 3 : 
                  return /* tuple */[
                          dx,
                          -moveSpeedY
                        ];
              
            }
          }), initPosition, OperateArcballCameraControllerService$Wonderjs.unsafeGetDirectionArray(cameraController, arcballCameraControllerRecord)) : initPosition;
  var newTargetValue = _computeTarget(cameraController, /* tuple */[
        match$1[0],
        match$1[1]
      ], state);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          newTargetValue,
          (newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setTarget(cameraController, newTargetValue, arcballCameraControllerRecord), newrecord)
        ];
}

export {
  _computeTarget ,
  setAndGetTranslationTarget ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
