open RenderWorkerSourceInstanceType;

let create = () => {
  objectInstanceTransformArrayMap: None,
  isTransformStaticMap: None,
  matrixFloat32ArrayMap: WonderCommonlib.SparseMapService.createEmpty(),
  matrixInstanceBufferCapacityMap: WonderCommonlib.SparseMapService.createEmpty(),
  isSendTransformMatrixDataMap: WonderCommonlib.SparseMapService.createEmpty()
};

let unsafeGetObjectInstanceTransformArrayMap = (record) =>
  record.objectInstanceTransformArrayMap |> OptionService.unsafeGet;

let unsafeGetIsTransformStaticMap = (record) =>
  record.isTransformStaticMap |> OptionService.unsafeGet;