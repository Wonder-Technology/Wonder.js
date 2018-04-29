open ComponentType;

let getComponent = (uid: int, componentMap: array(int)) : option(component) =>
  WonderCommonlib.SparseMapService.get(uid, componentMap);

let unsafeGetComponent = (uid: int, componentMap: array(int)) =>
  WonderCommonlib.SparseMapService.unsafeGet(uid, componentMap)
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|component exist|j}, ~actual={j|not|j}),
                 () => r |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let hasComponent = (uid: int, componentMap: array(int)) : bool =>
  WonderCommonlib.SparseMapService.unsafeGet(uid, componentMap) |> Obj.magic !== Js.Undefined.empty;

let addComponent = (uid: int, component: component, componentMap: array(int)) => {
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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  WonderCommonlib.SparseMapService.set(uid, component, componentMap) |> ignore
};

let hasComponent = (uid: int, componentMap) : bool => componentMap |> hasComponent(uid);

let batchGetComponent = (uidArray: array(int), componentMap) =>
  uidArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (arr, uid) =>
           switch (componentMap |> getComponent(uid)) {
           | None => arr
           | Some(component) => arr |> ArrayService.push(component)
           }
       ),
       [||]
     );

let batchDisposeComponentWithUidMap = (uidMap, componentRecord, handleFunc, componentArray) =>
  [@bs] handleFunc(componentArray, uidMap, componentRecord);

let batchDisposeComponent = (componentRecord, handleFunc, componentArray) =>
  [@bs] handleFunc(componentArray, componentRecord);