let testProgram = (sandbox, prepareFunc, state) => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;
  open Sinon;
  let _prepareForUseProgram = (sandbox, state) => {
    let (state, _, _) = prepareFunc(sandbox, state);
    let program = Obj.magic(1);
    let createProgram = createEmptyStubWithJsObjSandbox(sandbox) |> onCall(0) |> returns(program);
    let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
    let state =
      state
      |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ()));
    (state, program, createProgram, useProgram)
  };
  test(
    "create program and use program only once",
    () => {
      let (state, program, createProgram, useProgram) = _prepareForUseProgram(sandbox, state^);
      let state = state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
      createProgram |> getCallCount |> expect == 1
    }
  );
  test(
    "only use sourceInstance's gameObject's program",
    () => {
      let (state, program, createProgram, useProgram) = _prepareForUseProgram(sandbox, state^);
      let state = state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
      useProgram |> expect |> toCalledWith([|program|])
    }
  )
};

let testAttachBufferToAttribute = (sandbox, (name, callIndex, size), prepareFunc, state) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          test(
            "test attach buffer to attribute",
            () => {
              let (state, _, _) = prepareFunc(sandbox, state^);
              let float = 1;
              let vertexAttribPointer = createEmptyStubWithJsObjSandbox(sandbox);
              let pos = 0;
              let getAttribLocation = GLSLLocationTool.getAttribLocation(~pos, sandbox, name);
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
              let state =
                state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
              vertexAttribPointer
              |> getCall(callIndex)
              |> expect
              |> toCalledWith([|pos, size, float, Obj.magic(Js.false_), 0, 0|])
            }
          )
        )
      )
    )
  );

let testSendShaderUniformData = (sandbox, (prepareFunc, createSourceInstanceGameObjectFunc), state) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          test(
            "send shader uniform record only once per shader",
            () => {
              let name = "u_vMatrix";
              let (state, _, _) = prepareFunc(sandbox, state^);
              let (state, gameObject2, componentTuple) =
                createSourceInstanceGameObjectFunc(sandbox, state);
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
                state |> RenderJobsTool.initSystemAndRender |> DirectorTool.runWithDefaultTime;
              uniformMatrix4fv |> withOneArg(pos) |> getCallCount |> expect == 2
            }
          )
        )
      )
    )
  );

let testDrawElementsInstancedANGLE = (sandbox, prepareFunc, getIndicesCountFunc, state) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          test(
            "drawElementsInstancedANGLE",
            () => {
              let (state, _, (geometry, _, _, _, _)) = prepareFunc(sandbox, state^);
              let drawElementsInstancedANGLE =
                Obj.magic(
                  InstanceTool.getExtensionInstancedArrays(state)##drawElementsInstancedANGLE
                );
              let triangles = 1;
              let state =
                state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~triangles, ()));
              let state = state |> RenderJobsTool.initSystemAndRender;
              let state = state |> DirectorTool.runWithDefaultTime;
              drawElementsInstancedANGLE
              |> expect
              |> toCalledWith([|
                   triangles,
                   getIndicesCountFunc(geometry, state),
                   GeometryTool.getIndexType(state),
                   GeometryTool.getIndexTypeSize(state) * 0,
                   2
                 |])
            }
          )
        )
      )
    )
  );