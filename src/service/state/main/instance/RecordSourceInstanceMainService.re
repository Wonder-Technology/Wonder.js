open StateDataMainType;

open SourceInstanceType;

open BufferSourceInstanceService;

let getRecord = ({sourceInstanceRecord}) => sourceInstanceRecord |> OptionService.unsafeGet;

let _setDefaultTypeArrData =
    (
      count: int,
      defaultIsTransformStatic,
      (buffer, objectInstanceTransformCollections, isTransformStatics)
    ) => (
  buffer,
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((objectInstanceTransformCollections, isTransformStatics), index) => (
           objectInstanceTransformCollections,
           StaticTransformService.setModelMatrixIsStatic(
             index,
             defaultIsTransformStatic,
             isTransformStatics
           )
         )
       ),
       (objectInstanceTransformCollections, isTransformStatics)
     )
);

let _initBufferData =
    (sourceInstanceCount, objectInstanceCountPerSourceInstance, defaultIsTransformStatic) => {
  let buffer = createBuffer(sourceInstanceCount, objectInstanceCountPerSourceInstance);
  let (objectInstanceTransformCollections, isTransformStatics) =
    CreateTypeArraySourceInstanceService.createTypeArrays(
      buffer,
      sourceInstanceCount,
      objectInstanceCountPerSourceInstance
    );
  (buffer, objectInstanceTransformCollections, isTransformStatics)
  |> _setDefaultTypeArrData(sourceInstanceCount, defaultIsTransformStatic)
};

let create = ({settingRecord} as state) => {
  let sourceInstanceCount = BufferSettingService.getSourceInstanceCount(settingRecord);
  let objectInstanceCountPerSourceInstance =
    BufferSettingService.getObjectInstanceCountPerSourceInstance(settingRecord);
  let defaultIsTransformStatic = StaticTransformService.getDefault();
  let (buffer, (objectInstanceTransformCollections, isTransformStatics)) =
    _initBufferData(
      sourceInstanceCount,
      objectInstanceCountPerSourceInstance,
      defaultIsTransformStatic
    );
  state.sourceInstanceRecord =
    Some({
      index: 0,
      buffer,
      objectInstanceTransformCollections,
      isTransformStatics,
      objectInstanceTransformIndexMap: WonderCommonlib.SparseMapService.createEmpty(),
      gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
      matrixFloat32ArrayMap: WonderCommonlib.SparseMapService.createEmpty(),
      matrixInstanceBufferCapacityMap: WonderCommonlib.SparseMapService.createEmpty(),
      isSendTransformMatrixDataMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
    });
  state
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
        index,
        buffer,
        objectInstanceTransformIndexMap,
        objectInstanceTransformCollections,
        matrixFloat32ArrayMap,
        matrixInstanceBufferCapacityMap,
        isTransformStatics,
        isSendTransformMatrixDataMap,
        gameObjectMap,
        disposedIndexArray
      } as record =
    state |> getRecord;
  {
    ...state,
    sourceInstanceRecord:
      Some({
        ...record,
        index,
        buffer:
          CopyArrayBufferService.copyArrayBuffer(
            buffer,
            BufferSourceInstanceService.getTotalByteLength(
              index,
              BufferSettingService.getObjectInstanceCountPerSourceInstance(settingRecord)
            )
          ),
        matrixFloat32ArrayMap:
          matrixFloat32ArrayMap |> CopyTypeArrayService.deepCopyFloat32ArrayArray,
        matrixInstanceBufferCapacityMap: matrixInstanceBufferCapacityMap |> SparseMapService.copy,
        objectInstanceTransformIndexMap: objectInstanceTransformIndexMap |> SparseMapService.copy,
        isSendTransformMatrixDataMap,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};