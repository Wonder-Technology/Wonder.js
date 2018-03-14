open MaterialType;

open BasicMaterialType;

let create = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  colorMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  groupCountMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};

let deepCopyForRestore = ({index, colorMap, groupCountMap, gameObjectMap, disposedIndexArray}) => {
  index,
  shaderIndexMap: [||],
  colorMap: colorMap |> SparseMapService.copy,
  groupCountMap: groupCountMap |> SparseMapService.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};