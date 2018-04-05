open StateDataMainType;

let execJob = (_, state) => {
  ...state,
  viewRecord:
    state.viewRecord
    |> ViewService.setCanvas(
         ViewService.getCanvas(state.viewRecord)
         |> Obj.magic
         |> ViewService.setToFullScreen(ViewService.getFullScreenData())
       )
};