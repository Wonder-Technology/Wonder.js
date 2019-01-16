open ShaderType;

let getShaderIndex = (key: string, {noMaterialShaderIndexMap}) =>
  noMaterialShaderIndexMap |> WonderCommonlib.HashMapService.get(key);

let unsafeGetShaderIndex = (key: string, record) =>
  getShaderIndex(key, record) |> OptionService.unsafeGet;

let setShaderIndex =
    (key: string, shaderIndex: int, {noMaterialShaderIndexMap}) =>
  noMaterialShaderIndexMap
  |> WonderCommonlib.HashMapService.set(key, shaderIndex);