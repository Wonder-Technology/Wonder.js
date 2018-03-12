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
