open AssetBundleType;

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

open TextureType;

open SourceTextureType;

open BasicSourceTextureType;

open ArrayBufferViewSourceTextureType;

open CubemapTextureType;

open DirectionLightType;

open PointLightType;

open AllShaderType;

open AllGLSLType;

open AllProgramType;

open AllGLSLLocationType;

open AllGLSLSenderType;

open ShaderChunkType;

open RenderType;

open TimeControllerType;

open Js.Typed_array;

open AllVboBufferType;

open AllDeviceManagerType;

open AllGPUDetectType;

open SourceInstanceType;

open ObjectInstanceType;

open AllGlobalTempType;

open AllTypeArrayPoolType;

open NoWorkerJobType;

open WorkerJobType;

open AllRenderConfigType;

open WorkerInstanceType;

open WorkerDetectType;

open AllBrowserDetectType;

open ViewType;

open EventType;

open AllJobDataType;

open ScriptAPIType;

type stateData = {
  mutable state: option(state),
  mutable isDebug: bool,
}
and jobRecord = {
  noWorkerInitJobList: list((string, state => state)),
  noWorkerLoopJobList: list((string, state => state)),
  noWorkerCustomInitJobHandleMap:
    WonderCommonlib.MutableHashMapService.t(
      (NoWorkerJobType.jobFlags, state) => state,
    ),
  noWorkerCustomLoopJobHandleMap:
    WonderCommonlib.MutableHashMapService.t(
      (NoWorkerJobType.jobFlags, state) => state,
    ),
  workerCustomMainInitTargetJobMap:
    WonderCommonlib.MutableHashMapService.t(
      (string, JobType.workerCustomJobAction, stateData => unit),
    ),
  workerCustomMainInitSourceJobMap:
    WonderCommonlib.MutableHashMapService.t(string),
  workerCustomMainInitRemovedDefaultJobMap:
    WonderCommonlib.MutableHashMapService.t(bool),
  workerCustomMainLoopTargetJobMap:
    WonderCommonlib.MutableHashMapService.t(
      (string, JobType.workerCustomJobAction, stateData => unit),
    ),
  workerCustomMainLoopSourceJobMap:
    WonderCommonlib.MutableHashMapService.t(string),
  workerCustomMainLoopRemovedDefaultJobMap:
    WonderCommonlib.MutableHashMapService.t(bool),
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
    WonderCommonlib.MutableSparseMapService.t(array(mouseDomEventData)),
  keyboardDomEventDataArrMap:
    WonderCommonlib.MutableSparseMapService.t(array(keyboardDomEventData)),
  touchDomEventDataArrMap:
    WonderCommonlib.MutableSparseMapService.t(array(touchDomEventData)),
  customGlobalEventArrMap:
    WonderCommonlib.MutableHashMapService.t(array(customEventData)),
  customGameObjectEventArrMap:
    WonderCommonlib.MutableHashMapService.t(
      WonderCommonlib.MutableSparseMapService.t(array(customEventData)),
    ),
  mouseEventData: EventType.mouseEventData,
  keyboardEventData: EventType.keyboardEventData,
  touchEventData: EventType.touchEventData,
}
and pointEventHandleFuncListMap =
  WonderCommonlib.MutableSparseMapService.t(
    list((. EventType.customEvent, state) => (state, EventType.customEvent)),
  )
and keyboardEventHandleFuncListMap =
  WonderCommonlib.MutableSparseMapService.t(
    list((. EventType.keyboardEvent, state) => state),
  )
