open BoxGeometryType;

let handleCloneComponent = (sourceComponent, countRangeArr: array(int), record) => (
  record,
  countRangeArr |> Js.Array.map((_) => sourceComponent)
);

let isCloned = (geometry, isClonedMap) =>
  isClonedMap |> WonderCommonlib.SparseMapSystem.has(geometry);