/* TODO duplicate */
open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      state.glslSenderRecord = {
        ...state.glslSenderRecord,
        lastSendMaterial: None,
        lastSendGeometry: None
      };
      e
    }
  );