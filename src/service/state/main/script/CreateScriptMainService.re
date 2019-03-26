open StateDataMainType;

let create = ({settingRecord} as state) => {
  let {disposedIndexArray, index} as scriptRecord =
    RecordScriptMainService.getRecord(state);
  let (index, newIndex, disposedIndexArray) =
    IndexComponentService.generateIndex(index, disposedIndexArray);

  state.scriptRecord = {...scriptRecord, index: newIndex, disposedIndexArray};

  (state, index);
};