open PassRTPOType

type bmfrRegressionPass = {
  // tmdBufferData: option<(IWebGPUCoreDp.bufferObject, bufferSize)>,
  // outBufferData: option<(IWebGPUCoreDp.bufferObject, bufferSize)>,
  frameIndex: int,
  commonBufferData: option<(IWebGPUCoreDp.bufferObject, Js.Typed_array.Uint32Array.t)>,
  staticBindGroupData: option<staticBindGroupData>,
  pipeline: option<IWebGPUCoreDp.computePipelineObject>,
}
