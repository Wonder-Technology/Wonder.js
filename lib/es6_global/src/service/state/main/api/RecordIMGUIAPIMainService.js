

import * as TransformAPI$Wonderjs from "../../../../api/TransformAPI.js";
import * as CoordinateAPI$Wonderjs from "../../../../api/CoordinateAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../api/GameObjectAPI.js";
import * as PointLightAPI$Wonderjs from "../../../../api/light/PointLightAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../api/material/LightMaterialAPI.js";
import * as DirectionLightAPI$Wonderjs from "../../../../api/light/DirectionLightAPI.js";
import * as BasicCameraViewAPI$Wonderjs from "../../../../api/camera/BasicCameraViewAPI.js";
import * as OperateWorkerDataMainService$Wonderjs from "../workerData/OperateWorkerDataMainService.js";
import * as FixedLayoutControlIMGUIMainService$Wonderjs from "../imgui/FixedLayoutControlIMGUIMainService.js";

function getIMGUIAPIJsObj(state) {
  return state[/* apiRecord */43][/* imguiAPIJsObj */1];
}

function create(param) {
  return {
          label: FixedLayoutControlIMGUIMainService$Wonderjs.label,
          image: FixedLayoutControlIMGUIMainService$Wonderjs.image,
          button: FixedLayoutControlIMGUIMainService$Wonderjs.button,
          box: FixedLayoutControlIMGUIMainService$Wonderjs.box,
          radioButton: FixedLayoutControlIMGUIMainService$Wonderjs.radioButton,
          checkbox: FixedLayoutControlIMGUIMainService$Wonderjs.checkbox,
          sliderInt: FixedLayoutControlIMGUIMainService$Wonderjs.sliderInt,
          sliderFloat: FixedLayoutControlIMGUIMainService$Wonderjs.sliderFloat,
          beginGroup: FixedLayoutControlIMGUIMainService$Wonderjs.beginGroup,
          endGroup: FixedLayoutControlIMGUIMainService$Wonderjs.endGroup,
          unsafeGetGameObjectTransformComponent: GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent,
          unsafeGetGameObjectLightMaterialComponent: GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent,
          unsafeGetGameObjectPerspectiveCameraProjectionComponent: GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent,
          unsafeGetGameObjectBasicCameraViewComponent: GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent,
          hasGameObjectDirectionLightComponent: GameObjectAPI$Wonderjs.hasGameObjectDirectionLightComponent,
          hasGameObjectPointLightComponent: GameObjectAPI$Wonderjs.hasGameObjectPointLightComponent,
          hasGameObjectBasicCameraViewComponent: GameObjectAPI$Wonderjs.hasGameObjectBasicCameraViewComponent,
          getAllGameObjects: GameObjectAPI$Wonderjs.getAllGameObjects,
          getAllDirectionLightComponentsOfGameObject: GameObjectAPI$Wonderjs.getAllDirectionLightComponentsOfGameObject,
          getAllPointLightComponentsOfGameObject: GameObjectAPI$Wonderjs.getAllPointLightComponentsOfGameObject,
          getAllBasicCameraViewComponents: GameObjectAPI$Wonderjs.getAllBasicCameraViewComponents,
          getAllPerspectiveCameraProjectionComponents: GameObjectAPI$Wonderjs.getAllPerspectiveCameraProjectionComponents,
          getAllBasicMaterialComponents: GameObjectAPI$Wonderjs.getAllBasicMaterialComponents,
          getAllLightMaterialComponents: GameObjectAPI$Wonderjs.getAllLightMaterialComponents,
          getAllDirectionLightComponents: GameObjectAPI$Wonderjs.getAllDirectionLightComponents,
          getAllPointLightComponents: GameObjectAPI$Wonderjs.getAllPointLightComponents,
          setLightMaterialDiffuseColor: LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor,
          getLightMaterialSpecularColor: LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor,
          setLightMaterialSpecularColor: LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor,
          getLightMaterialShininess: LightMaterialAPI$Wonderjs.getLightMaterialShininess,
          setLightMaterialShininess: LightMaterialAPI$Wonderjs.setLightMaterialShininess,
          getTransformLocalPosition: TransformAPI$Wonderjs.getTransformLocalPosition,
          setTransformLocalPosition: TransformAPI$Wonderjs.setTransformLocalPosition,
          getTransformPosition: TransformAPI$Wonderjs.getTransformPosition,
          unsafeGetTransformChildren: TransformAPI$Wonderjs.unsafeGetTransformChildren,
          unsafeGetTransformGameObject: TransformAPI$Wonderjs.unsafeGetTransformGameObject,
          unsafeGetDirectionLightGameObject: DirectionLightAPI$Wonderjs.unsafeGetDirectionLightGameObject,
          unsafeGetPointLightGameObject: PointLightAPI$Wonderjs.unsafeGetPointLightGameObject,
          unsafeGetBasicCameraViewGameObject: BasicCameraViewAPI$Wonderjs.unsafeGetBasicCameraViewGameObject,
          convertWorldToScreen: CoordinateAPI$Wonderjs.convertWorldToScreen,
          getRenderWorkerCustomData: OperateWorkerDataMainService$Wonderjs.getRenderWorkerCustomData
        };
}

export {
  getIMGUIAPIJsObj ,
  create ,
  
}
/* TransformAPI-Wonderjs Not a pure module */
