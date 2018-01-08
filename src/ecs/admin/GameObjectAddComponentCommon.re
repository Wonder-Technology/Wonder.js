open GameObjectType;

open ComponentType;

open GameObjectComponentCommon;

open Contract;

let _addComponent = (uid: int, component: component, componentMap: array(int)) => {
  requireCheck(
    () =>
      test(
        "this type of component is already exist, shouldn't add again",
        () => hasComponent(uid, componentMap) |> assertFalse
      )
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

let addMaterialComponent = (uid: int, component: component, state: StateDataType.state) =>
  state
  |> _addSharableComponent(
       (
         uid,
         component,
         GameObjectStateCommon.getGameObjectData(state).materialMap,
         MaterialGameObjectCommon.getGameObject(component, state)
       ),
       (MaterialGroupCommon.increaseGroupCount, MaterialAddComponentCommon.handleAddComponent)
     );

let _batchAddComponent =
    (
      (uidArray: array(int), componentArr: array(component), componentMap),
      handleAddComponentFunc,
      state: StateDataType.state
    ) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "one gameObject should add one component",
          () => uidArray |> Js.Array.length == (componentArr |> Js.Array.length)
        )
      )
  );
  uidArray
  |> ArraySystem.reduceOneParami(
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
      (uidArray: array(int), componentArr: array(component), componentMap),
      increaseGroupCountFunc,
      state: StateDataType.state
    ) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "one gameObject should add one component",
          () => uidArray |> Js.Array.length == (componentArr |> Js.Array.length)
        )
      )
  );
  uidArray
  |> ArraySystem.reduceOneParami(
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
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArray, componentArr, GameObjectStateCommon.getGameObjectData(state).transformMap),
    TransformAddComponentCommon.handleAddComponent,
    state
  );

let batchAddMeshRendererComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArray, componentArr, GameObjectStateCommon.getGameObjectData(state).meshRendererMap),
    MeshRendererAddComponentCommon.handleAddComponent,
    state
  );

let batchAddGeometryComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddSharableComponent(
    (uidArray, componentArr, GameObjectStateCommon.getGameObjectData(state).geometryMap),
    GeometryGroupCommon.increaseGroupCount,
    state
  );

let batchAddMaterialComponentForClone =
    (
      isShareMaterial,
      uidArray: array(int),
      componentArr: array(component),
      state: StateDataType.state
    ) => {
  let componentMap = GameObjectStateCommon.getGameObjectData(state).materialMap;
  isShareMaterial ?
    _batchAddSharableComponent(
      (uidArray, componentArr, componentMap),
      MaterialGroupCommon.increaseGroupCount,
      state
    ) :
    _batchAddComponent(
      (uidArray, componentArr, componentMap),
      MaterialAddComponentCommon.handleAddComponent,
      state
    )
};

let batchAddCameraControllerComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArray, componentArr, GameObjectStateCommon.getGameObjectData(state).cameraControllerMap),
    CameraControllerAddComponentCommon.handleAddComponent,
    state
  );