open StateDataType;

let execJob = (_, state) => {
  let (x, y, width, height, _, _) as screenData = ViewSystem.getFullScreenData();
  let viewportData = (x, y, width, height);
  state
  |> DeviceManagerSystem.setViewportOfGl(
       [@bs] DeviceManagerSystem.unsafeGetGl(state),
       viewportData
     )
  |> DeviceManagerSystem.setViewportData(viewportData)
};