open StateDataRenderWorkerType;

let addVboBufferToSourceInstanceBufferMap = (sourceInstanceIndex, state) => {
  ...state,
  vboBufferRecord:
    VboBufferTool.addVboBufferToSourceInstanceBufferMapByRecord(
      sourceInstanceIndex,
      state.vboBufferRecord
    )
};