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
  /*!
    because vertices, indices are read-only record, so need to deep copy
    */
  verticesMap: verticesMap |> SparseMapService.copy,
  normalsMap: normalsMap |> SparseMapService.copy,
  indicesMap: indicesMap |> SparseMapService.copy,
  computeDataFuncMap: computeDataFuncMap |> SparseMapService.copy,
  configDataMap: configDataMap |> SparseMapService.copy,
  isInitMap: isInitMap |> SparseMapService.copy,
  groupCountMap: groupCountMap |> SparseMapService.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};