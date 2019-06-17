open AllShaderType;

let getShaderIndex = (key: string, {shaderLibShaderIndexMap}) =>
  shaderLibShaderIndexMap |> WonderCommonlib.MutableHashMapService.get(key);

let setShaderIndex =
    (key: string, shaderIndex: int, {shaderLibShaderIndexMap}) =>
  shaderLibShaderIndexMap
  |> WonderCommonlib.MutableHashMapService.set(key, shaderIndex);

let clearShaderIndexMap = shaderRecord => {
  shaderRecord.shaderLibShaderIndexMap =
    WonderCommonlib.MutableHashMapService.createEmpty();

  shaderRecord;
};