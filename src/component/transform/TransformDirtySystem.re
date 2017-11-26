open TransformType;

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
     Js.Array.push index transformData.oldIndexArrayBeforeAddToDirtyArray |> ignore;
     transformData
   }; */
/* let unsafePopOldIndexArray (transformData: transformData) => {
     requireCheck (
       fun () =>
         Contract.Operators.(
           test
             "old index should exist"
             (fun () => Js.Array.length transformData.oldIndexArrayBeforeAddToDirtyArray >= 1)
         )
     );
     WonderCommonlib.ArraySystem.unsafePop transformData.oldIndexArrayBeforeAddToDirtyArray
   }; */
let _addToDirtyArray = (index: int, {dirtyArray}: transformData) =>
  /* requireCheck (
       fun () =>
         Contract.Operators.(
           test
             "firstDirtyIndex should <= maxCount"
             (fun () => firstDirtyIndex <= getMaxCount ())
         )
     );
     moveToFromOrigin index firstDirtyIndex transformData */
  Js.Array.push(index, dirtyArray);

let addItAndItsChildrenToDirtyArray = (index: int, transformData: transformData) => {
  let children = ref([|index|]);
  while (Js.Array.length(children^) > 0) {
    let last: int = WonderCommonlib.ArraySystem.unsafePop(children^);
    TransformDirtyUtils.addToDirtyArray(last, transformData) |> ignore;
    children :=
      Js.Array.concat(children^, TransformHierachySystem.unsafeGetChildren(last, transformData))
  };
  transformData
};