let prepareForUseProgram = (sandbox, state) => {
  let (state, _, _, _, _) = RenderBasicJobTool.prepareGameObject(sandbox, state);
  let (state, _, _, _) = CameraTool.createCameraGameObject(state);
  state
};