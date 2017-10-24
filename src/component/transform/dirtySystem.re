open TransformType;

open StateDataType;

open Contract;

open OperateDataSystem;

let _isNotDirty (index: int) (firstDirtyIndex: int) => index < firstDirtyIndex;

let _minusFirstDirtyIndex (firstDirtyIndex: int) =>
  pred firstDirtyIndex
  |> ensureCheck (
       fun r => Contract.Operators.(test "firstDirtyIndex should >= 0" (fun () => r >= 0))
     );

let addFirstDirtyIndex (firstDirtyIndex: int) =>
  succ firstDirtyIndex
  |> ensureCheck (
       fun r =>
         Contract.Operators.(
           test "firstDirtyIndex should <= maxCount" (fun () => r <= getMaxCount ())
         )
     );

let _addOldIndex (index: int) (transformData: transformData) => {
  ArraySystem.push index transformData.oldIndexListBeforeAddToDirtyList |> ignore;
  transformData
};

let unsafePopOldIndexList (transformData: transformData) => {
  requireCheck (
    fun () =>
      Contract.Operators.(
        test
          "old index should exist"
          (fun () => ArraySystem.length transformData.oldIndexListBeforeAddToDirtyList >= 1)
      )
  );
  ArraySystem.unsafePop transformData.oldIndexListBeforeAddToDirtyList
};

let _addToDirtyList (index: int) (firstDirtyIndex:int) (transformData: transformData) => {
  requireCheck (
    fun () =>
      Contract.Operators.(
        test
          "firstDirtyIndex should <= maxCount"
          (fun () => firstDirtyIndex <= getMaxCount ())
      )
  );
  moveTo index firstDirtyIndex transformData
  |> _addOldIndex index
};

/* todo change to recursive tail */
let rec addItAndItsChildrenToDirtyList (index: int) (transformData: transformData) =>
  _isNotDirty index transformData.firstDirtyIndex ?
    {
      let newFirstDirtyIndex = _minusFirstDirtyIndex transformData.firstDirtyIndex;
      transformData.firstDirtyIndex = newFirstDirtyIndex;
      _addToDirtyList index newFirstDirtyIndex transformData |> ignore;
      ChildUtils.unsafeGetChildren (Js.Int.toString index) transformData
      |> ArraySystem.forEach (
           fun (child: transform) => addItAndItsChildrenToDirtyList child transformData |> ignore
         )
      |> ignore;
      transformData
    } :
    transformData;