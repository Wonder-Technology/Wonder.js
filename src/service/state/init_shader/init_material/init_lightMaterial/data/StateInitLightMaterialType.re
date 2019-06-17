open MaterialType;

open AllRenderConfigType;

open AllShaderType;

open AllProgramType;

open AllGLSLType;

open AllGLSLSenderType;

open AllGLSLLocationType;

open MaterialType;

open GeometryType;

open ShaderChunkType;

open InitMaterialLightMaterialType;

open InitLightMaterialDirectionLightType;

open InitLightMaterialPointLightType;

type initLightMaterialState = {
  materialRecord,
  directionLightRecord,
  pointLightRecord,
  renderConfigRecord,
  shaderRecord,
  programRecord,
  glslRecord,
  glslSenderRecord,
  glslLocationRecord,
  glslChunkRecord,
};