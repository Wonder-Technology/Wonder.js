open GlType;

open ComponentType;

open TransformType;

open BoxGeometryType;

open CustomGeometryType;

open BasicCameraViewType;

open PerspectiveCameraProjectionType;

open SceneType;

open SettingType;

open GameObjectType;

open GeometryType;

open BoxGeometryType;

open MeshRendererType;

open MaterialType;

open BasicMaterialType;

open LightMaterialType;

open AmbientLightType;

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

open ViewType;

type colorRgba = (float, float, float, float);

type jobRecord = {
  noWorkerInitJobList: list((string, state => state)),
  noWorkerLoopJobList: list((string, (float, state) => state))
}
and gameObjectCurrentGeometryDataMap =
  array(
    (
      geometry,
      int
      /* (array(GlType.buffer), array(GlType.buffer), array(GlType.buffer)),
         (
           [@bs] ((int, state) => Float32Array.t),
           [@bs] ((int, state) => Float32Array.t),
           [@bs] ((int, state) => Uint16Array.t),
           (int, state) => int
         ) */
    )
  )
and gameObjectRecord = {
  mutable uid: int,
  mutable disposeCount: int,
  mutable disposedUidMap: gameObjectDisposedUidMap,
  mutable aliveUidArray: gameObjectAliveUidArray,
  mutable currentGeometryDataMap: gameObjectCurrentGeometryDataMap,
  mutable transformMap: gameObjectTransformMap,
  mutable basicCameraViewMap: gameObjectCameraViewMap,
  mutable perspectiveCameraProjectionMap: gameObjectCameraProjectionMap,
  mutable meshRendererMap: gameObjectMeshRendererMap,
  mutable basicMaterialMap: gameObjectMaterialMap,
  mutable lightMaterialMap: gameObjectMaterialMap,
  mutable sourceInstanceMap: gameObjectSourceInstanceMap,
  mutable objectInstanceMap: gameObjectObjectInstanceMap,
  mutable ambientLightMap: gameObjectLightMap,
  mutable directionLightMap: gameObjectLightMap,
  mutable pointLightMap: gameObjectLightMap
}
and state = {
  settingRecord,
  jobRecord,
  noWorkerJobRecord: option(noWorkerJobRecord),
  workerJobRecord: option(workerJobRecord),
  renderConfigRecord: option(renderConfigRecord),
  gpuDetectRecord,
  sourceInstanceRecord,
  objectInstanceRecord,
  viewRecord,
  deviceManagerRecord,
  gameObjectRecord,
  mutable transformRecord: option(transformRecord),
  sceneRecord,
  basicCameraViewRecord,
  perspectiveCameraProjectionRecord,
  mutable basicMaterialRecord: option(basicMaterialRecord),
  mutable lightMaterialRecord: option(lightMaterialRecord),
  ambientLightRecord,
  directionLightRecord,
  pointLightRecord,
  mutable boxGeometryRecord: option(boxGeometryRecord),
  mutable customGeometryRecord: option(customGeometryRecord),
  meshRendererRecord,
  shaderRecord,
  glslRecord,
  programRecord,
  glslLocationRecord,
  glslSenderRecord,
  glslChunkRecord,
  renderRecord,
  timeControllerRecord,
  vboBufferRecord,
  globalTempRecord,
  typeArrayPoolRecord,
  mutable workerInstanceRecord,
  workerDetectRecord
};

type sharedDataForRestoreState = {
  gl: webgl1Context,
  float32ArrayPoolMap,
  uint16ArrayPoolMap
};

type stateData = {
  mutable state: option(state),
  mutable isDebug: bool
};