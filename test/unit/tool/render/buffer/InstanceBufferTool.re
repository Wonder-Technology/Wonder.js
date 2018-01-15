let getOrCreateBuffer = (sourceInstance, state) => {
  open VboBufferType;
  open SourceInstanceType;
  let {modelMatrixInstanceBufferMap} = VboBufferGetStateDataUtils.getVboBufferData(state);
  let {modelMatrixInstanceBufferCapacityMap} =
    SourceInstanceStateCommon.getSourceInstanceData(state);
  InstanceBufferSystem.getOrCreateBuffer(
    [@bs] GlTool.unsafeGetGl(state),
    sourceInstance,
    (modelMatrixInstanceBufferCapacityMap, modelMatrixInstanceBufferMap),
    state
  )
};

let createModelMatrixFloat32Array = InstanceBufferSystem._createModelMatrixFloat32Array;