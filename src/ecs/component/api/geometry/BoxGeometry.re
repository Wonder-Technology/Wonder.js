open BoxGeometrySystem;

open GeometryType;

open BoxGeometryType;

let createBoxGeometry = (state: StateDataType.state) => create(state);

let setBoxGeometryConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentSystem.checkComponentShouldAlive(geometry, GeometrySystem.isAlive, state)
          )
        )
      ),
    StateData.stateData.isTest
  );
  setConfigData(geometry, configData, state)
};