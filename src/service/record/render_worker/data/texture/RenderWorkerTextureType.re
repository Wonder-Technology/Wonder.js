type textureRecord = {
  buffer: WorkerType.sharedArrayBuffer,
  widths: option(Js.Typed_array.Uint16Array.t),
  heights: option(Js.Typed_array.Uint16Array.t),
  isNeedUpdates: option(Js.Typed_array.Uint8Array.t),
  sourceMap: WonderCommonlib.SparseMapService.t(DomType.imageElement),
  glTextureMap: WonderCommonlib.SparseMapService.t(GlType.texture)
  /* index: int,
     disposedIndexArray,*/
};