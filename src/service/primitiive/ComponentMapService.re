open ComponentType;

let getComponent = (uid: int, componentMap: array(int)) : option(component) =>
  WonderCommonlib.SparseMapService.get(uid, componentMap);

let hasComponent = (uid: int, componentMap: array(int)) : bool =>
  Js.Option.isSome(getComponent(uid, componentMap));

let unsafeGetComponent = (uid: int, componentMap: array(int)) =>
  WonderCommonlib.SparseMapService.get(uid, componentMap) |> OptionService.unsafeGet;

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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
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

let batchDisposeComponent = (uidMap, componentRecord, handleFunc, componentArray) =>
  [@bs] handleFunc(componentArray, uidMap, componentRecord);