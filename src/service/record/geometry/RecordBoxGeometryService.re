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
  verticesMap: verticesMap |> SparseMapSystem.copy,
  normalsMap: normalsMap |> SparseMapSystem.copy,
  indicesMap: indicesMap |> SparseMapSystem.copy,
  computeDataFuncMap: computeDataFuncMap |> SparseMapSystem.copy,
  configDataMap: configDataMap |> SparseMapSystem.copy,
  isInitMap: isInitMap |> SparseMapSystem.copy,
  groupCountMap: groupCountMap |> SparseMapSystem.copy,
  gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};