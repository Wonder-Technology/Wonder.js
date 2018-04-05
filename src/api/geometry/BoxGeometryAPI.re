open StateDataMainType;

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
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataMainType.state) => {
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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
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

let getBoxGeometryDrawMode = (state: StateDataMainType.state) =>
  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord) |> getDrawMode;

let getBoxGeometryVertices = (geometry: int, state: StateDataMainType.state) => {
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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] VerticesBoxGeometryMainService.getVertices(geometry, state)
};

let getBoxGeometryNormals = (geometry: int, state: StateDataMainType.state) => {
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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] NormalsBoxGeometryMainService.getNormals(geometry, state)
};

let getBoxGeometryIndices = (geometry: int, state: StateDataMainType.state) => {
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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] IndicesBoxGeometryMainService.getIndices(geometry, state)
};

let unsafeGetBoxGeometryConfigData = (geometry: geometry, state: StateDataMainType.state) => {
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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  ConfigDataBoxGeometryService.unsafeGetConfigData(
    geometry,
    RecordBoxGeometryMainService.getRecord(state)
  )
};

let unsafeGetBoxGeometryGameObject = (geometry: geometry, state: StateDataMainType.state) => {
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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  GameObjectBoxGeometryService.unsafeGetGameObject(
    geometry,
    RecordBoxGeometryMainService.getRecord(state)
  )
};