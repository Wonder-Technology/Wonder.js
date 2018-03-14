open StateDataType;

let getDefaultCapacity = () => 1;

let getOrCreateBuffer = (sourceInstance, defaultCapacity, state) => {
  open VboBufferType;
  open SourceInstanceType;
  let {matrixInstanceBufferMap} = state.vboBufferRecord;
  let {matrixInstanceBufferCapacityMap} = state.sourceInstanceRecord;
  InstanceBufferMainService.getOrCreateBuffer(
    ([@bs] GlTool.unsafeGetGl(state), sourceInstance, defaultCapacity),
    (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
    state
  )
};

let createMatrixFloat32Array = InstanceBufferMainService._createMatrixFloat32Array;