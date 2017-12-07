let getOrCreateBuffer = (sourceInstance, state) => {
  open VboBufferType;
  open SourceInstanceType;
  let {instanceBufferMap} = VboBufferStateSystem.getVboBufferData(state);
  let {instanceBufferCapacityMap} = SourceInstanceStateSystem.getData(state);
  InstanceBufferSystem.getOrCreateBuffer(
    [@bs] GlTool.getGl(state),
    sourceInstance,
    instanceBufferCapacityMap,
    instanceBufferMap
  )
};

let createModelMatrixFloat32Array = InstanceBufferSystem._createModelMatrixFloat32Array;