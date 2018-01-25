open Wonder_jest;

let _ =
  describe(
    "test render basic batch instance",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _createSourceInstanceGameObject = RenderBasicBatchInstanceTool.createSourceInstanceGameObject;
      let _render = RenderBasicBatchInstanceTool.render;
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            RenderJobsTool.initWithJobConfigAndBufferConfig(
              sandbox,
              Js.Nullable.return(GeometryTool.buildBufferConfig(3000))
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "use program",
        () => {
          let _prepareForUseProgram = (sandbox, state) => {
            let (state, _, _, _) = RenderBasicBatchInstanceTool.prepare(sandbox, 1, state);
            let program = Obj.magic(1);
            let createProgram =
              createEmptyStubWithJsObjSandbox(sandbox) |> onCall(0) |> returns(program);
            let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ())
                 );
            (state, program, createProgram, useProgram)
          };
          test(
            "create program and use program only once",
            () => {
              let (state, program, createProgram, useProgram) =
                _prepareForUseProgram(sandbox, state^);
              let state = state |> RenderJobsTool.initSystemAndRender |> _render;
              createProgram |> getCallCount |> expect == 1
            }
          );
          test(
            "only use sourceInstance's gameObject's program",
            () => {
              let (state, program, createProgram, useProgram) =
                _prepareForUseProgram(sandbox, state^);
              let state = state |> RenderJobsTool.initSystemAndRender |> _render;
              useProgram |> expect |> toCalledWith([|program|])
            }
          )
        }
      );
      describe(
        "send attribute data",
        () =>
          describe(
            "send sourceInstance gameObject's a_position",
            () =>
              test(
                "test attach buffer to attribute",
                () => {
                  let (state, _, _, _) = RenderBasicBatchInstanceTool.prepare(sandbox, 1, state^);
                  let float = 1;
                  let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 0;
                  let getAttribLocation =
                    GLSLLocationTool.getAttribLocation(~pos, sandbox, "a_position");
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(
                           ~sandbox,
                           ~float,
                           ~vertexAttribPointer,
                           ~getAttribLocation,
                           ()
                         )
                       );
                  let state = state |> RenderJobsTool.initSystemAndRender |> _render;
                  vertexAttribPointer
                  |> getCall(0)
                  |> expect
                  |> toCalledWith([|pos, 3, float, Obj.magic(Js.false_), 0, 0|])
                }
              )
          )
      );
      describe(
        "send uniform data",
        () => {
          test(
            "send shader uniform data only once per shader",
            () => {
              let name = "u_vMatrix";
              let (state, _, _, _) = RenderBasicBatchInstanceTool.prepare(sandbox, 1, state^);
              let (state, gameObject2, _, _) = _createSourceInstanceGameObject(sandbox, 1, state);
              let (state, gameObject3, _, _, _) = RenderJobsTool.prepareGameObject(sandbox, state);
              let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 1;
              let getUniformLocation = GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~uniformMatrix4fv, ~getUniformLocation, ())
                   );
              let state =
                state
                |> RenderJobsTool.initSystemAndRender
                |> RenderJobsTool.updateSystem
                |> _render;
              uniformMatrix4fv |> withOneArg(pos) |> getCallCount |> expect == 2
            }
          );
          GLSLSenderTool.JudgeSendUniformData.testSendVector3(
            sandbox,
            "u_color",
            ((gameObjectTransform, material), cameraTransform, cameraController, state) =>
              state |> Material.setMaterialColor(material, [|0., 1., 0.2|]),
            [0., 1., 0.2],
            ()
          );
          describe(
            "send object instance gameObject's data",
            () =>
              test(
                "send u_mMatrix data",
                () => {
                  let name = "u_mMatrix";
                  let (state, _, _, _) = RenderBasicBatchInstanceTool.prepare(sandbox, 2, state^);
                  let (state, gameObject2, _, _) =
                    _createSourceInstanceGameObject(sandbox, 3, state);
                  let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
                  let pos = 1;
                  let getUniformLocation =
                    GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(
                           ~sandbox,
                           ~uniformMatrix4fv,
                           ~getUniformLocation,
                           ()
                         )
                       );
                  let state =
                    state
                    |> RenderJobsTool.initSystemAndRender
                    |> RenderJobsTool.updateSystem
                    |> _render;
                  uniformMatrix4fv |> withOneArg(pos) |> getCallCount |> expect == 2 + 3
                }
              )
          )
        }
      );
      describe(
        "draw",
        () =>
          test(
            "drawElements",
            () => {
              let (state, _, geometry, _) =
                RenderBasicBatchInstanceTool.prepare(sandbox, 3, state^);
              let triangles = 1;
              let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~triangles, ~drawElements, ())
                   );
              let state = state |> RenderJobsTool.initSystemAndRender;
              let state = state |> _render;
              drawElements
              |> withFourArgs(
                   triangles,
                   GeometryTool.getIndicesCount(geometry, state),
                   GeometryTool.getIndexType(state),
                   GeometryTool.getIndexTypeSize(state) * 0
                 )
              |> expect
              |> toCalledThrice
            }
          )
      )
    }
  );