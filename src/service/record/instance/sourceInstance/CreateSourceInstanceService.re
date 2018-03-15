open IndexComponentService;

open SourceInstanceType;

let create = ({index, objectInstanceArrayMap, disposedIndexArray} as record) => {
  let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray);
  objectInstanceArrayMap
  |> WonderCommonlib.SparseMapService.set(index, WonderCommonlib.ArrayService.createEmpty())
  |> ignore;
  let record =
    record
    |> StaticSourceInstanceService.markModelMatrixIsStatic(index, true)
    |> StaticSourceInstanceService.markIsSendTransformMatrixData(index, false);
  ({...record, index: newIndex, disposedIndexArray, objectInstanceArrayMap}, index)
};