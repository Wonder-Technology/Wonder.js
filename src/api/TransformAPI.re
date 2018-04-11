open TransformType;

open DisposeTransformMainService;

open GameObjectTransformService;

open HierachyTransformService;

open ModelMatrixTransformService;

open UpdateTransformMainService;

let createTransform = CreateTransformMainService.create;

/* (state) => {
     let (typeArrayPoolRecord, transformRecord, index) =
       CreateTransformMainService.create(state.typeArrayPoolRecord, state |> RecordTransformMainService.getRecord);
     ({...state, typeArrayPoolRecord, transformRecord}, index)
   }; */
let unsafeGetTransformGameObject = (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetGameObject(transform, state |> RecordTransformMainService.getRecord)
};

let unsafeGetTransformParent = (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetParent(transform, state |> RecordTransformMainService.getRecord)
};

let _checkParentAndChildTransformShouldAlive =
    (parent: Js.nullable(transform), child: transform, state: StateDataMainType.state) =>
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      Js.Nullable.iter(
        parent,
        [@bs]
        (
          (parent) =>
            AliveComponentService.checkComponentShouldAlive(
              parent,
              isAlive,
              state |> RecordTransformMainService.getRecord
            )
        )
      );
      AliveComponentService.checkComponentShouldAlive(
        child,
        isAlive,
        state |> RecordTransformMainService.getRecord
      )
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );

let setTransformParent =
    (parent: Js.nullable(transform), child: transform, state: StateDataMainType.state) => {
  _checkParentAndChildTransformShouldAlive(parent, child, state);
  state.transformRecord =
    Some(setParent(Js.toOption(parent), child, state |> RecordTransformMainService.getRecord));
  state
};

let setTransformParentKeepOrder =
    (parent: Js.nullable(transform), child: transform, state: StateDataMainType.state) => {
  _checkParentAndChildTransformShouldAlive(parent, child, state);
  state.transformRecord =
    Some(
      setParentKeepOrder(Js.toOption(parent), child, state |> RecordTransformMainService.getRecord)
    );
  state
};

let unsafeGetTransformChildren = (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetChildren(transform, state |> RecordTransformMainService.getRecord)
};

/* let getTransformLocalPositionTypeArray = (transform: transform, state: StateDataMainType.state) => {
     requireCheck(
       () => Contract.Operators.(AliveComponentService.checkComponentShouldAlive(transform, isAlive, state))
     );
     getLocalPositionTypeArray(transform, state)
   }; */
let getTransformLocalPosition = (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  getLocalPositionTuple(transform, RecordTransformMainService.getRecord(state).localPositions)
};

/* let setTransformLocalPositionByTypeArray =
       (transform: transform, localPosition, state: StateDataMainType.state) => {
     requireCheck(
       () => Contract.Operators.(AliveComponentService.checkComponentShouldAlive(transform, isAlive, state))
     );
     setLocalPositionByTypeArray(transform, localPosition, state)
   }; */
let setTransformLocalPosition =
    (transform: transform, localPosition, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  state.transformRecord =
    Some(
      setLocalPositionByTuple(
        transform,
        localPosition,
        state |> RecordTransformMainService.getRecord
      )
    );
  state
};

/* let getTransformPositionTypeArray = (transform: transform, state: StateDataMainType.state) => {
     requireCheck(
       () => Contract.Operators.(AliveComponentService.checkComponentShouldAlive(transform, isAlive, state))
     );
     updateAndGetPositionTypeArray(transform, state)
   }; */
let getTransformPosition = (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  updateAndGetPositionTuple(
    transform,
    state.globalTempRecord,
    state |> RecordTransformMainService.getRecord
  )
};

/* let setTransformPositionByTypeArray = (transform: transform, position, state: StateDataMainType.state) => {
     requireCheck(
       () => Contract.Operators.(AliveComponentService.checkComponentShouldAlive(transform, isAlive, state))
     );
     setPositionByTypeArray(transform, position, state)
   }; */
let setTransformPosition =
    (transform: transform, position: position, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  state.transformRecord =
    Some(
      updateAndSetPositionByTuple(
        transform,
        position,
        state.globalTempRecord,
        state |> RecordTransformMainService.getRecord
      )
    );
  state
};