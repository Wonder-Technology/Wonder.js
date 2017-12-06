open SourceInstanceType;

open SourceInstanceStateSystem;

let create = (state: StateDataType.state) => {
  let {index} as data = getData(state);
  data.index = succ(index);
  (state, index)
};