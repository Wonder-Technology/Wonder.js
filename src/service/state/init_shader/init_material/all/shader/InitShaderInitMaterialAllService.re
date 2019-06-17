open StateInitLightMaterialType;

open AllShaderType;

open AllRenderConfigType;

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
  |> AllProgramService.registerProgram(shaderIndex, programRecord)
  |> AllProgramService.initShader(vsSource, fsSource, gl);

let _initNewShader =
    (
      (shaderIndex, key),
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
  /* |> ShaderLibShaderIndexAllShaderService.useShaderIndex(shaderIndex) */
  |> ShaderLibShaderIndexAllShaderService.setShaderIndex(key, shaderIndex)
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

let _initShader =
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

  switch (ShaderLibShaderIndexAllShaderService.getShaderIndex(key, shaderRecord)) {
  | None =>
    let shaderIndex =
      ShaderIndexAllShaderService.genereateShaderIndex(shaderRecord);

    let shaderRecord =
      MaterialsMapAllShaderService.addMaterialWithoutDuplicate(
        shaderIndex,
        materialIndex,
        shaderRecord,
      );

    _initNewShader(
      (shaderIndex, key),
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
      MaterialsMapAllShaderService.addMaterialWithoutDuplicate(
        shaderIndex,
        materialIndex,
        shaderRecord,
      );

    shaderIndex;
  };
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
    ) =>
  _initShader(
    materialIndex,
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
    ) =>
  _initShader(
    materialIndex,
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