open MainStateDataType;

open GeometryType;

open CustomGeometryType;

open DisposeCustomGeometryMainService;

open RenderGeometryService;

let createCustomGeometry = (state) => {
  let (customGeometryRecord, index) =
    CreateCustomGeometryService.create(state |> RecordCustomGeometryMainService.getRecord);
  ({...state, customGeometryRecord: Some(customGeometryRecord)}, index)
};

let getCustomGeometryDrawMode = (state: MainStateDataType.state) =>
  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord) |> getDrawMode;

let getCustomGeometryVertices = (geometry: int, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] VerticesCustomGeometryMainService.getVertices(geometry, state)
};

let setCustomGeometryVertices =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  VerticesCustomGeometryMainService.setVerticesWithTypeArray(geometry, data, state)
};

let getCustomGeometryNormals = (geometry: int, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] NormalsCustomGeometryMainService.getNormals(geometry, state)
};

let setCustomGeometryNormals =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  NormalsCustomGeometryMainService.setNormalsWithTypeArray(geometry, data, state)
};

let getCustomGeometryIndices = (geometry: int, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] IndicesCustomGeometryMainService.getIndices(geometry, state)
};

let setCustomGeometryIndices =
    (geometry: int, data: Js.Typed_array.Uint16Array.t, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  IndicesCustomGeometryMainService.setIndicesWithTypeArray(geometry, data, state)
};

let unsafeGetCustomGeometryGameObject = (geometry: geometry, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordCustomGeometryMainService.getRecord(state)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  GameObjectCustomGeometryService.unsafeGetGameObject(
    geometry,
    RecordCustomGeometryMainService.getRecord(state)
  )
};