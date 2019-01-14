open ShaderType;

let getShaderIndex = (key: string, {shaderLibShaderIndexMap}) =>
  shaderLibShaderIndexMap |> WonderCommonlib.HashMapService.get(key);

let setShaderIndex =
    (key: string, shaderIndex: int, {shaderLibShaderIndexMap}) =>
  shaderLibShaderIndexMap
  |> WonderCommonlib.HashMapService.set(key, shaderIndex);

let clearShaderIndexMap = shaderRecord => {
  shaderRecord.shaderLibShaderIndexMap =
    WonderCommonlib.HashMapService.createEmpty();

  shaderRecord;
};