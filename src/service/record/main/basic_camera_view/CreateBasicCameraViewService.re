open BasicCameraViewType;

open IndexComponentService;

let create = ({index, disposedIndexArray} as record) => {
  let (index, newIndex, disposedIndexArray) =
    generateIndex(index, disposedIndexArray);

  let record = ActiveBasicCameraViewService.active(index, record);

  ({...record, index: newIndex, disposedIndexArray}, index);
};