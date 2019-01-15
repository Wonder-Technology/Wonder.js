open ShaderType;

open RenderConfigType;

open StateInitNoMaterialShaderType;

let _createProgramAndInit =
    (gl, shaderIndex, (vsSource, fsSource), programRecord) =>
  gl
  |> WonderWebgl.Gl.createProgram
  |> ProgramService.registerProgram(shaderIndex, programRecord)
  |> ProgramService.initShader(vsSource, fsSource, gl);

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
    ShaderIndexShaderService.genereateShaderIndex(shaderRecord);

  shaderRecord
  |> NoMaterialShaderIndexShaderService.setShaderIndex(
       shaderName,
       shaderIndex,
     )
  |> ignore;

  let (vsSource, fsSource) =
    BuildShaderSourceAllService.buildGLSLSource(.
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