open MaterialType;

open RenderConfigType;

open ShaderType;

open ProgramType;

open GLSLType;

open StateRenderType;

open GLSLLocationType;

open MaterialType;

open GeometryType;

open ShaderChunkType;

open InitMaterialMaterialType;

open InitMaterialDirectionLightType;

open InitMaterialPointLightType;

type initMaterialState = {
  materialRecord,
  directionLightRecord,
  pointLightRecord,
  renderConfigRecord,
  shaderRecord,
  programRecord,
  glslRecord,
  glslSenderRecord,
  glslLocationRecord,
  glslChunkRecord
};