open GeometrySystem;

open GeometryType;

let getGeometryDrawMode = (state: StateDataType.state) =>
  [@bs] DeviceManagerSystem.unsafeGetGl(state) |> getDrawMode;

let getGeometryVertices = (geometry: int, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  [@bs] unsafeGetVertices(geometry, state)
};

let setGeometryVertices =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setVertices(geometry, data, state)
};

let getGeometryIndices = (geometry: int, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  [@bs] unsafeGetIndices(geometry, state)
};

let setGeometryIndices =
    (geometry: int, data: Js.Typed_array.Uint16Array.t, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setIndices(geometry, data, state)
};

let getGeometryConfigData = (geometry: geometry, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getConfigData(geometry, state) |> Js.Option.getExn
};

let getGeometryGameObject = (geometry: geometry, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getGameObject(geometry, state) |> Js.Option.getExn
};