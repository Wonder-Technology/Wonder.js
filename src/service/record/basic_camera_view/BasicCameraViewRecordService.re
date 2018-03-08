open BasicCameraViewType;

let create = () => {
  index: 0,
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};

let deepCopyForRestore = ({index, gameObjectMap, disposedIndexArray}) => {
  index,
  gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};