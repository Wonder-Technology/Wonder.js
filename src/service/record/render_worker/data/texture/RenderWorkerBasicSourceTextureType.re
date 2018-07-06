type imageBitmap;

external sparseMapImageBitmapToSparseMapImageElement : WonderCommonlib.SparseMapService.t(imageBitmap) => WonderCommonlib.SparseMapService.t(DomExtendType.imageElement) = "%identity";

type basicSourceTextureRecord = {
  wrapSs: option(Js.Typed_array.Uint8Array.t),
  wrapTs: option(Js.Typed_array.Uint8Array.t),
  magFilters: option(Js.Typed_array.Uint8Array.t),
  minFilters: option(Js.Typed_array.Uint8Array.t),
  formats: option(Js.Typed_array.Uint8Array.t),
  types: option(Js.Typed_array.Uint8Array.t),
  isNeedUpdates: option(Js.Typed_array.Uint8Array.t),
  flipYs: option(Js.Typed_array.Uint8Array.t),
  sourceMap: WonderCommonlib.SparseMapService.t(imageBitmap),
  glTextureMap: WonderCommonlib.SparseMapService.t(GlType.texture),
  bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.t(int)
};