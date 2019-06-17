let setRenderObjectGlState = (gl, isDepthTest, deviceManagerRecord) =>
  deviceManagerRecord |> AllDeviceManagerService.setDepthTest(gl, isDepthTest);
