open GameObjectType;

open ComponentType;

open GameObjectComponentCommon;

let _addComponent = (uid: int, component: component, componentMap: array(int)) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|this type of the component shouldn't be added before|j},
                ~actual={j|not|j}
              ),
              () => hasComponent(uid, componentMap) |> assertFalse
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  WonderCommonlib.SparseMapSystem.set(uid, component, componentMap) |> ignore
};

let _addCommonComponent = ((uid, component, componentMap), handleAddComponentFunc, state) => {
  componentMap |> _addComponent(uid, component) |> ignore;
  [@bs] handleAddComponentFunc(component, uid, state)
};

let _addSharableComponent =
    (
      (uid, component, componentMap, gameObject),
      (increaseGroupCountFunc, handleAddComponentFunc),
      state
    ) => {
  componentMap |> _addComponent(uid, component) |> ignore;
  switch gameObject {
  | Some(_) => [@bs] increaseGroupCountFunc(component, state)
  | _ => [@bs] handleAddComponentFunc(component, uid, state)
  }
};

let addSourceInstanceComponent = (uid: int, component: component, state: StateDataType.state) =>
  _addCommonComponent(
    (uid, component, GameObjectStateCommon.getGameObjectData(state).sourceInstanceMap),
    SourceInstanceAddComponentCommon.handleAddComponent,
    state
  );

let addObjectInstanceComponent = (uid: int, component: component, state: StateDataType.state) =>
  _addCommonComponent(
    (uid, component, GameObjectStateCommon.getGameObjectData(state).objectInstanceMap),
    ObjectInstanceAddComponentCommon.handleAddComponent,
    state
  );

let addCameraControllerComponent = (uid: int, component: component, state: StateDataType.state) =>
  _addCommonComponent(
    (uid, component, GameObjectStateCommon.getGameObjectData(state).cameraControllerMap),
    CameraControllerAddComponentCommon.handleAddComponent,
    state
  );

let addTransformComponent = (uid: int, component: component, state: StateDataType.state) =>
  _addCommonComponent(
    (uid, component, GameObjectStateCommon.getGameObjectData(state).transformMap),
    TransformAddComponentCommon.handleAddComponent,
    state
  );

let addMeshRendererComponent = (uid: int, component: component, state: StateDataType.state) =>
  _addCommonComponent(
    (uid, component, GameObjectStateCommon.getGameObjectData(state).meshRendererMap),
    MeshRendererAddComponentCommon.handleAddComponent,
    state
  );

let addGeometryComponent = (uid: int, component: component, state: StateDataType.state) =>
  state
  |> _addSharableComponent(
       (
         uid,
         component,
         GameObjectStateCommon.getGameObjectData(state).geometryMap,
         GeometryGameObjectCommon.getGameObject(component, state)
       ),
       (GeometryGroupCommon.increaseGroupCount, GeometryAddComponentCommon.handleAddComponent)
     );

/* TODO duplicate */
let addBasicMaterialComponent = (uid: int, component: component, state: StateDataType.state) =>
  state
  |> _addSharableComponent(
       (
         uid,
         component,
         GameObjectStateCommon.getGameObjectData(state).basicMaterialMap,
         BasicMaterialGameObjectCommon.getGameObject(component, state)
       ),
       (
         BasicMaterialGroupCommon.increaseGroupCount,
         BasicMaterialAddComponentCommon.handleAddComponent
       )
     );

let addLightMaterialComponent = (uid: int, component: component, state: StateDataType.state) =>
  state
  |> _addSharableComponent(
       (
         uid,
         component,
         GameObjectStateCommon.getGameObjectData(state).lightMaterialMap,
         LightMaterialGameObjectCommon.getGameObject(component, state)
       ),
       (
         LightMaterialGroupCommon.increaseGroupCount,
         LightMaterialAddComponentCommon.handleAddComponent
       )
     );

let addAmbientLightComponent = (uid: int, component: component, state: StateDataType.state) =>
  _addCommonComponent(
    (uid, component, GameObjectStateCommon.getGameObjectData(state).ambientLightMap),
    AmbientLightAddComponentCommon.handleAddComponent,
    state
  );

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
      state: StateDataType.state
    ) => {
  _checkBatchAdd(uidArr, componentArr);
  uidArr
  |> WonderCommonlib.ArraySystem.reduceOneParami(
       [@bs]
       (
         (state, uid, index) => {
           let component = Array.unsafe_get(componentArr, index);
           _addComponent(uid, component, componentMap);
           [@bs] handleAddComponentFunc(component, uid, state)
         }
       ),
       state
     )
};

let _batchAddSharableComponent =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      increaseGroupCountFunc,
      state: StateDataType.state
    ) => {
  _checkBatchAdd(uidArr, componentArr);
  uidArr
  |> WonderCommonlib.ArraySystem.reduceOneParami(
       [@bs]
       (
         (state, uid, index) => {
           let component = Array.unsafe_get(componentArr, index);
           _addComponent(uid, component, componentMap);
           [@bs] increaseGroupCountFunc(component, state)
         }
       ),
       state
     )
};

let batchAddTransformComponentForClone =
    (uidArr: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArr, componentArr, GameObjectStateCommon.getGameObjectData(state).transformMap),
    TransformAddComponentCommon.handleAddComponent,
    state
  );

let batchAddMeshRendererComponentForClone =
    (uidArr: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArr, componentArr, GameObjectStateCommon.getGameObjectData(state).meshRendererMap),
    MeshRendererAddComponentCommon.handleAddComponent,
    state
  );

let batchAddGeometryComponentForClone =
    (uidArr: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddSharableComponent(
    (uidArr, componentArr, GameObjectStateCommon.getGameObjectData(state).geometryMap),
    GeometryGroupCommon.increaseGroupCount,
    state
  );

/* TODO duplicate */
let batchAddBasicMaterialComponentForClone =
    (
      isShareBasicMaterial,
      uidArr: array(int),
      componentArr: array(component),
      state: StateDataType.state
    ) => {
  let componentMap = GameObjectStateCommon.getGameObjectData(state).basicMaterialMap;
  isShareBasicMaterial ?
    _batchAddSharableComponent(
      (uidArr, componentArr, componentMap),
      BasicMaterialGroupCommon.increaseGroupCount,
      state
    ) :
    _batchAddComponent(
      (uidArr, componentArr, componentMap),
      BasicMaterialAddComponentCommon.handleAddComponent,
      state
    )
};

let batchAddLightMaterialComponentForClone =
    (
      isShareLightMaterial,
      uidArr: array(int),
      componentArr: array(component),
      state: StateDataType.state
    ) => {
  let componentMap = GameObjectStateCommon.getGameObjectData(state).lightMaterialMap;
  isShareLightMaterial ?
    _batchAddSharableComponent(
      (uidArr, componentArr, componentMap),
      LightMaterialGroupCommon.increaseGroupCount,
      state
    ) :
    _batchAddComponent(
      (uidArr, componentArr, componentMap),
      LightMaterialAddComponentCommon.handleAddComponent,
      state
    )
};

let batchAddCameraControllerComponentForClone =
    (uidArr: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArr, componentArr, GameObjectStateCommon.getGameObjectData(state).cameraControllerMap),
    CameraControllerAddComponentCommon.handleAddComponent,
    state
  );

let batchAddAmbientLightComponentForClone =
    (uidArr: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArr, componentArr, GameObjectStateCommon.getGameObjectData(state).ambientLightMap),
    AmbientLightAddComponentCommon.handleAddComponent,
    state
  );