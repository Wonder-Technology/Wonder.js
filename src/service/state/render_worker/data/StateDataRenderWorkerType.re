open GPUDetectType;

open BasicMaterialRenderWorkerType;

open GlType;

open ComponentType;

open Js.Typed_array;

open GLSLSenderAllType;

open GLSLLocationType;

open MaterialType;

open GeometryType;

open ShaderChunkType;

type renderWorkerState = {
  mutable renderConfigRecord: option(RenderConfigType.renderConfigRecord),
  mutable gpuDetectRecord,
  mutable deviceManagerRecord: DeviceManagerType.deviceManagerRecord,
  mutable shaderRecord: ShaderType.shaderRecord,
  mutable programRecord: ProgramType.programRecord,
  mutable glslRecord: GLSLType.glslRecord,
  mutable glslSenderRecord,
  mutable glslLocationRecord,
  mutable glslChunkRecord,
  mutable basicMaterialRecord: option(basicMaterialRecord)
};

type renderWorkerStateData = {mutable state: option(renderWorkerState)};