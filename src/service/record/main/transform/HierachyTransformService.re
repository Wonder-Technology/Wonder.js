open TransformType;

let _unsafeGetParent = (transform: transform, record) =>
  WonderCommonlib.SparseMapService.unsafeGet(transform, record.parentMap);

let unsafeGetParent = (transform: transform, record) =>
  WonderCommonlib.SparseMapService.unsafeGet(transform, record.parentMap);

let getParent = (transform: transform, record) =>
  unsafeGetParent(transform, record) |> Js.Undefined.to_opt;

let removeFromParentMap = (child: int, record) => {
  ...record,
  parentMap: WonderCommonlib.SparseMapService.deleteVal(child, record.parentMap)
};

let unsafeGetChildren = (transform: transform, record) =>
  WonderCommonlib.SparseMapService.unsafeGet(transform, record.childMap)
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
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let _setChildren = (record, parent, children) => {
  ...record,
  childMap: WonderCommonlib.SparseMapService.set(parent, children, record.childMap)
};

let _removeChild = (child: int, isKeepOrder, children: array(transform)) =>
  ArrayService.deleteBySwap(
    Js.Array.indexOf(child, children),
    Js.Array.length(children) - 1,
    children
  );

let removeFromChildMap = (parent: int, child: int, isKeepOrder, record) =>
  isKeepOrder ?
    unsafeGetChildren(parent, record)
    |> Js.Array.filter((transform) => transform !== child)
    |> _setChildren(record, parent) :
    {
      unsafeGetChildren(parent, record) |> _removeChild(child, isKeepOrder) |> ignore;
      record
    };

let _removeFromParent = (currentParent: int, child: transform, isKeepOrder, record) =>
  removeFromParentMap(child, record) |> removeFromChildMap(currentParent, child, isKeepOrder);

let _setParent = (parent: transform, child: int, record) => {
  ...record,
  parentMap:
    WonderCommonlib.SparseMapService.set(child, transformToJsUndefine(parent), record.parentMap)
};

let _addChild = (parent: int, child: transform, record) => {
  unsafeGetChildren(parent, record) |> Js.Array.push(child) |> ignore;
  record
};

let _addToParent = (parent: transform, child: transform, record) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(~expect={j|child not has parent|j}, ~actual={j|has|j}),
        () => getParent(child, record) |> assertNotExist
      );
      test(
        Log.buildAssertMessage(~expect={j|parent not already has the child|j}, ~actual={j|has|j}),
        () => unsafeGetChildren(parent, record) |> Js.Array.includes(child) |> assertFalse
      )
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  _setParent(parent, child, record) |> _addChild(parent, child)
};

let rec markHierachyDirty = (transform: transform, {dirtyMap} as record) =>
  record
  |> DirtyTransformService.mark(transform, true)
  |> unsafeGetChildren(transform)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs] ((record, child) => markHierachyDirty(child, record)),
       record
     );

let _isSame = (a: transform, b: transform) => a == b;

let _setNewParent = (parent, child, isKeepOrder, record) =>
  switch (getParent(child, record)) {
  | None => _addToParent(parent, child, record)
  | Some(currentParent) =>
    ! _isSame(currentParent, parent) ?
      _removeFromParent(currentParent, child, isKeepOrder, record) |> _addToParent(parent, child) :
      record
  };

let _setParent = (parent: option(transform), child: transform, isKeepOrder, record) =>
  switch parent {
  | None =>
    switch (getParent(child, record)) {
    | None => record
    | Some(currentParent) => _removeFromParent(currentParent, child, isKeepOrder, record)
    }
  | Some(newParent) => _setNewParent(newParent, child, isKeepOrder, record)
  };

let setParent = (parent: option(transform), child: transform, record) =>
  _setParent(parent, child, false, record) |> markHierachyDirty(child);

let setParentNotMarkDirty = (parent: option(transform), child: transform, record) =>
  _setParent(parent, child, false, record);

let setParentKeepOrder = (parent: option(transform), child: transform, record) =>
  _setParent(parent, child, true, record) |> markHierachyDirty(child);

let setParentKeepOrderNotMarkDirty = (parent: option(transform), child: transform, record) =>
  _setParent(parent, child, true, record);