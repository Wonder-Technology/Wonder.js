open Wonder_jest;

let _ =
  describe(
    "test clear_buffer job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      let _render = (~flags=[|"COLOR_BUFFER"|], state: StateDataType.state) =>
        state |> ClearBufferJobTool.getJob(RenderJobsTool.buildConfigData(~flags=Some(flags), ()));
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := RenderJobsTool.initWithRenderConfig()
        }
      );
      describe(
        "clear gl buffer",
        () =>
          describe(
            "clear which buffer is decide by flags",
            () => {
              test(
                "test pass COLOR_BUFFER flag",
                () => {
                  let state = state^;
                  let color_buffer_bit = 1;
                  let clear = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~color_buffer_bit, ~clear, ())
                       );
                  let state = state |> _render(~flags=[|"COLOR_BUFFER"|]);
                  clear |> expect |> toCalledWith([color_buffer_bit])
                }
              );
              test(
                "test pass DEPTH_BUFFER flag",
                () => {
                  let state = state^;
                  let depth_buffer_bit = 1;
                  let clear = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~depth_buffer_bit, ~clear, ())
                       );
                  let state = state |> _render(~flags=[|"DEPTH_BUFFER"|]);
                  clear |> expect |> toCalledWith([depth_buffer_bit])
                }
              );
              test(
                "test pass STENCIL_BUFFER flag",
                () => {
                  let state = state^;
                  let stencil_buffer_bit = 1;
                  let clear = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~stencil_buffer_bit, ~clear, ())
                       );
                  let state = state |> _render(~flags=[|"STENCIL_BUFFER"|]);
                  clear |> expect |> toCalledWith([stencil_buffer_bit])
                }
              );
              test(
                "test pass all flags",
                () => {
                  let state = state^;
                  let color_buffer_bit = 1;
                  let depth_buffer_bit = 2;
                  let stencil_buffer_bit = 3;
                  let clear = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(
                           ~sandbox,
                           ~color_buffer_bit,
                           ~depth_buffer_bit,
                           ~stencil_buffer_bit,
                           ~clear,
                           ()
                         )
                       );
                  let state =
                    state |> _render(~flags=[|"COLOR_BUFFER", "DEPTH_BUFFER", "STENCIL_BUFFER"|]);
                  clear
                  |> expect
                  |> toCalledWith([color_buffer_bit lor depth_buffer_bit lor stencil_buffer_bit])
                }
              )
            }
          )
      );
      describe(
        "set color write",
        () => {
          test(
            "set to all true",
            () => {
              let state = state^;
              let colorMask = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~colorMask, ()));
              let state = state |> _render;
              colorMask |> expect |> toCalledWith([Js.true_, Js.true_, Js.true_, Js.true_])
            }
          );
          test(
            "if color write is the same as the last one, not set",
            () => {
              let state = state^;
              let colorMask = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~colorMask, ()));
              let state = state |> _render;
              let state = state |> _render;
              let state = state |> _render;
              getCallCount(colorMask) |> expect == 1
            }
          )
        }
      )
    }
  );