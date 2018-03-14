open BoxGeometryType;

let create = () => {
  index: 0,
  verticesMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  normalsMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  indicesMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  configDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  computeDataFuncMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty(),
  isInitMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  groupCountMap: WonderCommonlib.SparseMapSystem.createEmpty()
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