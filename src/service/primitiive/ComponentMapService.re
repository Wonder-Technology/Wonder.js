open ComponentType;

let getComponent = (uid: int, componentMap: array(int)) : option(component) =>
  WonderCommonlib.SparseMapSystem.get(uid, componentMap);

let hasComponent = (uid: int, componentMap: array(int)) : bool =>
  Js.Option.isSome(getComponent(uid, componentMap));

let unsafeGetComponent = (uid: int, componentMap: array(int)) =>
  WonderCommonlib.SparseMapSystem.get(uid, componentMap) |> OptionService.unsafeGet;

/* WonderCommonlib.SparseMapSystem.unsafeGet(uid, componentMap)
   |> WonderLog.Contract.ensureCheck(
        (component) =>
          WonderLog.(
            Contract.(
              Operators.(
                test(
                  Log.buildAssertMessage(~expect={j|component exist|j}, ~actual={j|not|j}),
                  () => component |> assertNullableExist
                )
              )
            )
          ),
        MainStateData.stateData.isDebug
      ); */
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
    MainStateData.stateData.isDebug
  );
  WonderCommonlib.SparseMapSystem.set(uid, component, componentMap) |> ignore
};

let hasComponent = (uid: int, componentMap) : bool => componentMap |> hasComponent(uid);

let batchGetComponent = (uidArray: array(int), componentMap) =>
  uidArray
  |> WonderCommonlib.ArraySystem.reduceOneParam(
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