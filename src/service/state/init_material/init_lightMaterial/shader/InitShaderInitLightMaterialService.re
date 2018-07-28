open StateInitLightMaterialType;

open ShaderType;

open RenderConfigType;

let initMaterialShader =
    (
      materialIndex: int,
      (gl, shaderLibDataArr),
      buildGLSLSourceFunc,
      {
        directionLightRecord,
        pointLightRecord,
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      } as state,
    ) =>
  InitShaderInitMaterialService.initMaterialShader(
    materialIndex,
    (gl, shaderLibDataArr),
    (
      buildGLSLSourceFunc,
      HandleGLSLInitLightMaterialService.getHandle((
        directionLightRecord,
        pointLightRecord,
      )),
      HandleAttributeConfigDataInitLightMaterialService.addAttributeSendData,
      HandleUniformConfigDataInitLightMaterialService.addUniformSendData,
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
        directionLightRecord,
        pointLightRecord,
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      } as state,
    ) =>
  InitShaderInitMaterialService.reInitMaterialShader(
    materialIndex,
    (gl, shaderLibDataArr),
    (
      buildGLSLSourceFunc,
      HandleGLSLInitLightMaterialService.getHandle((
        directionLightRecord,
        pointLightRecord,
      )),
      HandleAttributeConfigDataInitLightMaterialService.addAttributeSendData,
      HandleUniformConfigDataInitLightMaterialService.addUniformSendData,
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