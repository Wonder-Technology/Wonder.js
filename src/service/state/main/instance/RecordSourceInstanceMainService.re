open StateDataMainType;

open SourceInstanceType;

open BufferSourceInstanceService;

let getRecord = ({sourceInstanceRecord}) => sourceInstanceRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (
      sourceInstanceCount: int,
      defaultIsTransformStatic,
      (objectInstanceTransformCollections, isTransformStatics)
    ) => (
  /* TODO perf: only set sourceInstanceCount data(refer to custom geometry) */
  objectInstanceTransformCollections |> Js.Typed_array.Uint32Array.fillInPlace(0),
  WonderCommonlib.ArrayService.range(0, sourceInstanceCount - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (isTransformStatics, index) =>
           StaticTransformService.setModelMatrixIsStatic(
             index,
             defaultIsTransformStatic,
             isTransformStatics
           )
       ),
       isTransformStatics
     )
);

let _setAllTypeArrDataToDefault =
    (
      sourceInstanceCount: int,
      defaultIsTransformStatic,
      (buffer, objectInstanceTransformCollections, isTransformStatics)
    ) => (
  buffer,
  setAllTypeArrDataToDefault(
    sourceInstanceCount,
    defaultIsTransformStatic,
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
  |> _setAllTypeArrDataToDefault(sourceInstanceCount, defaultIsTransformStatic)
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
        objectInstanceTransformCollections:
          objectInstanceTransformCollections
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(
               index
               * getObjectInstanceTransformCollectionsSize(
                   BufferSettingService.getObjectInstanceCountPerSourceInstance(settingRecord)
                 )
             ),
        isTransformStatics:
          isTransformStatics
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(index * getIsTransformStaticsSize()),
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