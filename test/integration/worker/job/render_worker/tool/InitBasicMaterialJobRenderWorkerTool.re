let prepareForJudgeGLSLNotExec = (sandbox, state) => {
  open Sinon;
  let (state, gameObject, _, _) = InitBasicMaterialJobTool.prepareGameObject(sandbox, state);
  let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlToolWorker.setFakeGl(FakeGlToolWorker.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()));
  (state, shaderSource, gameObject)
};

let prepareForJudgeGLSL = (sandbox, state) => {
  let (state, shaderSource, _) = prepareForJudgeGLSLNotExec(sandbox, state);
  /* let state = state |> exec; */
  shaderSource
};