open GameObjectType;

open GameObjectAdmin;

open ComponentType;

let _checkGameObjectShouldAlive = (gameObject: gameObject, state: StateDataType.state) =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(~expect={j|gameObject alive|j}, ~actual={j|not|j}),
        () => isAlive(gameObject, state) |> assertTrue
      )
    )
  );

let addGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addSourceInstanceComponent(gameObject, component, state)
};

let getGameObjectSourceInstanceComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  getSourceInstanceComponent(gameObject, state)
};

let hasGameObjectSourceInstanceComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasSourceInstanceComponent(gameObject, state)
};

let disposeGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  disposeSourceInstanceComponent(gameObject, component, batchDispose, state)
};

let addGameObjectObjectInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addObjectInstanceComponent(gameObject, component, state)
};

let getGameObjectObjectInstanceComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  getObjectInstanceComponent(gameObject, state)
};

let disposeGameObjectObjectInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  disposeObjectInstanceComponent(gameObject, component, state)
};

let addGameObjectAmbientLightComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addAmbientLightComponent(gameObject, component, state)
};

let disposeGameObjectAmbientLightComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  disposeAmbientLightComponent(gameObject, component, state)
};

let getGameObjectAmbientLightComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  unsafeGetAmbientLightComponent(gameObject, state)
};

let hasGameObjectAmbientLightComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasAmbientLightComponent(gameObject, state)
};

let addGameObjectDirectionLightComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addDirectionLightComponent(gameObject, component, state)
};

let disposeGameObjectDirectionLightComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  disposeDirectionLightComponent(gameObject, component, state)
};

let getGameObjectDirectionLightComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  unsafeGetDirectionLightComponent(gameObject, state)
};

let hasGameObjectDirectionLightComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasDirectionLightComponent(gameObject, state)
};

let addGameObjectPointLightComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addPointLightComponent(gameObject, component, state)
};

let disposeGameObjectPointLightComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  disposePointLightComponent(gameObject, component, state)
};

let getGameObjectPointLightComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  unsafeGetPointLightComponent(gameObject, state)
};

let hasGameObjectPointLightComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasPointLightComponent(gameObject, state)
};

let isGameObjectAlive = (gameObject: gameObject, state: StateDataType.state) =>
  isAlive(gameObject, state);

let disposeGameObject = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  dispose(gameObject, state)
};

let initGameObject = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  initGameObject(gameObject, state)
};

let batchDisposeGameObject = (gameObjectArray: array(gameObject), state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            gameObjectArray
            |> WonderCommonlib.ArraySystem.forEach(
                 [@bs] ((gameObject) => _checkGameObjectShouldAlive(gameObject, state))
               )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  batchDispose(gameObjectArray, state)
};

let cloneGameObject =
    (gameObject: gameObject, count: int, isShareMaterial: Js.boolean, state: StateDataType.state) =>
  clone(gameObject, count, Js.to_bool(isShareMaterial), state);