let getDefaultCapacity = () => 1;

let getOrCreateBuffer = (sourceInstance, defaultCapacity, state) => {
  open VboBufferType;
  open SourceInstanceType;
  let {matrixInstanceBufferMap} = VboBufferGetStateDataUtils.getVboBufferData(state);
  let {matrixInstanceBufferCapacityMap} = SourceInstanceStateCommon.getSourceInstanceData(state);
  InstanceBufferSystem.getOrCreateBuffer(
    ([@bs] GlTool.unsafeGetGl(state), sourceInstance, defaultCapacity),
    (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
    state
  )
};

let createMatrixFloat32Array = InstanceBufferSystem._createMatrixFloat32Array;