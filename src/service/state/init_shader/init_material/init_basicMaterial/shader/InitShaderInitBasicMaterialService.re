open StateInitBasicMaterialType;

open AllShaderType;

open AllRenderConfigType;

let initMaterialShader =
    (
      materialIndex: int,
      (gl, shaderLibDataArr),
      buildGLSLSourceFunc,
      {
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      } as state,
    ) =>
  InitShaderInitMaterialAllService.initMaterialShader(
    materialIndex,
    (gl, shaderLibDataArr),
    (
      buildGLSLSourceFunc,
      HandleGLSLInitBasicMaterialService.getHandle,
      HandleAttributeConfigDataInitBasicMaterialService.addAttributeSendData,
      HandleUniformConfigDataInitBasicMaterialService.addUniformSendData,
    ),
    (
      shaderRecord,
      programRecord,
      glslRecord,
      glslSenderRecord,
      glslLocationRecord,
      glslChunkRecord,
    ),
  );

let reInitMaterialShader =
    (
      materialIndex: int,
      (gl, shaderLibDataArr),
      buildGLSLSourceFunc,
      {
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      } as state,
    ) =>
  InitShaderInitMaterialAllService.reInitMaterialShader(
    materialIndex,
    (gl, shaderLibDataArr),
    (
      buildGLSLSourceFunc,
      HandleGLSLInitBasicMaterialService.getHandle,
      HandleAttributeConfigDataInitBasicMaterialService.addAttributeSendData,
      HandleUniformConfigDataInitBasicMaterialService.addUniformSendData,
    ),
    (
      shaderRecord,
      programRecord,
      glslRecord,
      glslSenderRecord,
      glslLocationRecord,
      glslChunkRecord,
    ),
  );