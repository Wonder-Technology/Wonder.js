open StateDataMainType;

let execJob = (_, state) => {
  ...state,
  viewRecord:
    state.viewRecord
    |> ViewService.setCanvas(
         ViewService.unsafeGetCanvas(state.viewRecord)
         |> Obj.magic
         |> ScreenService.setToFullScreen(ScreenService.queryFullScreenData())
       )
};