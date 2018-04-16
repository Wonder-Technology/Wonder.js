open StateDataMainType;

open AmbientLightType;

let restore = (currentState, targetState) => {
  let currentAmbientLightRecord = currentState.ambientLightRecord;
  let targetAmbientLightRecord = targetState.ambientLightRecord;
  let newBuffer =
    CopyArrayBufferService.copyArrayBufferData(
      targetAmbientLightRecord.buffer,
      currentAmbientLightRecord.buffer
    );
  {...targetState, ambientLightRecord: {...targetAmbientLightRecord, buffer: newBuffer}}
};