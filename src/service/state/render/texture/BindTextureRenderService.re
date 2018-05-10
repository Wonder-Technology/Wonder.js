open StateRenderType;

let bind = (gl, unit, texture, {textureRecord} as state) => {
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
  CacheRenderTextureService.isCached(unit, texture, textureRecord) ?
    state :
    {
      let textureRecord = CacheRenderTextureService.addActiveTexture(unit, texture, textureRecord);
      let target = Gl.getTexture2D(gl);
      gl |> Gl.activeTexture(Gl.getTextureUnit0(gl) + unit);
      gl
      |> Gl.bindTexture(
           target,
           OperateGlTextureMapService.unsafeGetTexture(texture, textureRecord.glTextureMap)
         );
      state
    }
};