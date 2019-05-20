/* TODO optimize: add gl texture to pool? */
let disposeGlTextureMap = (texture, gl, glTextureMap) =>
  switch (
    glTextureMap |> WonderCommonlib.MutableSparseMapService.get(texture)
  ) {
  | Some(glTexture) =>
    gl |> WonderWebgl.Gl.deleteTexture(glTexture);

    glTextureMap |> WonderCommonlib.MutableSparseMapService.deleteVal(texture);
  | None => glTextureMap
  };

let disposeNeedAddedSourceArray = (texture, needAddedSourceArray) =>
  needAddedSourceArray
  |> Js.Array.filter(((needAddedSourceTexture, _)) =>
       needAddedSourceTexture !== texture
     );