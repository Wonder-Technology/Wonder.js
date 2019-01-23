let setRenderObjectGlState = (gl, isDepthTest, deviceManagerRecord) =>
  deviceManagerRecord |> DeviceManagerService.setDepthTest(gl, isDepthTest);
