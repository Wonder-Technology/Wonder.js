let execJob = (flags, deviceManagerRecord) =>
  AllDeviceManagerService.clearColor(
    [@bs] AllDeviceManagerService.unsafeGetGl(deviceManagerRecord),
    ColorService.convert16HexToRGBA(JobConfigUtils.getOperateType(flags)),
    deviceManagerRecord
  );