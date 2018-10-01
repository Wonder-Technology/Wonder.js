open StateInitLightMaterialType;

open ShaderType;

open RenderConfigType;

let _join = (array: array(shaderLib)) => {
  let output = ref("");
  for (i in 0 to Js.Array.length(array) |> pred) {
    output := output^ ++ array[i].name;
  };
  output^;
};

let _buildShaderIndexMapKey = (shaderLibDataArr: shaderLibs) =>
  shaderLibDataArr |> _join;

let _createProgramAndInit =
    (gl, shaderIndex, (vsSource, fsSource), programRecord) =>
  gl
  |> WonderWebgl.Gl.createProgram
  |> ProgramService.registerProgram(shaderIndex, programRecord)
  |> ProgramService.initShader(vsSource, fsSource, gl);

let _initNewShader =
    (
      materialIndex: int,
      shaderIndex,
      key,
      (gl, shaderLibDataArr),
      (
        buildGLSLSourceFunc,
        getHandleFunc,
        addAttributeSendDataFunc,
        addUniformSendDataFunc,
      ),
      (
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      ),
    ) => {
  shaderRecord
  |> ShaderIndexShaderService.useShaderIndex(shaderIndex)
  |> ShaderIndexShaderService.setShaderIndex(key, shaderIndex)
  |> ignore;

  let (vsSource, fsSource) =
    buildGLSLSourceFunc(.
      shaderLibDataArr,
      getHandleFunc,
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
    addAttributeSendDataFunc(.
      (gl, shaderIndex, program),
      shaderLibDataArr,
      (glslSenderRecord, glslLocationRecord),
    );
  addUniformSendDataFunc(.
    gl,
    (program, shaderIndex, shaderLibDataArr),
    recordTuple,
  )
  |> ignore;

  shaderIndex;
};

let initMaterialShader =
    (
      materialIndex: int,
      (gl, shaderLibDataArr),
      (
        buildGLSLSourceFunc,
        getHandleFunc,
        addAttributeSendDataFunc,
        addUniformSendDataFunc,
      ),
      (
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      ),
    ) => {
  let key = _buildShaderIndexMapKey(shaderLibDataArr);

  switch (ShaderIndexShaderService.getShaderIndex(key, shaderRecord)) {
  | None =>
    let shaderIndex =
      ShaderIndexShaderService.genereateShaderIndex(shaderRecord);

    let shaderRecord =
      MaterialsMapShaderService.addMaterialWithoutDuplicate(
        shaderIndex,
        materialIndex,
        shaderRecord,
      );

    _initNewShader(
      materialIndex,
      shaderIndex,
      key,
      (gl, shaderLibDataArr),
      (
        buildGLSLSourceFunc,
        getHandleFunc,
        addAttributeSendDataFunc,
        addUniformSendDataFunc,
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
  | Some(shaderIndex) =>
    let _ =
      MaterialsMapShaderService.addMaterialWithoutDuplicate(
        shaderIndex,
        materialIndex,
        shaderRecord,
      );

    shaderIndex;
  };
};

/* let _reInitNewShader =
       (
         materialIndex: int,
         shaderIndex,
         key,
         (gl, shaderLibDataArr),
         (buildGLSLSourceFunc, getHandleFunc,

           addAttributeSendDataFunc,
           addUniformSendDataFunc,
         ),
         (
           shaderRecord,
           programRecord,
           glslRecord,
           glslSenderRecord,
           glslLocationRecord,
           glslChunkRecord,
         ),
       ) => {
      ShaderIndexShaderService.setShaderIndex(key, shaderIndex, shaderRecord) |> ignore;
     let (vsSource, fsSource) =
       buildGLSLSourceFunc(.
         materialIndex,
         shaderLibDataArr,
         getHandleFunc,
         (glslRecord, glslChunkRecord),
       );
     let program =
       _createProgramAndInit(
         gl,
         shaderIndex,
         (vsSource, fsSource),
         programRecord,
       );

     shaderIndex;
   }; */

let reInitMaterialShader =
    (
      materialIndex: int,
      (gl, shaderLibDataArr),
      (
        buildGLSLSourceFunc,
        getHandleFunc,
        addAttributeSendDataFunc,
        addUniformSendDataFunc,
      ),
      (
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      ),
    ) => {
  let key = _buildShaderIndexMapKey(shaderLibDataArr);
  let shaderIndex =
    ShaderIndexShaderService.genereateShaderIndex(shaderRecord);

  /* let glslLocationRecord =
     GLSLLocationService.clearUniformLocationMap(
       shaderIndex,
       glslLocationRecord,
     ); */

  let shaderRecord =
    MaterialsMapShaderService.addMaterialWithoutDuplicate(
      shaderIndex,
      materialIndex,
      shaderRecord,
    );

  _initNewShader(
    materialIndex,
    shaderIndex,
    key,
    (gl, shaderLibDataArr),
    (
      buildGLSLSourceFunc,
      getHandleFunc,
      addAttributeSendDataFunc,
      addUniformSendDataFunc,
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
};