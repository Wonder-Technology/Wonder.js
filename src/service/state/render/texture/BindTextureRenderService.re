open StateRenderType;

let _bind = (gl, (target, unit), texture, glTextureMap) => {
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
    gl
    |> WonderWebgl.Gl.activeTexture(
         WonderWebgl.Gl.getTextureUnit0(gl) + unit,
       );
    gl |> WonderWebgl.Gl.bindTexture(target, glTexture);
    glTextureMap;
  };
};

let _bindBasicSourceTexture =
  (. basicSourceTexture, (gl, unit, {basicSourceTextureRecord} as state)) => {
    _bind(
      gl,
      (WonderWebgl.Gl.getTexture2D(gl), unit),
      basicSourceTexture,
      basicSourceTextureRecord.glTextureMap,
    )
    |> ignore;
    state;
  };

let _bindArrayBufferViewSourceTexture =
  (.
    arrayBufferViewTexture,
    (gl, unit, {arrayBufferViewSourceTextureRecord} as state),
  ) => {
    _bind(
      gl,
      (WonderWebgl.Gl.getTexture2D(gl), unit),
      arrayBufferViewTexture,
      arrayBufferViewSourceTextureRecord.glTextureMap,
    )
    |> ignore;
    state;
  };

let _bindCubemapTexture =
  (. cubemapTexture, (gl, unit, {cubemapTextureRecord} as state)) => {
    _bind(
      gl,
      (WonderWebgl.Gl.getTextureCubeMap(gl), unit),
      cubemapTexture,
      cubemapTextureRecord.glTextureMap,
    )
    |> ignore;
    state;
  };

let bind = (gl, unit, (texture, textureType), state) => {
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

  switch (textureType) {
  | TextureType.BasicSource =>
    _bindBasicSourceTexture(. texture, (gl, unit, state))
  | TextureType.ArrayBufferViewSource =>
    _bindArrayBufferViewSourceTexture(. texture, (gl, unit, state))
  | TextureType.Cubemap => _bindCubemapTexture(. texture, (gl, unit, state))
  };
};