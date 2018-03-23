open MainStateDataType;

open GeometryType;

open BoxGeometryType;

open DisposeBoxGeometryMainService;

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
  [@bs] VerticesBoxGeometryMainService.getVertices(geometry, state)
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
  [@bs] NormalsBoxGeometryMainService.getNormals(geometry, state)
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
  [@bs] IndicesBoxGeometryMainService.getIndices(geometry, state)
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
  ConfigDataBoxGeometryService.unsafeGetConfigData(
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
  GameObjectBoxGeometryService.unsafeGetGameObject(
    geometry,
    RecordBoxGeometryMainService.getRecord(state)
  )
};