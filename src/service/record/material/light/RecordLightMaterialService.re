open MaterialType;

open LightMaterialType;

let create = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  diffuseColorMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  specularColorMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  shininessMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  groupCountMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
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