open StateDataMainType;

open GeometryType;

open GeometryType;

open DisposeGeometryMainService;

let createGeometry = state => CreateGeometryMainService.create(state);

let createBoxGeometry = state =>
  CreateBoxGeometryGeometryMainService.create(state);

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

let unsafeGetGeometryGameObject =
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
  GameObjectGeometryService.unsafeGetGameObject(
    geometry,
    RecordGeometryMainService.getRecord(state),
  );
};

let unsafeGetGeometryName = (material, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameGeometryMainService.unsafeGetName(material, state);
};

let setGeometryName = (material, name, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              material,
              isAlive,
              RecordGeometryMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameGeometryMainService.setName(material, name, state);
};