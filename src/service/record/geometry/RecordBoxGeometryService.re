open BoxGeometryType;

let create = () => {
  index: 0,
  verticesMap: WonderCommonlib.SparseMapService.createEmpty(),
  normalsMap: WonderCommonlib.SparseMapService.createEmpty(),
  indicesMap: WonderCommonlib.SparseMapService.createEmpty(),
  configDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  computeDataFuncMap: WonderCommonlib.SparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
  isInitMap: WonderCommonlib.SparseMapService.createEmpty(),
  groupCountMap: WonderCommonlib.SparseMapService.createEmpty()
};

let deepCopyForRestore =
    (
      {
        index,
        verticesMap,
        normalsMap,
        indicesMap,
        configDataMap,
        isInitMap,
        computeDataFuncMap,
        groupCountMap,
        gameObjectMap,
        disposedIndexArray
      } as record
    ) => {
  index,
  verticesMap: verticesMap |> CopyTypeArrayService.deepCopyFloat32ArrayArray,
  normalsMap: normalsMap |> CopyTypeArrayService.deepCopyFloat32ArrayArray,
  indicesMap: indicesMap |> CopyTypeArrayService.deepCopyUint16ArrayArray,
  computeDataFuncMap: computeDataFuncMap |> SparseMapService.copy,
  configDataMap: configDataMap |> SparseMapService.copy,
  isInitMap: isInitMap |> SparseMapService.copy,
  groupCountMap: groupCountMap |> SparseMapService.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};