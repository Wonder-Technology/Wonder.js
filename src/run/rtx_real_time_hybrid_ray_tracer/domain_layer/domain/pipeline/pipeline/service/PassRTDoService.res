let setSampleCount = sampleCount => PassRTRepo.setSampleCount(sampleCount)

let getCommonBufferDataSize = commonBufferData =>
  commonBufferData->Js.Typed_array.Uint32Array.byteLength

let getResolutionBufferDataSize = resolutionBufferData =>
  resolutionBufferData->Js.Typed_array.Float32Array.byteLength

let buildPixelBufferData = (window, device) => {
  let bufferSize =
    WebGPUCoreDpRunAPI.unsafeGet().window.getWidth(window) *
    WebGPUCoreDpRunAPI.unsafeGet().window.getHeight(window) *
    4 *
    Js.Typed_array.Float32Array._BYTES_PER_ELEMENT

  let buffer = StorageBufferVO.createFromDevice(~device, ~bufferSize, ())

  (buffer, bufferSize)
}
