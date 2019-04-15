let computeBufferViewDataByteLength = bufferViewArr =>
  switch (bufferViewArr |> ArrayService.getLast) {
  | None => 0
  | Some(({byteOffset, byteLength}: WDType.bufferView)) =>
    byteOffset + BufferUtils.alignedLength(byteLength)
  };