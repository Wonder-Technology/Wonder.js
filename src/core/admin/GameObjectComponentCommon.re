open GameObjectType;

open ComponentType;

open Contract;

let _unsafeGetComponent = (uid: int, componentMap: array(int)) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(uid, componentMap)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "component should exist",
             () => WonderCommonlib.SparseMapSystem.get(uid, componentMap) |> assertExist
           )
         )
     );

let _getComponent = (uid: int, componentMap: array(int)) : option(component) =>
  WonderCommonlib.SparseMapSystem.get(uid, componentMap);

let _hasComponent = (uid: int, componentMap: array(int)) : bool =>
  Js.Option.isSome(_getComponent(uid, componentMap));

let _addComponent = (uid: int, component: component, componentMap: array(int)) => {
  requireCheck(
    () =>
      test(
        "this type of component is already exist, shouldn't add again",
        () => _hasComponent(uid, componentMap) |> assertFalse
      )
  );
  WonderCommonlib.SparseMapSystem.set(uid, component, componentMap) |> ignore
};

let hasSourceInstanceComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateCommon.getGameObjectData(state).sourceInstanceMap |> _hasComponent(uid);

let getSourceInstanceComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).sourceInstanceMap |> _getComponent(uid);

let unsafeGetSourceInstanceComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).sourceInstanceMap |> _unsafeGetComponent(uid);

let addSourceInstanceComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateCommon.getGameObjectData(state).sourceInstanceMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] SourceInstanceAddComponentSystem.handleAddComponent(component, uid, state)
};

let hasCameraControllerComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateCommon.getGameObjectData(state).cameraControllerMap |> _hasComponent(uid);

let getCameraControllerComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).cameraControllerMap |> _getComponent(uid);

let addCameraControllerComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateCommon.getGameObjectData(state).cameraControllerMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] CameraControllerSystem.handleAddComponent(component, uid, state)
};

let disposeCameraControllerComponent = (uid: int, component: component, handleDisposeComponentFunc, state: StateDataType.state) =>
  [@bs]handleDisposeComponentFunc(component, state);

let hasTransformComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateCommon.getGameObjectData(state).transformMap |> _hasComponent(uid);

let getTransformComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).transformMap |> _getComponent(uid);

let unsafeGetTransformComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).transformMap |> _unsafeGetComponent(uid);

let addTransformComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateCommon.getGameObjectData(state).transformMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] TransformSystem.handleAddComponent(component, uid, state)
};

let disposeTransformComponent = (uid: int, component: component, handleDisposeComponentFunc, state: StateDataType.state) =>
  [@bs]handleDisposeComponentFunc(component, state);

let hasGeometryComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateCommon.getGameObjectData(state).geometryMap |> _hasComponent(uid);

let getGeometryComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).geometryMap |> _getComponent(uid);

let unsafeGetGeometryComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).geometryMap |> _unsafeGetComponent(uid);

let addGeometryComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateCommon.getGameObjectData(state).geometryMap
  |> _addComponent(uid, component)
  |> ignore;
  switch (
    GeometrySystem.getGameObject(
      GeometrySystem.getMappedIndex(
        component,
        GeometrySystem.getData(state).mappedIndexMap
      ),
      state
    )
  ) {
  | Some(_) => GeometrySystem.increaseGroupCount(component, state)
  | _ => [@bs] GeometrySystem.handleAddComponent(component, uid, state)
  }
};

let disposeGeometryComponent = (uid: int, component: component,handleDisposeComponentFunc, state: StateDataType.state) =>
  [@bs]handleDisposeComponentFunc(component, state);

let hasMeshRendererComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateCommon.getGameObjectData(state).meshRendererMap |> _hasComponent(uid);

let getMeshRendererComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).meshRendererMap |> _getComponent(uid);

let addMeshRendererComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateCommon.getGameObjectData(state).meshRendererMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] MeshRendererAddComponentSystem.handleAddComponent(component, uid, state)
};

