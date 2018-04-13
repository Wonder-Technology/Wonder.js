let execJob = (flags, deviceManagerRecord) =>
  DeviceManagerService.clearColor(
    [@bs] DeviceManagerService.unsafeGetGl(deviceManagerRecord),
    ColorService.convert16HexToRGBA(JobConfigUtils.getOperateType(flags)),
    deviceManagerRecord
  );