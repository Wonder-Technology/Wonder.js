open TransformType;

let _unsafeGetParent = (transform: transform, transformData: transformData) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(transform, transformData.parentMap);

let getParent = (transform: transform, transformData: transformData) =>
  Js.Undefined.to_opt(
    WonderCommonlib.SparseMapSystem.unsafeGet(transform, transformData.parentMap)
  );

let removeFromParentMap = (child: int, transformData: transformData) => {
  WonderCommonlib.SparseMapSystem.deleteVal(child, transformData.parentMap) |> ignore;
  transformData
};

let unsafeGetChildren = (transform: transform, transformData: transformData) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(transform, transformData.childMap)
  |> WonderLog.Contract.ensureCheck(
       (children) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|children exist|j}, ~actual={j|not|j}),
                 () => children |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
     );

let _setChildren = (transformData, parent, children) => {
  WonderCommonlib.SparseMapSystem.set(parent, children, transformData.childMap) |> ignore;
  transformData
};

let _removeChild = (child: int, isKeepOrder, children: array(transform)) =>
  ArraySystem.deleteBySwap(
    Js.Array.indexOf(child, children),
    Js.Array.length(children) - 1,
    children
  );

let removeFromChildMap = (parent: int, child: int, isKeepOrder, transformData: transformData) =>
  isKeepOrder ?
    unsafeGetChildren(parent, transformData)
    |> Js.Array.filter((transform) => transform !== child)
    |> _setChildren(transformData, parent) :
    {
      unsafeGetChildren(parent, transformData) |> _removeChild(child, isKeepOrder) |> ignore;
      transformData
    };

let _removeFromParent =
    (currentParent: int, child: transform, isKeepOrder, transformData: transformData) =>
  removeFromParentMap(child, transformData)
  |> removeFromChildMap(currentParent, child, isKeepOrder);

let _setParent = (parent: transform, child: int, transformData: transformData) => {
  WonderCommonlib.SparseMapSystem.set(
    child,
    TransformCastTypeCommon.transformToJsUndefine(parent),
    transformData.parentMap
  )
  |> ignore;
  transformData
};

let _addChild = (parent: int, child: transform, transformData: transformData) => {
  unsafeGetChildren(parent, transformData) |> Js.Array.push(child) |> ignore;
  transformData
};

let _addToParent = (parent: transform, child: transform, transformData: transformData) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(~expect={j|child not has parent|j}, ~actual={j|has|j}),
        () => getParent(child, transformData) |> assertNotExist
      );
      test(
        Log.buildAssertMessage(~expect={j|parent not already has the child|j}, ~actual={j|has|j}),
        () => unsafeGetChildren(parent, transformData) |> Js.Array.includes(child) |> assertFalse
      )
    },
    StateData.stateData.isDebug
  );
  _setParent(parent, child, transformData) |> _addChild(parent, child)
};

let _setNewParent = (parent, child, isKeepOrder, transformData) =>
  switch (getParent(child, transformData)) {
  | None => _addToParent(parent, child, transformData)
  | Some(currentParent) =>
    ! TransformJudgeCommon.isSame(currentParent, parent) ?
      _removeFromParent(currentParent, child, isKeepOrder, transformData)
      |> _addToParent(parent, child) :
      transformData
  };

let _setParent =
    (parent: option(transform), child: transform, isKeepOrder, transformData: transformData) =>
  switch parent {
  | None =>
    switch (getParent(child, transformData)) {
    | None => transformData
    | Some(currentParent) => _removeFromParent(currentParent, child, isKeepOrder, transformData)
    }
  | Some(newParent) => _setNewParent(newParent, child, isKeepOrder, transformData)
  };

let setParent = (parent: option(transform), child: transform, transformData: transformData) =>
  _setParent(parent, child, false, transformData);

let setParentKeepOrder =
    (parent: option(transform), child: transform, transformData: transformData) =>
  _setParent(parent, child, true, transformData);