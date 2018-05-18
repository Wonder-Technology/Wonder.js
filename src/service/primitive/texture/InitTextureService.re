let initTexture = (gl, texture, glTextureMap) =>
  switch (OperateGlTextureMapService.getTexture(texture, glTextureMap)) {
  | Some(_) => glTextureMap
  | None => OperateGlTextureMapService.setTexture(texture, gl |> Gl.createTexture, glTextureMap)
  };

let initTexturesWithIndexArray = (gl, indexArray, glTextureMap) =>
  indexArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs] ((glTextureMap, texture) => initTexture(gl, texture, glTextureMap)),
       glTextureMap
     );

let initTextures = (gl, (index, offset), glTextureMap) =>
  initTexturesWithIndexArray(gl, ArrayService.range(offset + 0, offset + index - 1), glTextureMap);