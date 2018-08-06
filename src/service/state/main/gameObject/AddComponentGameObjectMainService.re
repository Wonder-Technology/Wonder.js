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

let _addSharableComponent =
    (
      (uid, component, componentMap, gameObject),
      (increaseGroupCountFunc, handleAddComponentFunc),
      componentRecord,
    ) => {
  componentMap |> ComponentMapService.addComponent(uid, component) |> ignore;
  switch (gameObject) {
  | Some(_) => increaseGroupCountFunc(. component, componentRecord)
  | _ => handleAddComponentFunc(. component, uid, componentRecord)
  };
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
  state;
};

let addArcballCameraControllerComponent =
    (
      uid: int,
      component: component,
      {arcballCameraControllerRecord, gameObjectRecord} as state,
    ) => {
  ...state,
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
  state;
};

let addCustomGeometryComponent =
    (uid: int, component: component, {gameObjectRecord} as state) => {
  let customGeometryRecord = RecordCustomGeometryMainService.getRecord(state);
  state.customGeometryRecord =
    Some(
      customGeometryRecord
      |> _addSharableComponent(
           (
             uid,
             component,
             gameObjectRecord.geometryMap,
             GameObjectCustomGeometryService.getGameObject(
               component,
               customGeometryRecord,
             ),
           ),
           (
             GroupCustomGeometryService.increaseGroupCount,
             AddCustomGeometryService.handleAddComponent,
           ),
         ),
    );
  state;
};

let addBasicMaterialComponent =
    (uid: int, component: component, {gameObjectRecord} as state) => {
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  state.basicMaterialRecord =
    Some(
      basicMaterialRecord
      |> _addSharableComponent(
           (
             uid,
             component,
             gameObjectRecord.basicMaterialMap,
             GameObjectBasicMaterialService.getGameObject(
               component,
               basicMaterialRecord,
             ),
           ),
           (
             GroupBasicMaterialService.increaseGroupCount,
             AddBasicMaterialService.handleAddComponent,
           ),
         ),
    );
  state;
};

let addLightMaterialComponent =
    (uid: int, component: component, {gameObjectRecord} as state) => {
  let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  state.lightMaterialRecord =
    Some(
      lightMaterialRecord
      |> _addSharableComponent(
           (
             uid,
             component,
             gameObjectRecord.lightMaterialMap,
             GameObjectLightMaterialService.getGameObject(
               component,
               lightMaterialRecord,
             ),
           ),
           (
             GroupLightMaterialService.increaseGroupCount,
             AddLightMaterialService.handleAddComponent,
           ),
         ),
    );
  state;
};

let addMeshRendererComponent =
    (uid: int, component: component, {gameObjectRecord} as state) =>
  _addComponentWithState(
    (uid, component, gameObjectRecord.meshRendererMap),
    AddMeshRendererMainService.handleAddComponent,
    state,
  );

let addDirectionLightComponent =
    (
      uid: int,
      component: component,
      {directionLightRecord, gameObjectRecord} as state,
    ) => {
  state.directionLightRecord =
    _addComponent(
      (uid, component, gameObjectRecord.directionLightMap),
      AddDirectionLightService.handleAddComponent,
      directionLightRecord,
    );
  state;
};

let addPointLightComponent =
    (
      uid: int,
      component: component,
      {pointLightRecord, gameObjectRecord} as state,
    ) => {
  state.pointLightRecord =
    _addComponent(
      (uid, component, gameObjectRecord.pointLightMap),
      AddPointLightService.handleAddComponent,
      pointLightRecord,
    );
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
  state;
};