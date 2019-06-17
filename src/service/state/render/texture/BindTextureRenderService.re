open StateRenderType;

let _bind = (gl, unit, texture, glTextureMap) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|unit should >= 0|j},
                ~actual={j|is $unit|j},
              ),
              () =>
              unit >= 0
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  switch (OperateGlTextureMapService.getTexture(texture, glTextureMap)) {
  | None => glTextureMap
  | Some(glTexture) =>
    let target = WonderWebgl.Gl.getTexture2D(gl);
    gl
    |> WonderWebgl.Gl.activeTexture(
         WonderWebgl.Gl.getTextureUnit0(gl) + unit,
       );
    gl |> WonderWebgl.Gl.bindTexture(target, glTexture);
    glTextureMap;
  };
};

let _bindBasicSourceTexture =
  (.
    basicSourceTexture,
    (gl, unit, {basicSourceTextureRecord, browserDetectRecord} as state),
  ) => {
    _bind(gl, unit, basicSourceTexture, basicSourceTextureRecord.glTextureMap)
    |> ignore;
    state;
  };

let _bindArrayBufferViewSourceTexture =
  (.
    arrayBufferViewTexture,
    (
      gl,
      unit,
      {arrayBufferViewSourceTextureRecord, browserDetectRecord} as state,
    ),
  ) => {
    _bind(
      gl,
      unit,
      arrayBufferViewTexture,
      arrayBufferViewSourceTextureRecord.glTextureMap,
    )
    |> ignore;
    state;
  };

let bind =
    (
      gl,
      unit,
      texture,
      {basicSourceTextureRecord, arrayBufferViewSourceTextureRecord} as state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|unit should >= 0|j},
                ~actual={j|is $unit|j},
              ),
              () =>
              unit >= 0
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  IndexAllSourceTextureService.handleByJudgeSourceTextureIndex(
    texture,
    arrayBufferViewSourceTextureRecord.textureIndexOffset,
    (gl, unit, state),
    (_bindBasicSourceTexture, _bindArrayBufferViewSourceTexture),
  );
};