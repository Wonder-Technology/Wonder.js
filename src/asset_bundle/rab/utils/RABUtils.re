let computeBufferViewDataByteLength = bufferViewArr =>
  switch (bufferViewArr |> ArrayService.getLast) {
  | None => 0
  | Some(({byteOffset, byteLength}: RABType.bufferView)) =>
    byteOffset + BufferUtils.alignedLength(byteLength)
  };