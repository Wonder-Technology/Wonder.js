let markIsSendTransformMatrixData = (sourceInstance, isSend, isSendTransformMatrixDataMap) =>
  isSendTransformMatrixDataMap |> WonderCommonlib.SparseMapService.set(sourceInstance, isSend);

let isSendTransformMatrixData = (sourceInstance, isSendTransformMatrixDataMap) =>
  switch (isSendTransformMatrixDataMap |> WonderCommonlib.SparseMapService.get(sourceInstance)) {
  | None => false
  | Some(isSend) => isSend
  };