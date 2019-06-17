open AllShaderType;

let getShaderIndex = (key: string, {noMaterialShaderIndexMap}) =>
  noMaterialShaderIndexMap |> WonderCommonlib.MutableHashMapService.get(key);

let unsafeGetShaderIndex = (key: string, record) =>
  getShaderIndex(key, record) |> OptionService.unsafeGet;

let setShaderIndex =
    (key: string, shaderIndex: int, {noMaterialShaderIndexMap}) =>
  noMaterialShaderIndexMap
  |> WonderCommonlib.MutableHashMapService.set(key, shaderIndex);