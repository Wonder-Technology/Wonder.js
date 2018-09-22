open StateDataMainType;

open GeometryType;

open DisposeGeometryMainService;

let createGeometry = state => CreateGeometryMainService.create(. state);

let createBoxGeometry = state =>
  CreateBoxGeometryGeometryMainService.create(state);

let createSphereGeometry = (radius, bands, state) =>
  CreateSphereGeometryGeometryMainService.create(radius, bands, state);

let getGeometryVertices = (geometry: int, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  VerticesGeometryMainService.getVertices(. geometry, state);
};

let setGeometryVertices =
    (
      geometry: int,
      data: Js.Typed_array.Float32Array.t,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  VerticesGeometryMainService.setVerticesByTypeArray(geometry, data, state);
};

let getGeometryTexCoords = (geometry: int, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  TexCoordsGeometryMainService.getTexCoords(. geometry, state);
};

let setGeometryTexCoords =
    (
      geometry: int,
      data: Js.Typed_array.Float32Array.t,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  TexCoordsGeometryMainService.setTexCoordsByTypeArray(geometry, data, state);
};

let getGeometryNormals = (geometry: int, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NormalsGeometryMainService.getNormals(. geometry, state);
};

let setGeometryNormals =
    (
      geometry: int,
      data: Js.Typed_array.Float32Array.t,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NormalsGeometryMainService.setNormalsByTypeArray(geometry, data, state);
};

let getGeometryIndices = (geometry: int, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  IndicesGeometryMainService.getIndices(. geometry, state);
};

let setGeometryIndices =
    (
      geometry: int,
      data: Js.Typed_array.Uint16Array.t,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  IndicesGeometryMainService.setIndicesByTypeArray(geometry, data, state);
};

let unsafeGetGeometryGameObjects =
    (geometry: geometry, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  GameObjectGeometryService.unsafeGetGameObjects(
    geometry,
    RecordGeometryMainService.getRecord(state),
  );
};

let unsafeGetGeometryName = (geometry, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameGeometryMainService.unsafeGetName(geometry, state);
};

let setGeometryName = (geometry, name, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameGeometryMainService.setName(geometry, name, state);
};

let _getAllComponents = (disposedUidMap, componentMap) =>
  componentMap
  |> Js.Array.filteri((component, uid) =>
       ! (disposedUidMap |> WonderCommonlib.SparseMapService.has(uid))
       && Obj.magic(component) !== Js.Undefined.empty
     );

let getAllGeometrys = state => {
  let {index, disposedIndexArray} =
    RecordGeometryMainService.getRecord(state);

  GetAllComponentService.getAllComponents(index, disposedIndexArray);
};