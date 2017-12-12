open GeometryType;

open StateDataType;

let handleCloneComponent =
    (sourceComponent: geometry, countRangeArr: array(int), state: StateDataType.state) => (
  state,
  countRangeArr |> Js.Array.map((_) => sourceComponent)
);

let isCloned = (geometry, isClonedMap) =>
  isClonedMap |> WonderCommonlib.SparseMapSystem.has(geometry);