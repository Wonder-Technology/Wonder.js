open StateDataMainType;

let build = state => (
  ManageIMGUIMainService.getCustomData(state)
  |> SerializeService.serializeValueWithFunction,
  switch (ManageIMGUIMainService.getIMGUIFunc(state)) {
  | None => None
  | Some(imguiFunc) => imguiFunc |> SerializeService.serializeFunction
  },
);