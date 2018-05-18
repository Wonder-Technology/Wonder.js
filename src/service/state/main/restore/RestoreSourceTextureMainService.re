open StateDataMainType;

open SourceTextureType;

let restore = (currentState, targetState) => {
  let currentTextureRecord = RecordSourceTextureMainService.getRecord(currentState);
  let targetTextureRecord = RecordSourceTextureMainService.getRecord(targetState);
  {...targetState, sourceTextureRecord: Some({buffer: currentTextureRecord.buffer})}
};