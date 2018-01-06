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
  [@bs] SourceInstanceAddComponentCommon.handleAddComponent(component, uid, state)
};

let disposeSourceInstanceComponent =
    (uid: int, component: component, batchDisposeGameObjectFunc, state: StateDataType.state) =>
  SourceInstanceDisposeComponentCommon.handleDisposeComponent(
    component,
    batchDisposeGameObjectFunc,
    state
  );

let hasObjectInstanceComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateCommon.getGameObjectData(state).objectInstanceMap |> _hasComponent(uid);

let getObjectInstanceComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).objectInstanceMap |> _getComponent(uid);

let unsafeGetObjectInstanceComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).objectInstanceMap |> _unsafeGetComponent(uid);

let addObjectInstanceComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateCommon.getGameObjectData(state).objectInstanceMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] ObjectInstanceAddComponentCommon.handleAddComponent(component, uid, state)
};

let disposeObjectInstanceComponent = (uid: int, component: component, state: StateDataType.state) =>
  ObjectInstanceDisposeComponentCommon.handleDisposeComponent(component, state);

let hasCameraControllerComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateCommon.getGameObjectData(state).cameraControllerMap |> _hasComponent(uid);

let getCameraControllerComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).cameraControllerMap |> _getComponent(uid);

let addCameraControllerComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateCommon.getGameObjectData(state).cameraControllerMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] CameraControllerAddComponentCommon.handleAddComponent(component, uid, state)
};

let disposeCameraControllerComponent = (uid: int, component: component, state: StateDataType.state) =>
  CameraControllerDisposeComponentCommon.handleDisposeComponent(component, state);

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
  [@bs] TransformAddComponentCommon.handleAddComponent(component, uid, state)
};

let disposeTransformComponent = (uid: int, component: component, state: StateDataType.state) =>
  TransformDisposeComponentCommon.handleDisposeComponent(component, state);

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
  switch (GeometryGameObjectCommon.getGameObject(component, state)) {
  | Some(_) => [@bs] GeometryGroupCommon.increaseGroupCount(component, state)
  | _ => [@bs] GeometryAddComponentCommon.handleAddComponent(component, uid, state)
  }
};

let disposeGeometryComponent = (uid: int, component: component, state: StateDataType.state) =>
  GeometryDisposeComponentCommon.handleDisposeComponent(component, state);

let hasMeshRendererComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateCommon.getGameObjectData(state).meshRendererMap |> _hasComponent(uid);

let getMeshRendererComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).meshRendererMap |> _getComponent(uid);

let addMeshRendererComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateCommon.getGameObjectData(state).meshRendererMap
  |> _addComponent(uid, component)
  |> ignore;
  [@bs] MeshRendererAddComponentCommon.handleAddComponent(component, uid, state)
};

let disposeMeshRendererComponent = (uid: int, component: component, state: StateDataType.state) =>
  MeshRendererDisposeComponentCommon.handleDisposeComponent(component, uid, state);

let hasMaterialComponent = (uid: int, state: StateDataType.state) : bool =>
  GameObjectStateCommon.getGameObjectData(state).materialMap |> _hasComponent(uid);

let getMaterialComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).materialMap |> _getComponent(uid);

let unsafeGetMaterialComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).materialMap |> _unsafeGetComponent(uid);

let addMaterialComponent = (uid: int, component: component, state: StateDataType.state) => {
  GameObjectStateCommon.getGameObjectData(state).materialMap
  |> _addComponent(uid, component)
  |> ignore;
  switch (MaterialGameObjectCommon.getGameObject(component, state)) {
  | Some(_) => [@bs] MaterialGroupCommon.increaseGroupCount(component, state)
  | _ => [@bs] MaterialAddComponentCommon.handleAddComponent(component, uid, state)
  }
};

let disposeMaterialComponent = (uid: int, component: component, state: StateDataType.state) =>
  MaterialDisposeComponentCommon.handleDisposeComponent(component, state);

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

let batchGetTransformComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateCommon.getGameObjectData(state).transformMap, state);

