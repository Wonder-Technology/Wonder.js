let getOrCreateBuffer = (sourceInstance, state) => {
  open VboBufferType;
  open SourceInstanceType;
  let {modelMatrixInstanceBufferMap} = VboBufferStateUtils.getVboBufferData(state);
  let {modelMatrixInstanceBufferCapacityMap} = SourceInstanceStateCommon.getData(state);
  InstanceBufferSystem.getOrCreateBuffer(
    [@bs] GlTool.getGl(state),
    sourceInstance,
    modelMatrixInstanceBufferCapacityMap,
    modelMatrixInstanceBufferMap
  )
};

let createModelMatrixFloat32Array = InstanceBufferSystem._createModelMatrixFloat32Array;