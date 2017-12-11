open BoxGeometrySystem;

open GeometryType;

open BoxGeometryType;

open Contract;

let createBoxGeometry = (state: StateDataType.state) => create(state);

let setBoxGeometryConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentSystem.checkComponentShouldAlive(geometry, GeometrySystem.isAlive, state)
      )
  );
  setConfigData(geometry, configData, state)
};