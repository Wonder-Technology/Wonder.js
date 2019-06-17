type basicSourceTexture = int;

type basicSourceTextureRecord = {
  index: int,
  /* buffer: WorkerType.sharedArrayBuffer, */
  wrapSs: Js.Typed_array.Uint8Array.t,
  wrapTs: Js.Typed_array.Uint8Array.t,
  magFilters: Js.Typed_array.Uint8Array.t,
  minFilters: Js.Typed_array.Uint8Array.t,
  formats: Js.Typed_array.Uint8Array.t,
  types: Js.Typed_array.Uint8Array.t,
  isNeedUpdates: Js.Typed_array.Uint8Array.t,
  flipYs: Js.Typed_array.Uint8Array.t,
  sourceMap:
    WonderCommonlib.MutableSparseMapService.t(
      WonderWebgl.DomExtendType.imageElement,
    ),
  glTextureMap:
    WonderCommonlib.MutableSparseMapService.t(WonderWebgl.GlType.texture),
  disposedIndexArray: array(int),
  needAddedSourceArray: array((int, WonderWebgl.DomExtendType.imageElement)),
  needInitedTextureIndexArray: array(int),
  needDisposedTextureIndexArray: array(int),
  nameMap: WonderCommonlib.MutableSparseMapService.t(string),
  materialsMap:
    WonderCommonlib.MutableSparseMapService.t(
      array((int, MaterialType.materialType)),
    ),
};