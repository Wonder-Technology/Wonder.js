let testModelMatrixInstanceShaderLibs =
    (sandbox, (prepareForJudgeGLSLFunc, prepareForJudgeGLSLNotExecFunc, execFunc), state) => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;
  open Sinon;
  test(
    "if has no sourceInstance component, use modelMatrix_noInstance shader lib",
    () => {
      let shaderSource = prepareForJudgeGLSLFunc(sandbox, state^);
      GLSLTool.containMultiline(
        GLSLTool.getVsSource(shaderSource),
        [{|uniform mat4 u_mMatrix;|}, {|mat4 mMatrix = u_mMatrix;|}]
      )
      |> expect == true
    }
  );
  describe(
    "else",
    () => {
      test(
        "if support hardware instance, use modelMatrix_hardware_instance shader lib",
        () => {
          let (state, shaderSource, gameObject) = prepareForJudgeGLSLNotExecFunc(sandbox, state^);
          let (state, _) = state |> InstanceTool.addSourceInstance(gameObject);
          let state = state |> InstanceTool.setGPUDetectDataAllowHardwareInstance(sandbox);
          let state = state |> execFunc;
          GLSLTool.containMultiline(
            GLSLTool.getVsSource(shaderSource),
            [
              {|attribute vec4 a_mVec4_0;|},
              {|attribute vec4 a_mVec4_1;|},
              {|attribute vec4 a_mVec4_2;|},
              {|attribute vec4 a_mVec4_3;|},
              {|mat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3);|}
            ]
          )
          |> expect == true
        }
      );
      describe(
        "else, use modelMatrix_batch_instance shader lib",
        () => {
          open StateDataMainType;
          let _setGPUConfigDataAllowBatchInstance = (state) =>
            SettingTool.setGPU({useHardwareInstance: false}, state);
          test(
            "if state->gpuConfig->useHardwareInstance == false, use batch",
            () => {
              let (state, shaderSource, gameObject) =
                prepareForJudgeGLSLNotExecFunc(sandbox, state^);
              let (state, _) = state |> InstanceTool.addSourceInstance(gameObject);
              let state = state |> _setGPUConfigDataAllowBatchInstance;
              let state = state |> execFunc;
              GLSLTool.containMultiline(
                GLSLTool.getVsSource(shaderSource),
                [{|uniform mat4 u_mMatrix;|}, {|mat4 mMatrix = u_mMatrix;|}]
              )
              |> expect == true
            }
          );
          test(
            "if gpu not support hardware instance, use batch",
            () => {
              let (state, shaderSource, gameObject) =
                prepareForJudgeGLSLNotExecFunc(sandbox, state^);
              let (state, _) = state |> InstanceTool.addSourceInstance(gameObject);
              let state = state |> InstanceTool.setGPUDetectDataAllowBatchInstance;
              let state = state |> execFunc;
              GLSLTool.containMultiline(
                GLSLTool.getVsSource(shaderSource),
                [{|uniform mat4 u_mMatrix;|}, {|mat4 mMatrix = u_mMatrix;|}]
              )
              |> expect == true
            }
          )
        }
      )
    }
  )
};