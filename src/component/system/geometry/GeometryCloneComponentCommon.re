open GeometryType;

open StateDataType;

let handleCloneComponent =
    (sourceComponent: geometry, countRangeArr: array(int), state: StateDataType.state) => (
  state,
  countRangeArr |> Js.Array.map((_) => sourceComponent)
);

let isCloned = (mappedGeometry, isClonedMap) =>
  isClonedMap |> WonderCommonlib.SparseMapSystem.has(mappedGeometry);