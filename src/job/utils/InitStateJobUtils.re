let execJob = (deviceManagerRecord) =>
  DeviceManagerService.setSide(
    [@bs] DeviceManagerService.unsafeGetGl(deviceManagerRecord),
    FRONT,
    deviceManagerRecord
  )
  |> DeviceManagerService.setDepthTest(
       [@bs] DeviceManagerService.unsafeGetGl(deviceManagerRecord),
       true
     );