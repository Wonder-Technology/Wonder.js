open StateDataMainType;

open TransformType;

let restore = (currentState, targetState) => {
  let currentTransformRecord = RecordTransformMainService.getRecord(currentState);
  let targetTransformRecord = RecordTransformMainService.getRecord(targetState);
  let newBuffer =
    CopyArrayBufferService.copyArrayBufferData(
      targetTransformRecord.buffer,
      currentTransformRecord.buffer
    );

      /* targetTransformRecord.buffer; */
  {
    ...targetState,
    transformRecord:
      Some({
        ...targetTransformRecord,
        buffer: newBuffer
        /* localToWorldMatrices: currentTransformRecord.localToWorldMatrices,
        localPositions: currentTransformRecord.localPositions */
      })
  }
  /* targetState */
};