let getCommonDataBufferSize = commonDataBufferData =>
  commonDataBufferData->Js.Typed_array.Uint32Array.byteLength;

let setSampleCount = sampleCount => {
  PassCPRepo.setSampleCount(sampleCount);
};
