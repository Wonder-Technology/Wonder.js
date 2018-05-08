open StateDataMainType;

open GeometryType;

open BoxGeometryType;

open DisposeBoxGeometryMainService;

open RenderGeometryService;

let createBoxGeometry = (state) => {
  let (boxGeometryRecord, index) =
    CreateBoxGeometryService.create(state |> RecordBoxGeometryMainService.getRecord);
  state.boxGeometryRecord = boxGeometryRecord;
  (state, index)
};

let getBoxGeometryDrawMode = (state: StateDataMainType.state) =>
  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord) |> getDrawMode;

let getBoxGeometryVertices = (state: StateDataMainType.state) =>
  [@bs] GetBoxGeometryVerticesMainService.getVertices(state);

let getBoxGeometryTexCoords = (state: StateDataMainType.state) =>
  [@bs] GetBoxGeometryTexCoordsMainService.getTexCoords(state);

let getBoxGeometryNormals = (state: StateDataMainType.state) =>
  [@bs] GetBoxGeometryNormalsMainService.getNormals(state);

let getBoxGeometryIndices = (state: StateDataMainType.state) =>
  [@bs] GetBoxGeometryIndicesMainService.getIndices(state);

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