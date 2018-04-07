open InstanceType;

open SourceInstanceType;

let markModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: bool, {isTransformStaticMap} as record) => {
  ...record,
  isTransformStaticMap:
    isTransformStaticMap |> WonderCommonlib.SparseMapService.set(sourceInstance, isStatic)
};

let markIsSendTransformMatrixData =
    (sourceInstance: sourceInstance, isSend, {isSendTransformMatrixDataMap} as record) => {
  ...record,
  isSendTransformMatrixDataMap:
    MarkIsSendTransformMatrixDataService.markIsSendTransformMatrixData(
      sourceInstance,
      isSend,
      isSendTransformMatrixDataMap
    )
};