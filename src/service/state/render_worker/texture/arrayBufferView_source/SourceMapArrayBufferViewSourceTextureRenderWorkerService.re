open StateDataRenderWorkerType;

open RenderWorkerArrayBufferViewSourceTextureType;

let setSourceMap = (sourceMap, state) => {
  let record = RecordArrayBufferViewSourceTextureRenderWorkerService.getRecord(state);
  {...state, arrayBufferViewSourceTextureRecord: Some({...record, sourceMap: Some(sourceMap)})}
};

let addSourceArray = (sourceArray, state) => /* TODO finish */ state;