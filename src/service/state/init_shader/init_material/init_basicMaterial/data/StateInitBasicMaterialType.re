open MaterialType;

open AllRenderConfigType;

open AllShaderType;

open AllProgramType;

open AllGLSLType;

open AllGLSLSenderType;

open AllGLSLLocationType;

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
  glslChunkRecord,
};