let _batchDisposeComponent =
    (uidMap, state: StateDataType.state, handleFunc, componentArray: array(component)) =>
  [@bs] handleFunc(componentArray, uidMap, state);

let batchDisposeTransformComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    TransformDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchGetMeshRendererComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).meshRendererMap,
    state
  );

let batchDisposeMeshRendererComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    MeshRendererDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchGetMaterialComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateCommon.getGameObjectData(state).materialMap, state);

let batchDisposeMaterialComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    MaterialDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchGetGeometryComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateCommon.getGameObjectData(state).geometryMap, state);

let batchDisposeGeometryComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    GeometryDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchGetCameraControllerComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).cameraControllerMap,
    state
  );

let batchDisposeCameraControllerComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    state,
    CameraControllerDisposeComponentCommon.handleBatchDisposeComponent,
    componentArray
  );

let batchGetSourceInstanceComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).sourceInstanceMap,
    state
  );

let batchDisposeSourceInstanceComponent =
    (uidMap, state: StateDataType.state, disposeGameObjectFunc, componentArray: array(component)) =>
  [@bs]
  SourceInstanceDisposeComponentCommon.handleBatchDisposeComponent(
    componentArray,
    uidMap,
    disposeGameObjectFunc,
    state
  );

let batchGetObjectInstanceComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).objectInstanceMap,
    state
  );

let batchDisposeObjectInstanceComponent =
    (uidMap, state: StateDataType.state, componentArray: array(component)) =>
  switch (componentArray |> Js.Array.length) {
  | 0 => state
  | _ =>
    _batchDisposeComponent(
      uidMap,
      state,
      ObjectInstanceDisposeComponentCommon.handleBatchDisposeComponent,
      componentArray
    )
  };

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
};

let _batchAddSharableComponent =
    (
      uidArray: array(int),
      componentArr: array(component),
      componentMap,
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
    uidArray,
    componentArr,
    GameObjectStateCommon.getGameObjectData(state).transformMap,
    TransformAddComponentCommon.handleAddComponent,
    state
  );

let batchAddMeshRendererComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateCommon.getGameObjectData(state).meshRendererMap,
    MeshRendererAddComponentCommon.handleAddComponent,
    state
  );

let batchAddGeometryComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddSharableComponent(
    uidArray,
    componentArr,
    GameObjectStateCommon.getGameObjectData(state).geometryMap,
    GeometryGroupCommon.increaseGroupCount,
    state
  );

let batchAddMaterialComponentForClone =
    (
      uidArray: array(int),
      componentArr: array(component),
      isShareMaterial,
      state: StateDataType.state
    ) => {
  let componentMap = GameObjectStateCommon.getGameObjectData(state).materialMap;
  isShareMaterial ?
    _batchAddSharableComponent(
      uidArray,
      componentArr,
      componentMap,
      MaterialGroupCommon.increaseGroupCount,
      state
    ) :
    _batchAddComponent(
      uidArray,
      componentArr,
      componentMap,
      MaterialAddComponentCommon.handleAddComponent,
      state
    )
};

let batchAddCameraControllerComponentForClone =
    (uidArray: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    uidArray,
    componentArr,
    GameObjectStateCommon.getGameObjectData(state).cameraControllerMap,
    CameraControllerAddComponentCommon.handleAddComponent,
    state
  );

let cloneTransformComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  TransformCloneComponentCommon.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneMeshRendererComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  MeshRendererCloneComponentCommon.handleCloneComponent(countRangeArr, state);

let cloneGeometryComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  GeometryCloneComponentCommon.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneMaterialComponent =
    (
      sourceComponent: component,
      countRangeArr: array(int),
      isShareMaterial: bool,
      state: StateDataType.state
    ) =>
  MaterialCloneComponentCommon.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    isShareMaterial,
    state
  );

let cloneCameraControllerComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  CameraControllerCloneComponentCommon.handleCloneComponent(sourceComponent, countRangeArr, state);