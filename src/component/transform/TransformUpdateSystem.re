open TransformType;

open TransformHierachySystem;

open TransformOperateDataUtils;

/* let _moveFromDirtyArrayToNormalArray (index: int) (transformData: transformData) => {
     transformData.firstDirtyIndex = addFirstDirtyIndex transformData.firstDirtyIndex;
     moveTo index (unsafePopOldIndexArray transformData) transformData
   }; */
/* ////todo optimize: if transform not transformed in 5 frames, not move off */
let _cleanDirtyArray = (transformData: transformData) =>
  /* dirtyArray
     |> Js.Array.forEach (fun index => _moveFromDirtyArrayToNormalArray index transformData |> ignore); */
  transformData.dirtyArray = WonderCommonlib.ArraySystem.createEmpty();

let _transform = ({localToWorldMatrices, localPositions} as transformData, dirtyArray: array(int)) => {
  open Matrix4System;
  for (i in 0 to Js.Array.length(dirtyArray) - 1) {
    let index = Array.unsafe_get(dirtyArray, i);
    /* todo from rotation, scale */
    let mat = fromTranslation(localPositions, getVector3DataIndex(index));
    switch (getParent((index), transformData)) {
    | Some(parent) =>
      [@bs]
      setLocalToWorldMatricesTypeArr(
        index,
        multiply(localToWorldMatrices, getMatrix4DataIndex(parent), mat, 0),
        localToWorldMatrices
      )
      |> ignore
    | None => [@bs] setLocalToWorldMatricesTypeArr(index, mat, localToWorldMatrices) |> ignore
    }
  };
  dirtyArray
};

let _sortParentBeforeChildInDirtyArray = (transformData: transformData, dirtyArray: array(int)) => {
  /* dirtyArray |> Js.Array.sortInPlaceWith((a, b) => isParent(a, b, transformData) ? 0 : 1); */
  dirtyArray |> Array.fast_sort((a, b) => isParent(a, b, transformData) ? 0 : 1);
  dirtyArray
};

let _updateDirtyArray = (transformData: transformData, dirtyArray: array(int)) => {
  /* requireCheck (
       fun () =>
         Contract.Operators.(
           test
             "firstDirtyIndex should <= maxCount"
             (fun () => transformData.firstDirtyIndex <= getMaxCount ())
         )
     ); */
  dirtyArray
  |> _sortParentBeforeChildInDirtyArray(transformData)
  |> _transform(transformData)
  |> ignore;
  transformData
};

let update = (transformData: transformData) =>
  transformData.dirtyArray
  |> WonderCommonlib.ArraySystem.removeDuplicateItems
  |> _updateDirtyArray(transformData)
  |> _cleanDirtyArray;