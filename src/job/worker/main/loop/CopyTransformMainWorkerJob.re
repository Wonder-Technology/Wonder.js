open StateDataMainType;

open TransformType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.unsafeGetState(stateData);
      let {buffer, index} as transformRecord = RecordTransformMainService.getRecord(state);
      state.transformRecord =
        Some({
          ...transformRecord,
          copiedBuffer:
            Some(
              CopyArrayBufferService.copyArrayBuffer(
                buffer,
                BufferTransformService.getTotalByteLength(index)
              )
            )
        });
      None
    }
  );