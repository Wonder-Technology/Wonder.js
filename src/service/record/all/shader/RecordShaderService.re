open ShaderType;

let create = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.HashMapService.createEmpty(),
  materialsMap: WonderCommonlib.SparseMapService.createEmpty(),
  usedShaderIndexArray: [||],
};

let deepCopyForRestore =
    ({index, materialsMap, shaderIndexMap, usedShaderIndexArray}) => {
  index,
  shaderIndexMap: shaderIndexMap |> HashMapService.copy,
  materialsMap: materialsMap |> CopyTypeArrayService.deepCopyArrayArray,
  usedShaderIndexArray: usedShaderIndexArray |> Js.Array.copy,
};