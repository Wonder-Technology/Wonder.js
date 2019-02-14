

import * as VMatrixService$Wonderjs from "../../../primitive/VMatrixService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../record/main/transform/ModelMatrixTransformService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as GameObjectBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/GameObjectBasicCameraViewService.js";

function getBasicCameraViewWorldToCameraMatrix(cameraView, state) {
  var match = RecordTransformMainService$Wonderjs.getRecord(state);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = match[/* localToWorldMatrixCacheMap */19];
  return VMatrixService$Wonderjs.getWorldToCameraMatrix(ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(GameObjectBasicCameraViewService$Wonderjs.unsafeGetGameObject(cameraView, state[/* basicCameraViewRecord */13]), state[/* gameObjectRecord */10]), localToWorldMatrices, localToWorldMatrixCacheMap));
}

export {
  getBasicCameraViewWorldToCameraMatrix ,
  
}
/* VMatrixService-Wonderjs Not a pure module */
