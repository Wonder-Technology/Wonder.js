let markIsSendTransformMatrixData = (sourceInstance, isSend, isSendTransformMatrixDataMap) =>
  isSendTransformMatrixDataMap |> WonderCommonlib.MutableSparseMapService.set(sourceInstance, isSend);

let isSendTransformMatrixData = (sourceInstance, isSendTransformMatrixDataMap) =>
  switch (isSendTransformMatrixDataMap |> WonderCommonlib.MutableSparseMapService.get(sourceInstance)) {
  | None => false
  | Some(isSend) => isSend
  };