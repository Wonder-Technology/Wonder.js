open StateDataMainType;

open GameObjectType;

open VboBufferType;

open ComponentType;

let _addComponent =
    ((uid, component, componentMap), handleAddComponentFunc, componentRecord) => {
  componentMap |> ComponentMapService.addComponent(uid, component) |> ignore;
  handleAddComponentFunc(. component, uid, componentRecord);
};

let _addComponentWithState =
    ((uid, component, componentMap), handleAddComponentFunc, state) => {
  componentMap |> ComponentMapService.addComponent(uid, component) |> ignore;

  handleAddComponentFunc(. component, uid, state);
};

let addBasicCameraViewComponent =
    (
      uid: int,
      component: component,
      {basicCameraViewRecord, gameObjectRecord} as state,
    ) => {
  state.basicCameraViewRecord =
    _addComponent(
      (uid, component, gameObjectRecord.basicCameraViewMap),
      AddBasicCameraViewService.handleAddComponent,
      basicCameraViewRecord,
    );

  gameObjectRecord.isBasicCameraViewMapDirtyForDeepCopy = true;

  state;
};

let addPerspectiveCameraProjectionComponent =
    (
      uid: int,
      component: component,
      {perspectiveCameraProjectionRecord, gameObjectRecord} as state,
    ) => {
  state.perspectiveCameraProjectionRecord =
    _addComponent(
      (uid, component, gameObjectRecord.perspectiveCameraProjectionMap),
      AddPerspectiveCameraProjectionService.handleAddComponent,
      perspectiveCameraProjectionRecord,
    );
  gameObjectRecord.isPerspectiveCameraProjectionMapDirtyForDeepCopy = true;
  state;
};

let addArcballCameraControllerComponent =
    (
      uid: int,
      component: component,
      {arcballCameraControllerRecord, gameObjectRecord} as state,
    ) => {
  ...state,
  gameObjectRecord: {
    ...gameObjectRecord,
    isArcballCameraControllerMapDirtyForDeepCopy: true,
  },
  arcballCameraControllerRecord:
    _addComponent(
      (uid, component, gameObjectRecord.arcballCameraControllerMap),
      AddArcballCameraControllerService.handleAddComponent,
      arcballCameraControllerRecord,
    ),
};

let addTransformComponent =
    (
      uid: int,
      component: component,
      {transformRecord, gameObjectRecord} as state,
    ) => {
  state.transformRecord =
    Some(
      _addComponent(
        (uid, component, gameObjectRecord.transformMap),
        AddTransformService.handleAddComponent,
        state |> RecordTransformMainService.getRecord,
      ),
    );
  gameObjectRecord.isTransformMapDirtyForDeepCopy = true;

  state;
};

let _addSharableComponent =
    ((uid, component, componentMap), handleAddComponentFunc, componentRecord) => {
  componentMap |> ComponentMapService.addComponent(uid, component) |> ignore;
  handleAddComponentFunc(. component, uid, componentRecord);
};

let addGeometryComponent =
    (uid: int, component: component, {gameObjectRecord} as state) => {
  let geometryRecord = RecordGeometryMainService.getRecord(state);
  state.geometryRecord =
    Some(
      geometryRecord
      |> _addSharableComponent(
           (uid, component, gameObjectRecord.geometryMap),
           AddGeometryService.handleAddComponent,
         ),
    );
  gameObjectRecord.isGeometryMapDirtyForDeepCopy = true;

  state;
};

let addBasicMaterialComponent =
    (uid: int, component: component, {gameObjectRecord} as state) => {
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  state.basicMaterialRecord =
    Some(
      basicMaterialRecord
      |> _addSharableComponent(
           (uid, component, gameObjectRecord.basicMaterialMap),
           AddBasicMaterialService.handleAddComponent,
         ),
    );

  gameObjectRecord.isBasicMaterialMapDirtyForDeepCopy = true;

  state;
};

let addLightMaterialComponent =
    (uid: int, component: component, {gameObjectRecord} as state) => {
  let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  state.lightMaterialRecord =
    Some(
      lightMaterialRecord
      |> _addSharableComponent(
           (uid, component, gameObjectRecord.lightMaterialMap),
           AddLightMaterialService.handleAddComponent,
         ),
    );
  gameObjectRecord.isLightMaterialMapDirtyForDeepCopy = true;

  state;
};

let addMeshRendererComponent =
    (uid: int, component: component, {gameObjectRecord} as state) => {
  gameObjectRecord.isMeshRendererMapDirtyForDeepCopy = true;

  _addComponentWithState(
    (uid, component, gameObjectRecord.meshRendererMap),
    AddMeshRendererMainService.handleAddComponent,
    state,
  );
};

let addDirectionLightComponent =
    (uid: int, component: component, {gameObjectRecord} as state) => {
  state.directionLightRecord =
    Some(
      _addComponent(
        (uid, component, gameObjectRecord.directionLightMap),
        AddDirectionLightService.handleAddComponent,
        RecordDirectionLightMainService.getRecord(state),
      ),
    );
  gameObjectRecord.isDirectionLightMapDirtyForDeepCopy = true;

  state;
};

let addPointLightComponent =
    (uid: int, component: component, {gameObjectRecord} as state) => {
  state.pointLightRecord =
    Some(
      _addComponent(
        (uid, component, gameObjectRecord.pointLightMap),
        AddPointLightService.handleAddComponent,
        RecordPointLightMainService.getRecord(state),
      ),
    );
  gameObjectRecord.isPointLightMapDirtyForDeepCopy = true;

  state;
};

let addSourceInstanceComponent =
    (uid: int, component: component, {gameObjectRecord} as state) => {
  state.sourceInstanceRecord =
    Some(
      _addComponent(
        (uid, component, gameObjectRecord.sourceInstanceMap),
        AddSourceInstanceService.handleAddComponent,
        RecordSourceInstanceMainService.getRecord(state),
      ),
    );
  gameObjectRecord.isSourceInstanceMapDirtyForDeepCopy = true;

  state;
};

let addObjectInstanceComponent =
    (
      uid: int,
      component: component,
      {objectInstanceRecord, gameObjectRecord} as state,
    ) => {
  state.objectInstanceRecord =
    _addComponent(
      (uid, component, gameObjectRecord.objectInstanceMap),
      AddObjectInstanceService.handleAddComponent,
      objectInstanceRecord,
    );
  gameObjectRecord.isObjectInstanceMapDirtyForDeepCopy = true;

  state;
};