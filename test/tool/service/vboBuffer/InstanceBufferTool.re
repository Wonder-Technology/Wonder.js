open StateDataType;

let getDefaultCapacity = () => 1;

let getOrCreateBuffer = (sourceInstance, defaultCapacity, state) => {
  open VboBufferType;
  open SourceInstanceType;
  let {matrixInstanceBufferMap} = state.vboBufferRecord;
  let {matrixInstanceBufferCapacityMap} = state.sourceInstanceRecord;
  InstanceBufferService.getOrCreateBuffer(
    ([@bs] GlTool.unsafeGetGl(state), sourceInstance, defaultCapacity),
    (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
    state
  )
};

let createMatrixFloat32Array = InstanceBufferService._createMatrixFloat32Array;