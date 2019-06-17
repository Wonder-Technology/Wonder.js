open Wonder_jest;

let _ =
  describe("test render basic batch instance", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    let _createSourceInstanceGameObject = RenderBasicBatchInstanceTool.createSourceInstanceGameObject;
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          RenderBasicJobTool.buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("use program", () =>
      RenderBatchInstanceTool.testProgram(
        sandbox,
        RenderBasicBatchInstanceTool.prepare,
        state,
      )
    );
    describe("send attribute data", () =>
      describe("send sourceInstance gameObject's a_position", () =>
        RenderBatchInstanceTool.testAttachBufferToAttribute(
          sandbox,
          ("a_position", 0, 3),
          RenderBasicBatchInstanceTool.prepare,
          state,
        )
      )
    );
    describe("send uniform data", () => {
      RenderBatchInstanceTool.testSendShaderUniformData(
        sandbox,
        (
          RenderBasicBatchInstanceTool.prepare,
          _createSourceInstanceGameObject,
        ),
        state,
      );
      GLSLSenderTool.JudgeSendUniformData.testSendVector3(
        sandbox,
        "u_color",
        (
          _,
          (gameObjectTransform, material),
          (cameraTransform, basicCameraView),
          state,
        ) =>
          state
          |> BasicMaterialAPI.setBasicMaterialColor(
               material,
               [|0., 1., 0.2|],
             ),
        [0., 1., 0.20000000298023224],
        (),
      );
      describe("send object instance gameObject's data", () =>
        test("send u_mMatrix data", () => {
          let name = "u_mMatrix";
          let (state, _, _, _) =
            RenderBasicBatchInstanceTool.prepare(sandbox, 2, state^);
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
                   (),
                 ),
               );
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          uniformMatrix4fv
          |> withOneArg(pos)
          |> getCallCount
          |> expect == 2
          + 3
          + 2;
        })
      );
    });
    /* describe("bind and update sourceInstance's gameObject's map", () => {
      test("bind map", () => {
        let (state, gameObject, _, _) =
          RenderBasicBatchInstanceTool.prepare(sandbox, 2, state^);
        let material =
          GameObjectAPI.unsafeGetGameObjectBasicMaterialComponent(
            gameObject,
            state,
          );
        let (state, map) =
          BasicSourceTextureAPI.createBasicSourceTexture(state);
        let state =
          state |> BasicMaterialAPI.setBasicMaterialMap(material, map);
        RenderBasicMaterialMapTool.testBindMap(sandbox, state);
      });
      test("update map", () => {
        let (state, gameObject, _, _) =
          RenderBasicBatchInstanceTool.prepare(sandbox, 2, state^);
        let material =
          GameObjectAPI.unsafeGetGameObjectBasicMaterialComponent(
            gameObject,
            state,
          );
        let (state, map) =
          BasicSourceTextureAPI.createBasicSourceTexture(state);
        let source = BasicSourceTextureTool.buildSource(2, 4);
        let state =
          state
          |> BasicSourceTextureAPI.setBasicSourceTextureSource(map, source);
        let state =
          state |> BasicMaterialAPI.setBasicMaterialMap(material, map);
        RenderBasicMaterialMapTool.testUpdateMap(sandbox, state);
      });
    }); */
    describe("draw", () => {
      describe("test source gameObject has box geometry component", () =>
        RenderBatchInstanceTool.testDrawElements(
          sandbox,
          RenderBasicBatchInstanceTool.prepare,
          GeometryTool.getIndicesCount,
          state,
        )
      );
      describe("test source gameObject has custom geometry component", () =>
        RenderBatchInstanceTool.testDrawElements(
          sandbox,
          RenderBasicBatchInstanceTool.prepareWithGeometry,
          GeometryTool.getIndicesCount,
          state,
        )
      );
    });
    describe("fix bug", () => {
      describe(
        "if sourceInstance gameObject not has  objectInstanceGameObjects,", () => {
        let _prepare = state => {
          let state = state |> InstanceTool.setGPUDetectDataAllowBatchInstance;
          let (state, gameObject, geometry, material, meshRenderer) =
            RenderBasicJobTool.prepareGameObject(sandbox, state);
          let (state, sourceInstance) =
            SourceInstanceAPI.createSourceInstance(state);
          let state =
            state
            |> GameObjectAPI.addGameObjectSourceInstanceComponent(
                 gameObject,
                 sourceInstance,
               );
          let (state, _, _, _) = CameraTool.createCameraGameObject(state);
          (
            state,
            gameObject,
            geometry,
            material,
            meshRenderer,
            sourceInstance,
          );
        };
        test("should send sourceInstance gameObject u_mMatrix", () => {
          let (
            state,
            gameObject,
            geometry,
            material,
            meshRenderer,
            sourceInstance,
          ) =
            _prepare(state^);
          let state =
            state
            |> TransformAPI.setTransformLocalPosition(
                 GameObjectAPI.unsafeGetGameObjectTransformComponent(
                   gameObject,
                   state,
                 ),
                 (1., 2., 5.),
               );
          let name = "u_mMatrix";
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
                   (),
                 ),
               );
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          uniformMatrix4fv
          |> withThreeArgs(
               pos,
               false,
               Js.Typed_array.Float32Array.make([|
                 1.,
                 0.,
                 0.,
                 0.,
                 0.,
                 1.,
                 0.,
                 0.,
                 0.,
                 0.,
                 1.,
                 0.,
                 1.,
                 2.,
                 5.,
                 1.,
               |]),
             )
          |> getCallCount
          |> expect == 1;
        });
        test("should still draw sourceInstance gameObject", () => {
          let (
            state,
            gameObject,
            geometry,
            material,
            meshRenderer,
            sourceInstance,
          ) =
            _prepare(state^);
          let triangles = 1;
          let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~triangles,
                   ~drawElements,
                   (),
                 ),
               );
          let state = state |> RenderJobsTool.init;
          let state = state |> DirectorTool.runWithDefaultTime;
          drawElements |> expect |> toCalledOnce;
        });
      });
      describe("dispose", () => {
        test("not add buffer to pool", () => {
          open VboBufferType;
          let (
            state,
            gameObject,
            componentTuple,
            objectInstanceGameObjectList,
          ) =
            RenderBasicBatchInstanceTool.prepare(sandbox, 2, state^);
          let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
          let buffer = Obj.magic(1);
          let createBuffer = createBuffer |> returns(buffer);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()),
               );
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          let state = state |> GameObjectTool.disposeGameObject(gameObject);
          let {matrixInstanceBufferPool} =
            VboBufferTool.getVboBufferRecord(state);
          matrixInstanceBufferPool
          |> WonderCommonlib.MutableSparseMapService.length
          |> expect == 0;
        });
        test("not add matrixFloat32ArrayMap->typeArray to pool", () => {
          let (
            state,
            gameObject,
            componentTuple,
            objectInstanceGameObjectList,
          ) =
            RenderBasicBatchInstanceTool.prepare(sandbox, 2, state^);
          let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
          let buffer = Obj.magic(1);
          let createBuffer = createBuffer |> returns(buffer);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()),
               );
          let state =
            state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
          let state = state |> GameObjectTool.disposeGameObject(gameObject);
          TypeArrayPoolTool.getFloat32ArrayPoolMap(state.typeArrayPoolRecord)
          |> WonderCommonlib.MutableSparseMapService.length
          |> expect == 0;
        });
      });
    });
  });