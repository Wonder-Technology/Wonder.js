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