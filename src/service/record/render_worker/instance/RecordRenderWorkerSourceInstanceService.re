open RenderWorkerSourceInstanceType;

let create = () => {
  objectInstanceTransformIndexMap: None,
  objectInstanceTransformCollections: None,
  isTransformStatics: None,
  matrixFloat32ArrayMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  matrixInstanceBufferCapacityMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  isSendTransformMatrixDataMap: WonderCommonlib.MutableSparseMapService.createEmpty()
};

let unsafeGetObjectInstanceTransformIndexMap = (record) =>
  record.objectInstanceTransformIndexMap |> OptionService.unsafeGet;

let unsafeGetObjectInstanceTransformCollections = (record) =>
  record.objectInstanceTransformCollections |> OptionService.unsafeGet;

let unsafeGetIsTransformStaticMap = (record) =>
  record.isTransformStatics |> OptionService.unsafeGet;