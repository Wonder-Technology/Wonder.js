let execJob = (deviceManagerRecord) =>
{
let gl = [@bs] AllDeviceManagerService.unsafeGetGl(deviceManagerRecord);
  AllDeviceManagerService.setSide(
    [@bs] AllDeviceManagerService.unsafeGetGl(deviceManagerRecord),
    FRONT,
    deviceManagerRecord
  )
  |> AllDeviceManagerService.setDepthTest(
       [@bs] AllDeviceManagerService.unsafeGetGl(deviceManagerRecord),
       true
     );
}