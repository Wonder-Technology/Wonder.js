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

/* TODO remove */
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

let addDirectionLightComponent = (uid: int, component: component, state: StateDataType.state) =>
  _addCommonComponent(
    (uid, component, GameObjectStateCommon.getGameObjectData(state).directionLightMap),
    DirectionLightAddComponentCommon.handleAddComponent,
    state
  );

let addPointLightComponent = (uid: int, component: component, state: StateDataType.state) =>
  _addCommonComponent(
    (uid, component, GameObjectStateCommon.getGameObjectData(state).pointLightMap),
    PointLightAddComponentCommon.handleAddComponent,
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

  /* TODO remove */
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



/* TODO rename */
let _batchAddComponentWithData =
    (
      (uidArr: array(int), componentArr: array(component), componentMap),
      handleAddComponentFunc,
componentData) => {
  _checkBatchAdd(uidArr, componentArr);
  uidArr
  |> WonderCommonlib.ArraySystem.reduceOneParami(
       [@bs]
       (
         (componentData, uid, index) => {
           let component = Array.unsafe_get(componentArr, index);
           _addComponent(uid, component, componentMap);
           [@bs] handleAddComponentFunc(component, uid, componentData)
         }
       ),
       componentData
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

let _batchAddMaterialComponentForClone =
    (
      isShareBasicMaterial,
      (uidArr: array(int), componentArr: array(component), componentMap),
      (increaseGroupCountFunc, handleAddComponentFunc),
      state: StateDataType.state
    ) =>
  isShareBasicMaterial ?
    _batchAddSharableComponent(
      (uidArr, componentArr, componentMap),
      increaseGroupCountFunc,
      state
    ) :
    _batchAddComponent((uidArr, componentArr, componentMap), handleAddComponentFunc, state);

let batchAddBasicMaterialComponentForClone =
    (
      isShareMaterial,
      uidArr: array(int),
      componentArr: array(component),
      state: StateDataType.state
    ) => {
  let componentMap = GameObjectStateCommon.getGameObjectData(state).basicMaterialMap;
  _batchAddMaterialComponentForClone(
    isShareMaterial,
    (uidArr, componentArr, GameObjectStateCommon.getGameObjectData(state).basicMaterialMap),
    (
      BasicMaterialGroupCommon.increaseGroupCount,
      BasicMaterialAddComponentCommon.handleAddComponent
    ),
    state
  )
};

let batchAddLightMaterialComponentForClone =
    (
      isShareMaterial,
      uidArr: array(int),
      componentArr: array(component),
      state: StateDataType.state
    ) =>
  _batchAddMaterialComponentForClone(
    isShareMaterial,
    (uidArr, componentArr, GameObjectStateCommon.getGameObjectData(state).lightMaterialMap),
    (
      LightMaterialGroupCommon.increaseGroupCount,
      LightMaterialAddComponentCommon.handleAddComponent
    ),
    state
  );

let batchAddAmbientLightComponentForClone =
    (uidArr: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArr, componentArr, GameObjectStateCommon.getGameObjectData(state).ambientLightMap),
    AmbientLightAddComponentCommon.handleAddComponent,
    state
  );

let batchAddDirectionLightComponentForClone =
    (uidArr: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArr, componentArr, GameObjectStateCommon.getGameObjectData(state).directionLightMap),
    DirectionLightAddComponentCommon.handleAddComponent,
    state
  );

let batchAddPointLightComponentForClone =
    (uidArr: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArr, componentArr, GameObjectStateCommon.getGameObjectData(state).pointLightMap),
    PointLightAddComponentCommon.handleAddComponent,
    state
  );