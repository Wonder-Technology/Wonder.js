let execJob = (deviceManagerRecord) =>
  AllDeviceManagerService.setSide(
    [@bs] AllDeviceManagerService.unsafeGetGl(deviceManagerRecord),
    FRONT,
    deviceManagerRecord
  )
  |> AllDeviceManagerService.setDepthTest(
       [@bs] AllDeviceManagerService.unsafeGetGl(deviceManagerRecord),
       true
     );