open TransformType;

open DisposeTransformMainService;

open GameObjectTransformService;

open HierachyTransformService;

open ModelMatrixTransformService;

open UpdateTransformService;

let createTransform = CreateTransformMainService.create;

/* (state) => {
     let (typeArrayPoolRecord, transformRecord, index) =
       CreateTransformMainService.create(state.typeArrayPoolRecord, state |> RecordTransformMainService.getRecord);
     ({...state, typeArrayPoolRecord, transformRecord}, index)
   }; */
let unsafeGetTransformGameObject = (transform: transform, state: MainStateDataType.state) => {
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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetGameObject(transform, state |> RecordTransformMainService.getRecord)
};

let unsafeGetTransformParent = (transform: transform, state: MainStateDataType.state) => {
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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetParent(transform, state |> RecordTransformMainService.getRecord)
};

let _checkParentAndChildTransformShouldAlive =
    (parent: Js.nullable(transform), child: transform, state: MainStateDataType.state) =>
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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );

let setTransformParent =
    (parent: Js.nullable(transform), child: transform, state: MainStateDataType.state) => {
  _checkParentAndChildTransformShouldAlive(parent, child, state);
  {
    ...state,
    transformRecord:
      Some(setParent(Js.toOption(parent), child, state |> RecordTransformMainService.getRecord))
  }
};

let setTransformParentKeepOrder =
    (parent: Js.nullable(transform), child: transform, state: MainStateDataType.state) => {
  _checkParentAndChildTransformShouldAlive(parent, child, state);
  {
    ...state,
    transformRecord:
      Some(
        setParentKeepOrder(
          Js.toOption(parent),
          child,
          state |> RecordTransformMainService.getRecord
        )
      )
  }
};

let unsafeGetTransformChildren = (transform: transform, state: MainStateDataType.state) => {
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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetChildren(transform, state |> RecordTransformMainService.getRecord)
};

/* let getTransformLocalPositionTypeArray = (transform: transform, state: MainStateDataType.state) => {
     requireCheck(
       () => Contract.Operators.(AliveComponentService.checkComponentShouldAlive(transform, isAlive, state))
     );
     getLocalPositionTypeArray(transform, state)
   }; */
let getTransformLocalPosition = (transform: transform, state: MainStateDataType.state) => {
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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  getLocalPositionTuple(transform, RecordTransformMainService.getRecord(state).localPositions)
};

/* let setTransformLocalPositionByTypeArray =
       (transform: transform, localPosition, state: MainStateDataType.state) => {
     requireCheck(
       () => Contract.Operators.(AliveComponentService.checkComponentShouldAlive(transform, isAlive, state))
     );
     setLocalPositionByTypeArray(transform, localPosition, state)
   }; */
let setTransformLocalPosition =
    (transform: transform, localPosition, state: MainStateDataType.state) => {
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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  {
    ...state,
    transformRecord:
      Some(
        setLocalPositionByTuple(
          transform,
          localPosition,
          state |> RecordTransformMainService.getRecord
        )
      )
  }
};

/* let getTransformPositionTypeArray = (transform: transform, state: MainStateDataType.state) => {
     requireCheck(
       () => Contract.Operators.(AliveComponentService.checkComponentShouldAlive(transform, isAlive, state))
     );
     updateAndGetPositionTypeArray(transform, state)
   }; */
let getTransformPosition = (transform: transform, state: MainStateDataType.state) => {
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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  updateAndGetPositionTuple(
    transform,
    state.globalTempRecord,
    state |> RecordTransformMainService.getRecord
  )
};

/* let setTransformPositionByTypeArray = (transform: transform, position, state: MainStateDataType.state) => {
     requireCheck(
       () => Contract.Operators.(AliveComponentService.checkComponentShouldAlive(transform, isAlive, state))
     );
     setPositionByTypeArray(transform, position, state)
   }; */
let setTransformPosition =
    (transform: transform, position: position, state: MainStateDataType.state) => {
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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  {
    ...state,
    transformRecord:
      Some(
        updateAndSetPositionByTuple(
          transform,
          position,
          state.globalTempRecord,
          state |> RecordTransformMainService.getRecord
        )
      )
  }
};