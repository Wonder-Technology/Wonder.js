open MainStateDataType;

open GeometryType;

open BoxGeometryType;

open DisposeGeometryMainService;

open RenderGeometryService;

let createBoxGeometry = (state) => {
  let (boxGeometryRecord, index) =
    CreateBoxGeometryService.create(state |> RecordBoxGeometryMainService.getRecord);
  ({...state, boxGeometryRecord: Some(boxGeometryRecord)}, index)
};

let setBoxGeometryConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              state |> RecordBoxGeometryMainService.getRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  {
    ...state,
    boxGeometryRecord:
      Some(
        ConfigDataBoxGeometryService.setConfigData(
          geometry,
          configData,
          RecordBoxGeometryMainService.getRecord(state)
        )
      )
  }
};

let getBoxGeometryDrawMode = (state: MainStateDataType.state) =>
  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord) |> getDrawMode;

let getBoxGeometryVertices = (geometry: int, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordBoxGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] VerticesGeometryMainService.getVertices(geometry, state)
};

let setBoxGeometryVertices =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordBoxGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  VerticesGeometryMainService.setVerticesWithTypeArray(geometry, data, state)
};

let getBoxGeometryNormals = (geometry: int, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordBoxGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] NormalsGeometryMainService.getNormals(geometry, state)
};

let setBoxGeometryNormals =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordBoxGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  NormalsGeometryMainService.setNormalsWithTypeArray(geometry, data, state)
};

let getBoxGeometryIndices = (geometry: int, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordBoxGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] IndicesGeometryMainService.getIndices(geometry, state)
};

let setBoxGeometryIndices =
    (geometry: int, data: Js.Typed_array.Uint16Array.t, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordBoxGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  IndicesGeometryMainService.setIndicesWithTypeArray(geometry, data, state)
};

let unsafeGetBoxGeometryConfigData = (geometry: geometry, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordBoxGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  ConfigDataGeometryService.unsafeGetConfigData(
    geometry,
    RecordBoxGeometryMainService.getRecord(state)
  )
};

let unsafeGetBoxGeometryGameObject = (geometry: geometry, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordBoxGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  GameObjectGeometryService.unsafeGetGameObject(
    geometry,
    RecordBoxGeometryMainService.getRecord(state)
  )
};