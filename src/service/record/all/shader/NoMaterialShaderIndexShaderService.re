open ShaderType;

let getShaderIndex = (key: string, {noMaterialShaderIndexMap}) =>
  noMaterialShaderIndexMap |> WonderCommonlib.HashMapService.get(key);

let setShaderIndex =
    (key: string, shaderIndex: int, {noMaterialShaderIndexMap}) =>
  noMaterialShaderIndexMap
  |> WonderCommonlib.HashMapService.set(key, shaderIndex);