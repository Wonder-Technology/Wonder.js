open StateDataMainType;

open TransformType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);
    let {buffer, index, localToWorldMatrices} as transformRecord =
      RecordTransformMainService.getRecord(state);
    state.transformRecord =
      Some({
        ...transformRecord,
        copiedBuffer:
          Some(
            CopyArrayBufferService.copyArrayBufferSpecificData(
              buffer,
              CopyTransformService.unsafeGetCopiedBuffer(transformRecord),
              BufferTransformService.getTotalByteLengthForCopiedBuffer(index),
            ),
          ),
      });
    StateDataMainService.setState(stateData, state);
    None;
  });