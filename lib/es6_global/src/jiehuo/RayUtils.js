

import * as GameObjectAPI$Wonderjs from "../api/GameObjectAPI.js";
import * as OptionService$Wonderjs from "../service/atom/OptionService.js";
import * as Matrix4Service$Wonderjs from "../service/atom/Matrix4Service.js";
import * as Vector3Service$Wonderjs from "../service/atom/Vector3Service.js";
import * as CoordinateUtils$Wonderjs from "./CoordinateUtils.js";
import * as BasicCameraViewAPI$Wonderjs from "../api/camera/BasicCameraViewAPI.js";
import * as Vector3_JieHuo_Service$Wonderjs from "./Vector3_JieHuo_Service.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../api/camera/PerspectiveCameraProjectionAPI.js";

function _createPerspectiveCameraRay(param, param$1) {
  var cameraToWorldMatrix = param$1[/* cameraToWorldMatrix */0];
  var origin = Matrix4Service$Wonderjs.getTranslationTuple(cameraToWorldMatrix);
  var __x = Vector3_JieHuo_Service$Wonderjs.unproject(/* tuple */[
        param[/* x */0],
        param[/* y */1],
        -1.0
      ], cameraToWorldMatrix, param$1[/* projectionMatrix */1]);
  return /* record */[
          /* origin */origin,
          /* direction */Vector3Service$Wonderjs.normalize(Vector3Service$Wonderjs.sub(/* Float */0, __x, origin))
        ];
}

function _getPerspectiveCameraData(cameraGameObject, state) {
  var __x = BasicCameraViewAPI$Wonderjs.getBasicCameraViewWorldToCameraMatrix(GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent(cameraGameObject, state), state);
  return /* record */[
          /* cameraToWorldMatrix */Matrix4Service$Wonderjs.invert(__x, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0)),
          /* projectionMatrix */PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionPMatrix(GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent(cameraGameObject, state), state)
        ];
}

function createPerspectiveCameraRayFromEvent(param, cameraGameObject, state) {
  var match = OptionService$Wonderjs.unsafeGet(param[/* userData */4]);
  return _createPerspectiveCameraRay(CoordinateUtils$Wonderjs.convertMouselocationInViewToNDC(match[/* locationInView */2], CoordinateUtils$Wonderjs.getSceneViewSize(state)), _getPerspectiveCameraData(cameraGameObject, state));
}

function applyMatrix4(param, mat4) {
  var origin = param[/* origin */0];
  var __x = Vector3Service$Wonderjs.add(/* Float */0, param[/* direction */1], origin);
  var direction = Vector3Service$Wonderjs.transformMat4Tuple(__x, mat4);
  var origin$1 = Vector3Service$Wonderjs.transformMat4Tuple(origin, mat4);
  return /* record */[
          /* origin */origin$1,
          /* direction */Vector3Service$Wonderjs.normalize(Vector3Service$Wonderjs.sub(/* Float */0, direction, origin$1))
        ];
}

export {
  _createPerspectiveCameraRay ,
  _getPerspectiveCameraData ,
  createPerspectiveCameraRayFromEvent ,
  applyMatrix4 ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
