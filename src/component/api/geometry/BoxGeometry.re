open BoxGeometrySystem;

open GeometryType;

open BoxGeometryType;

open Contract;

let createBoxGeometry = (state: StateDataType.state) => {
  let (state, index, _) = create(state);
  (state, index)
};

let setBoxGeometryConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentSystem.checkComponentShouldAlive(geometry, GeometrySystem.isAlive, state)
      )
  );
  setConfigData(
    GeometrySystem.getMappedIndex(
      (geometry),
      GeometrySystem.getMappedIndexMap(state)
    ),
    configData,
    state
  )
};