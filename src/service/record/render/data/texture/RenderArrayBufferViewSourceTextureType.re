type arrayBufferViewSourceTextureRecord = {
  wrapSs: Js.Typed_array.Uint8Array.t,
  wrapTs: Js.Typed_array.Uint8Array.t,
  magFilters: Js.Typed_array.Uint8Array.t,
  minFilters: Js.Typed_array.Uint8Array.t,
  formats: Js.Typed_array.Uint8Array.t,
  types: Js.Typed_array.Uint8Array.t,
  isNeedUpdates: Js.Typed_array.Uint8Array.t,
  flipYs: Js.Typed_array.Uint8Array.t,
  widths: Js.Typed_array.Uint16Array.t,
  heights: Js.Typed_array.Uint16Array.t,
  sourceMap:
    WonderCommonlib.MutableSparseMapService.t(Js.Typed_array.Uint8Array.t),
  glTextureMap:
    WonderCommonlib.MutableSparseMapService.t(WonderWebgl.GlType.texture),
  setFlipYFunc:
    (
      WonderWebgl.GlType.webgl1Context,
      bool,
      AllBrowserDetectType.browserDetectRecord
    ) =>
    unit,
  textureIndexOffset: int,
};