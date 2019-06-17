let isDisposeTooMany = (disposeCount: int, settingRecord) =>
  disposeCount >= MemorySettingService.getMaxDisposeCount(settingRecord);

let _isGeometryPointsNearlyFull = (percent, totalPointsLength, pointsOffset) =>
  (pointsOffset |> NumberType.convertIntToFloat)
  /. (totalPointsLength |> NumberType.convertIntToFloat) >= percent;

let isGeometryBufferNearlyFull =
    (
      percent,
      {
        vertices,
        indices16,
        indices32,
        verticesOffset,
        indices16Offset,
        indices32Offset,
      }: GeometryType.geometryRecord,
    ) =>
  Js.Typed_array.(
    _isGeometryPointsNearlyFull(
      percent,
      vertices |> Float32Array.length,
      verticesOffset,
    )
    || _isGeometryPointsNearlyFull(
         percent,
         indices16 |> Uint16Array.length,
         indices16Offset,
       )
    || _isGeometryPointsNearlyFull(
         percent,
         indices32 |> Uint32Array.length,
         indices32Offset,
       )
  );