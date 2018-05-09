type textureRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  widths: Js.Typed_array.Float32Array.t,
  heights: Js.Typed_array.Float32Array.t,
  isNeedUpdates: Js.Typed_array.Uint8Array.t,
  sourceMap: WonderCommonlib.SparseMapService.t(DomType.imageElement),
  glTextureMap: WonderCommonlib.SparseMapService.t(GlType.texture),
  disposedIndexArray: array(int)
};