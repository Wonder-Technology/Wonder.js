let isDisposeTooMany = (disposeCount: int, settingRecord) =>
  disposeCount >= MemorySettingService.getMaxDisposeCount(settingRecord);

let isGeometryBufferNearlyFull =
    (percent, {vertices, verticesOffset}: GeometryType.geometryRecord) => {
  let totalVerticesLength = vertices |> Js.Typed_array.Float32Array.length;

  (verticesOffset |> NumberType.intToFloat)
  /. (totalVerticesLength |> NumberType.intToFloat) >= percent;
};