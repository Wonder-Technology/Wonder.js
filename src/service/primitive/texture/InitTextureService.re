let initTexture = (gl, texture, glTextureMap) =>
  switch (OperateGlTextureMapService.getTexture(texture, glTextureMap)) {
  | Some(_) => glTextureMap
  | None => OperateGlTextureMapService.setTexture(texture, gl |> Gl.createTexture, glTextureMap)
  };

let initTexturesWithIndexArray = (gl, indexInTypeArrayRange, glTextureMap) =>
  indexInTypeArrayRange
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       ((glTextureMap, textureInTypeArray) => initTexture(gl, textureInTypeArray, glTextureMap)),
       glTextureMap
     );

let initTextures = (gl, indexInTypeArrayRange, glTextureMap) =>
  initTexturesWithIndexArray(gl, indexInTypeArrayRange, glTextureMap);