open StateInitBasicMaterialType;

open ShaderType;

open RenderConfigType;

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
        glslChunkRecord
      } as state
    ) =>
  InitShaderInitMaterialService.initMaterialShader(
    materialIndex,
    (gl, shaderLibDataArr),
    (
      buildGLSLSourceFunc,
      HandleGLSLInitBasicMaterialService.getHandle,
      HandleAttributeConfigDataInitBasicMaterialService.addAttributeSendData,
      HandleUniformConfigDataInitBasicMaterialService.addUniformSendData
    ),
    (
      shaderRecord,
      programRecord,
      glslRecord,
      glslSenderRecord,
      glslLocationRecord,
      glslChunkRecord
    )
  );