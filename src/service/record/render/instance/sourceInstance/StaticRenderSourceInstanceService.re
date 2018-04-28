open InstanceType;

open RenderSourceInstanceType;

let isTransformStatic = (sourceInstance: sourceInstance, {isTransformStaticMap}) =>
  StaticSourceInstanceService.isTransformStatic(sourceInstance, isTransformStaticMap);

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

let isSendTransformMatrixData = (sourceInstance: sourceInstance, {isSendTransformMatrixDataMap}) =>
  StaticSourceInstanceService.isSendTransformMatrixData(
    sourceInstance,
    isSendTransformMatrixDataMap
  );