type imageBitmap;

type textureRecord = {
  wrapSs: option(Js.Typed_array.Uint8Array.t),
  wrapTs: option(Js.Typed_array.Uint8Array.t),
  magFilters: option(Js.Typed_array.Uint8Array.t),
  minFilters: option(Js.Typed_array.Uint8Array.t),
  isNeedUpdates: option(Js.Typed_array.Uint8Array.t),
  sourceMap: WonderCommonlib.SparseMapService.t(imageBitmap),
  glTextureMap: WonderCommonlib.SparseMapService.t(GlType.texture),
  bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.t(int)
};