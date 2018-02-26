open StateDataType;

let execJob = (_, state) =>
  state
  |> ViewSystem.setCanvas(
       ViewSystem.getCanvas(state) |> Obj.magic |> ViewSystem.setToFullScreen(ViewSystem.getFullScreenData())
     );