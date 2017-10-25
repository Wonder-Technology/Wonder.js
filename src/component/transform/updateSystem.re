open StateDataType;

open Contract;

open HierachySystem;

open OperateDataSystem;

open DirtySystem;

/* let _moveFromDirtyListToNormalList (index: int) (transformData: transformData) => {
     transformData.firstDirtyIndex = addFirstDirtyIndex transformData.firstDirtyIndex;
     moveTo index (unsafePopOldIndexList transformData) transformData
   }; */
/* ////todo optimize: if transform not transformed in 5 frames, not move off */
let _cleanDirtyList (transformData: transformData) =>
  /* dirtyList
     |> ArraySystem.forEach (fun index => _moveFromDirtyListToNormalList index transformData |> ignore); */
  transformData.dirtyList =
    ArraySystem.createEmpty ();

let _transform
    (floatArr_1: ArraySystem.t float)
    ({localToWorldMatrices, localPositions} as transformData)
    (dirtyList: array int) => {
  open Matrix4System;
  dirtyList
  |> ArraySystem.forEach (
       fun index => {
         /* todo from rotation, scale */
         let mat = fromTranslation localPositions (getVector3DataIndex index) ;
         switch (getParent (Js.Int.toString index) transformData) {
         | Some parent =>
           setLocalToWorldMatricesTypeArr
           (getMatrix4DataIndex index)
           (multiply localToWorldMatrices (getMatrix4DataIndex parent) mat 0)
           localToWorldMatrices
           [@bs]
           |> ignore
         | None =>
           setLocalToWorldMatricesTypeArr
           (getMatrix4DataIndex index)
           mat
           localToWorldMatrices
           [@bs]
           |> ignore
         }
       }
     );
  dirtyList
};

let _sortParentBeforeChildInDirtyList (transformData: transformData) (dirtyList: array int) => {
  dirtyList |> ArraySystem.fastSort (fun a b => isParent b a transformData ? 1 : 0);
  /* |> ArraySystem.forEach (
       fun index =>
         switch (getParent (Js.Int.toString index) transformData) {
         | Some parent =>
           if (parent > index) {
             swap parent index transformData |> ignore
           } else {
             ()
           }
         | None => ()
         }
     ); */
  dirtyList
};

let _updateDirtyList
    (floatArr_1: ArraySystem.t float)
    (transformData: transformData)
    (dirtyList: array int) => {
  /* requireCheck (
       fun () =>
         Contract.Operators.(
           test
             "firstDirtyIndex should <= maxCount"
             (fun () => transformData.firstDirtyIndex <= getMaxCount ())
         )
     ); */
  dirtyList
  |> _sortParentBeforeChildInDirtyList transformData
  |> _transform floatArr_1 transformData
  |> ignore;
  transformData
};

let update {floatArr_1} (transformData: transformData) =>
  /* ArraySystem.range transformData.firstDirtyIndex (getMaxCount () - 1)
     |> _updateDirtyList floatArr_1 transformData
     |> _cleanDirtyList transformData; */
  transformData.dirtyList
  |> ArraySystem.removeDuplicateItems
  |> _updateDirtyList floatArr_1 transformData
  |> _cleanDirtyList;