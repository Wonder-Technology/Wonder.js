open GPUDetectType;

open RenderWorkerSettingType;

open RenderWorkerBasicMaterialType;

open RenderWorkerTransformType;

open RenderWorkerBoxGeometryType;

open RenderWorkerRenderType;

open GlType;

open ComponentType;

open Js.Typed_array;

open StateRenderType;

open GLSLLocationType;

open MaterialType;

open GeometryType;

open ShaderChunkType;

open VboBufferType;

open TypeArrayPoolType;

open GlobalTempType;

type renderWorkerState = {
  mutable settingRecord,
  mutable renderConfigRecord: option(RenderConfigType.renderConfigRecord),
  mutable gpuDetectRecord,
  mutable deviceManagerRecord: DeviceManagerType.deviceManagerRecord,
  mutable shaderRecord: ShaderType.shaderRecord,
  mutable programRecord: ProgramType.programRecord,
  mutable glslRecord: GLSLType.glslRecord,
  mutable glslSenderRecord,
  mutable glslLocationRecord,
  mutable glslChunkRecord,
  mutable basicMaterialRecord: option(basicMaterialRecord),
  mutable transformRecord: option(transformRecord),
  mutable boxGeometryRecord: option(boxGeometryRecord),
  mutable renderRecord,
  mutable typeArrayPoolRecord,
  mutable vboBufferRecord,
  mutable globalTempRecord
};

type renderWorkerStateData = {mutable state: option(renderWorkerState)};