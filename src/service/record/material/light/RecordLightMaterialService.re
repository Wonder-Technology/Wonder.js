open MaterialType;

open LightMaterialType;

let create = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.SparseMapService.createEmpty(),
  diffuseColorMap: WonderCommonlib.SparseMapService.createEmpty(),
  specularColorMap: WonderCommonlib.SparseMapService.createEmpty(),
  shininessMap: WonderCommonlib.SparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
  groupCountMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
};

let deepCopyForRestore =
    (
      {
        index,
        diffuseColorMap,
        specularColorMap,
        shininessMap,
        groupCountMap,
        gameObjectMap,
        disposedIndexArray
      }
    ) => {
  index,
  shaderIndexMap: [||],
  diffuseColorMap: diffuseColorMap |> SparseMapService.copy,
  specularColorMap: specularColorMap |> SparseMapService.copy,
  shininessMap: shininessMap |> SparseMapService.copy,
  groupCountMap: groupCountMap |> SparseMapService.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};