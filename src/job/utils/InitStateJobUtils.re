let execJob = deviceManagerRecord => {
  let gl = AllDeviceManagerService.unsafeGetGl(. deviceManagerRecord);
  AllDeviceManagerService.setSide(
    AllDeviceManagerService.unsafeGetGl(. deviceManagerRecord),
    AllDeviceManagerType.FRONT,
    deviceManagerRecord,
  )
  |> AllDeviceManagerService.setDepthTest(
       AllDeviceManagerService.unsafeGetGl(. deviceManagerRecord),
       true,
     );
};
