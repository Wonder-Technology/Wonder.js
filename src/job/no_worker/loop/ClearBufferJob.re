open StateDataMainType;

let execJob = (flags, state) => {
  let gl = [@bs] AllDeviceManagerService.unsafeGetGl(state.deviceManagerRecord);
  {
    ...state,
    deviceManagerRecord:
      AllDeviceManagerService.clearBuffer(
        gl,
        ClearBufferJobUtils.getBit(gl, JobConfigService.unsafeGetFlags(flags)),
        state.deviceManagerRecord
      )
  }
};