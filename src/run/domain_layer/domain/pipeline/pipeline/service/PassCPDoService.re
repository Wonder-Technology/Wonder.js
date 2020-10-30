let setSampleCount = sampleCount => {
  PassCPRepo.setSampleCount(sampleCount);
};

let getCommonBufferDataSize = commonBufferData =>
  commonBufferData->Js.Typed_array.Uint32Array.byteLength;

let getResolutionBufferDataSize = resolutionBufferData =>
  resolutionBufferData->Js.Typed_array.Float32Array.byteLength;
