open PassRTPOType

type accumulationPass = {
  // accumulationPixelBufferData: option<(IWebGPUCoreDp.bufferObject, bufferSize)>,
  staticBindGroupData: option<staticBindGroupData>,
  pipeline: option<IWebGPUCoreDp.renderPipelineObject>,
}
