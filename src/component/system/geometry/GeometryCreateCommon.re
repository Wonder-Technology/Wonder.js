open GeometryStateCommon;

open StateDataType;

let create = (state: StateDataType.state) => {
  let {index} as data = getGeometryData(state);
  data.index = succ(index);
  (state, index)
};