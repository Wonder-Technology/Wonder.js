open ComponentSystem;

let setDefaultColor = (index: int, colorMap) =>
  colorMap |> WonderCommonlib.SparseMapSystem.set(index, [|1., 1., 1.|]);

let create = (index, disposedIndexArray) => generateIndex(index, disposedIndexArray);