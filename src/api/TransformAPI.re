open PositionType;

open RotationType;

open ScaleType;

open TransformType;

open DisposeTransformMainService;

open GameObjectTransformService;

open HierachyTransformService;

open ModelMatrixTransformService;

open UpdateTransformMainService;

let createTransform = state => CreateTransformMainService.create(. state);

/* (state) => {
     let (typeArrayPoolRecord, transformRecord, index) =
       CreateTransformMainService.create(state.typeArrayPoolRecord, state |> RecordTransformMainService.getRecord);
     ({...state, typeArrayPoolRecord, transformRecord}, index)
   }; */
let unsafeGetTransformGameObject =
    (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetGameObject(
    transform,
    state |> RecordTransformMainService.getRecord,
  );
};

let unsafeGetTransformParent =
    (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetParent(transform, state |> RecordTransformMainService.getRecord);
};

let hasTransformParent =
    (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  hasParent(transform, state |> RecordTransformMainService.getRecord);
};

let _checkParentAndChildTransformShouldAlive =
    (
      parent: Js.nullable(transform),
      child: transform,
      state: StateDataMainType.state,
    ) =>
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      Js.Nullable.iter(parent, (. parent) =>
        AliveComponentService.checkComponentShouldAlive(
          parent,
          isAlive,
          state |> RecordTransformMainService.getRecord,
        )
      );
      AliveComponentService.checkComponentShouldAlive(
        child,
        isAlive,
        state |> RecordTransformMainService.getRecord,
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

let _setTransformParent =
    (
      parent: Js.nullable(transform),
      child: transform,
      setParentFunc,
      state: StateDataMainType.state,
    ) => {
  _checkParentAndChildTransformShouldAlive(parent, child, state);
  state.transformRecord =
    Some(
      setParentFunc(.
        Js.toOption(parent),
        child,
        state |> RecordTransformMainService.getRecord,
      ),
    );
  state;
};

let setTransformParent =
    (
      parent: Js.nullable(transform),
      child: transform,
      state: StateDataMainType.state,
    ) =>
  _setTransformParent(parent, child, setParent, state);

let setTransformParentKeepOrder =
    (
      parent: Js.nullable(transform),
      child: transform,
      state: StateDataMainType.state,
    ) =>
  _setTransformParent(parent, child, setParentKeepOrder, state);

let unsafeGetTransformChildren =
    (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetChildren(transform, state |> RecordTransformMainService.getRecord);
};

let getTransformLocalPosition =
    (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getLocalPositionTuple(
    transform,
    RecordTransformMainService.getRecord(state).localPositions,
  );
};

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
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  state.transformRecord =
    Some(
      setLocalPositionByTuple(
        transform,
        localPosition,
        state |> RecordTransformMainService.getRecord,
      ),
    );
  state;
};

let getTransformPosition =
    (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  updateAndGetPositionTuple(
    transform,
    state.globalTempRecord,
    state |> RecordTransformMainService.getRecord,
  );
};

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
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  state.transformRecord =
    Some(
      updateAndSetPositionByTuple(
        transform,
        position,
        state.globalTempRecord,
        state |> RecordTransformMainService.getRecord,
      ),
    );
  state;
};

let getTransformLocalRotation =
    (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getLocalRotationTuple(
    transform,
    RecordTransformMainService.getRecord(state).localRotations,
  );
};

let setTransformLocalRotation =
    (
      transform: transform,
      localRotation: rotation,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  state.transformRecord =
    Some(
      setLocalRotationByTuple(
        transform,
        localRotation,
        state |> RecordTransformMainService.getRecord,
      ),
    );
  state;
};

let getTransformRotation =
    (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  updateAndGetRotationTuple(
    transform,
    state.globalTempRecord,
    state |> RecordTransformMainService.getRecord,
  );
};

let setTransformRotation =
    (transform: transform, rotation: rotation, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  state.transformRecord =
    Some(
      updateAndSetRotationByTuple(
        transform,
        rotation,
        state.globalTempRecord,
        state |> RecordTransformMainService.getRecord,
      ),
    );
  state;
};

let getTransformLocalScale =
    (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getLocalScaleTuple(
    transform,
    RecordTransformMainService.getRecord(state).localScales,
  );
};

let setTransformLocalScale =
    (transform: transform, localScale: scale, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  state.transformRecord =
    Some(
      setLocalScaleByTuple(
        transform,
        localScale,
        state |> RecordTransformMainService.getRecord,
      ),
    );
  state;
};

let getTransformScale = (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  updateAndGetScaleTuple(
    transform,
    state.globalTempRecord,
    state |> RecordTransformMainService.getRecord,
  );
};

let setTransformScale =
    (transform: transform, scale: scale, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  state.transformRecord =
    Some(
      updateAndSetScaleByTuple(
        transform,
        scale,
        state.globalTempRecord,
        state |> RecordTransformMainService.getRecord,
      ),
    );
  state;
};

let getTransformLocalEulerAngles =
    (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getLocalEulerAnglesTuple(
    transform,
    RecordTransformMainService.getRecord(state).localRotations,
  );
};

let setTransformLocalEulerAngles =
    (transform: transform, eulerAngles, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  state.transformRecord =
    Some(
      setLocalEulerAnglesByTuple(
        transform,
        eulerAngles,
        state |> RecordTransformMainService.getRecord,
      ),
    );
  state;
};

let getTransformEulerAngles =
    (transform: transform, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  updateAndGetEulerAnglesTuple(
    transform,
    state.globalTempRecord,
    state |> RecordTransformMainService.getRecord,
  );
};

let setTransformEulerAngles =
    (transform: transform, eulerAngles, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  state.transformRecord =
    Some(
      updateAndSetEulerAnglesByTuple(
        transform,
        eulerAngles,
        state.globalTempRecord,
        state |> RecordTransformMainService.getRecord,
      ),
    );
  state;
};

let lookAt = (transform: transform, target, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  LookAtTransfromMainService.lookAt(~transform, ~target, ~state, ());
};

let lookAtWithUp =
    (transform: transform, target, up, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  LookAtTransfromMainService.lookAt(~transform, ~target, ~up, ~state, ());
};

let getTransformLocalToWorldMatrixTypeArray =
    (transform: transform, state: StateDataMainType.state) =>
  UpdateTransformMainService.updateAndGetLocalToWorldMatrixTypeArray(
    transform,
    state.globalTempRecord,
    RecordTransformMainService.getRecord(state),
  );

let rotateLocalOnAxis =
    (
      transform: transform,
      (angle, localAxis),
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  RotateTransformMainService.rotateLocalOnAxis(
    transform,
    (angle, localAxis),
    state,
  );
};

let rotateWorldOnAxis =
    (
      transform: transform,
      (angle, localAxis),
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  RotateTransformMainService.rotateWorldOnAxis(
    transform,
    (angle, localAxis),
    state,
  );
};

let changeChildOrder =
    (sourceTransfrom, targetTransform, targetParentTransform, action, state) =>
  HierachyTransformMainService.changeChildOrder(
    sourceTransfrom,
    targetTransform,
    targetParentTransform,
    action,
    state,
  );