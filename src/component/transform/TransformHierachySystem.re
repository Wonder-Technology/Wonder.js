open TransformType;

open Contract;

let _unsafeGetParent = (index: string, transformData: transformData) =>
  WonderCommonlib.HashMapSystem.unsafeGet(index, transformData.parentMap);

let getParent = (index: string, transformData: transformData) =>
  Js.Undefined.to_opt(WonderCommonlib.HashMapSystem.unsafeGet(index, transformData.parentMap));

let removeFromParentMap = (childIndex: string, transformData: transformData) => {
  HashMapSystem.deleteVal(childIndex, transformData.parentMap) |> ignore;
  transformData
};

let unsafeGetChildren = (index: string, transformData: transformData) =>
  WonderCommonlib.HashMapSystem.unsafeGet(index, transformData.childMap)
  |> ensureCheck(
       (_) =>
         test(
           "children should exist",
           () => WonderCommonlib.HashMapSystem.get(index, transformData.childMap) |> assertExist
         )
     );

let _removeChild = (childIndex: int, children: array(transform)) =>
  ArraySystem.deleteBySwap(
    Js.Array.indexOf(childIndex, children),
    Js.Array.length(children) - 1,
    children
  );

let removeFromChildMap = (parentIndex: string, childIndex: int, transformData: transformData) => {
  unsafeGetChildren(parentIndex, transformData) |> _removeChild(childIndex) |> ignore;
  transformData
};

let _removeFromParent =
    (currentParentIndexStr: string, child: transform, transformData: transformData) =>
  removeFromParentMap(Js.Int.toString(child), transformData)
  |> removeFromChildMap(currentParentIndexStr, child);

let _setParent = (parent: transform, childIndex: string, transformData: transformData) => {
  WonderCommonlib.HashMapSystem.set(
    childIndex,
    TransformCastTypeUtils.transformToJsUndefine(parent),
    transformData.parentMap
  )
  |> ignore;
  transformData
};

let _addChild = (parentIndex: string, child: transform, transformData: transformData) => {
  unsafeGetChildren(parentIndex, transformData) |> Js.Array.push(child) |> ignore;
  transformData
};

let _addToParent = (parent: transform, child: transform, transformData: transformData) => {
  requireCheck(
    () => {
      open Contract.Operators;
      test(
        "child shouldn't has parent",
        () => getParent(Js.Int.toString(child), transformData) |> assertNotExist
      );
      test(
        "parent shouldn't already has the child",
        () =>
          unsafeGetChildren(Js.Int.toString(parent), transformData)
          |> Js.Array.includes(child)
          |> assertFalse
      )
    }
  );
  _setParent(parent, Js.Int.toString(child), transformData)
  |> _addChild(Js.Int.toString(parent), child)
};

let setParent = (parent: option(transform), child: transform, transformData: transformData) => {
  let childStr = Js.Int.toString(child);
  switch parent {
  | None =>
    switch (getParent(childStr, transformData)) {
    | None => transformData
    | Some(currentParent) =>
      let currentParentIndexStr = Js.Int.toString(currentParent);
      _removeFromParent(currentParentIndexStr, child, transformData)
    }
  | Some(newParent) =>
    switch (getParent(childStr, transformData)) {
    | None => _addToParent(newParent, child, transformData)
    | Some(currentParent) =>
      let currentParentIndexStr = Js.Int.toString(currentParent);
      ! TransformJudgeUtils.isSame(currentParent, newParent) ?
        _removeFromParent(currentParentIndexStr, child, transformData)
        |> _addToParent(newParent, child) :
        transformData
    }
  }
};

let isParent = (parent: transform, child: transform, transformData: transformData) =>
  _unsafeGetParent(Js.Int.toString(child), transformData) === Js.Undefined.return(parent);
/* switch (getParent(Js.Int.toString(child), transformData)) {
   | None => false
   | Some(currentParent) => TransformJudgeUtils.isSame(currentParent, parent)
   }; */