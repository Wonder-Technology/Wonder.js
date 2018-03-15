open MeshRendererType;

let create = () => {
  index: 0,
  renderGameObjectArray: WonderCommonlib.ArrayService.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
};

let deepCopyForRestore = ({index, renderGameObjectArray, gameObjectMap, disposedIndexArray}) => {
  index,
  renderGameObjectArray: renderGameObjectArray |> Js.Array.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};