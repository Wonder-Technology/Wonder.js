open StateDataMainType;

let getAPIJsObj = state => state.apiRecord.apiJsObj;

let setAPIJsObj = (apiJsObj, state) => {...state, apiRecord: apiJsObj};

let create = () => {
  /* TODO add more api */
  apiJsObj: {
    "label": FixedLayoutControlIMGUIMainService.label,
    "image": FixedLayoutControlIMGUIMainService.image,
    "button": FixedLayoutControlIMGUIMainService.button,
    "box": FixedLayoutControlIMGUIMainService.box,
    "radioButton": FixedLayoutControlIMGUIMainService.radioButton,
    "checkbox": FixedLayoutControlIMGUIMainService.checkbox,
    "sliderInt": FixedLayoutControlIMGUIMainService.sliderInt,
    "sliderFloat": FixedLayoutControlIMGUIMainService.sliderFloat,
    "beginGroup": FixedLayoutControlIMGUIMainService.beginGroup,
    "endGroup": FixedLayoutControlIMGUIMainService.endGroup,
    "unsafeGetGameObjectTransformComponent": GameObjectAPI.unsafeGetGameObjectTransformComponent,
    "unsafeGetGameObjectLightMaterialComponent": GameObjectAPI.unsafeGetGameObjectLightMaterialComponent,
    "unsafeGetGameObjectPerspectiveCameraProjectionComponent": GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent,
    "unsafeGetGameObjectBasicCameraViewComponent": GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent,
    "hasGameObjectDirectionLightComponent": GameObjectAPI.hasGameObjectDirectionLightComponent,
    "hasGameObjectPointLightComponent": GameObjectAPI.hasGameObjectPointLightComponent,
    "hasGameObjectBasicCameraViewComponent": GameObjectAPI.hasGameObjectBasicCameraViewComponent,
    "getAllGameObjects": GameObjectAPI.getAllGameObjects,
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
  },
};