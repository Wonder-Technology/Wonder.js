open RenderWorkerSourceInstanceType;

let create = () => {
  objectInstanceTransformIndexMap: None,
  objectInstanceTransformCollections: None,
  isTransformStatics: None,
  matrixFloat32ArrayMap: WonderCommonlib.SparseMapService.createEmpty(),
  matrixInstanceBufferCapacityMap: WonderCommonlib.SparseMapService.createEmpty(),
  isSendTransformMatrixDataMap: WonderCommonlib.SparseMapService.createEmpty()
};

let unsafeGetObjectInstanceTransformIndexMap = (record) =>
  record.objectInstanceTransformIndexMap |> OptionService.unsafeGet;

let unsafeGetObjectInstanceTransformCollections = (record) =>
  record.objectInstanceTransformCollections |> OptionService.unsafeGet;

let unsafeGetIsTransformStaticMap = (record) =>
  record.isTransformStatics |> OptionService.unsafeGet;