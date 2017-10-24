open TransformType;

open StateDataType;

open Contract;

open ChildUtils;

let getParent (index: string) (transformData: transformData) =>
  Js.Undefined.to_opt (HashMapSystem.unsafeGet transformData.parentMap index);

let _removeFromParentMap (childIndex: string) (transformData: transformData) => {
  HashMapSystem.deleteVal transformData.parentMap childIndex;
  transformData
};

let _removeChild (childIndex: int) (children: array transform) =>
  ArraySystem.deleteBySwap
    (ArraySystem.indexOf childIndex children) (ArraySystem.length children - 1) children;

let _removeFromChildMap (parentIndex: string) (childIndex: int) (transformData: transformData) => {
  unsafeGetChildren parentIndex transformData |> _removeChild childIndex |> ignore;
  transformData
};

let _removeFromParent
    (currentParentIndexStr: string)
    (child: transform)
    (transformData: transformData) =>
  _removeFromParentMap (Js.Int.toString child) transformData
  |> _removeFromChildMap currentParentIndexStr child;

let _setParent (parent: transform) (childIndex: string) (transformData: transformData) => {
  HashMapSystem.set childIndex (CastTypeUtils.transformToJsUndefine parent) transformData.parentMap
  |> ignore;
  transformData
};

let _addChild (parentIndex: string) (child: transform) (transformData: transformData) => {
  unsafeGetChildren parentIndex transformData |> ArraySystem.push child |> ignore;
  transformData
};

let _addToParent (parent: transform) (child: transform) (transformData: transformData) => {
  requireCheck (
    fun () => {
      open Contract.Operators;
      test
        "child shouldn't has parent"
        (fun () => getParent (Js.Int.toString child) transformData |> assertNotExist);
      test
        "parent shouldn't already has the child"
        (
          fun () =>
            unsafeGetChildren (Js.Int.toString parent) transformData
            |> ArraySystem.includes child
            |> assertFalse
        )
    }
  );
  _setParent parent (Js.Int.toString child) transformData
  |> _addChild (Js.Int.toString parent) child
};

let setParent (parent: option transform) (child: transform) (transformData: transformData) => {
  let childStr = Js.Int.toString child;
  switch parent {
  | None =>
    switch (getParent childStr transformData) {
    | None => transformData
    | Some currentParent =>
      let currentParentIndexStr = Js.Int.toString currentParent;
      _removeFromParent currentParentIndexStr child transformData
      |> DirtySystem.addItAndItsChildrenToDirtyList child
    }
  | Some newParent =>
    switch (getParent childStr transformData) {
    | None =>
      _addToParent newParent child transformData
      |> DirtySystem.addItAndItsChildrenToDirtyList child
    | Some currentParent =>
      let currentParentIndexStr = Js.Int.toString currentParent;
      not (TransformJudgeUtils.isSame currentParent newParent) ?
        _removeFromParent currentParentIndexStr child transformData
        |> _addToParent newParent child
        |> DirtySystem.addItAndItsChildrenToDirtyList child :
        transformData
    }
  }
};

let isParent (parent: transform) (child: transform) (transformData: transformData) =>
  switch (getParent (Js.Int.toString child) transformData) {
  | None => false
  | Some currentParent => TransformJudgeUtils.isSame currentParent parent
  };