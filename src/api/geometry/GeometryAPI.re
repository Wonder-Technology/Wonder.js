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
              isAliveWithRecord,
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
              isAliveWithRecord,
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
              isAliveWithRecord,
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
              isAliveWithRecord,
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
              isAliveWithRecord,
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
              isAliveWithRecord,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NormalsGeometryMainService.setNormalsByTypeArray(geometry, data, state);
};

let getGeometryIndices16 = (geometry: int, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAliveWithRecord,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  IndicesGeometryMainService.getIndices16(. geometry, state);
};

let setGeometryIndices16 =
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
              isAliveWithRecord,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  IndicesGeometryMainService.setIndicesByUint16Array(geometry, data, state);
};

let getGeometryIndices32 = (geometry: int, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAliveWithRecord,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  IndicesGeometryMainService.getIndices32(. geometry, state);
};

let setGeometryIndices32 =
    (
      geometry: int,
      data: Js.Typed_array.Uint32Array.t,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              geometry,
              isAliveWithRecord,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  IndicesGeometryMainService.setIndicesByUint32Array(geometry, data, state);
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
              isAliveWithRecord,
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
              isAliveWithRecord,
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
              isAliveWithRecord,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameGeometryMainService.setName(geometry, name, state);
};

let getAllGeometrys = state => {
  let {index, disposedIndexArray} =
    RecordGeometryMainService.getRecord(state);

  GetAllComponentService.getAllComponents(index, disposedIndexArray);
};

let batchDisposeGeometry = (geometryArr, state) =>
  DisposeComponentGameObjectMainService.batchDisposeGeometryComponent(
    geometryArr,
    state,
  );

let hasGeometryVertices = (geometry, state) =>
  VerticesGeometryMainService.hasVertices(geometry, state);

let hasGeometryNormals = (geometry, state) =>
  NormalsGeometryMainService.hasNormals(geometry, state);

let hasGeometryTexCoords = (geometry, state) =>
  TexCoordsGeometryMainService.hasTexCoords(geometry, state);

let hasGeometryIndices = (geometry, state) =>
  IndicesGeometryMainService.hasIndices(geometry, state);