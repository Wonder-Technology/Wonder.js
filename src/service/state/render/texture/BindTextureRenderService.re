open StateRenderType;

let _bind = (gl, unit, texture, (bindTextureUnitCacheMap, glTextureMap)) => {
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
  CacheTextureService.isCached(unit, texture, bindTextureUnitCacheMap) ?
    (bindTextureUnitCacheMap, glTextureMap) :
    {
      let bindTextureUnitCacheMap =
        CacheTextureService.addActiveTexture(unit, texture, bindTextureUnitCacheMap);
      let target = Gl.getTexture2D(gl);
      gl |> Gl.activeTexture(Gl.getTextureUnit0(gl) + unit);
      gl
      |> Gl.bindTexture(target, OperateGlTextureMapService.unsafeGetTexture(texture, glTextureMap));
      (bindTextureUnitCacheMap, glTextureMap)
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
  _bind(
    gl,
    unit,
    texture,
    (basicSourceTextureRecord.bindTextureUnitCacheMap, basicSourceTextureRecord.glTextureMap)
  )
  |> ignore;
  _bind(
    gl,
    unit,
    texture,
    (
      arrayBufferViewSourceTextureRecord.bindTextureUnitCacheMap,
      arrayBufferViewSourceTextureRecord.glTextureMap
    )
  )
  |> ignore;
  state
};