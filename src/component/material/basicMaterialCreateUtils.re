open MaterialStateUtils;

open MaterialType;

open ComponentSystem;

let create = (state: StateDataType.state) => {
  let {index, disposedIndexArray} as data = getMaterialData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  (state, index)
};