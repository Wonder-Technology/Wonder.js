open StateDataMainType;

let getDefaultCapacity = () => 1;

let getOrCreateBuffer = (sourceInstance, defaultCapacity, state) => {
  open VboBufferType;
  open SourceInstanceType;
  let {matrixInstanceBufferMap} = state.vboBufferRecord;
  let {matrixInstanceBufferCapacityMap} = state.sourceInstanceRecord;
  InstanceBufferRenderService.getOrCreateBuffer(
    ([@bs] GlTool.unsafeGetGl(state), sourceInstance, defaultCapacity),
    (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
    state
  )
};

let createMatrixFloat32Array = InstanceBufferRenderService._createMatrixFloat32Array;