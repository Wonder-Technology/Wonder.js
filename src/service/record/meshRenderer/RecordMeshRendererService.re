open MeshRendererType;

let create = () => {
  index: 0,
  renderGameObjectArray: WonderCommonlib.ArraySystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};

let deepCopyForRestore = ({index, renderGameObjectArray, gameObjectMap, disposedIndexArray}) => {
  index,
  renderGameObjectArray: renderGameObjectArray |> Js.Array.copy,
  gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};