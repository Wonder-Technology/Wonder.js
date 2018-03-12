open StateDataType;

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
    _addComponent(
      (uid, component, gameObjectRecord.transformMap),
      AddTransformService.handleAddComponent,
      transformRecord
    )
};

let addBoxGeometryComponent =
    (uid: int, component: component, {boxGeometryRecord, gameObjectRecord} as state) => {
  ...state,
  boxGeometryRecord:
    boxGeometryRecord
    |> _addSharableComponent(
         (
           uid,
           component,
           gameObjectRecord.boxGeometryMap,
           GameObjectGeometryService.getGameObject(component, boxGeometryRecord)
         ),
         (GroupGeometryService.increaseGroupCount, AddGeometryService.handleAddComponent)
       )
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

let _checkBatchAdd = (uidArr, componentArr) =>
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let gameObjectCount = uidArr |> Js.Array.length;
      let componentCount = componentArr |> Js.Array.length;
      test(
        Log.buildAssertMessage(
          ~expect={j|one gameObject should add one component|j},
          ~actual={j|$gameObjectCount gameObject add $componentCount components|j}
        ),
        () => gameObjectCount == componentCount
      )
    },
    StateData.stateData.isDebug
  );

let _batchAddComponent =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      handleAddComponentFunc,
      componentRecord
    ) => {
  _checkBatchAdd(uidArr, componentArr);
  uidArr
  |> WonderCommonlib.ArraySystem.reduceOneParami(
       [@bs]
       (
         (componentRecord, uid, index) => {
           let component = Array.unsafe_get(componentArr, index);
           ComponentMapService.addComponent(uid, component, componentMap);
           [@bs] handleAddComponentFunc(component, uid, componentRecord)
         }
       ),
       componentRecord
     )
};

let batchAddBasicCameraViewComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {basicCameraViewRecord, gameObjectRecord} as state
    ) => {
  ...state,
  basicCameraViewRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.basicCameraViewMap),
      AddBasicCameraViewService.handleAddComponent,
      basicCameraViewRecord
    )
};

let batchAddPerspectiveCameraProjectionComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {perspectiveCameraProjectionRecord, gameObjectRecord} as state
    ) => {
  ...state,
  perspectiveCameraProjectionRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.perspectiveCameraProjectionMap),
      AddPerspectiveCameraProjectionService.handleAddComponent,
      perspectiveCameraProjectionRecord
    )
};

let batchAddTransformComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {transformRecord, gameObjectRecord} as state
    ) => {
  ...state,
  transformRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.transformMap),
      AddTransformService.handleAddComponent,
      transformRecord
    )
};

let batchAddMeshRendererComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {meshRendererRecord, gameObjectRecord} as state
    ) => {
  ...state,
  meshRendererRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.meshRendererMap),
      AddMeshRendererService.handleAddComponent,
      meshRendererRecord
    )
};

let _batchAddSharableComponent =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      increaseGroupCountFunc,
      record
    ) => {
  _checkBatchAdd(uidArr, componentArr);
  uidArr
  |> WonderCommonlib.ArraySystem.reduceOneParami(
       [@bs]
       (
         (record, uid, index) => {
           let component = Array.unsafe_get(componentArr, index);
           componentMap |> ComponentMapService.addComponent(uid, component) |> ignore;
           [@bs] increaseGroupCountFunc(component, record)
         }
       ),
       record
     )
};

let batchAddBoxGeometryComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {boxGeometryRecord, gameObjectRecord} as state
    ) => {
  ...state,
  boxGeometryRecord:
    _batchAddSharableComponent(
      (uidArr, componentArr, gameObjectRecord.boxGeometryMap),
      GroupGeometryService.increaseGroupCount,
      boxGeometryRecord
    )
};

let _batchAddMaterialComponentForClone =
    (
      isShareBasicMaterial,
      (uidArr: array(int), componentArr: array(component), componentMap),
      (increaseGroupCountFunc, handleAddComponentFunc),
      record
    ) =>
  isShareBasicMaterial ?
    _batchAddSharableComponent(
      (uidArr, componentArr, componentMap),
      increaseGroupCountFunc,
      record
    ) :
    _batchAddComponent((uidArr, componentArr, componentMap), handleAddComponentFunc, record);

let batchAddBasicMaterialComponentForClone =
    (
      isShareMaterial,
      uidArr: array(int),
      componentArr: array(component),
      {basicMaterialRecord, gameObjectRecord} as state
    ) => {
  ...state,
  basicMaterialRecord:
    _batchAddMaterialComponentForClone(
      isShareMaterial,
      (uidArr, componentArr, gameObjectRecord.basicMaterialMap),
      (GroupBasicMaterialService.increaseGroupCount, AddBasicMaterialService.handleAddComponent),
      basicMaterialRecord
    )
};

let batchAddLightMaterialComponentForClone =
    (
      isShareMaterial,
      uidArr: array(int),
      componentArr: array(component),
      {lightMaterialRecord, gameObjectRecord} as state
    ) => {
  ...state,
  lightMaterialRecord:
    _batchAddMaterialComponentForClone(
      isShareMaterial,
      (uidArr, componentArr, gameObjectRecord.lightMaterialMap),
      (GroupLightMaterialService.increaseGroupCount, AddLightMaterialService.handleAddComponent),
      lightMaterialRecord
    )
};

let batchAddAmbientLightComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {ambientLightRecord, gameObjectRecord} as state
    ) => {
  ...state,
  ambientLightRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.ambientLightMap),
      AddAmbientLightService.handleAddComponent,
      ambientLightRecord
    )
};

let batchAddDirectionLightComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {directionLightRecord, gameObjectRecord} as state
    ) => {
  ...state,
  directionLightRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.directionLightMap),
      AddDirectionLightService.handleAddComponent,
      directionLightRecord
    )
};

let batchAddPointLightComponentForClone =
    (
      uidArr: array(int),
      componentArr: array(component),
      {pointLightRecord, gameObjectRecord} as state
    ) => {
  ...state,
  pointLightRecord:
    _batchAddComponent(
      (uidArr, componentArr, gameObjectRecord.pointLightMap),
      AddPointLightService.handleAddComponent,
      pointLightRecord
    )
};