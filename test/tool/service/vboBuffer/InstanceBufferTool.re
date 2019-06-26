open StateDataMainType;

let getDefaultCapacity = () => 1;

let getOrCreateBuffer = (sourceInstance, defaultCapacity, state) => {
  open AllVboBufferType;
  open RenderSourceInstanceType;
  /* open StateRenderType; */
  let state = CreateRenderStateMainService.createRenderState(state);
  let {matrixInstanceBufferMap} = state.vboBufferRecord;
  let {matrixInstanceBufferCapacityMap} = state.sourceInstanceRecord;
  InstanceBufferRenderService.getOrCreateBuffer(
    ([@bs] GlTool.unsafeGetGlFromRenderState(state), sourceInstance, defaultCapacity),
    (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
    state
  )
};

let createMatrixFloat32Array = InstanceBufferRenderService._createMatrixFloat32Array;