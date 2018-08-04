open StateDataMainType;

open MeshRendererType;

let create =
  (. {settingRecord} as state) => {
    let {index, disposedIndexArray} as meshRendererRecord =
      state |> RecordMeshRendererMainService.getRecord;
    let (index, newIndex, disposedIndexArray) =
      IndexComponentService.generateIndex(index, disposedIndexArray);
    state.meshRendererRecord = 
      Some({...meshRendererRecord, index: newIndex, disposedIndexArray});
    (state, index)
    |> BufferService.checkNotExceedMaxCount(
         BufferSettingService.getMeshRendererCount(settingRecord),
       );
  };