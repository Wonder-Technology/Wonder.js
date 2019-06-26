open AllShaderType;

open AllRenderConfigType;

open StateInitNoMaterialShaderType;

let _createProgramAndInit =
    (gl, shaderIndex, (vsSource, fsSource), programRecord) =>
  gl
  |> WonderWebgl.Gl.createProgram
  |> AllProgramService.registerProgram(shaderIndex, programRecord)
  |> AllProgramService.initShader(vsSource, fsSource, gl);

let init =
    (
      (gl, shaderLibDataArr, shaderName),
      /* (
           buildGLSLSourceFunc,
           /* getHandleFunc, */
           addAttributeSendDataFunc,
           addUniformSendDataFunc,
         ), */
      {
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      } as state,
    ) => {
  let shaderIndex =
    ShaderIndexAllShaderService.genereateShaderIndex(shaderRecord);

  shaderRecord
  |> NoMaterialShaderIndexAllShaderService.setShaderIndex(
       shaderName,
       shaderIndex,
     )
  |> ignore;

  let (vsSource, fsSource) =
    BuildShaderSourceInitShaderAllService.buildGLSLSource(.
      shaderLibDataArr,
      HandleGLSLInitNoMaterialShaderService.getHandle,
      (glslRecord, glslChunkRecord),
    );
  let program =
    _createProgramAndInit(
      gl,
      shaderIndex,
      (vsSource, fsSource),
      programRecord,
    );
  let recordTuple =
    HandleAttributeConfigDataInitNoMaterialShaderService.addAttributeSendData(
      (gl, shaderIndex, program),
      shaderLibDataArr,
      (glslSenderRecord, glslLocationRecord),
    );
  HandleUniformConfigDataInitNoMaterialShaderService.addUniformSendData(.
    gl,
    (program, shaderIndex, shaderLibDataArr),
    recordTuple,
  )
  |> ignore;

  shaderIndex;
};