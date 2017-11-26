open GameObjectType;

open ComponentType;

open Contract;

let _getComponent =
    (uid: string, componentMap: WonderCommonlib.HashMapSystem.t(int))
    : option(component) =>
  WonderCommonlib.HashMapSystem.get(uid, componentMap);

let _hasComponent = (uid: string, componentMap: WonderCommonlib.HashMapSystem.t(int)) : bool =>
  Js.Option.isSome(_getComponent(uid, componentMap));

let _addComponent =
    (uid: string, component: component, componentMap: WonderCommonlib.HashMapSystem.t(int)) => {
  requireCheck(
    () =>
      test(
        "this type of component is already exist, shouldn't add again",
        () => _hasComponent(uid, componentMap) |> assertFalse
      )
  );
  WonderCommonlib.HashMapSystem.set(uid, component, componentMap) |> ignore
};

let hasCameraControllerComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).cameraControllerMap |> _hasComponent(uid);

let getCameraControllerComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).cameraControllerMap |> _getComponent(uid);

let addCameraControllerComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).cameraControllerMap
  |> _addComponent(uid, component)
  |> ignore;
  CameraControllerAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeCameraControllerComponent =
    (uid: string, component: component, state: StateDataType.state) =>
  CameraControllerDisposeComponentUtils.handleDisposeComponent(component, state);

let hasTransformComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).transformMap |> _hasComponent(uid);

let getTransformComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).transformMap |> _getComponent(uid);

let addTransformComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).transformMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] TransformAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeTransformComponent = (uid: string, component: component, state: StateDataType.state) =>
  TransformDisposeComponentUtils.handleDisposeComponent(component, state);

let hasGeometryComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).geometryMap |> _hasComponent(uid);

let getGeometryComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).geometryMap |> _getComponent(uid);

let addGeometryComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).geometryMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs]GeometryAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeGeometryComponent = (uid: string, component: component, state: StateDataType.state) =>
  GeometryDisposeComponentUtils.handleDisposeComponent(component, state);

let hasMeshRendererComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).meshRendererMap |> _hasComponent(uid);

let getMeshRendererComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).meshRendererMap |> _getComponent(uid);

let addMeshRendererComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).meshRendererMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs]MeshRendererAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeMeshRendererComponent = (uid: string, component: component, state: StateDataType.state) =>
  MeshRendererDisposeComponentUtils.handleDisposeComponent(component, uid, state);

let hasMaterialComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).materialMap |> _hasComponent(uid);

let getMaterialComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).materialMap |> _getComponent(uid);

let addMaterialComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).materialMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs]MaterialAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeMaterialComponent = (uid: string, component: component, state: StateDataType.state) =>
  MaterialDisposeComponentUtils.handleDisposeComponent(component, state);

let _batchGetComponent = (uidArray: array(string), componentMap, state: StateDataType.state) =>
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

let batchGetTransformComponent = (uidArray: array(string), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateUtils.getGameObjectData(state).transformMap, state);

let batchDisposeTransformComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    TransformDisposeComponentUtils.handleBatchDisposeComponent,
    componentArray
  );

let batchGetMeshRendererComponent = (uidArray: array(string), state: StateDataType.state) =>
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

let batchGetMaterialComponent = (uidArray: array(string), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateUtils.getGameObjectData(state).materialMap, state);

let batchDisposeMaterialComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    MaterialDisposeComponentUtils.handleBatchDisposeComponent,
    componentArray
  );

let batchGetGeometryComponent = (uidArray: array(string), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateUtils.getGameObjectData(state).geometryMap, state);

let batchDisposeGeometryComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    GeometryDisposeComponentUtils.handleBatchDisposeComponent,
    componentArray
  );

let batchGetCameraControllerComponent = (uidArray: array(string), state: StateDataType.state) =>
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
      uidArray: array(string),
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
    (uidArray: array(string), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateUtils.getGameObjectData(state).transformMap,
    TransformAddComponentUtils.handleAddComponent,
    state
  );

let batchAddMeshRendererComponent =
    (uidArray: array(string), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateUtils.getGameObjectData(state).meshRendererMap,
    MeshRendererAddComponentUtils.handleAddComponent,
    state
  );

let batchAddGeometryComponent =
    (uidArray: array(string), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateUtils.getGameObjectData(state).geometryMap,
    GeometryAddComponentUtils.handleAddComponent,
    state
  );

let batchAddMaterialComponent =
    (uidArray: array(string), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateUtils.getGameObjectData(state).materialMap,
    MaterialAddComponentUtils.handleAddComponent,
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