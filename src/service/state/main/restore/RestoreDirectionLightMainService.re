open StateDataMainType;

open DirectionLightType;

let restore = (currentState, targetState) => {
  let currentDirectionLightRecord = currentState.directionLightRecord;
  let targetDirectionLightRecord = targetState.directionLightRecord;
  let newBuffer =
    CopyArrayBufferService.copyArrayBufferData(
      targetDirectionLightRecord.buffer,
      currentDirectionLightRecord.buffer
    );
  {...targetState, directionLightRecord: {...targetDirectionLightRecord, buffer: newBuffer}}
};