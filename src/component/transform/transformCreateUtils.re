open TransformType;

open ComponentSystem;

let create = ({index, disposedIndexArray} as data) => {
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  index
};