open MaterialType;

open RenderConfigType;

open ShaderType;

open ProgramType;

open GLSLType;

open GLSLSenderAllType;

open GLSLLocationType;

open MaterialType;

open GeometryType;

open ShaderChunkType;

open MaterialInitMaterialType;

open DirectionLightInitMaterialType;

open PointLightInitMaterialType;

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