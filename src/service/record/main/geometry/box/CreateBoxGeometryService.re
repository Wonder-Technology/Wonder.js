open GeometryType;

open BoxGeometryType;

let create = ({disposedIndexArray, index} as record) => {
  let (index, newIndex, disposedIndexArray) =
    IndexComponentService.generateIndex(index, disposedIndexArray);
  ({...record, index: newIndex}, index)
};