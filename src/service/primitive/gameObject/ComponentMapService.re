open ComponentType;

let getComponent =
    (uid: int, componentMap: WonderCommonlib.MutableSparseMapService.t(int))
    : option(component) =>
  WonderCommonlib.MutableSparseMapService.get(uid, componentMap);

/* let unsafeGetComponent = (uid: int, componentMap: array(int)) => */
let unsafeGetComponent =
    (uid: int, componentMap: WonderCommonlib.MutableSparseMapService.t(int)) =>
  WonderCommonlib.MutableSparseMapService.unsafeGet(uid, componentMap)
  |> WonderLog.Contract.ensureCheck(
       r =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|component exist|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 r |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let hasComponent =
    (uid: int, componentMap: WonderCommonlib.MutableSparseMapService.t(int))
    : bool =>
  WonderCommonlib.MutableSparseMapService.unsafeGet(uid, componentMap)
  |> Obj.magic !== Js.Undefined.empty;

let addComponent =
    (
      uid: int,
      component: component,
      componentMap: WonderCommonlib.MutableSparseMapService.t(int),
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|this type of the component shouldn't be added before|j},
                ~actual={j|not|j},
              ),
              () =>
              hasComponent(uid, componentMap) |> assertFalse
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  WonderCommonlib.MutableSparseMapService.set(uid, component, componentMap)
  |> ignore;
};

let removeComponent = (uid: int, componentMap) =>
  WonderCommonlib.MutableSparseMapService.deleteVal(
    uid,
    componentMap
  );

let hasComponent = (uid: int, componentMap) : bool =>
  componentMap |> hasComponent(uid);

let batchGetComponent = (uidArray: array(int), componentMap) =>
  uidArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr, uid) =>
         switch (componentMap |> getComponent(uid)) {
         | None => arr
         | Some(component) => arr |> ArrayService.push(component)
         },
       [||],
     );

let batchDisposeComponentWithUidMap =
    (uidMap, componentRecord, handleFunc, componentArray) =>
  handleFunc(. componentArray, uidMap, componentRecord);

let batchDisposeComponent = (componentRecord, handleFunc, componentArray) =>
  handleFunc(. componentArray, componentRecord);