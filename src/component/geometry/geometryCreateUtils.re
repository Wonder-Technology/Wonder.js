open GeometryStateUtils;

open StateDataType;

let create = (state: StateDataType.state) => {
  let {index, mappedIndex, mappedIndexMap, aliveIndexArray} as data = getGeometryData(state);
  data.index = succ(index);
  data.mappedIndex = succ(mappedIndex);
  GeometryIndexUtils.setMappedIndex(index, mappedIndex, mappedIndexMap) |> ignore;
  aliveIndexArray |> Js.Array.push(index) |> ignore;
  (state, index)
};