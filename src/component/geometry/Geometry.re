open GeometrySystem;

open GeometryType;

let getGeometryDrawMode = (state: StateDataType.state) =>
  [@bs] DeviceManagerSystem.getGl(state) |> getDrawMode;

let setGeometryVertices = (index: int, data: Js.Array.t(float), state: StateDataType.state) =>
  setVertices(
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(index),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    data,
    state
  );

let getGeometryVertices = (index: int, state: StateDataType.state) =>
  [@bs] getVertices(
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(index),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    state
  );

let setGeometryIndices = (index: int, data: Js.Array.t(int), state: StateDataType.state) =>
  setIndices(
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(index),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    data,
    state
  );

let getGeometryIndices = (index: int, state: StateDataType.state) =>
  [@bs]getIndices(
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(index),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    state
  );

let getGeometryConfigData = (geometry: geometry, state: StateDataType.state) =>
  getConfigData(geometry, state) |> Js.Option.getExn;

let getGeometryGameObject = (geometry: geometry, state: StateDataType.state) =>
  getGameObject(geometry, state) |> Js.Option.getExn;