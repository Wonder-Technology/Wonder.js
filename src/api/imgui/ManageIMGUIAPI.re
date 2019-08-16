open StateDataMainType;

let setIMGUIFunc = ManageIMGUIMainService.setIMGUIFunc;

let clearIMGUIFunc = ManageIMGUIMainService.clearIMGUIFunc;

let sendCustomTextureProgramUniformProjectionMatData = (gl, canvasSize, state) =>
  ManageIMGUIMainService.sendCustomTextureProgramUniformProjectionMatData(
    gl,
    canvasSize,
    state,
  );

let sendFontTextureProgramUniformProjectionMatData = (gl, canvasSize, state) =>
  ManageIMGUIMainService.sendFontTextureProgramUniformProjectionMatData(
    gl,
    canvasSize,
    state,
  );

let sendNoTextureProgramUniformProjectionMatData = (gl, canvasSize, state) =>
  ManageIMGUIMainService.sendNoTextureProgramUniformProjectionMatData(
    gl,
    canvasSize,
    state,
  );