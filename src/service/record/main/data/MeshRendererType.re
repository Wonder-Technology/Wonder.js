open ComponentType;

type meshRenderer = int;

type renderGameObjectMap = WonderCommonlib.SparseMapService.t(int);

type meshRendererRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  drawModes: Js.Typed_array.Uint8Array.t,
  basicMaterialRenderGameObjectMap: renderGameObjectMap,
  lightMaterialRenderGameObjectMap: renderGameObjectMap,
  gameObjectMap,
  disposedIndexArray: array(meshRenderer),
};