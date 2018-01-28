open MaterialStateCommon;

open MaterialType;

open ComponentSystem;

let setDefaultColor = (index: int, colorMap) =>
  colorMap |> WonderCommonlib.SparseMapSystem.set(index, [|1., 1., 1.|]);

/* let _initDataWhenCreate = (index: int, colorMap) => _setDefaultColor(index, colorMap); */
let create = (index, disposedIndexArray) =>
  /* let {index, disposedIndexArray, colorMap} as data = getMaterialData(state); */
  /* let (index, newIndex) = generateIndex(index, disposedIndexArray); */
  generateIndex
    (index, disposedIndexArray);
    /* data.index = newIndex;
       /* _initDataWhenCreate(index, colorMap) |> ignore; */
       (state, index) */