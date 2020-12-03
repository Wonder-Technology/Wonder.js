type bufferSize = int

type setSlot = int

type staticBindGroupData = {
  setSlot: setSlot,
  bindGroup: IWebGPUCoreDp.bindGroupObject,
}

type pass = {
  sampleCount: int,
  totalSampleCount: int,
  commonBufferData: option<(IWebGPUCoreDp.bufferObject, Js.Typed_array.Uint32Array.t)>,
  resolutionBufferData: option<(IWebGPUCoreDp.bufferObject, Js.Typed_array.Float32Array.t)>,
  pixelBufferData: option<(IWebGPUCoreDp.bufferObject, bufferSize)>,
}
