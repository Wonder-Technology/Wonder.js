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
  let basicSourceTextureInTypeArray = texture;
  let arrayBufferViewTextureInTypeArray =
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      arrayBufferViewSourceTextureRecord.textureIndexOffset
    );
  _bind(
    gl,
    unit,
    basicSourceTextureInTypeArray,
    (basicSourceTextureRecord.bindTextureUnitCacheMap, basicSourceTextureRecord.glTextureMap)
  )
  |> ignore;
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
};