open StateDataType;

open Contract;

open HierachySystem;

open OperateDataSystem;

open DirtySystem;

let _moveFromDirtyListToNormalList (index: int) (transformData: transformData) => {
  transformData.firstDirtyIndex = addFirstDirtyIndex transformData.firstDirtyIndex;
  moveTo index (unsafePopOldIndexList transformData) transformData
};

/* todo optimize: if transform not transformed in 5 frames, not move off */
let _cleanDirtyList (transformData: transformData) (dirtyList: list int) => {
  dirtyList
  |> List.iter (fun index => _moveFromDirtyListToNormalList index transformData |> ignore);
  transformData
};

let _transform ({localToWorldMatrices, localPositions} as transformData) (dirtyList: list int) => {
  open Matrix4System;
  dirtyList
  |> List.iter (
       fun index => {
         /* todo from rotation, scale */
         let mat =
           fromTranslation localPositions (getVector3DataIndex index) (ArraySystem.createEmpty ());
         switch (getParent (Js.Int.toString index) transformData) {
         | Some parent =>
           setLocalToWorldMatricesTypeArr
           (getMatrix4DataIndex index)
           (
             multiply
               localToWorldMatrices (getMatrix4DataIndex parent) mat 0 (ArraySystem.createEmpty ())
           )
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

let _sortParentBeforeChildInDirtyList (transformData: transformData) (dirtyList: list int) => {
  dirtyList
  |> List.iter (
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
     );
  dirtyList
};

let _updateDirtyList (transformData: transformData) (dirtyList: list int) => {
  requireCheck (
    fun () =>
      Contract.Operators.(
        test
          "firstDirtyIndex should <= maxCount"
          (fun () => transformData.firstDirtyIndex <= getMaxCount ())
      )
  );
  dirtyList |> _sortParentBeforeChildInDirtyList transformData |> _transform transformData
};

let update (elapsed: float) (transformData: transformData) =>
  ListUtils.range transformData.firstDirtyIndex (getMaxCount () - 1)
  |> _updateDirtyList transformData
  |> _cleanDirtyList transformData;