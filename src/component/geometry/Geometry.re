open GeometrySystem;

open GeometryType;

let getGeometryDrawMode = (state: StateDataType.state) =>
  [@bs] DeviceManagerSystem.getGL(state) |> getDrawMode;

let setGeometryVertices = setVertices;

let getGeometryVertices = getVertices;

let setGeometryIndices = setIndices;

let getGeometryIndices = getIndices;

let getGeometryConfigData = (geometry: geometry, state: StateDataType.state) =>
  getConfigData(geometry, state) |> Js.Option.getExn;

let getGeometryGameObject = (geometry:geometry, state:StateDataType.state) =>
  getGameObject(geometry, state) |> Js.Option.getExn;