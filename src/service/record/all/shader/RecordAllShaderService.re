open AllShaderType;

let create = () => {
  index: 0,
  shaderLibShaderIndexMap: WonderCommonlib.MutableHashMapService.createEmpty(),
  noMaterialShaderIndexMap:
    WonderCommonlib.MutableHashMapService.createEmpty(),
  materialsMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
};

let deepCopyForRestore =
    (
      {index, materialsMap, shaderLibShaderIndexMap, noMaterialShaderIndexMap},
    ) => {
  index,
  shaderLibShaderIndexMap:
    shaderLibShaderIndexMap |> WonderCommonlib.MutableHashMapService.copy,
  noMaterialShaderIndexMap:
    noMaterialShaderIndexMap |> WonderCommonlib.MutableHashMapService.copy,
  materialsMap:
    materialsMap |> CopyTypeArrayService.deepCopyMutableSparseMapOfArray,
};