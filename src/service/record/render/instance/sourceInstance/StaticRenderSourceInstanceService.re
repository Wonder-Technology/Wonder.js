open AllInstanceType;

open RenderSourceInstanceType;

let isTransformStatic = (sourceInstance: sourceInstance, {isTransformStatics}) =>
  StaticTransformService.isTransformStatic(sourceInstance, isTransformStatics);

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