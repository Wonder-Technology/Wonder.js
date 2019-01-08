open WonderWebgl.GlType;

open ComponentType;

open WorkerDataType;

open TransformType;

open GameObjectType;

open GeometryType;

open IMGUIType;

open BasicCameraViewType;

open PerspectiveCameraProjectionType;

open SceneType;

open SettingType;

open GameObjectType;

open GeometryType;

open MeshRendererType;

open MaterialType;

open BasicMaterialType;

open LightMaterialType;

open SourceTextureType;

open BasicSourceTextureType;

open ArrayBufferViewSourceTextureType;

open DirectionLightType;

open PointLightType;

open ShaderType;

open GLSLType;

open ProgramType;

open GLSLLocationType;

open GLSLSenderType;

open ShaderChunkType;

open RenderType;

open TimeControllerType;

open Js.Typed_array;

open VboBufferType;

open DeviceManagerType;

open GPUDetectType;

open SourceInstanceType;

open ObjectInstanceType;

open GlobalTempType;

open TypeArrayPoolType;

open NoWorkerJobType;

open WorkerJobType;

open RenderConfigType;

open WorkerInstanceType;

open WorkerDetectType;

open BrowserDetectType;

open ViewType;

open EventType;

type stateData = {
  mutable state: option(state),
  mutable isDebug: bool,
}
and jobRecord = {
  noWorkerInitJobList: list((string, state => state)),
  noWorkerLoopJobList: list((string, state => state)),
  noWorkerCustomInitJobHandleMap:
    WonderCommonlib.HashMapService.t(
      (NoWorkerJobType.jobFlags, state) => state,
    ),
  noWorkerCustomLoopJobHandleMap:
    WonderCommonlib.HashMapService.t(
      (NoWorkerJobType.jobFlags, state) => state,
    ),
  workerCustomMainInitTargetJobMap:
    WonderCommonlib.HashMapService.t(
      (string, JobType.workerCustomJobAction, stateData => unit),
    ),
  workerCustomMainInitSourceJobMap: WonderCommonlib.HashMapService.t(string),
  workerCustomMainInitRemovedDefaultJobMap:
    WonderCommonlib.HashMapService.t(bool),
  workerCustomMainLoopTargetJobMap:
    WonderCommonlib.HashMapService.t(
      (string, JobType.workerCustomJobAction, stateData => unit),
    ),
  workerCustomMainLoopSourceJobMap: WonderCommonlib.HashMapService.t(string),
  workerCustomMainLoopRemovedDefaultJobMap:
    WonderCommonlib.HashMapService.t(bool),
}
and mouseDomEventData = {
  priority: int,
  handleFunc: (. EventType.mouseEvent, state) => state,
}
and keyboardDomEventData = {
  priority: int,
  handleFunc: (. EventType.keyboardEvent, state) => state,
}
and touchDomEventData = {
  priority: int,
  handleFunc: (. EventType.touchEvent, state) => state,
}
and customEventData = {
  priority: int,
  handleFunc:
    (. EventType.customEvent, state) => (state, EventType.customEvent),
}
and eventRecord = {
  domEventStreamSubscription: option(WonderBsMost.Most.subscription),
  mouseDomEventDataArrMap:
    WonderCommonlib.SparseMapService.t(array(mouseDomEventData)),
  keyboardDomEventDataArrMap:
    WonderCommonlib.SparseMapService.t(array(keyboardDomEventData)),
  touchDomEventDataArrMap:
    WonderCommonlib.SparseMapService.t(array(touchDomEventData)),
  customGlobalEventArrMap:
    WonderCommonlib.HashMapService.t(array(customEventData)),
  customGameObjectEventArrMap:
    WonderCommonlib.HashMapService.t(
      WonderCommonlib.SparseMapService.t(array(customEventData)),
    ),
  mouseEventData: EventType.mouseEventData,
  keyboardEventData: EventType.keyboardEventData,
  touchEventData: EventType.touchEventData,
}
and pointEventHandleFuncMap =
  WonderCommonlib.SparseMapService.t(
    (. EventType.customEvent, state) => (state, EventType.customEvent),
  )
