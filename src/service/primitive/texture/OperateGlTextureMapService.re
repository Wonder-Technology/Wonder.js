let getTexture = (texture, glTextureMap) =>
  glTextureMap |> WonderCommonlib.SparseMapService.get(texture);

let unsafeGetTexture = (texture, glTextureMap) =>
  glTextureMap |> WonderCommonlib.SparseMapService.unsafeGet(texture);

let setTexture = (texture, glTexture, glTextureMap) =>
  glTextureMap |> WonderCommonlib.SparseMapService.set(texture, texture);