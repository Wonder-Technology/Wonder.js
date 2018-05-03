open StateDataMainType;

open AmbientLightType;

let _restoreTypeArrays = (currentAmbientLightRecord, targetAmbientLightRecord) =>
  currentAmbientLightRecord.colors === targetAmbientLightRecord.colors ?
    (currentAmbientLightRecord, targetAmbientLightRecord) :
    {
      let colors =
        currentAmbientLightRecord.colors
        |> RecordAmbientLightMainService.setDefaultTypeArrData(
             BufferAmbientLightService.getBufferMaxCount()
           );
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentAmbientLightRecord.colors, 0),
        (targetAmbientLightRecord.colors, 0),
        Js.Typed_array.Float32Array.length(targetAmbientLightRecord.colors)
      )
      |> ignore;
      (currentAmbientLightRecord, targetAmbientLightRecord)
    };

let restore = (currentState, targetState) => {
  let currentAmbientLightRecord = currentState.ambientLightRecord;
  let targetAmbientLightRecord = targetState.ambientLightRecord;
  let (currentAmbientLightRecord, targetAmbientLightRecord) =
    _restoreTypeArrays(currentAmbientLightRecord, targetAmbientLightRecord);
  {
    ...targetState,
    ambientLightRecord: {
      ...targetAmbientLightRecord,
      buffer: currentAmbientLightRecord.buffer,
      colors: currentAmbientLightRecord.colors
    }
  }
};