open TransformType;

open Contract;

let _unsafeGetParent = (index: int, transformData: transformData) =>
  SparseMapSystem.unsafeGet(index, transformData.parentMap);

let getParent = (index: int, transformData: transformData) =>
  Js.Undefined.to_opt(SparseMapSystem.unsafeGet(index, transformData.parentMap));

let removeFromParentMap = (childIndex: int, transformData: transformData) => {
  SparseMapSystem.deleteVal(childIndex, transformData.parentMap) |> ignore;
  transformData
};

let unsafeGetChildren = (index: int, transformData: transformData) =>
  SparseMapSystem.unsafeGet(index, transformData.childMap)
  |> ensureCheck(
       (_) =>
         test(
           "children should exist",
           () => SparseMapSystem.get(index, transformData.childMap) |> assertExist
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
  SparseMapSystem.set(
    childIndex,
    TransformCastTypeUtils.transformToJsUndefine(parent),
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

let setParent = (parent: option(transform), child: transform, transformData: transformData) => {
  switch parent {
  | None =>
    switch (getParent(child, transformData)) {
    | None => transformData
    | Some(currentParent) =>
      let currentParentIndex = currentParent;
      _removeFromParent(currentParentIndex, child, transformData)
    }
  | Some(newParent) =>
    switch (getParent(child, transformData)) {
    | None => _addToParent(newParent, child, transformData)
    | Some(currentParent) =>
      let currentParentIndex = currentParent;
      ! TransformJudgeUtils.isSame(currentParent, newParent) ?
        _removeFromParent(currentParentIndex, child, transformData)
        |> _addToParent(newParent, child) :
        transformData
    }
  }
};

let isParent = (parent: transform, child: transform, transformData: transformData) =>
  _unsafeGetParent(child, transformData) === Js.Undefined.return(parent);
/* switch (getParent((child), transformData)) {
   | None => false
   | Some(currentParent) => TransformJudgeUtils.isSame(currentParent, parent)
   }; */