and flyCameraControllerRecord = {
  index: int,
  pointDragStartEventHandleFuncListMap: pointEventHandleFuncListMap,
  pointDragDropEventHandleFuncListMap: pointEventHandleFuncListMap,
  pointDragOverEventHandleFuncListMap: pointEventHandleFuncListMap,
  pointScaleEventHandleFuncListMap: pointEventHandleFuncListMap,
  keydownEventHandleFuncListMap: keyboardEventHandleFuncListMap,
  keyupEventHandleFuncListMap: keyboardEventHandleFuncListMap,
  moveSpeedMap: WonderCommonlib.MutableSparseMapService.t(float),
  wheelSpeedMap: WonderCommonlib.MutableSparseMapService.t(float),
  rotateSpeedMap: WonderCommonlib.MutableSparseMapService.t(float),
  eulerAngleDiffMap:
    WonderCommonlib.MutableSparseMapService.t(
      FlyCameraControllerType.eulerAngleDiffType,
    ),
  translationDiffMap:
    WonderCommonlib.MutableSparseMapService.t(PositionType.position),
  gameObjectMap,
  disposedIndexArray: array(component),
  directionArrayMap:
    WonderCommonlib.MutableSparseMapService.t(
      array(FlyCameraControllerType.direction),
    ),
  localEulerAngleMap:
    WonderCommonlib.ImmutableSparseMapService.t((float, float, float)),
}
and arcballCameraControllerRecord = {
  index: int,
  pointDragStartEventHandleFuncListMap: pointEventHandleFuncListMap,
  pointDragDropEventHandleFuncListMap: pointEventHandleFuncListMap,
  pointDragOverEventHandleFuncListMap: pointEventHandleFuncListMap,
  pointScaleEventHandleFuncListMap: pointEventHandleFuncListMap,
  keydownEventHandleFuncListMap: keyboardEventHandleFuncListMap,
  keyupEventHandleFuncListMap: keyboardEventHandleFuncListMap,
  distanceMap: WonderCommonlib.MutableSparseMapService.t(float),
  minDistanceMap: WonderCommonlib.MutableSparseMapService.t(float),
  phiMap: WonderCommonlib.MutableSparseMapService.t(float),
  thetaMap: WonderCommonlib.MutableSparseMapService.t(float),
  thetaMarginMap: WonderCommonlib.MutableSparseMapService.t(float),
  targetMap: WonderCommonlib.MutableSparseMapService.t(PositionType.position),
  moveSpeedXMap: WonderCommonlib.MutableSparseMapService.t(float),
  moveSpeedYMap: WonderCommonlib.MutableSparseMapService.t(float),
  rotateSpeedMap: WonderCommonlib.MutableSparseMapService.t(float),
  wheelSpeedMap: WonderCommonlib.MutableSparseMapService.t(float),
  directionArrayMap:
    WonderCommonlib.MutableSparseMapService.t(
      array(ArcballCameraControllerType.direction),
    ),
  gameObjectMap,
  disposedIndexArray: array(component),
}
and apiRecord = {
  scriptAPIJsObj,
  imguiAPIJsObj: {
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
    "unsafeGetGameObjectTransformComponent":
      (GameObjectPrimitiveType.gameObject, state) => int,
    "unsafeGetGameObjectLightMaterialComponent":
      (GameObjectPrimitiveType.gameObject, state) => int,
    "unsafeGetGameObjectPerspectiveCameraProjectionComponent":
      (GameObjectPrimitiveType.gameObject, state) => int,
    "unsafeGetGameObjectBasicCameraViewComponent":
      (GameObjectPrimitiveType.gameObject, state) => int,
    "hasGameObjectDirectionLightComponent":
      (GameObjectPrimitiveType.gameObject, state) => bool,
    "hasGameObjectPointLightComponent":
      (GameObjectPrimitiveType.gameObject, state) => bool,
    "hasGameObjectBasicCameraViewComponent":
      (GameObjectPrimitiveType.gameObject, state) => bool,
    "getAllGameObjects":
      (GameObjectPrimitiveType.gameObject, state) =>
      array(GameObjectPrimitiveType.gameObject),
    "getAllDirectionLightComponentsOfGameObject":
      (GameObjectPrimitiveType.gameObject, state) => array(component),
    "getAllPointLightComponentsOfGameObject":
      (GameObjectPrimitiveType.gameObject, state) => array(component),
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
    "unsafeGetTransformGameObject":
      (transform, state) => GameObjectPrimitiveType.gameObject,
    "unsafeGetDirectionLightGameObject":
      (component, state) => GameObjectPrimitiveType.gameObject,
    "unsafeGetPointLightGameObject":
      (component, state) => GameObjectPrimitiveType.gameObject,
    "unsafeGetBasicCameraViewGameObject":
      (component, state) => GameObjectPrimitiveType.gameObject,
    "convertWorldToScreen":
      (int, int, (float, float, float, float, float), state) =>
      Js.Nullable.t((float, float)),
    "getRenderWorkerCustomData":
      state => CustomAllWorkerDataType.customDataFromRenderWorkerToMainWorker,
  },
}
and eventFunction = (. ScriptType.script, scriptAPIJsObj, state) => state
and eventFunctionDataJsObj = {
  .
  "init": Js.Nullable.t(eventFunction),
  "update": Js.Nullable.t(eventFunction),
  "dispose": Js.Nullable.t(eventFunction),
}
and eventFunctionData = {
  init: option(eventFunction),
  update: option(eventFunction),
  dispose: option(eventFunction),
}
and eventFunctionDataMap =
  WonderCommonlib.ImmutableHashMapService.t(eventFunctionData)
