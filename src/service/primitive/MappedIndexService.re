let getMappedIndex = (index, mappedIndexMap) =>
  mappedIndexMap |> WonderCommonlib.SparseMapService.unsafeGet(index);

let setMappedIndex = (index, mappedIndex, mappedIndexMap) =>
  mappedIndexMap |> WonderCommonlib.SparseMapService.set(index, mappedIndex);

let markDisposed = (index, mappedIndexMap) => setMappedIndex(index, (-1), mappedIndexMap);

let isDisposed = (mappedIndex) => mappedIndex === (-1);

let isComponentAlive = (component, mappedIndexMap) =>
  ! isDisposed(getMappedIndex(component, mappedIndexMap));