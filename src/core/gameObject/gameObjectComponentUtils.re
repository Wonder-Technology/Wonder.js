open GameObjectType;

open ComponentType;

open Contract;

let _getComponent = (uid: int, componentMap: array(int)) : option(component) =>
  SparseMapSystem.get(uid, componentMap);

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
  SparseMapSystem.set(uid, component, componentMap) |> ignore
};

let hasCameraControllerComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).cameraControllerMap |> _hasComponent(uid);

let getCameraControllerComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).cameraControllerMap |> _getComponent(uid);

let addCameraControllerComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).cameraControllerMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] CameraControllerAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeCameraControllerComponent = (uid: int, component: component, state: StateDataType.state) =>
  CameraControllerDisposeComponentUtils.handleDisposeComponent(component, state);

let hasTransformComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).transformMap |> _hasComponent(uid);

let getTransformComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).transformMap |> _getComponent(uid);

let addTransformComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).transformMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] TransformAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeTransformComponent = (uid: int, component: component, state: StateDataType.state) =>
  TransformDisposeComponentUtils.handleDisposeComponent(component, state);

let hasGeometryComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).geometryMap |> _hasComponent(uid);

let getGeometryComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).geometryMap |> _getComponent(uid);

let addGeometryComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).geometryMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] GeometryAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeGeometryComponent = (uid: int, component: component, state: StateDataType.state) =>
  GeometryDisposeComponentUtils.handleDisposeComponent(component, state);

let hasMeshRendererComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).meshRendererMap |> _hasComponent(uid);

let getMeshRendererComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).meshRendererMap |> _getComponent(uid);

let addMeshRendererComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).meshRendererMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] MeshRendererAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeMeshRendererComponent = (uid: int, component: component, state: StateDataType.state) =>
  MeshRendererDisposeComponentUtils.handleDisposeComponent(component, uid, state);

let hasMaterialComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).materialMap |> _hasComponent(uid);

let getMaterialComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).materialMap |> _getComponent(uid);

let addMaterialComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).materialMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] MaterialAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeMaterialComponent = (uid: int, component: component, state: StateDataType.state) =>
  MaterialDisposeComponentUtils.handleDisposeComponent(component, state);

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
  _batchGetComponent(uidArray, GameObjectStateUtils.getGameObjectData(state).transformMap, state);

let batchDisposeTransformComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    TransformDisposeComponentUtils.handleBatchDisposeComponent,
    componentArray
  );

let batchGetMeshRendererComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateUtils.getGameObjectData(state).meshRendererMap,
    state
  );

let batchDisposeMeshRendererComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    MeshRendererDisposeComponentUtils.handleBatchDisposeComponent,
    componentArray
  );

let batchGetMaterialComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateUtils.getGameObjectData(state).materialMap, state);

let batchDisposeMaterialComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    MaterialDisposeComponentUtils.handleBatchDisposeComponent,
    componentArray
  );

let batchGetGeometryComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateUtils.getGameObjectData(state).geometryMap, state);

let batchDisposeGeometryComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    GeometryDisposeComponentUtils.handleBatchDisposeComponent,
    componentArray
  );

let batchGetCameraControllerComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateUtils.getGameObjectData(state).cameraControllerMap,
    state
  );

let batchDisposeCameraControllerComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    CameraControllerDisposeComponentUtils.handleBatchDisposeComponent,
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
           [@bs] handleAddComponentFunc(component, uid, state)
         }
       ),
       state
     )
  /* state */
};

let batchAddTransformComponent =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateUtils.getGameObjectData(state).transformMap,
    TransformAddComponentUtils.handleAddComponent,
    state
  );

let batchAddMeshRendererComponent =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateUtils.getGameObjectData(state).meshRendererMap,
    MeshRendererAddComponentUtils.handleAddComponent,
    state
  );

let batchAddGeometryComponent =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateUtils.getGameObjectData(state).geometryMap,
    GeometryAddComponentUtils.handleAddComponent,
    state
  );

let batchAddMaterialComponent =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateUtils.getGameObjectData(state).materialMap,
    MaterialAddComponentUtils.handleAddComponent,
    state
  );

let batchAddCameraControllerComponent =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateUtils.getGameObjectData(state).cameraControllerMap,
    CameraControllerAddComponentUtils.handleAddComponent,
    state
  );

let cloneTransformComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  TransformCloneComponentUtils.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneMeshRendererComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  MeshRendererCloneComponentUtils.handleCloneComponent(countRangeArr, state);

let cloneGeometryComponent =
    (mappedSourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  GeometryCloneComponentUtils.handleCloneComponent(mappedSourceComponent, countRangeArr, state);

let cloneMaterialComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  MaterialCloneComponentUtils.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneCameraControllerComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  CameraControllerCloneComponentUtils.handleCloneComponent(sourceComponent, countRangeArr, state);