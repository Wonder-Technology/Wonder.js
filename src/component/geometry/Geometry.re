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
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(geometry),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    state
  )
};

let setGeometryVertices = (geometry: int, data: Js.Typed_array.Float32Array.t, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  setVertices(
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(geometry),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
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
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(geometry),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    state
  )
};

let setGeometryIndices = (geometry: int, data: Js.Typed_array.Uint16Array.t, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  setIndices(
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(geometry),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    data,
    state
  )
};

let getGeometryConfigData = (geometry: geometry, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  getConfigData(
    
  
  
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(geometry),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
  state) |> Js.Option.getExn
};

let getGeometryGameObject = (geometry: geometry, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(geometry, isAlive, state))
  );
  getGameObject(geometry, state) |> Js.Option.getExn
};