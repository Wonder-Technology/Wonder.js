open TransformType;

open DisposeTransformMainService;

open GameObjectTransformService;

open HierachyTransformService;

open ModelMatrixTransformService;

open UpdateTransformService;

let createTransform = CreateTransformMainService.create;

/* (state) => {
     let (typeArrayPoolRecord, transformRecord, index) =
       CreateTransformMainService.create(state.typeArrayPoolRecord, state.transformRecord);
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
              state.transformRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  unsafeGetGameObject(transform, state.transformRecord)
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
              state.transformRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  unsafeGetParent(transform, state.transformRecord)
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
            AliveComponentService.checkComponentShouldAlive(parent, isAlive, state.transformRecord)
        )
      );
      AliveComponentService.checkComponentShouldAlive(child, isAlive, state.transformRecord)
    },
    MainStateData.stateData.isDebug
  );

let setTransformParent =
    (parent: Js.nullable(transform), child: transform, state: MainStateDataType.state) => {
  _checkParentAndChildTransformShouldAlive(parent, child, state);
  {...state, transformRecord: setParent(Js.toOption(parent), child, state.transformRecord)}
};

let setTransformParentKeepOrder =
    (parent: Js.nullable(transform), child: transform, state: MainStateDataType.state) => {
  _checkParentAndChildTransformShouldAlive(parent, child, state);
  {
    ...state,
    transformRecord: setParentKeepOrder(Js.toOption(parent), child, state.transformRecord)
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
              state.transformRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  unsafeGetChildren(transform, state.transformRecord)
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
              state.transformRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  getLocalPositionTuple(transform, state.transformRecord.localPositionMap)
};

/* let setTransformLocalPositionByTypeArray =
       (transform: transform, localPosition, state: MainStateDataType.state) => {
     requireCheck(
       () => Contract.Operators.(AliveComponentService.checkComponentShouldAlive(transform, isAlive, state))
     );
     setLocalPositionByTypeArray(transform, localPosition, state)
   }; */
let setTransformLocalPosition = (transform: transform, localPosition, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state.transformRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  {
    ...state,
    transformRecord: setLocalPositionByTuple(transform, localPosition, state.transformRecord)
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
              state.transformRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  updateAndGetPositionTuple(transform, state.globalTempRecord, state.transformRecord)
};

/* let setTransformPositionByTypeArray = (transform: transform, position, state: MainStateDataType.state) => {
     requireCheck(
       () => Contract.Operators.(AliveComponentService.checkComponentShouldAlive(transform, isAlive, state))
     );
     setPositionByTypeArray(transform, position, state)
   }; */
let setTransformPosition = (transform: transform, position: position, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state.transformRecord
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  {
    ...state,
    transformRecord:
      updateAndSetPositionByTuple(
        transform,
        position,
        state.globalTempRecord,
        state.transformRecord
      )
  }
};