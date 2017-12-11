open GeometryType;

open VboBufferType;

let disposeData = (geometry: geometry, state: StateDataType.state) => {
  let {vertexBufferMap, elementArrayBufferMap} = VboBufferStateUtils.getVboBufferData(state);
  vertexBufferMap |> Obj.magic |> WonderCommonlib.SparseMapSystem.deleteVal(geometry);
  elementArrayBufferMap |> Obj.magic |> WonderCommonlib.SparseMapSystem.deleteVal(geometry);
  state
};