let disposeMeshRendererComponent = (uid: int, component: component, handleDisposeComponentFunc, state: StateDataType.state) =>
  [@bs]handleDisposeComponentFunc(component, uid, state);

let hasMaterialComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateCommon.getGameObjectData(state).materialMap |> _hasComponent(uid);

let getMaterialComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).materialMap |> _getComponent(uid);

let unsafeGetMaterialComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).materialMap |> _unsafeGetComponent(uid);

let addMaterialComponent = (uid: int, component: component, handleAddComponentFunc, state: StateDataType.state) => {
  GameObjectStateCommon.getGameObjectData(state).materialMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs]handleAddComponentFunc(component, uid, state)
};

let disposeMaterialComponent = (uid: int, component: component, handleDisposeComponentFunc, state: StateDataType.state) =>
  [@bs]handleDisposeComponentFunc(component, state);

let _batchGetComponent = (uidArray: array(int), componentMap, state: StateDataType.state) =>
  uidArray
  |> ArraySystem.reduceOneParam(
       [@bs]
       (
         (arr, uid) =>
           switch (componentMap |> _getComponent(uid)) {
           | None => arr
           | Some(component) =>
             arr |> Js.Array.push(component) |> ignore;
             arr
           }
       ),
       [||]
     );

let _batchDisposeComponent =
    (uidMap, state: StateDataType.state, handleFunc, componentArray: array(component)) =>
  [@bs]handleFunc(componentArray, uidMap, state);


let batchDisposeComponent =
    (uidMap, state: StateDataType.state, handleBatchDisposeComponentFunc, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    handleBatchDisposeComponentFunc,
    componentArray
  );




let batchGetTransformComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateCommon.getGameObjectData(state).transformMap, state);




let batchGetMeshRendererComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).meshRendererMap,
    state
  );

let batchGetMaterialComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateCommon.getGameObjectData(state).materialMap, state);

let batchGetGeometryComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateCommon.getGameObjectData(state).geometryMap, state);

let batchGetCameraControllerComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).cameraControllerMap,
    state
  );

let _batchAddComponent =
    (
      uidArray: array(int),
      componentArr: array(component),
      componentMap,
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
           GeometrySystem.increaseGroupCount(component, state);
           [@bs] handleAddComponentFunc(component, uid, state)
         }
       ),
       state
     )
};

let batchAddTransformComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateCommon.getGameObjectData(state).transformMap,
    TransformSystem.handleAddComponent,
    state
  );

let batchAddMeshRendererComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateCommon.getGameObjectData(state).meshRendererMap,
    MeshRendererAddComponentSystem.handleAddComponent,
    state
  );

let batchAddGeometryComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) => {
  let componentMap = GameObjectStateCommon.getGameObjectData(state).geometryMap;
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
           GeometrySystem.increaseGroupCount(component, state);
           state
         }
       ),
       state
     )
};

let batchAddMaterialComponentForClone =
    (uidArray: array(int), componentArr: array(component), handleAddComponentFunc, state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateCommon.getGameObjectData(state).materialMap,
    [@bs]handleAddComponentFunc,
    state
  );

let batchAddCameraControllerComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateCommon.getGameObjectData(state).cameraControllerMap,
    CameraControllerSystem.handleAddComponent,
    state
  );

let cloneTransformComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  TransformSystem.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneMeshRendererComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  MeshRendererCloneComponentSystem.handleCloneComponent(countRangeArr, state);

let cloneGeometryComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  GeometrySystem.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneMaterialComponent =
    (sourceComponent: component, countRangeArr: array(int), handleCloneComponentFunc, state: StateDataType.state) =>
  [@bs]handleCloneComponentFunc(sourceComponent, countRangeArr, state);

let cloneCameraControllerComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  CameraControllerSystem.handleCloneComponent(sourceComponent, countRangeArr, state);