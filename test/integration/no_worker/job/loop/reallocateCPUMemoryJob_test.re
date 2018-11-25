open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test reallocate cpu memory job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());


    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.init(
          ~sandbox,
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("fix bug", () =>
      describe("reallocate geometry", () =>
        test({|
            create geometry g1;
            dispose g1;
            create geometry g2 with vertices v2;
            create geometry g3 with vertices v3;
            dispose g3;
            reallocate geometry to new buffer;

            g2->vertices should be v2.
            |}, () => {
          let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());

          let (state, gameObject1, geometry1) =
            GeometryTool.createGameObject(state);

          let state =
            state
            |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBufferAndNotReallocate(
                 gameObject1,
                 geometry1,
               );

          let (state, gameObject2, geometry2) =
            GeometryTool.createGameObject(state);
          let vertices2 = Float32Array.make([|1., 2., 3.|]);

          let state =
            GeometryAPI.setGeometryVertices(geometry2, vertices2, state);

          let (state, gameObject3, geometry3) =
            GeometryTool.createGameObject(state);
          let vertices3 = Float32Array.make([|3., 3., 3.|]);

          let state =
            GeometryAPI.setGeometryVertices(geometry3, vertices3, state);

          let state =
            state
            |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBufferAndNotReallocate(
                 gameObject3,
                 geometry3,
               );

          let state =
            ReallocateGeometryCPUMemoryTool.reAllocateGeometryToNewBuffer(
              state,
            );

          GeometryAPI.getGeometryVertices(geometry2, state)
          |> expect == vertices2;
        })
      )
    );
  });