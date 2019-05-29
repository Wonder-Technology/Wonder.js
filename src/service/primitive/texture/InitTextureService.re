let initTexture = (gl, texture, glTextureMap) =>
  switch (OperateGlTextureMapService.getTexture(texture, glTextureMap)) {
  | Some(_) => glTextureMap
  | None =>
    OperateGlTextureMapService.setTexture(
      texture,
      gl |> WonderWebgl.Gl.createTexture,
      glTextureMap,
    )
  };

let initTexturesWithIndexArray = (gl, textureIndexArray, glTextureMap) =>
  textureIndexArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. glTextureMap, textureIndex) =>
         initTexture(gl, textureIndex, glTextureMap),
       glTextureMap,
     );

let initTextures = (gl, textureIndexArray, glTextureMap) =>
  initTexturesWithIndexArray(gl, textureIndexArray, glTextureMap);