and keyboardEventHandleFuncMap =
  WonderCommonlib.SparseMapService.t(
    (. EventType.keyboardEvent, state) => state,
  )
and arcballCameraControllerRecord = {
  index: int,
  pointDownEventHandleFuncMap: pointEventHandleFuncMap,
  pointUpEventHandleFuncMap: pointEventHandleFuncMap,
  pointDragEventHandleFuncMap: pointEventHandleFuncMap,
  pointScaleEventHandleFuncMap: pointEventHandleFuncMap,
  keydownEventHandleFuncMap: keyboardEventHandleFuncMap,
  dirtyArray: ArcballCameraControllerType.dirtyArray,
  distanceMap: WonderCommonlib.SparseMapService.t(float),
  minDistanceMap: WonderCommonlib.SparseMapService.t(float),
  phiMap: WonderCommonlib.SparseMapService.t(float),
  thetaMap: WonderCommonlib.SparseMapService.t(float),
  thetaMarginMap: WonderCommonlib.SparseMapService.t(float),
  targetMap: WonderCommonlib.SparseMapService.t(PositionType.position),
  moveSpeedXMap: WonderCommonlib.SparseMapService.t(float),
  moveSpeedYMap: WonderCommonlib.SparseMapService.t(float),
  rotateSpeedMap: WonderCommonlib.SparseMapService.t(float),
  wheelSpeedMap: WonderCommonlib.SparseMapService.t(float),
  gameObjectMap,
  disposedIndexArray: array(component),
}
and apiRecord = {
  apiJsObj: {
    .
    "label":
      (
        . WonderImgui.StructureType.rect,
        string,
        WonderImgui.FontType.align,
        state
      ) =>
      state,
    "image":
      (
        . WonderImgui.StructureType.rect,
        WonderImgui.StructureType.uv,
        string,
        state
      ) =>
      state,
    "button":
      (. WonderImgui.StructureType.rect, string, state) => (state, bool),
    "box": (. (int, int, int, int), Js.Array.t(float), state) => state,
    "radioButton":
      (. Js.Array.t(((int, int, int, int), string)), int, string, state) =>
      (state, int),
    "checkbox":
      (. (int, int, int, int), bool, string, state) => (state, bool),
    "sliderInt":
      (. ((int, int, int, int), int), (int, int), (int, string), state) =>
      (state, bool, int),
    "sliderFloat":
      (
        . ((int, int, int, int), int),
        (float, float, int),
        (float, string),
        state
      ) =>
      (state, bool, float),
    "beginGroup": (. WonderImgui.StructureType.position, state) => state,
    "endGroup": (. state) => state,
    "unsafeGetGameObjectTransformComponent": (gameObject, state) => int,
    "unsafeGetGameObjectLightMaterialComponent": (gameObject, state) => int,
    "unsafeGetGameObjectPerspectiveCameraProjectionComponent":
      (gameObject, state) => int,
    "unsafeGetGameObjectBasicCameraViewComponent": (gameObject, state) => int,
    "hasGameObjectDirectionLightComponent": (gameObject, state) => bool,
    "hasGameObjectPointLightComponent": (gameObject, state) => bool,
    "hasGameObjectBasicCameraViewComponent": (gameObject, state) => bool,
    "getAllGameObjects": (gameObject, state) => array(gameObject),
    "getAllDirectionLightComponentsOfGameObject":
      (gameObject, state) => array(component),
    "getAllPointLightComponentsOfGameObject":
      (gameObject, state) => array(component),
    "getAllBasicCameraViewComponents": state => array(component),
    "getAllPerspectiveCameraProjectionComponents": state => array(component),
    "getAllBasicMaterialComponents": state => array(component),
    "getAllLightMaterialComponents": state => array(component),
    "getAllDirectionLightComponents": state => array(component),
    "getAllPointLightComponents": state => array(component),
    "setLightMaterialDiffuseColor": (component, array(float), state) => state,
    "getLightMaterialSpecularColor":
      (component, state) => array(Js.Typed_array.Float32Array.elt),
    "setLightMaterialSpecularColor":
      (component, array(float), state) => state,
    "getLightMaterialShininess":
      (component, state) => Js.Typed_array.Float32Array.elt,
    "setLightMaterialShininess":
      (component, Js.Typed_array.Float32Array.elt, state) => state,
    "getTransformLocalPosition":
      (transform, state) =>
      (
        Js.Typed_array.Float32Array.elt,
        Js.Typed_array.Float32Array.elt,
        Js.Typed_array.Float32Array.elt,
      ),
    "setTransformLocalPosition":
      (
        transform,
        (
          Js.Typed_array.Float32Array.elt,
          Js.Typed_array.Float32Array.elt,
          Js.Typed_array.Float32Array.elt,
        ),
        state
      ) =>
      state,
    "getTransformPosition":
      (transform, state) =>
      (
        Js.Typed_array.Float32Array.elt,
        Js.Typed_array.Float32Array.elt,
        Js.Typed_array.Float32Array.elt,
      ),
    "unsafeGetTransformChildren": (transform, state) => array(transform),
    "unsafeGetTransformGameObject": (transform, state) => gameObject,
    "unsafeGetDirectionLightGameObject": (component, state) => gameObject,
    "unsafeGetPointLightGameObject": (component, state) => gameObject,
    "unsafeGetBasicCameraViewGameObject": (component, state) => gameObject,
    "convertWorldToScreen":
      (int, int, (float, float, float, float, float), state) =>
      (float, float),
    "getRenderWorkerCustomData":
      state => CustomWorkerDataType.customDataFromRenderWorkerToMainWorker,
  },
}
and state = {
  settingRecord,
  jobRecord,
  noWorkerJobRecord: option(noWorkerJobRecord),
  workerJobRecord: option(workerJobRecord),
  renderConfigRecord: option(renderConfigRecord),
  gpuDetectRecord,
  mutable sourceInstanceRecord: option(sourceInstanceRecord),
  mutable objectInstanceRecord,
  mutable viewRecord,
  deviceManagerRecord,
  mutable gameObjectRecord,
  mutable transformRecord: option(transformRecord),
  sceneRecord: option(sceneRecord),
  mutable basicCameraViewRecord,
  mutable perspectiveCameraProjectionRecord,
  mutable basicMaterialRecord: option(basicMaterialRecord),
  mutable lightMaterialRecord: option(lightMaterialRecord),
  mutable sourceTextureRecord: option(sourceTextureRecord),
  mutable basicSourceTextureRecord: option(basicSourceTextureRecord),
  mutable arrayBufferViewSourceTextureRecord:
    option(arrayBufferViewSourceTextureRecord),
  mutable directionLightRecord: option(directionLightRecord),
  mutable pointLightRecord: option(pointLightRecord),
  mutable geometryRecord: option(geometryRecord),
  mutable meshRendererRecord: option(meshRendererRecord),
  mutable arcballCameraControllerRecord,
  shaderRecord,
  glslRecord,
  programRecord,
  glslLocationRecord,
  glslSenderRecord,
  glslChunkRecord,
  mutable renderRecord: option(renderRecord),
  mutable timeControllerRecord,
  vboBufferRecord,
  globalTempRecord,
  typeArrayPoolRecord,
  mutable workerInstanceRecord,
  workerDataRecord,
  workerDetectRecord,
  browserDetectRecord,
  eventRecord,
  imguiRecord,
  apiRecord,
};

type sharedDataForRestoreState = {
  gl: webgl1Context,
  float32ArrayPoolMap,
  uint16ArrayPoolMap,
};