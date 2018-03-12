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
    (uid, component, state.gameObjectRecord.sourceInstanceMap),
    SourceInstanceAddComponentCommon.handleAddComponent,
    state
  );

let addObjectInstanceComponent = (uid: int, component: component, state: StateDataType.state) =>
  _addCommonComponent(
    (uid, component, state.gameObjectRecord.objectInstanceMap),
    ObjectInstanceAddComponentCommon.handleAddComponent,
    state
  );

let addAmbientLightComponent = (uid: int, component: component, state: StateDataType.state) =>
  _addCommonComponent(
    (uid, component, state.gameObjectRecord.ambientLightMap),
    AmbientLightAddComponentCommon.handleAddComponent,
    state
  );

let addDirectionLightComponent = (uid: int, component: component, state: StateDataType.state) =>
  _addCommonComponent(
    (uid, component, state.gameObjectRecord.directionLightMap),
    DirectionLightAddComponentCommon.handleAddComponent,
    state
  );

let addPointLightComponent = (uid: int, component: component, state: StateDataType.state) =>
  _addCommonComponent(
    (uid, component, state.gameObjectRecord.pointLightMap),
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

let batchAddAmbientLightComponentForClone =
    (uidArr: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArr, componentArr, state.gameObjectRecord.ambientLightMap),
    AmbientLightAddComponentCommon.handleAddComponent,
    state
  );

let batchAddDirectionLightComponentForClone =
    (uidArr: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArr, componentArr, state.gameObjectRecord.directionLightMap),
    DirectionLightAddComponentCommon.handleAddComponent,
    state
  );

let batchAddPointLightComponentForClone =
    (uidArr: array(int), componentArr: array(component), state: StateDataType.state) =>
  _batchAddComponent(
    (uidArr, componentArr, state.gameObjectRecord.pointLightMap),
    PointLightAddComponentCommon.handleAddComponent,
    state
  );