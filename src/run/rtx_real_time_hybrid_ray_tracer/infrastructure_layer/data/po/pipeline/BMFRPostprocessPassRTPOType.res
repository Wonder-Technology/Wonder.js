open PassRTPOType

type bmfrPostprocessPass = {
  // prevNoisyBufferData: option<(IWebGPUCoreDp.bufferObject, bufferSize)>,
  // prevPositionBufferData: option<(IWebGPUCoreDp.bufferObject, bufferSize)>,
  // prevNormalBufferData: option<(IWebGPUCoreDp.bufferObject, bufferSize)>,
  staticBindGroupData: option<staticBindGroupData>,
  pipeline: option<IWebGPUCoreDp.renderPipelineObject>,
}
