open Wonder_jest;

let _ =
  describe("fix assemble wdb bug", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          LoopRenderJobTool.buildNoWorkerJobConfig(),
        );

      ConvertTool.setFakeTransformCount(50);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test dispose gameObject before assemble", () =>
      testPromise(
        "all components should create component from disposedIndexArray when assemble",
        () => {
          let (
            state,
            gameObject1,
            geometry1,
            _,
            _,
            (diffuseMap1, specularMap1),
          ) =
            FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state^,
            );
          let (
            state,
            gameObject2,
            geometry2,
            _,
            _,
            (diffuseMap2, specularMap2),
          ) =
            FrontRenderLightJobTool.prepareGameObjectWithCreatedMap(
              sandbox,
              state,
            );
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let state = state |> RenderJobsTool.init;
          let state = GameObjectAPI.disposeGameObject(gameObject1, state);
          let state = state |> DirectorTool.runWithDefaultTime;

          AssembleWDBSystemTool.testGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("BoxTextured.glb"),
            ((state, _, (rootGameObject, _))) => {
              let state =
                AssembleWDBSystemTool.getAllGameObjects(rootGameObject, state)
                |> WonderCommonlib.ArrayService.reduceOneParam(
                     (. state, gameObject) =>
                       GameObjectAPI.initGameObject(gameObject, state),
                     state,
                   );

              (
                AssembleWDBSystemTool.getAllGeometrys(rootGameObject, state),
                AssembleWDBSystemTool.getAllDiffuseMaps(
                  rootGameObject,
                  state,
                ),
              )
              |> expect == ([|geometry1|], [|specularMap1|]);
            },
            state,
          );
        },
      )
    );

    describe("test dispose gameObject after assemble", () =>
      describe("test basic source texture", () =>
        testPromise(
          "if the wdb use shared texture, the disposedIndexArray after dispose should has no duplicate items",
          () => {
            let state = state^;
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

            AssembleWDBSystemTool.testGLB(
              sandbox^,
              GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
              ((state, _, (rootGameObject, _))) => {
                let state =
                  GameObjectTool.disposeAllGameObjects(rootGameObject, state);

                BasicSourceTextureTool.getDisposedIndexArray(state)
                |> expect == [|1, 0|];
              },
              state,
            );
          },
        )
      )
    );

    describe("if the primitive has no indices, generate indices", () =>
      testPromise(
        "if vertex count < 2^16, generate the Uint16Array indices  ", () =>
        AssembleWDBSystemTool.testGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=
            ConvertGLBTool.buildGLTFJson(
              ~scene={| 0|},
              ~scenes={|  [
        {
        "nodes": [0]
    }
    ]|},
              ~nodes={| [
        {
            "mesh": 0
        }
    ]|},
              ~meshes=
                {| [
        {"primitives": [
        {
            "attributes": {
                "NORMAL": 1,
                "POSITION": 2,
                "TEXCOORD_0": 3
            },
            "material": 0
        }
    ]}
    ]|},
              (),
            ),
          ~state,
          ~testFunc=
            ((state, _, (rootGameObject, _))) => {
              let boxGameObject = rootGameObject;
              let geometry =
                GameObjectAPI.unsafeGetGameObjectGeometryComponent(
                  boxGameObject,
                  state,
                );

              (
                GeometryAPI.getGeometryVertices(geometry, state),
                GeometryAPI.getGeometryIndices16(geometry, state)->Some,
              )
              |> expect
              == (
                   Js.Typed_array.Float32Array.make([|
                     (-0.5),
                     (-0.5),
                     0.5,
                     0.5,
                     (-0.5),
                     0.5,
                     (-0.5),
                     0.5,
                     0.5,
                     0.5,
                     0.5,
                     0.5,
                     0.5,
                     0.5,
                     0.5,
                     0.5,
                     (-0.5),
                     0.5,
                     0.5,
                     0.5,
                     (-0.5),
                     0.5,
                     (-0.5),
                     (-0.5),
                     (-0.5),
                     0.5,
                     0.5,
                     0.5,
                     0.5,
                     0.5,
                     (-0.5),
                     0.5,
                     (-0.5),
                     0.5,
                     0.5,
                     (-0.5),
                     0.5,
                     (-0.5),
                     0.5,
                     (-0.5),
                     (-0.5),
                     0.5,
                     0.5,
                     (-0.5),
                     (-0.5),
                     (-0.5),
                     (-0.5),
                     (-0.5),
                     (-0.5),
                     (-0.5),
                     0.5,
                     (-0.5),
                     0.5,
                     0.5,
                     (-0.5),
                     (-0.5),
                     (-0.5),
                     (-0.5),
                     0.5,
                     (-0.5),
                     (-0.5),
                     (-0.5),
                     (-0.5),
                     (-0.5),
                     0.5,
                     (-0.5),
                     0.5,
                     (-0.5),
                     (-0.5),
                     0.5,
                     0.5,
                     (-0.5),
                   |]),
                   Js.Typed_array.Uint16Array.make([|
                     0,
                     1,
                     2,
                     3,
                     4,
                     5,
                     6,
                     7,
                     8,
                     9,
                     10,
                     11,
                     12,
                     13,
                     14,
                     15,
                     16,
                     17,
                     18,
                     19,
                     20,
                     21,
                     22,
                     23,
                     24,
                   |])
                   ->Some,
                 );
            },
          (),
        )
      )
    );
    // TODO test "else, generate the Uint32Array indices",
  });
