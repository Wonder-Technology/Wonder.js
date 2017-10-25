open TransformType;

open StateDataType;

open Contract;

open OperateDataSystem;

/* let _isNotDirty (originIndex: int) ({firstDirtyIndex, originToMoveIndexMap} as transformData) => { 
  switch IndexMapUtils.getMoveIndex originIndex originToMoveIndexMap {
  | None => true
  | Some moveIndex => moveIndex < firstDirtyIndex
  }
}; */

/* let _minusFirstDirtyIndex (firstDirtyIndex: int) =>
  pred firstDirtyIndex
  |> ensureCheck (
       fun r => Contract.Operators.(test "firstDirtyIndex should >= 0" (fun () => r >= 0))
     ); */

/* let addFirstDirtyIndex (firstDirtyIndex: int) =>
  succ firstDirtyIndex
  |> ensureCheck (
       fun r =>
         Contract.Operators.(
           test "firstDirtyIndex should <= maxCount" (fun () => r <= getMaxCount ())
         )
     ); */

/* let _addOldIndex (index: int) (transformData: transformData) => {
  ArraySystem.push index transformData.oldIndexListBeforeAddToDirtyList |> ignore;
  transformData
}; */

/* let unsafePopOldIndexList (transformData: transformData) => {
  requireCheck (
    fun () =>
      Contract.Operators.(
        test
          "old index should exist"
          (fun () => ArraySystem.length transformData.oldIndexListBeforeAddToDirtyList >= 1)
      )
  );
  ArraySystem.unsafePop transformData.oldIndexListBeforeAddToDirtyList
}; */

let _addToDirtyList (index: int) ({dirtyList}) => {
  /* requireCheck (
    fun () =>
      Contract.Operators.(
        test
          "firstDirtyIndex should <= maxCount"
          (fun () => firstDirtyIndex <= getMaxCount ())
      )
  );
  moveToFromOrigin index firstDirtyIndex transformData */
  ArraySystem.push index dirtyList;
};

/* todo change to recursive tail/loop */
let rec addItAndItsChildrenToDirtyList (index: int) (transformData: transformData) =>
  /* _isNotDirty index transformData ? */
    {
      /* let newFirstDirtyIndex = _minusFirstDirtyIndex transformData.firstDirtyIndex;
      transformData.firstDirtyIndex = newFirstDirtyIndex; */
      _addToDirtyList index transformData |> ignore;
      ChildUtils.unsafeGetChildren (Js.Int.toString index) transformData
      |> ArraySystem.forEach (
           fun (child: transform) => addItAndItsChildrenToDirtyList child transformData |> ignore
         )
      |> ignore;
      transformData
    }