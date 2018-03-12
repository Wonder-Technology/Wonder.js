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
  diffuseColorMap: diffuseColorMap |> SparseMapSystem.copy,
  specularColorMap: specularColorMap |> SparseMapSystem.copy,
  shininessMap: shininessMap |> SparseMapSystem.copy,
  groupCountMap: groupCountMap |> SparseMapSystem.copy,
  gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};