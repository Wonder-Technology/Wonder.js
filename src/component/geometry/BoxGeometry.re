open BoxGeometrySystem;

open GeometryType;

open BoxGeometryType;

open Contract;

let createBoxGeometry = create;

let setBoxGeometryConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, GeometrySystem.isAlive, state))
  );
  setConfigData(
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(geometry),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    configData,
    state
  )
};