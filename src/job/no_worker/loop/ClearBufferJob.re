open StateDataMainType;

let execJob = (flags, state) => {
  let gl = [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord);
  {
    ...state,
    deviceManagerRecord:
      DeviceManagerService.clearBuffer(
        gl,
        ClearBufferJobUtils.getBit(gl, JobConfigService.unsafeGetFlags(flags)),
        state.deviceManagerRecord
      )
  }
};