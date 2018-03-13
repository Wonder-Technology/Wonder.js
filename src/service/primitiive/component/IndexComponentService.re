let _getDisposedIndex = (disposedIndexArray) => (
  disposedIndexArray,
  disposedIndexArray |> Js.Array.pop
);

let generateIndex = (index, disposedIndexArray) =>
  switch (_getDisposedIndex(disposedIndexArray)) {
  | (disposedIndexArray, None) => (index, succ(index), disposedIndexArray)
  | (disposedIndexArray, Some(disposedIndex)) => (disposedIndex, index, disposedIndexArray)
  };