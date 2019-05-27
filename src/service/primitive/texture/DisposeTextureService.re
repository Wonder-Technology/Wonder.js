let needDisposeGlTextureMap = (texture, glTextureMap) =>
  glTextureMap |> WonderCommonlib.MutableSparseMapService.has(texture);

/* let disposeGlTextureMap = (texture, gl, glTextureMap) =>
  switch (
    glTextureMap |> WonderCommonlib.MutableSparseMapService.get(texture)
  ) {
  | Some(glTexture) =>
    gl |> WonderWebgl.Gl.deleteTexture(glTexture);

    glTextureMap |> WonderCommonlib.MutableSparseMapService.deleteVal(texture);
  | None => glTextureMap
  }; */

let addDisposeIndex = (texture, disposedIndexArray) =>
  disposedIndexArray |> ArrayService.push(texture);

let isAlive = (texture, disposedIndexArray) =>
  DisposeComponentService.isAlive(texture, disposedIndexArray);