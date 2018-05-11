type textureRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  widths: Js.Typed_array.Uint16Array.t,
  heights: Js.Typed_array.Uint16Array.t,
  isNeedUpdates: Js.Typed_array.Uint8Array.t,
  sourceMap: WonderCommonlib.SparseMapService.t(DomType.imageElement),
  glTextureMap: WonderCommonlib.SparseMapService.t(GlType.texture),
  bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.t(int),
  disposedIndexArray: array(int)
};