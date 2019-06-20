open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let testGetLocation = (sandbox, name, callCount, execFunc, state) => {
  let state = state^;

  let getUniformLocation = GLSLLocationTool.getUniformLocation(sandbox, name);
  let state =
    state
    |> FakeGlTool.setFakeGl(
         FakeGlTool.buildFakeGl(~sandbox, ~getUniformLocation, ()),
       );

  let state = state |> execFunc;

  getUniformLocation
  |> withTwoArgs(matchAny, name)
  |> getCallCount
  |> expect == callCount;
};

let prepareForJudgeGLSLNotExec = (sandbox, state) => {
  let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(
         FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ~createProgram, ()),
       );
  (state, shaderSource);
};

module TestUseProgram = {
  let prepareAndExec = (sandbox, state, shaderName) => {
    let program1 = Obj.magic(1);
    let program2 = Obj.magic(2);
    let createProgram =
      createEmptyStubWithJsObjSandbox(sandbox)
      |> onCall(0)
      |> returns(program1)
      |> onCall(1)
      |> returns(program2);
    let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
    let state =
      state^
      |> FakeGlTool.setFakeGl(
           FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ()),
         );

    let state = state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

    let shaderIndex = ShaderTool.getNoMaterialShaderIndex(shaderName, state);

    (state, useProgram, shaderIndex);
  };
};