let increaseSampleAccumulation = () => {
  PassCPRepo.setTotalSampleCount(
    PassCPRepo.getTotalSampleCount() + PassCPRepo.getSampleCount(),
  );
};

let getResolutionBufferDataSize = resolutionBufferData =>
  resolutionBufferData->Js.Typed_array.Float32Array.byteLength;
