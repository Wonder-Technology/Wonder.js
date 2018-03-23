open MainStateDataType;

open GameObjectType;

open ComponentType;

let _addComponent = ((uid, component, componentMap), handleAddComponentFunc, componentRecord) => {
  componentMap |> ComponentMapService.addComponent(uid, component) |> ignore;
  [@bs] handleAddComponentFunc(component, uid, componentRecord)
};

let _addSharableComponent =
    (
      (uid, component, componentMap, gameObject),
      (increaseGroupCountFunc, handleAddComponentFunc),
      componentRecord
    ) => {
  componentMap |> ComponentMapService.addComponent(uid, component) |> ignore;
  switch gameObject {
  | Some(_) => [@bs] increaseGroupCountFunc(component, componentRecord)
  | _ => [@bs] handleAddComponentFunc(component, uid, componentRecord)
  }
};

let addBasicCameraViewComponent =
    (uid: int, component: component, {basicCameraViewRecord, gameObjectRecord} as state) => {
  ...state,
  basicCameraViewRecord:
    _addComponent(
      (uid, component, gameObjectRecord.basicCameraViewMap),
      AddBasicCameraViewService.handleAddComponent,
      basicCameraViewRecord
    )
};

let addPerspectiveCameraProjectionComponent =
    (
      uid: int,
      component: component,
      {perspectiveCameraProjectionRecord, gameObjectRecord} as state
    ) => {
  ...state,
  perspectiveCameraProjectionRecord:
    _addComponent(
      (uid, component, gameObjectRecord.perspectiveCameraProjectionMap),
      AddPerspectiveCameraProjectionService.handleAddComponent,
      perspectiveCameraProjectionRecord
    )
};

let addTransformComponent =
    (uid: int, component: component, {transformRecord, gameObjectRecord} as state) => {
  ...state,
  transformRecord:
    Some(
      _addComponent(
        (uid, component, gameObjectRecord.transformMap),
        AddTransformService.handleAddComponent,
        state |> RecordTransformMainService.getRecord
      )
    )
};

let addBoxGeometryComponent = (uid: int, component: component, {gameObjectRecord} as state) => {
  let boxGeometryRecord = state |> RecordBoxGeometryMainService.getRecord;
  {
    ...state,
    boxGeometryRecord:
      Some(
        boxGeometryRecord
        |> _addSharableComponent(
             (
               uid,
               component,
               gameObjectRecord.boxGeometryMap,
               GameObjectBoxGeometryService.getGameObject(component, boxGeometryRecord)
             ),
             (GroupBoxGeometryService.increaseGroupCount, AddBoxGeometryService.handleAddComponent)
           )
      )
  }
};

let addCustomGeometryComponent = (uid: int, component: component, {gameObjectRecord} as state) => {
  let customGeometryRecord = state |> RecordCustomGeometryMainService.getRecord;
  {
    ...state,
    customGeometryRecord:
      Some(
        customGeometryRecord
        |> _addSharableComponent(
             (
               uid,
               component,
               gameObjectRecord.customGeometryMap,
               GameObjectCustomGeometryService.getGameObject(component, customGeometryRecord)
             ),
             (
               GroupCustomGeometryService.increaseGroupCount,
               AddCustomGeometryService.handleAddComponent
             )
           )
      )
  }
};

let addBasicMaterialComponent =
    (uid: int, component: component, {basicMaterialRecord, gameObjectRecord} as state) => {
  ...state,
  basicMaterialRecord:
    basicMaterialRecord
    |> _addSharableComponent(
         (
           uid,
           component,
           gameObjectRecord.basicMaterialMap,
           GameObjectBasicMaterialService.getGameObject(component, basicMaterialRecord)
         ),
         (GroupBasicMaterialService.increaseGroupCount, AddBasicMaterialService.handleAddComponent)
       )
};

let addLightMaterialComponent =
    (uid: int, component: component, {lightMaterialRecord, gameObjectRecord} as state) => {
  ...state,
  lightMaterialRecord:
    lightMaterialRecord
    |> _addSharableComponent(
         (
           uid,
           component,
           gameObjectRecord.lightMaterialMap,
           GameObjectLightMaterialService.getGameObject(component, lightMaterialRecord)
         ),
         (GroupLightMaterialService.increaseGroupCount, AddLightMaterialService.handleAddComponent)
       )
};

let addMeshRendererComponent =
    (uid: int, component: component, {meshRendererRecord, gameObjectRecord} as state) => {
  ...state,
  meshRendererRecord:
    _addComponent(
      (uid, component, gameObjectRecord.meshRendererMap),
      AddMeshRendererService.handleAddComponent,
      meshRendererRecord
    )
};

let addAmbientLightComponent =
    (uid: int, component: component, {ambientLightRecord, gameObjectRecord} as state) => {
  ...state,
  ambientLightRecord:
    _addComponent(
      (uid, component, gameObjectRecord.ambientLightMap),
      AddAmbientLightService.handleAddComponent,
      ambientLightRecord
    )
};

let addDirectionLightComponent =
    (uid: int, component: component, {directionLightRecord, gameObjectRecord} as state) => {
  ...state,
  directionLightRecord:
    _addComponent(
      (uid, component, gameObjectRecord.directionLightMap),
      AddDirectionLightService.handleAddComponent,
      directionLightRecord
    )
};

let addPointLightComponent =
    (uid: int, component: component, {pointLightRecord, gameObjectRecord} as state) => {
  ...state,
  pointLightRecord:
    _addComponent(
      (uid, component, gameObjectRecord.pointLightMap),
      AddPointLightService.handleAddComponent,
      pointLightRecord
    )
};

let addSourceInstanceComponent =
    (uid: int, component: component, {sourceInstanceRecord, gameObjectRecord} as state) => {
  ...state,
  sourceInstanceRecord:
    _addComponent(
      (uid, component, gameObjectRecord.sourceInstanceMap),
      AddSourceInstanceService.handleAddComponent,
      sourceInstanceRecord
    )
};

let addObjectInstanceComponent =
    (uid: int, component: component, {objectInstanceRecord, gameObjectRecord} as state) => {
  ...state,
  objectInstanceRecord:
    _addComponent(
      (uid, component, gameObjectRecord.objectInstanceMap),
      AddObjectInstanceService.handleAddComponent,
      objectInstanceRecord
    )
};