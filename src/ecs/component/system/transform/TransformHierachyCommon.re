open TransformType;

open Contract;

let _unsafeGetParent = (index: int, transformData: transformData) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(index, transformData.parentMap);

let getParent = (index: int, transformData: transformData) =>
  Js.Undefined.to_opt(WonderCommonlib.SparseMapSystem.unsafeGet(index, transformData.parentMap));

let removeFromParentMap = (childIndex: int, transformData: transformData) => {
  WonderCommonlib.SparseMapSystem.deleteVal(childIndex, transformData.parentMap) |> ignore;
  transformData
};

let unsafeGetChildren = (index: int, transformData: transformData) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(index, transformData.childMap)
  |> ensureCheck(
       (children) =>
         test(
           "children should exist",
           () => children  |> assertNullableExist
         )
     );

let _removeChild = (childIndex: int, children: array(transform)) =>
  ArraySystem.deleteBySwap(
    Js.Array.indexOf(childIndex, children),
    Js.Array.length(children) - 1,
    children
  );

let removeFromChildMap = (parentIndex: int, childIndex: int, transformData: transformData) => {
  unsafeGetChildren(parentIndex, transformData) |> _removeChild(childIndex) |> ignore;
  transformData
};

let _removeFromParent = (currentParentIndex: int, child: transform, transformData: transformData) =>
  removeFromParentMap(child, transformData) |> removeFromChildMap(currentParentIndex, child);

let _setParent = (parent: transform, childIndex: int, transformData: transformData) => {
  WonderCommonlib.SparseMapSystem.set(
    childIndex,
    TransformCastTypeCommon.transformToJsUndefine(parent),
    transformData.parentMap
  )
  |> ignore;
  transformData
};

let _addChild = (parentIndex: int, child: transform, transformData: transformData) => {
  unsafeGetChildren(parentIndex, transformData) |> Js.Array.push(child) |> ignore;
  transformData
};

let _addToParent = (parent: transform, child: transform, transformData: transformData) => {
  requireCheck(
    () => {
      open Contract.Operators;
      test("child shouldn't has parent", () => getParent(child, transformData) |> assertNotExist);
      test(
        "parent shouldn't already has the child",
        () => unsafeGetChildren(parent, transformData) |> Js.Array.includes(child) |> assertFalse
      )
    }
  );
  _setParent(parent, child, transformData) |> _addChild(parent, child)
};

let _setNewParent = (parent, child, transformData) =>
  switch (getParent(child, transformData)) {
  | None => _addToParent(parent, child, transformData)
  | Some(currentParent) =>
    ! TransformJudgeCommon.isSame(currentParent, parent) ?
      _removeFromParent(currentParent, child, transformData) |> _addToParent(parent, child) :
      transformData
  };

let setParent = (parent: option(transform), child: transform, transformData: transformData) =>
  switch parent {
  | None =>
    switch (getParent(child, transformData)) {
    | None => transformData
    | Some(currentParent) => _removeFromParent(currentParent, child, transformData)
    }
  | Some(newParent) => _setNewParent(newParent, child, transformData)
  };