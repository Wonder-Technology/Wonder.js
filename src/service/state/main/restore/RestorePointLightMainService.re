open StateDataMainType;

open PointLightType;

let restore = (currentState, targetState) => {
  let currentPointLightRecord = currentState.pointLightRecord;
  let targetPointLightRecord = targetState.pointLightRecord;
  let newBuffer =
    CopyArrayBufferService.copyArrayBufferData(
      targetPointLightRecord.buffer,
      currentPointLightRecord.buffer
    );
  {...targetState, pointLightRecord: {...targetPointLightRecord, buffer: newBuffer}}
};