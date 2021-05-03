

import * as PMatrixService$Wonderjs from "../../service/primitive/PMatrixService.js";
import * as VMatrixService$Wonderjs from "../../service/primitive/VMatrixService.js";
import * as RecordTransformMainService$Wonderjs from "../../service/state/main/transform/RecordTransformMainService.js";
import * as UpdateTransformMainService$Wonderjs from "../../service/state/main/transform/UpdateTransformMainService.js";
import * as ActiveBasicCameraViewService$Wonderjs from "../../service/record/main/basic_camera_view/ActiveBasicCameraViewService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../service/record/main/gameObject/GetComponentGameObjectService.js";
import * as GameObjectBasicCameraViewService$Wonderjs from "../../service/record/main/basic_camera_view/GameObjectBasicCameraViewService.js";

function getCameraData(state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var basicCameraViewRecord = state[/* basicCameraViewRecord */13];
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var globalTempRecord = state[/* globalTempRecord */37];
  var match = ActiveBasicCameraViewService$Wonderjs.getActiveCameraView(basicCameraViewRecord);
  if (match !== undefined) {
    var activeCameraViewGameObject = GameObjectBasicCameraViewService$Wonderjs.unsafeGetGameObject(match, basicCameraViewRecord);
    var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
    var transform = GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(activeCameraViewGameObject, gameObjectRecord);
    return /* record */[
            /* vMatrix */VMatrixService$Wonderjs.getWorldToCameraMatrix(UpdateTransformMainService$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(transform, globalTempRecord, transformRecord)),
            /* pMatrix */PMatrixService$Wonderjs.unsafeGetPMatrix(GetComponentGameObjectService$Wonderjs.unsafeGetPerspectiveCameraProjectionComponent(activeCameraViewGameObject, gameObjectRecord), perspectiveCameraProjectionRecord[/* pMatrixMap */2]),
            /* position */UpdateTransformMainService$Wonderjs.updateAndGetPositionTuple(transform, globalTempRecord, transformRecord)
          ];
  }
  
}

export {
  getCameraData ,
  
}
/* PMatrixService-Wonderjs Not a pure module */
