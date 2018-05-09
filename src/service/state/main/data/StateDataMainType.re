open GlType;

open ComponentType;

open TransformType;

open GameObjectType;

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

open TextureType;

open AmbientLightType;

open DirectionLightType;

open PointLightType;

open ShaderType;

open GLSLType;

open ProgramType;

open GLSLLocationType;

open StateRenderType;

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

type stateData = {
  mutable state: option(state),
  mutable isDebug: bool
}
and jobRecord = {
  noWorkerInitJobList: list((string, state => state)),
  noWorkerLoopJobList: list((string, state => state)),
  workerCustomMainInitTargetJobMap:
    WonderCommonlib.HashMapService.t((string, JobType.workerCustomJobAction, stateData => unit)),
  workerCustomMainInitSourceJobMap: WonderCommonlib.HashMapService.t(string),
  workerCustomMainInitRemovedDefaultJobMap: WonderCommonlib.HashMapService.t(bool),
  workerCustomMainLoopTargetJobMap:
    WonderCommonlib.HashMapService.t((string, JobType.workerCustomJobAction, stateData => unit)),
  workerCustomMainLoopSourceJobMap: WonderCommonlib.HashMapService.t(string),
  workerCustomMainLoopRemovedDefaultJobMap: WonderCommonlib.HashMapService.t(bool)
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
  sceneRecord,
  mutable basicCameraViewRecord,
  mutable perspectiveCameraProjectionRecord,
  mutable basicMaterialRecord: option(basicMaterialRecord),
  mutable lightMaterialRecord: option(lightMaterialRecord),
  mutable textureRecord: option(textureRecord),
  mutable ambientLightRecord,
  mutable directionLightRecord,
  mutable pointLightRecord,
  mutable boxGeometryRecord,
  mutable customGeometryRecord: option(customGeometryRecord),
  mutable meshRendererRecord,
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
  workerDetectRecord
};

type sharedDataForRestoreState = {
  gl: webgl1Context,
  float32ArrayPoolMap,
  uint16ArrayPoolMap
};