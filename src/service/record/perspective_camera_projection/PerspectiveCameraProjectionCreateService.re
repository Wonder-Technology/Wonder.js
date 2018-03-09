open PerspectiveCameraProjectionType;

open ComponentSystem;

let create = ({index, disposedIndexArray, dirtyArray, pMatrixMap} as record) => {
  let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray);
  (
    {
      ...record,
      index: newIndex,
      dirtyArray: DirtyArrayService.addToDirtyArray(index, dirtyArray),
      pMatrixMap: PMatrixService.setDefaultPMatrix(index, pMatrixMap),
      disposedIndexArray
    },
    index
  )
};