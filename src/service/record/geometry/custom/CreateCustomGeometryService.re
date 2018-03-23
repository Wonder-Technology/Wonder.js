open GeometryType;

open CustomGeometryType;

let create = ({disposedIndexArray, aliveIndexArray, index} as record) => {
  let (index, newIndex, disposedIndexArray) =
    IndexComponentService.generateIndex(index, disposedIndexArray);
  (
    {...record, index: newIndex, aliveIndexArray: aliveIndexArray |> ArrayService.push(index)},
    index
  )
};