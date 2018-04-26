open IndexComponentService;

open SourceInstanceType;

let create = ({index, objectInstanceTransformArrayMap, disposedIndexArray} as record) => {
  let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray);
  objectInstanceTransformArrayMap
  |> WonderCommonlib.SparseMapService.set(index, WonderCommonlib.ArrayService.createEmpty())
  |> ignore;
  let record = record |> StaticSourceInstanceService.markModelMatrixIsStatic(index, true);
  ({...record, index: newIndex, disposedIndexArray, objectInstanceTransformArrayMap}, index)
};