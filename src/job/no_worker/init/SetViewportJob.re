open StateDataMainType;

let execJob = (_, state) => {
  let (x, y, width, height, _, _) as screenData = ScreenService.queryFullScreenData();
  let viewportData = (x, y, width, height);
  {
    ...state,
    deviceManagerRecord:
      state.deviceManagerRecord
      |> DeviceManagerService.setViewportOfGl(
           [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
           viewportData
         )
      |> DeviceManagerService.setViewportData(viewportData)
  }
};