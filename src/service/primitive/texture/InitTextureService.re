let initTexture = (gl, texture, glTextureMap) =>
  switch (OperateGlTextureMapService.getTexture(texture, glTextureMap)) {
  | Some(_) => glTextureMap
  | None => OperateGlTextureMapService.setTexture(texture, Gl.createTexture(), glTextureMap)
  };

let initTextures = (gl, index, glTextureMap) =>
  ArrayService.range(0, index - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs] ((texture, glTextureMap) => initTexture(gl, texture, glTextureMap)),
       glTextureMap
     );