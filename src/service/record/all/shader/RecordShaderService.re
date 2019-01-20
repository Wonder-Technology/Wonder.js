open ShaderType;

let create = () => {
  index: 0,
  shaderLibShaderIndexMap: WonderCommonlib.HashMapService.createEmpty(),
  noMaterialShaderIndexMap: WonderCommonlib.HashMapService.createEmpty(),
  materialsMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
};

let deepCopyForRestore =
    (
      {index, materialsMap, shaderLibShaderIndexMap, noMaterialShaderIndexMap},
    ) => {
  index,
  shaderLibShaderIndexMap: shaderLibShaderIndexMap |> HashMapService.copy,
  noMaterialShaderIndexMap: noMaterialShaderIndexMap |> HashMapService.copy,
  materialsMap: materialsMap |> CopyTypeArrayService.deepCopyMutableSparseMapOfArray,
};