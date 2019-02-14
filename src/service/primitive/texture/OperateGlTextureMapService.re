let getTexture = (texture, glTextureMap) =>
  glTextureMap |> WonderCommonlib.MutableSparseMapService.get(texture);

let unsafeGetTexture = (texture, glTextureMap) =>
  getTexture(texture, glTextureMap) |> OptionService.unsafeGet;

let setTexture = (texture, glTexture, glTextureMap) =>
  glTextureMap |> WonderCommonlib.MutableSparseMapService.set(texture, glTexture);