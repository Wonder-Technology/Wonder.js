open AllRenderConfigType;

open AllShaderType;

open AllProgramType;

open AllGLSLType;

open AllGLSLSenderType;

open AllGLSLLocationType;

open ShaderChunkType;

type initNoMaterialShaderState = {
  renderConfigRecord,
  shaderRecord,
  programRecord,
  glslRecord,
  glslSenderRecord,
  glslLocationRecord,
  glslChunkRecord,
};