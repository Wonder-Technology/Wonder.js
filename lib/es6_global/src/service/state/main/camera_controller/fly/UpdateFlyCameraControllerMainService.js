

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Vector3Service$Wonderjs from "../../../../atom/Vector3Service.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GetAllComponentService$Wonderjs from "../../../../primitive/component/GetAllComponentService.js";
import * as RecordTransformMainService$Wonderjs from "../../transform/RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../../record/main/transform/ModelMatrixTransformService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as ModelMatrixTransformMainService$Wonderjs from "../../transform/ModelMatrixTransformMainService.js";
import * as OperateFlyCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/fly/OperateFlyCameraControllerService.js";
import * as GameObjectFlyCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/fly/GameObjectFlyCameraControllerService.js";
import * as RotateFlyCameraControllerMainService$Wonderjs from "./RotateFlyCameraControllerMainService.js";

function _getTranslationPosition(cameraController, flyCameraControllerRecord) {
  var initPosition = /* tuple */[
    0,
    0,
    0
  ];
  var moveSpeed = OperateFlyCameraControllerService$Wonderjs.unsafeGetMoveSpeed(cameraController, flyCameraControllerRecord);
  var match = OperateFlyCameraControllerService$Wonderjs.hasDirection(cameraController, flyCameraControllerRecord);
  var positionTuple = match ? ArrayService$WonderCommonlib.reduceOneParam((function (param, direction) {
            var dz = param[2];
            var dy = param[1];
            var dx = param[0];
            switch (direction) {
              case 0 : 
                  return /* tuple */[
                          -moveSpeed,
                          dy,
                          dz
                        ];
              case 1 : 
                  return /* tuple */[
                          moveSpeed,
                          dy,
                          dz
                        ];
              case 2 : 
                  return /* tuple */[
                          dx,
                          moveSpeed,
                          dz
                        ];
              case 3 : 
                  return /* tuple */[
                          dx,
                          -moveSpeed,
                          dz
                        ];
              case 4 : 
                  return /* tuple */[
                          dx,
                          dy,
                          -moveSpeed
                        ];
              case 5 : 
                  return /* tuple */[
                          dx,
                          dy,
                          moveSpeed
                        ];
              
            }
          }), initPosition, OperateFlyCameraControllerService$Wonderjs.unsafeGetDirectionArray(cameraController, flyCameraControllerRecord)) : initPosition;
  return Vector3Service$Wonderjs.add(/* Float */0, positionTuple, OperateFlyCameraControllerService$Wonderjs.unsafeGetTranslationDiff(cameraController, flyCameraControllerRecord));
}

function _resetFlyCameraDiffValue(cameraController, flyCameraControllerRecord) {
  return OperateFlyCameraControllerService$Wonderjs.setTranslationDiff(cameraController, /* tuple */[
              0,
              0,
              0
            ], OperateFlyCameraControllerService$Wonderjs.setEulerAngleDiff(cameraController, /* record */[
                  /* diffX */0,
                  /* diffY */0
                ], flyCameraControllerRecord));
}

function _updateTransform(cameraController, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var cameraTransform = GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(GameObjectFlyCameraControllerService$Wonderjs.unsafeGetGameObject(cameraController, flyCameraControllerRecord), gameObjectRecord);
  var match = OperateFlyCameraControllerService$Wonderjs.unsafeGetEulerAngleDiff(cameraController, flyCameraControllerRecord);
  var match$1 = RotateFlyCameraControllerMainService$Wonderjs.getLocalEulerAngleWithDiffValueAndSetToMap(cameraTransform, /* tuple */[
        match[/* diffX */0],
        match[/* diffY */1]
      ], state);
  var state$1 = ModelMatrixTransformMainService$Wonderjs.setLocalEulerAnglesByTuple(cameraTransform, match$1[0], match$1[1]);
  var cameraLocalPositionTuple = Vector3Service$Wonderjs.add(/* Float */0, ModelMatrixTransformService$Wonderjs.getLocalPositionTuple(cameraTransform, RecordTransformMainService$Wonderjs.getRecord(state$1)[/* localPositions */3]), Vector3Service$Wonderjs.transformQuat(_getTranslationPosition(cameraController, flyCameraControllerRecord), ModelMatrixTransformService$Wonderjs.getLocalRotationTuple(cameraTransform, RecordTransformMainService$Wonderjs.getRecord(state$1)[/* localRotations */4])));
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* transformRecord */11] = ModelMatrixTransformService$Wonderjs.setLocalPositionByTuple(cameraTransform, cameraLocalPositionTuple, transformRecord);
  newrecord[/* flyCameraControllerRecord */26] = _resetFlyCameraDiffValue(cameraController, flyCameraControllerRecord);
  return newrecord;
}

function _getAllFlyCameraControllers(state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  return GetAllComponentService$Wonderjs.getAllComponents(flyCameraControllerRecord[/* index */0], flyCameraControllerRecord[/* disposedIndexArray */13]);
}

function update(state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, cameraController) {
                return _updateTransform(cameraController, state);
              }), state, _getAllFlyCameraControllers(state));
}

export {
  _getTranslationPosition ,
  _resetFlyCameraDiffValue ,
  _updateTransform ,
  _getAllFlyCameraControllers ,
  update ,
  
}
/* GetAllComponentService-Wonderjs Not a pure module */
