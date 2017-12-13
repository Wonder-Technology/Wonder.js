open MaterialStateCommon;

open MaterialType;

open ComponentSystem;

let _setDefaultColor = (index: int, colorMap) => {
  colorMap |> WonderCommonlib.SparseMapSystem.set(index, (0., 0., 0.));
  colorMap
};

let _initDataWhenCreate = (index: int, colorMap) => _setDefaultColor(index, colorMap);

let create = (state: StateDataType.state) => {
  let {index, disposedIndexArray, colorMap} as data = getMaterialData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  _initDataWhenCreate(index, colorMap) |> ignore;
  (state, index)
};