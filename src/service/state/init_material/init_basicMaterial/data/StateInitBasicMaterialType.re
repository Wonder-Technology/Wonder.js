open MaterialType;

open RenderConfigType;

open ShaderType;

open ProgramType;

open GLSLType;

open StateRenderType;

open GLSLLocationType;

open GeometryType;

open ShaderChunkType;

open InitMaterialBasicMaterialType;

type initBasicMaterialState = {
  materialRecord,
  renderConfigRecord,
  shaderRecord,
  programRecord,
  glslRecord,
  glslSenderRecord,
  glslLocationRecord,
  glslChunkRecord
};