and scriptRecord = {
  index: int,
  isScriptEventFunctionEnable: bool,
  disposedIndexArray: array(ScriptType.script),
  gameObjectMap,
  isActiveMap: WonderCommonlib.MutableSparseMapService.t(bool),
  scriptEventFunctionDataMap:
    WonderCommonlib.ImmutableSparseMapService.t(eventFunctionDataMap),
  scriptAttributeMap:
    WonderCommonlib.ImmutableSparseMapService.t(
      ScriptAttributeType.attributeMap,
    ),
}
and assembleRABData = {
  isLoadedMap: WonderCommonlib.ImmutableHashMapService.t(bool),
  loadedRABMap:
    WonderCommonlib.ImmutableHashMapService.t(Js.Typed_array.ArrayBuffer.t),
  isAssembledMap: WonderCommonlib.ImmutableHashMapService.t(bool),
  basicSourceTextureMap:
    WonderCommonlib.ImmutableHashMapService.t(
      WonderCommonlib.ImmutableHashMapService.t(
        BasicSourceTextureType.basicSourceTexture,
      ),
    ),
  cubemapTextureMap:
    WonderCommonlib.ImmutableHashMapService.t(
      WonderCommonlib.ImmutableHashMapService.t(
        CubemapTextureType.cubemapTexture,
      ),
    ),
  imageMap:
    WonderCommonlib.ImmutableHashMapService.t(
      WonderCommonlib.ImmutableHashMapService.t
        /* (WonderWebgl.DomExtendType.imageElement, Js.Typed_array.Uint8Array.t), */
        (WonderWebgl.DomExtendType.imageElement),
    ),
  /* (ImageType.image), */
  basicMaterialMap:
    WonderCommonlib.ImmutableHashMapService.t(
      WonderCommonlib.ImmutableHashMapService.t(
        BasicMaterialType.basicMaterial,
      ),
    ),
  lightMaterialMap:
    WonderCommonlib.ImmutableHashMapService.t(
      WonderCommonlib.ImmutableHashMapService.t(
        LightMaterialType.lightMaterial,
      ),
    ),
  geometryMap:
    WonderCommonlib.ImmutableHashMapService.t(
      WonderCommonlib.ImmutableHashMapService.t(GeometryType.geometry),
    ),
  scriptEventFunctionDataMap:
    WonderCommonlib.ImmutableHashMapService.t(
      WonderCommonlib.ImmutableHashMapService.t(eventFunctionData),
    ),
  scriptAttributeMap:
    WonderCommonlib.ImmutableHashMapService.t(
      WonderCommonlib.ImmutableHashMapService.t(
        ScriptAttributeType.scriptAttribute,
      ),
    ),
}
and assetBundleRecord = {
  assembleRABData,
  assembleSABData,
  wabData,
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
  mutable cubemapTextureRecord: option(cubemapTextureRecord),
  mutable directionLightRecord: option(directionLightRecord),
  mutable pointLightRecord: option(pointLightRecord),
  mutable geometryRecord: option(geometryRecord),
  mutable meshRendererRecord: option(meshRendererRecord),
  mutable arcballCameraControllerRecord,
  mutable flyCameraControllerRecord,
  mutable scriptRecord,
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
  jobDataRecord,
  assetBundleRecord,
};

type sharedDataForRestoreState = {
  gl: webgl1Context,
  float32ArrayPoolMap,
  uint16ArrayPoolMap,
};