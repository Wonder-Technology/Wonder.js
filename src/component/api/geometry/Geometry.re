open GeometrySystem;

open GeometryType;

open Contract;

let getGeometryDrawMode = (state: StateDataType.state) =>
  [@bs] DeviceManagerSystem.getGl(state) |> getDrawMode;

let getGeometryVertices = (geometry: int, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  [@bs]
  unsafeGetVertices(
geometry,
    state
  )
};

let setGeometryVertices =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  setVertices(
    geometry,
    data,
    state
  )
};

let getGeometryIndices = (geometry: int, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  [@bs]
  unsafeGetIndices(
    geometry,
    state
  )
};

let setGeometryIndices =
    (geometry: int, data: Js.Typed_array.Uint16Array.t, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  setIndices(
    geometry,
    data,
    state
  )
};

let getGeometryConfigData = (geometry: geometry, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  getConfigData(
    geometry,
    state
  )
  |> Js.Option.getExn
};

let getGeometryGameObject = (geometry: geometry, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  getGameObject(
    geometry,
    state
  )
  |> Js.Option.getExn
};