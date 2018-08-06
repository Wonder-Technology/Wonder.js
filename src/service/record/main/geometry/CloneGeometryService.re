open GeometryType;

let handleCloneComponent = (sourceComponent, countRangeArr: array(int), record) => (
  record,
  countRangeArr |> Js.Array.map((_) => sourceComponent)
);