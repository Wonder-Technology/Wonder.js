open StateDataType;

open GeometryType;

open BoxGeometryType;

open DisposeGeometryService;

open RenderGeometryService;

let createBoxGeometry = (state) => {
  let (boxGeometryRecord, index) = CreateBoxGeometryService.create(state.boxGeometryRecord);
  ({...state, boxGeometryRecord}, index)
};

let setBoxGeometryConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  {
    ...state,
    boxGeometryRecord:
      ConfigDataBoxGeometryService.setConfigData(geometry, configData, state.boxGeometryRecord)
  }
};

let getBoxGeometryDrawMode = (state: StateDataType.state) =>
  [@bs] DeviceManagerSystem.unsafeGetGl(state) |> getDrawMode;

let unsafeGetBoxGeometryVertices = (geometry: int, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  [@bs] VerticesGeometryService.unsafeGetVertices(geometry, state)
};

let setBoxGeometryVertices =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  {
    ...state,
    boxGeometryRecord: {
      ...state.boxGeometryRecord,
      verticesMap: VerticesService.setVertices(geometry, data, state.boxGeometryRecord.verticesMap)
    }
  }
};

let unsafeGetBoxGeometryNormals = (geometry: int, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  [@bs] NormalsGeometryService.unsafeGetNormals(geometry, state)
};

let setBoxGeometryNormals =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  {
    ...state,
    boxGeometryRecord: {
      ...state.boxGeometryRecord,
      normalsMap: NormalsService.setNormals(geometry, data, state.boxGeometryRecord)
    }
  }
};

let unsafeGetBoxGeometryIndices = (geometry: int, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  [@bs] IndicesGeometryService.unsafeGetIndices(geometry, state)
};

let setBoxGeometryIndices =
    (geometry: int, data: Js.Typed_array.Uint16Array.t, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  {
    ...state,
    boxGeometryRecord: {
      ...state.boxGeometryRecord,
      indicesMap: IndicesService.setIndices(geometry, data, state.boxGeometryRecord)
    }
  }
};

let unsafeGetBoxGeometryConfigData = (geometry: geometry, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  ConfigDataGeometryService.unsafeGetConfigData(geometry, state.boxGeometryRecord)
};

let unsafeGetBoxGeometryGameObject = (geometry: geometry, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state.boxGeometryRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  GameObjectGeometryService.unsafeGetGameObject(geometry, state.boxGeometryRecord)
};