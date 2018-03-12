open ComponentSystem;

open MeshRendererType;

let create = ({index, disposedIndexArray} as record) => {
  let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray);
  ({...record, index: newIndex, disposedIndexArray}, index)
};