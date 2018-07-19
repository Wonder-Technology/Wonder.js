open StateDataMainType;

let build = state => (
  ManageIMGUIMainService.getCustomData(state),
  switch (ManageIMGUIMainService.getIMGUIFunc(state)) {
  | None => None
  | Some(imguiFunc) => imguiFunc |> SerializeService.serializeFunction
  },
);