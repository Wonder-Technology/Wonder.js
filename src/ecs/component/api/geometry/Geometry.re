open GeometrySystem;

open GeometryType;

let getGeometryDrawMode = (state: StateDataType.state) =>
  [@bs] DeviceManagerSystem.getGl(state) |> getDrawMode;

let getGeometryVertices = (geometry: int, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state)))
      ),
    StateData.stateData.isTest
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
    StateData.stateData.isTest
  );
  setVertices(geometry, data, state)
};

let getGeometryIndices = (geometry: int, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state)))
      ),
    StateData.stateData.isTest
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
    StateData.stateData.isTest
  );
  setIndices(geometry, data, state)
};

let getGeometryConfigData = (geometry: geometry, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state)))
      ),
    StateData.stateData.isTest
  );
  getConfigData(geometry, state) |> Js.Option.getExn
};

let getGeometryGameObject = (geometry: geometry, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state)))
      ),
    StateData.stateData.isTest
  );
  getGameObject(geometry, state) |> Js.Option.getExn
};