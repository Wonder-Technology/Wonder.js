open GameObjectType;

let findFirst = (arr: array('a), func) =>
  arr
  |> ArraySystem.unsafeFind(func)
  |> WonderLog.Contract.ensureCheck(
       (first) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|find result|j}, ~actual={j|not|j}),
                 () => first |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
     );

let filterTargetName = (name, targetName) => name == targetName;
