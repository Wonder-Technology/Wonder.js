open StateDataMainType;

let getIMGUIAPIJsObj = state => state.apiRecord.imguiAPIJsObj;

/* let setIMGUIAPIJsObj = (imguiAPIJsObj, {apiRecord} as state) => {
     ...state,
     apiRecord: {
       ...apiRecord,
       imguiAPIJsObj,
     },
   }; */

let create = () => {
  "label": FixedLayoutControlIMGUIMainService.label,
  "image": FixedLayoutControlIMGUIMainService.image,
  "button": ExtendIMGUIMainService.Button.button,
  "box": FixedLayoutControlIMGUIMainService.box,
  "beginGroup": FixedLayoutControlIMGUIMainService.beginGroup,
  "endGroup": FixedLayoutControlIMGUIMainService.endGroup,
  "unsafeGetCustomControl": ExtendIMGUIMainService.Extend.unsafeGetCustomControl,
  "getWonderImguiIMGUIRecord":
    (. state) => ManageIMGUIMainService.getRecord(state),
  "setWonderImguiIMGUIRecord":
    (. imguiRecord, state) =>
      ManageIMGUIMainService.setRecord(imguiRecord, state),
  "unsafeGetGameObjectTransformComponent": GameObjectAPI.unsafeGetGameObjectTransformComponent,
  "unsafeGetGameObjectLightMaterialComponent": GameObjectAPI.unsafeGetGameObjectLightMaterialComponent,
  "unsafeGetGameObjectPerspectiveCameraProjectionComponent": GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent,
  "unsafeGetGameObjectBasicCameraViewComponent": GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent,
  "hasGameObjectDirectionLightComponent": GameObjectAPI.hasGameObjectDirectionLightComponent,
  "hasGameObjectPointLightComponent": GameObjectAPI.hasGameObjectPointLightComponent,
  "hasGameObjectBasicCameraViewComponent": GameObjectAPI.hasGameObjectBasicCameraViewComponent,
  "getAllGameObjects": GameObjectAPI.getAllGameObjects,
  "getAllDirectionLightComponentsOfGameObject": GameObjectAPI.getAllDirectionLightComponentsOfGameObject,
  "getAllPointLightComponentsOfGameObject": GameObjectAPI.getAllPointLightComponentsOfGameObject,
  "getAllBasicCameraViewComponents": GameObjectAPI.getAllBasicCameraViewComponents,
  "getAllPerspectiveCameraProjectionComponents": GameObjectAPI.getAllPerspectiveCameraProjectionComponents,
  "getAllBasicMaterialComponents": GameObjectAPI.getAllBasicMaterialComponents,
  "getAllLightMaterialComponents": GameObjectAPI.getAllLightMaterialComponents,
  "getAllDirectionLightComponents": GameObjectAPI.getAllDirectionLightComponents,
  "getAllPointLightComponents": GameObjectAPI.getAllPointLightComponents,
  "setLightMaterialDiffuseColor": LightMaterialAPI.setLightMaterialDiffuseColor,
  "getLightMaterialSpecularColor": LightMaterialAPI.getLightMaterialSpecularColor,
  "setLightMaterialSpecularColor": LightMaterialAPI.setLightMaterialSpecularColor,
  "getLightMaterialShininess": LightMaterialAPI.getLightMaterialShininess,
  "setLightMaterialShininess": LightMaterialAPI.setLightMaterialShininess,
  "getTransformLocalPosition": TransformAPI.getTransformLocalPosition,
  "setTransformLocalPosition": TransformAPI.setTransformLocalPosition,
  "getTransformPosition": TransformAPI.getTransformPosition,
  "unsafeGetTransformChildren": TransformAPI.unsafeGetTransformChildren,
  "unsafeGetTransformGameObject": TransformAPI.unsafeGetTransformGameObject,
  "unsafeGetDirectionLightGameObject": DirectionLightAPI.unsafeGetDirectionLightGameObject,
  "unsafeGetPointLightGameObject": PointLightAPI.unsafeGetPointLightGameObject,
  "unsafeGetBasicCameraViewGameObject": BasicCameraViewAPI.unsafeGetBasicCameraViewGameObject,
  "convertWorldToScreen": CoordinateAPI.convertWorldToScreen,
  "getRenderWorkerCustomData": OperateWorkerDataMainService.getRenderWorkerCustomData,
};