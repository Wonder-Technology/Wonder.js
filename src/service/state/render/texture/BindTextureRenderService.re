open StateRenderType;

let _bind = (gl, unit, texture, (bindTextureUnitCacheMap, glTextureMap) as dataTuple) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|unit should >= 0|j}, ~actual={j|is $unit|j}),
              () => unit >= 0
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  switch (OperateGlTextureMapService.getTexture(texture, glTextureMap)) {
  | None => dataTuple
  | Some(glTexture) =>
    CacheTextureService.isCached(unit, texture, bindTextureUnitCacheMap) ?
      dataTuple :
      {
        let bindTextureUnitCacheMap =
          CacheTextureService.addActiveTexture(unit, texture, bindTextureUnitCacheMap);
        let target = Gl.getTexture2D(gl);
        gl |> Gl.activeTexture(Gl.getTextureUnit0(gl) + unit);
        gl |> Gl.bindTexture(target, glTexture);
        (bindTextureUnitCacheMap, glTextureMap)
      }
  }
};

let _bindBasicSourceTexture =
  [@bs]
  (
    (
      basicSourceTextureInTypeArray,
      (gl, unit, {basicSourceTextureRecord, browserDetectRecord} as state)
    ) => {
      _bind(
        gl,
        unit,
        basicSourceTextureInTypeArray,
        (basicSourceTextureRecord.bindTextureUnitCacheMap, basicSourceTextureRecord.glTextureMap)
      )
      |> ignore;
      state
    }
  );

let _bindArrayBufferViewSourceTexture =
  [@bs]
  (
    (
      arrayBufferViewTextureInTypeArray,
      (gl, unit, {arrayBufferViewSourceTextureRecord, browserDetectRecord} as state)
    ) => {
      _bind(
        gl,
        unit,
        arrayBufferViewTextureInTypeArray,
        (
          arrayBufferViewSourceTextureRecord.bindTextureUnitCacheMap,
          arrayBufferViewSourceTextureRecord.glTextureMap
        )
      )
      |> ignore;
      state
    }
  );

let bind =
    (gl, unit, texture, {basicSourceTextureRecord, arrayBufferViewSourceTextureRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|unit should >= 0|j}, ~actual={j|is $unit|j}),
              () => unit >= 0
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  IndexSourceTextureService.handleByJudgeSourceTextureIndex(
    texture,
    arrayBufferViewSourceTextureRecord.textureIndexOffset,
    (gl, unit, state),
    (_bindBasicSourceTexture, _bindArrayBufferViewSourceTexture)
  )
};