let getTexture = (texture, glTextureMap) =>
  glTextureMap |> WonderCommonlib.SparseMapService.get(texture);

let unsafeGetTexture = (texture, glTextureMap) =>
  getTexture(texture, glTextureMap) |> OptionService.unsafeGet;

let setTexture = (texture, glTexture, glTextureMap) =>
  glTextureMap |> WonderCommonlib.SparseMapService.set(texture, glTexture);