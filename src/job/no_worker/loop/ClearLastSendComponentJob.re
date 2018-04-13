open StateDataMainType;

let execJob = (_, state) => {
  ...state,
  glslSenderRecord: ClearLastSendComponentJobUtils.execJob(state.glslSenderRecord)
};