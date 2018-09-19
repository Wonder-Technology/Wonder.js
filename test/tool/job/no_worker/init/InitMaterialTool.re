let testGetLocation =
    (sandbox, name, (prepareGameObjectFunc, execFunc), state) => {
  open Wonder_jest;
  open Expect;
  open Sinon;
  let (state, gameObject, geometry, material) =
    prepareGameObjectFunc(sandbox, state^);
  let getUniformLocation = GLSLLocationTool.getUniformLocation(sandbox, name);
  let state =
    state
    |> FakeGlTool.setFakeGl(
         FakeGlTool.buildFakeGl(~sandbox, ~getUniformLocation, ()),
       );
  let state = state |> execFunc;
  getUniformLocation |> withTwoArgs(matchAny, name) |> expect |> toCalledOnce;
};

let testLocationCache =
    (sandbox, name, (prepareGameObjectFunc, execFunc), state) => {
  open Wonder_jest;
  open Expect;
  open Sinon;
  let (state, gameObject, geometry, material) =
    prepareGameObjectFunc(sandbox, state^);
  let (state, _, _, _) = prepareGameObjectFunc(sandbox, state);
  let getUniformLocation = GLSLLocationTool.getUniformLocation(sandbox, name);
  let state =
    state
    |> FakeGlTool.setFakeGl(
         FakeGlTool.buildFakeGl(~sandbox, ~getUniformLocation, ()),
       );
  let state = state |> execFunc;
  getUniformLocation |> withTwoArgs(matchAny, name) |> expect |> toCalledOnce;
};

let testOnlySeGlPositionGlFragColorOnce =
    (sandbox, prepareForJudgeGLSLFunc, state) => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;
  let (state, shaderSource) = prepareForJudgeGLSLFunc(sandbox, state^);
  (
    GLSLTool.containSpecifyCount(
      GLSLTool.getVsSource(shaderSource),
      "gl_Position =",
      ~count=1,
      (),
    ),
    GLSLTool.containSpecifyCount(
      GLSLTool.getFsSource(shaderSource),
      "gl_FragColor =",
      ~count=1,
      (),
    ),
  )
  |> expect == (true, true);
};

let testCommonShaderLibGlsl = (sandbox, prepareForJudgeGLSLFunc, state) => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;
  let (state, shaderSource) = prepareForJudgeGLSLFunc(sandbox, state^);
  GLSLTool.containMultiline(
    GLSLTool.getVsSource(shaderSource),
    [{|uniform mat4 u_vMatrix;
|}, {|uniform mat4 u_pMatrix;
|}],
  )
  |> expect == true;
};

let testVertexShaderLibGlsl = (sandbox, prepareForJudgeGLSLFunc, state) => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;
  let (state, shaderSource) = prepareForJudgeGLSLFunc(sandbox, state^);
  GLSLTool.getVsSource(shaderSource)
  |> expect
  |> toContainString({|attribute vec3 a_position;
|});
};