open Contract;

open GeometryGetStateDataCommon;

open Js.Typed_array;

open TypeArrayUtils;

open GeometryType;

open StateDataType;

open GeometryOperateCommon;

let getVertices = (index: int, state: StateDataType.state) =>
  getPoints(index, getGeometryData(state).verticesMap);

let unsafeGetVertices = (index: int, state: StateDataType.state) =>
  unsafeGetPoints(index, getGeometryData(state).verticesMap);

let getVerticesCount = (index: int, state: StateDataType.state) =>
  unsafeGetVertices(index, state) |> Float32Array.length;

let setVerticesWithArray = (index: int, data: array(float), state: StateDataType.state) =>
  setPointsWithArray(
    (index, getVertices(index, state), data, getGeometryData(state).verticesMap),
    (
      TypeArrayPoolSystem.getFloat32TypeArrayFromPool,
      TypeArrayUtils.fillFloat32Array,
      TypeArrayUtils.makeFloat32Array
    ),
    state
  );

let setVertices = (index: int, data: Float32Array.t, state: StateDataType.state) => {
    setPoints(index, getGeometryData(state).verticesMap, data) |> ignore;
  state
};