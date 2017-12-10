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
  getVertices(
    GeometrySystem.getMappedIndex(geometry, GeometrySystem.getMappedIndexMap(state)),
    state
  )
};

let setGeometryVertices =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  setVertices(
    GeometrySystem.getMappedIndex(geometry, GeometrySystem.getMappedIndexMap(state)),
    data,
    state
  )
};

let getGeometryIndices = (geometry: int, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  [@bs]
  getIndices(
    GeometrySystem.getMappedIndex(geometry, GeometrySystem.getMappedIndexMap(state)),
    state
  )
};

let setGeometryIndices =
    (geometry: int, data: Js.Typed_array.Uint16Array.t, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  setIndices(
    GeometrySystem.getMappedIndex(geometry, GeometrySystem.getMappedIndexMap(state)),
    data,
    state
  )
};

let getGeometryConfigData = (geometry: geometry, state: StateDataType.state) => {
  /* requireCheck(
       () => {
         open Contract.Operators;
         ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state);
         test(
           "cloned geometry have no config data, shouldn't get it",
           () => {
             open StateDataType;
             let {isClonedMap} = GeometryStateSystem.getGeometryData(state);
             GeometryCloneComponentSystem.isCloned(
               GeometryIndexSystem.getMappedIndex(
                 geometry,
                 GeometryIndexSystem.getMappedIndexMap(state)
               ),
               isClonedMap
             )
             |> assertFalse
           }
         )
       }
     ); */
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  getConfigData(
    GeometrySystem.getMappedIndex(geometry, GeometrySystem.getMappedIndexMap(state)),
    state
  )
  |> Js.Option.getExn
};

let getGeometryGameObject = (geometry: geometry, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  getGameObject(
    GeometrySystem.getMappedIndex(geometry, GeometrySystem.getMappedIndexMap(state)),
    state
  )
  |> Js.Option.getExn
};