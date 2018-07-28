open Wonder_jest;

let _ =
  describe("test re-init lightMaterial", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        InitLightMaterialJobTool.initWithJobConfig(
          sandbox,
          NoWorkerJobConfigTool.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_light_material"
        }
      ]
    }
  ]
        |},
            ~initJobs=
              {|
[
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_light_material"
        }
]
        |},
            (),
          ),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test with light", () =>
      describe("test with direction light", () => {
        let _initMaterial = (material, state) => {
          let state = AllMaterialTool.prepareForInit(state);
          let state = LightMaterialTool.initMaterial(material, state);

          state;
        };

        test(
          {|test one light material:
   1.has no lights;
   2.init material;
   3.add one light;
   4.re-init material;

   glsl->DIRECTION_LIGHTS_COUNT should == 1|},
          () => {
            let (state, gameObject, material) =
              LightMaterialTool.createGameObject(state^);
            let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~shaderSource, ()),
                 );
            let state = _initMaterial(material, state);
            let shaderSourceCallCount = shaderSource |> getCallCount;

            let (state, lightGameObject, light) =
              DirectionLightTool.createGameObject(state);
            let state =
              LightMaterialAPI.reInitMaterials([|material|], state);

            GLSLTool.contain(
              GLSLTool.getVsSourceByCount(
                shaderSource,
                shaderSourceCallCount,
              ),
              {|#define DIRECTION_LIGHTS_COUNT 1|},
            )
            |> expect == true;
          },
        );

        test("if use worker, fatal", () => {
          let state =
            WorkerDetectMainWorkerTool.markIsSupportRenderWorkerAndSharedArrayBuffer(
              true,
              state^,
            )
            |> SettingTool.setUseWorker(true);
          let (state, gameObject, material) =
            LightMaterialTool.createGameObject(state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

          expect(() => {
            let state =
              LightMaterialAPI.reInitMaterials([|material|], state);
            ();
          })
          |> toThrowMessage("not support worker");
        });

        describe(
          {|test one light material:
   1.has no lights;
   2.init material;
   3.add one light;
   4.re-init material;
   5.front render light|},
          () => {
            let _exec = (material, state) => {
              let (state, _, cameraTransform, _) =
                CameraTool.createCameraGameObject(state);
              let (state, lightGameObject, light) =
                DirectionLightTool.createGameObject(state);
              let state =
                LightMaterialAPI.reInitMaterials([|material|], state);
              let state = state |> DirectorTool.runWithDefaultTime;

              state;
            };

            test("should use new program", () => {
              let (state, gameObject, _, material, _) =
                FrontRenderLightJobTool.prepareGameObject(sandbox, state^);
              let program2 = Obj.magic(2);
              let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
              createProgram |> onCall(1) |> returns(program2);
              let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~createProgram,
                       ~useProgram,
                       (),
                     ),
                   );
              let state = _initMaterial(material, state);

              let state = _exec(material, state);

              useProgram |> expect |> toCalledWith([|program2|]);
            });
            test("should only send light data once", () => {
              let (state, gameObject, material) =
                LightMaterialTool.createGameObject(state^);
              let color = [|1., 0., 0.|];
              let state =
                state
                |> LightMaterialAPI.setLightMaterialDiffuseColor(
                     material,
                     color,
                   );
              let (state, posArr, (uniform1f, uniform3f)) =
                FrontRenderLightForNoWorkerAndWorkerJobTool.setFakeGlForLight(
                  sandbox,
                  [|"u_directionLights[0].color"|],
                  state,
                );
              let state = _initMaterial(material, state);

              let state = _exec(material, state);

              uniform3f
              |> withOneArg(posArr[0])
              |> getCallCount
              |> expect == 1;
            });
            test("should send u_diffuse", () => {
              let (state, gameObject, _, material, _) =
                FrontRenderLightJobTool.prepareGameObject(sandbox, state^);
              let color = [|1., 0., 0.|];
              let state =
                state
                |> LightMaterialAPI.setLightMaterialDiffuseColor(
                     material,
                     color,
                   );
              let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
              let name = "u_diffuse";
              let pos1 = 0;
              let pos2 = 1;
              let getUniformLocation =
                createEmptyStubWithJsObjSandbox(sandbox);

              getUniformLocation
              |> withTwoArgs(Sinon.matchAny, name)
              |> onCall(0)
              |> returns(pos1);
              getUniformLocation
              |> withTwoArgs(Sinon.matchAny, name)
              |> onCall(1)
              |> returns(pos2);

              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~uniform3f,
                       ~getUniformLocation,
                       (),
                     ),
                   );
              let state = _initMaterial(material, state);

              let state = _exec(material, state);

              uniform3f
              |> expect
              |> toCalledWith(
                   [|pos2 |> Obj.magic|] |> Js.Array.concat(color),
                 );
            });
          },
        );
      })
    );
  });