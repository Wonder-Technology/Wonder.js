open MaterialType;

open BasicMaterialType;

let create = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.SparseMapService.createEmpty(),
  colorMap: WonderCommonlib.SparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
  groupCountMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
};

let deepCopyForRestore = ({index, colorMap, groupCountMap, gameObjectMap, disposedIndexArray}) => {
  index,
  shaderIndexMap: [||],
  colorMap: colorMap |> SparseMapService.copy,
  groupCountMap: groupCountMap |> SparseMapService.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};