open IndexComponentService;

open SourceInstanceType;

let create = ({index, objectInstanceArrayMap, disposedIndexArray} as record) => {
  let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray);
  objectInstanceArrayMap
  |> WonderCommonlib.SparseMapSystem.set(index, WonderCommonlib.ArraySystem.createEmpty())
  |> ignore;
  let record =
    record
    |> StaticSourceInstanceService.markModelMatrixIsStatic(index, true)
    |> StaticSourceInstanceService.markIsSendTransformMatrixData(index, false);
  ({...record, index: newIndex, disposedIndexArray, objectInstanceArrayMap}, index)
};