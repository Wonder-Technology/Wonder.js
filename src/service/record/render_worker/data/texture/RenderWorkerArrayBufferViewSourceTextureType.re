type imageBitmap;

type arrayBufferViewSourceTextureRecord = {
  wrapSs: option(Js.Typed_array.Uint8Array.t),
  wrapTs: option(Js.Typed_array.Uint8Array.t),
  magFilters: option(Js.Typed_array.Uint8Array.t),
  minFilters: option(Js.Typed_array.Uint8Array.t),
  formats: option(Js.Typed_array.Uint8Array.t),
  types: option(Js.Typed_array.Uint8Array.t),
  isNeedUpdates: option(Js.Typed_array.Uint8Array.t),
  widths: option(Js.Typed_array.Uint16Array.t),
  heights: option(Js.Typed_array.Uint16Array.t),
  sourceMap: WonderCommonlib.SparseMapService.t(Js.Typed_array.Uint8Array.t),
  glTextureMap: WonderCommonlib.SparseMapService.t(GlType.texture),
  bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.t(int)
};