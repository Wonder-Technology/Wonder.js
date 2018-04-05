open MaterialType;

open StateDataMainType;

open LightMaterialType;

let create =
  [@bs]
  (
    ({settingRecord} as state) => {
      let {index, disposedIndexArray} as lightMaterialRecord =
        state |> RecordLightMaterialMainService.getRecord;
      let (index, newIndex, disposedIndexArray) =
        IndexComponentService.generateIndex(index, disposedIndexArray);
      ({...state, lightMaterialRecord: Some({...lightMaterialRecord, index: newIndex})}, index)
      |> BufferService.checkNotExceedMaxCount(
           BufferSettingService.getBasicMaterialDataBufferCount(settingRecord)
         )
    }
  );