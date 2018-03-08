open MeshRendererType;

let create = () => {
  index: 0,
  renderGameObjectArray: WonderCommonlib.ArraySystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};