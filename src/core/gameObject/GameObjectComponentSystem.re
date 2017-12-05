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

let hasCameraControllerComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateSystem.getGameObjectData(state).cameraControllerMap |> _hasComponent(uid);

let getCameraControllerComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateSystem.getGameObjectData(state).cameraControllerMap |> _getComponent(uid);

let addCameraControllerComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateSystem.getGameObjectData(state).cameraControllerMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] CameraControllerAddComponentSystem.handleAddComponent(component, uid, state)
};

let disposeCameraControllerComponent = (uid: int, component: component, state: StateDataType.state) =>
  CameraControllerDisposeComponentSystem.handleDisposeComponent(component, state);

let hasTransformComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateSystem.getGameObjectData(state).transformMap |> _hasComponent(uid);

let getTransformComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateSystem.getGameObjectData(state).transformMap |> _getComponent(uid);

let addTransformComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateSystem.getGameObjectData(state).transformMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] TransformAddComponentSystem.handleAddComponent(component, uid, state)
};

let disposeTransformComponent = (uid: int, component: component, state: StateDataType.state) =>
  TransformDisposeComponentSystem.handleDisposeComponent(component, state);

let hasGeometryComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateSystem.getGameObjectData(state).geometryMap |> _hasComponent(uid);

let getGeometryComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateSystem.getGameObjectData(state).geometryMap |> _getComponent(uid);

let unsafeGetGeometryComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateSystem.getGameObjectData(state).geometryMap |> _unsafeGetComponent(uid);

let unsafeGetGeometryComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateSystem.getGameObjectData(state).geometryMap |> _unsafeGetComponent(uid);

let addGeometryComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateSystem.getGameObjectData(state).geometryMap
  |> _addComponent(uid, component)
  |> ignore;
  switch (
    GeometryGameObjectSystem.getGameObject(
      GeometryIndexSystem.getMappedIndex(
        component,
        GeometryStateSystem.getGeometryData(state).mappedIndexMap
      ),
      state
    )
  ) {
  | Some(_) => GeometryGroupSystem.increaseGroupCount(component, state)
  | _ => [@bs] GeometryAddComponentSystem.handleAddComponent(component, uid, state)
  }
};

let disposeGeometryComponent = (uid: int, component: component, state: StateDataType.state) =>
  GeometryDisposeComponentSystem.handleDisposeComponent(component, state);

let hasMeshRendererComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateSystem.getGameObjectData(state).meshRendererMap |> _hasComponent(uid);

let getMeshRendererComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateSystem.getGameObjectData(state).meshRendererMap |> _getComponent(uid);

let addMeshRendererComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateSystem.getGameObjectData(state).meshRendererMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] MeshRendererAddComponentSystem.handleAddComponent(component, uid, state)
};

let disposeMeshRendererComponent = (uid: int, component: component, state: StateDataType.state) =>
  MeshRendererDisposeComponentSystem.handleDisposeComponent(component, uid, state);

let hasMaterialComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateSystem.getGameObjectData(state).materialMap |> _hasComponent(uid);

let getMaterialComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateSystem.getGameObjectData(state).materialMap |> _getComponent(uid);

let unsafeGetMaterialComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateSystem.getGameObjectData(state).materialMap |> _unsafeGetComponent(uid);

let unsafeGetMaterialComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateSystem.getGameObjectData(state).materialMap |> _unsafeGetComponent(uid);

let addMaterialComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateSystem.getGameObjectData(state).materialMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] MaterialAddComponentSystem.handleAddComponent(component, uid, state)
};

let disposeMaterialComponent = (uid: int, component: component, state: StateDataType.state) =>
  MaterialDisposeComponentSystem.handleDisposeComponent(component, state);

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
  handleFunc(componentArray, uidMap, state);

let batchGetTransformComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateSystem.getGameObjectData(state).transformMap, state);

let batchDisposeTransformComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    TransformDisposeComponentSystem.handleBatchDisposeComponent,
    componentArray
  );

let batchGetMeshRendererComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateSystem.getGameObjectData(state).meshRendererMap,
    state
  );

let batchDisposeMeshRendererComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    MeshRendererDisposeComponentSystem.handleBatchDisposeComponent,
    componentArray
  );

let batchGetMaterialComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateSystem.getGameObjectData(state).materialMap, state);

let batchDisposeMaterialComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    MaterialDisposeComponentSystem.handleBatchDisposeComponent,
    componentArray
  );

let batchGetGeometryComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateSystem.getGameObjectData(state).geometryMap, state);

let batchDisposeGeometryComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    GeometryDisposeComponentSystem.handleBatchDisposeComponent,
    componentArray
  );

let batchGetCameraControllerComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateSystem.getGameObjectData(state).cameraControllerMap,
    state
  );

let batchDisposeCameraControllerComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    CameraControllerDisposeComponentSystem.handleBatchDisposeComponent,
    componentArray
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
           GeometryGroupSystem.increaseGroupCount(component, state);
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
    GameObjectStateSystem.getGameObjectData(state).transformMap,
    TransformAddComponentSystem.handleAddComponent,
    state
  );

let batchAddMeshRendererComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateSystem.getGameObjectData(state).meshRendererMap,
    MeshRendererAddComponentSystem.handleAddComponent,
    state
  );

let batchAddGeometryComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) => {
  let componentMap = GameObjectStateSystem.getGameObjectData(state).geometryMap;
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
           GeometryGroupSystem.increaseGroupCount(component, state);
           state
         }
       ),
       state
     )
};

let batchAddMaterialComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateSystem.getGameObjectData(state).materialMap,
    MaterialAddComponentSystem.handleAddComponent,
    state
  );

let batchAddCameraControllerComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateSystem.getGameObjectData(state).cameraControllerMap,
    CameraControllerAddComponentSystem.handleAddComponent,
    state
  );

let cloneTransformComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  TransformCloneComponentSystem.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneMeshRendererComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  MeshRendererCloneComponentSystem.handleCloneComponent(countRangeArr, state);

let cloneGeometryComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  GeometryCloneComponentSystem.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneMaterialComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  MaterialCloneComponentSystem.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneCameraControllerComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  CameraControllerCloneComponentSystem.handleCloneComponent(sourceComponent, countRangeArr, state);