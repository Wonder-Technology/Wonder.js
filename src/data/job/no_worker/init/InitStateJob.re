open MainStateDataType;

open DeviceManagerType;

let execJob = (flags, state) => {
  ...state,
  deviceManagerRecord:
    DeviceManagerService.setSide(
      [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
      FRONT,
      state.deviceManagerRecord
    )
};