open ShaderType;

let create = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.HashMapService.createEmpty(),
  materialsMap: WonderCommonlib.SparseMapService.createEmpty(),
};

let deepCopyForRestore = ({index, materialsMap, shaderIndexMap}) => {
  index,
  shaderIndexMap: shaderIndexMap |> HashMapService.copy,
  materialsMap: materialsMap |> CopyTypeArrayService.deepCopyArrayArray,
};